(() => {
  const embedded = window.parent !== window;
  const codes = {vi:'vi',en:'en',fr:'fr',ko:'kr',zh:'cn',ja:'jp'};
  const params = new URLSearchParams(location.search);
  const guideView = params.get('view') === 'guide';
  if (embedded || params.get('notopbar') === '1') document.body.classList.add('embedded');
  const playerLabels = {
    vi: { player:'Trình phát thuyết minh', play:'Phát', pause:'Tạm dừng', seek:'Vị trí phát', mute:'Tắt tiếng', unmute:'Bật tiếng', error:'Không thể phát audio. Hãy thử lại.' },
    en: { player:'Audio guide player', play:'Play', pause:'Pause', seek:'Playback position', mute:'Mute', unmute:'Unmute', error:'Unable to play audio. Please try again.' },
    fr: { player:'Lecteur audio', play:'Lire', pause:'Pause', seek:'Position de lecture', mute:'Couper le son', unmute:'Activer le son', error:'Lecture impossible. Réessayez.' },
    ko: { player:'음성 안내 재생기', play:'재생', pause:'일시 정지', seek:'재생 위치', mute:'음소거', unmute:'음소거 해제', error:'음성을 재생할 수 없습니다. 다시 시도해 주세요.' },
    zh: { player:'语音导览播放器', play:'播放', pause:'暂停', seek:'播放进度', mute:'静音', unmute:'取消静音', error:'无法播放音频，请重试。' },
    ja: { player:'音声ガイドプレーヤー', play:'再生', pause:'一時停止', seek:'再生位置', mute:'ミュート', unmute:'ミュート解除', error:'音声を再生できません。もう一度お試しください。' },
  };
  const icons = {
    play:'<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M8 4.5v15l12-7.5z"/></svg>',
    pause:'<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6.5 4.5h4v15h-4zm7 0h4v15h-4z"/></svg>',
    sound:'<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M3 9v6h4l5 4V5L7 9H3zm12.5-.5v7a4.3 4.3 0 0 0 0-7zm0-3v2a6.5 6.5 0 0 1 0 9v2a8.6 8.6 0 0 0 0-13z"/></svg>',
    muted:'<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M3 9v6h4l5 4V5L7 9H3zm12.4.1L17.3 11l1.9-1.9 1.4 1.4-1.9 1.9 1.9 1.9-1.4 1.4-1.9-1.9-1.9 1.9-1.4-1.4 1.9-1.9-1.9-1.9z"/></svg>',
  };
  function installPlayer(audio, dock) {
    const language = (document.documentElement.lang || 'vi').toLowerCase().split('-')[0];
    const text = playerLabels[language] || playerLabels.vi;
    const player = document.createElement('div');
    player.className = 'reader-player';
    player.setAttribute('role', 'group');
    player.setAttribute('aria-label', text.player);
    player.innerHTML = '<button type="button" class="reader-player-button reader-player-play"></button><div class="reader-player-track"><div class="reader-player-times" aria-hidden="true"><span class="reader-player-current">0:00</span><span class="reader-player-duration">--:--</span></div><input class="reader-player-seek" type="range" min="0" max="0" value="0" step="0.1" disabled></div><button type="button" class="reader-player-button reader-player-mute"></button>';
    const play = player.querySelector('.reader-player-play');
    const mute = player.querySelector('.reader-player-mute');
    const seek = player.querySelector('.reader-player-seek');
    const current = player.querySelector('.reader-player-current');
    const duration = player.querySelector('.reader-player-duration');
    const status = document.createElement('span');
    status.className = 'reader-player-status';
    status.hidden = true;
    status.setAttribute('role', 'status');
    status.setAttribute('aria-live', 'polite');
    seek.setAttribute('aria-label', text.seek);
    const format = value => {
      if (!Number.isFinite(value) || value < 0) return '--:--';
      const seconds = Math.floor(value);
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const tail = String(seconds % 60).padStart(2, '0');
      return hours ? `${hours}:${String(minutes).padStart(2, '0')}:${tail}` : `${minutes}:${tail}`;
    };
    const clearError = () => { status.hidden = true; status.textContent = ''; };
    const showError = () => { status.textContent = text.error; status.hidden = false; };
    const updatePlay = () => {
      const paused = audio.paused;
      const label = paused ? text.play : text.pause;
      play.innerHTML = paused ? icons.play : icons.pause;
      play.setAttribute('aria-label', label);
      play.title = label;
    };
    const updateMute = () => {
      const muted = audio.muted || audio.volume === 0;
      const label = muted ? text.unmute : text.mute;
      mute.innerHTML = muted ? icons.muted : icons.sound;
      mute.setAttribute('aria-label', label);
      mute.setAttribute('aria-pressed', String(muted));
      mute.title = label;
    };
    const updateTime = () => {
      const total = Number.isFinite(audio.duration) && audio.duration > 0 ? audio.duration : 0;
      const position = Number.isFinite(audio.currentTime) ? Math.max(0, audio.currentTime) : 0;
      current.textContent = format(position);
      duration.textContent = total ? format(total) : '--:--';
      seek.disabled = !total;
      seek.max = String(total);
      seek.value = String(Math.min(position, total));
      seek.style.setProperty('--progress', `${total ? Math.min(100, position / total * 100) : 0}%`);
      seek.setAttribute('aria-valuetext', `${format(position)} / ${total ? format(total) : '--:--'}`);
    };
    play.addEventListener('click', () => {
      if (!audio.paused) { audio.pause(); return; }
      clearError();
      try {
        if (audio.error) audio.load();
        const request = audio.play();
        if (request && typeof request.catch === 'function') request.catch(error => { if (error?.name !== 'AbortError') showError(); });
      } catch { showError(); }
    });
    mute.addEventListener('click', () => {
      if (audio.muted || audio.volume === 0) {
        if (audio.volume === 0) audio.volume = 1;
        audio.muted = false;
      } else audio.muted = true;
    });
    seek.addEventListener('input', () => {
      const value = Number(seek.value);
      if (Number.isFinite(value) && Number.isFinite(audio.duration) && audio.duration > 0) {
        try { audio.currentTime = Math.max(0, Math.min(value, audio.duration)); updateTime(); } catch { /* media is not seekable yet */ }
      }
    });
    ['play','pause','ended'].forEach(name => audio.addEventListener(name, updatePlay));
    ['loadedmetadata','durationchange','timeupdate'].forEach(name => audio.addEventListener(name, updateTime));
    audio.addEventListener('volumechange', updateMute);
    audio.addEventListener('error', showError);
    audio.addEventListener('playing', clearError);
    updatePlay(); updateMute(); updateTime();
    dock.insertBefore(player, audio);
    dock.appendChild(status);
    audio.hidden = true;
    audio.preload = 'metadata';
  }
  const audio = document.querySelector('.reader-audio audio');
  if (audio && !guideView) {
    document.body.classList.add('has-audio');
    const dock = audio.closest('.reader-audio');
    if (dock) {
      try { installPlayer(audio, dock); }
      catch {
        dock.querySelector?.('.reader-player')?.remove();
        dock.querySelector?.('.reader-player-status')?.remove();
        audio.hidden = false;
        audio.controls = true;
      }
      const measureDock = () => {
        const height = dock.getBoundingClientRect().height;
        if (height > 0) document.documentElement.style.setProperty('--audio-dock-height', `${Math.ceil(height)}px`);
      };
      measureDock();
      window.addEventListener('resize', measureDock, { passive: true });
      if (typeof ResizeObserver !== 'undefined') new ResizeObserver(measureDock).observe(dock);
    }
    try { audio.play()?.catch(() => {}); } catch { /* autoplay may be blocked */ }
  }
  function setLanguage(lang) {
    if (!codes[lang]) return;
    try { localStorage.setItem('lang',lang); } catch { /* storage unavailable */ }
    if (embedded) {
      window.parent.postMessage({type:'spot-lang',lang}, location.origin);
    } else {
      const next = new URL(location.href);
      next.pathname = next.pathname.replace(/index(?:_(vi|en|fr|kr|cn|jp))?(?:\.html)?$/, `index_${codes[lang]}.html`);
      location.href = next.href;
    }
  }
  document.querySelectorAll('[data-language]').forEach(link => link.addEventListener('click',event => {
    event.preventDefault(); setLanguage(link.dataset.language);
  }));
  document.querySelector('.reader-back')?.addEventListener('click',event => {
    if (!embedded) return;
    event.preventDefault(); window.parent.postMessage({type:'spot-close'},location.origin);
  });
  if (guideView) {
    document.body.classList.add('reader-guide-loading');
    import('./reader-guide.js?v=16')
      .then(({ mountVisitGuide }) => mountVisitGuide(audio))
      .catch(error => {
        audio?.pause();
        console.error('Could not open the visit guide', error);
      })
      .finally(() => document.body.classList.remove('reader-guide-loading'));
  }
})();
