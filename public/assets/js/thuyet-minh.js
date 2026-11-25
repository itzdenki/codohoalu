(function () {
  var LANGS = ['vi', 'en', 'fr', 'ko', 'zh', 'ja'];
  var NAMES = { vi: 'Tiếng Việt', en: 'English', fr: 'Français', ko: '한국어', zh: '中文', ja: '日本語' };
  var FILE_CODES = { vi: 'vi', en: 'en', fr: 'fr', ko: 'kr', zh: 'cn', ja: 'jp' };
  var params = new URLSearchParams(location.search);
  var fileMatch = location.pathname.match(/\/index_(vi|en|kr|fr|cn|jp)(?:\.html)?$/);
  var fileLang = fileMatch && ({ vi: 'vi', en: 'en', kr: 'ko', fr: 'fr', cn: 'zh', jp: 'ja' })[fileMatch[1]];
  var savedLang;
  try { savedLang = localStorage.getItem('lang'); } catch (_) { /* storage unavailable */ }
  var lang = fileLang || params.get('lang') || savedLang;
  var noTopbar = params.get('notopbar') === '1';
  if (LANGS.indexOf(lang) < 0) lang = 'vi';
  document.body.classList.add('tm');
  var theme = document.createElement('link');
  theme.rel = 'stylesheet';
  theme.href = '/assets/css/guide-theme.css';
  document.head.appendChild(theme);

  var embedded = window.parent !== window;

  // Hỗ trợ TravisUtility.goTo(...) từ các trang sơ đồ (dth/so-do và ldh/so-do)
  window.TravisUtility = {
    goTo: function (routePath) {
      if (embedded) {
        window.parent.postMessage({ type: 'spot-goto', route: routePath }, '*');
      } else {
        location.href = '/' + routePath.replace(/^\/+|\/+$/g, '') + '/index_' + FILE_CODES[lang] + '.html';
      }
    }
  };

  var isSoDo = /\/so-do(\/|$)/.test(location.pathname);
  var noAudio = isSoDo || params.get('noaudio') === '1';
  // Cho phép bấm trực tiếp vào các số cờ trên sơ đồ (ldh/so-do)
  document.querySelectorAll('#pf1 .t').forEach(function (el) {
    var txt = (el.textContent || '').trim();
    if (/^[1-9]$/.test(txt) && !el.onclick) {
      el.style.cursor = 'pointer';
      el.onclick = function () {
        var num = txt;
        var items = document.querySelectorAll('#pf1 .t[onclick]');
        for (var i = 0; i < items.length; i++) {
          var t = (items[i].textContent || '').replace(/\s+/g, '');
          if (t.indexOf(num + '.') === 0) {
            items[i].click();
            break;
          }
        }
      };
    }
  });

  // Thanh trên cùng: quay lại + chọn ngôn ngữ
  var top = document.createElement('div');
  top.className = 'topbar';
  if (noTopbar) top.style.display = 'none';
  top.innerHTML = '<a href="/">' + (lang === 'zh' ? '← 地图' : lang === 'ja' ? '← 地図' : '← Sơ đồ') + '</a><span class="sp"></span><div class="fl"></div>';
  document.body.insertBefore(top, document.body.firstChild);
  // Khi nhúng trong app (iframe): nút quay lại đóng trang nội dung, đổi ngôn ngữ báo cho app
  if (embedded) {
    top.querySelector('a').onclick = function (e) {
      e.preventDefault();
      window.parent.postMessage({ type: 'spot-close' }, '*');
    };
  }
  var fl = top.querySelector('.fl');
  LANGS.forEach(function (l) {
    if (l === 'ja') return;
    var b = document.createElement('button');
    b.title = NAMES[l];
    b.dataset.l = l;
    b.innerHTML = '<img src="/images/flags/' + l + (l === 'zh' || l === 'ja' ? '.svg' : '.png') + '" alt="' + NAMES[l] + '">';
    b.onclick = function () {
      if (!embedded && fileMatch && l !== lang) {
        var next = new URL(location.href);
        next.pathname = next.pathname.replace(/index_(vi|en|kr|fr|cn|jp)(?:\.html)?$/, 'index_' + FILE_CODES[l] + '.html');
        next.searchParams.delete('lang');
        location.href = next.href;
      } else setLang(l);
    };
    fl.appendChild(b);
  });

  window.addEventListener('message', function (e) {
    if (e.origin === location.origin && e.source === window.parent && e.data && e.data.type === 'parent-lang' && LANGS.indexOf(e.data.lang) >= 0) {
      if (e.data.lang !== lang) setLang(e.data.lang, true);
    }
  });

  // Co giãn trang cho vừa chiều rộng màn hình
  var pages = [].slice.call(document.querySelectorAll('.pf'));
  pages.forEach(function (pf) {
    var w = document.createElement('div');
    w.className = 'pfwrap';
    pf.parentNode.insertBefore(w, pf);
    w.appendChild(pf);
    pf._w = pf.offsetWidth; pf._h = pf.offsetHeight;
  });
  function fit() {
    var avail = Math.min(document.documentElement.clientWidth, 760);
    pages.forEach(function (pf) {
      var s = avail / pf._w;
      pf.style.transform = 'scale(' + s + ')';
      pf.parentNode.style.width = avail + 'px';
      pf.parentNode.style.height = pf._h * s + 'px';
    });
  }
  window.addEventListener('resize', fit);
  window.addEventListener('load', fit);
  fit();

  // Trình phát âm thanh (ẩn hoàn toàn trên trang sơ đồ để không gọi 404 audio_vi.mp3)
  var player = document.createElement('div');
  player.className = 'player' + (noAudio ? ' none' : '');
  player.innerHTML = '<div class="in"><button type="button" aria-label="Phát">▶</button>' +
    '<span class="tm cur">0:00</span><input type="range" min="0" max="0" value="0" step="0.1">' +
    '<span class="tm dur">0:00</span></div>';
  document.body.appendChild(player);
  var audio = new Audio();
  audio.preload = 'none';
  var btn = player.querySelector('button'), rng = player.querySelector('input'),
      cur = player.querySelector('.cur'), dur = player.querySelector('.dur');
  var pageContainer = document.getElementById('page-container');
  var zhPanel = document.createElement('article');
  zhPanel.lang = 'zh-Hans';
  zhPanel.hidden = true;
  zhPanel.style.cssText = 'box-sizing:border-box;max-width:760px;min-height:100vh;margin:0 auto;padding:clamp(28px,7vw,64px);background:#fffaf0;color:#342718;font-family:system-ui,sans-serif;line-height:1.9;font-size:18px;';
  if (pageContainer) pageContainer.parentNode.insertBefore(zhPanel, pageContainer);
  var zhData;
  function showChinese() {
    if (isSoDo || !pageContainer) return;
    zhPanel.lang = 'zh-Hans';
    pageContainer.hidden = true;
    pageContainer.style.display = 'none';
    zhPanel.hidden = false;
    zhPanel.textContent = '正在加载中文介绍…';
    if (!zhData) zhData = fetch('/assets/js/zh-content.json').then(function (response) {
      if (!response.ok) throw new Error('Chinese content unavailable');
      return response.json();
    }).catch(function () { zhData = null; return null; });
    zhData.then(function (data) {
      if (lang !== 'zh') return;
      var match = location.pathname.match(/\/pages\/(dth|ldh)\/([^/]+)/);
      var entry = match && data && data[match[1] + '/' + match[2]];
      zhPanel.textContent = '';
      if (!entry) { zhPanel.textContent = '此页面的中文介绍暂不可用。'; return; }
      var heading = document.createElement('h1');
      heading.textContent = entry[0];
      heading.style.cssText = 'color:#7d291c;line-height:1.3;margin:0 0 1em;';
      zhPanel.appendChild(heading);
      var note = document.createElement('p');
      note.textContent = noAudio ? '中文内容为简要介绍。' : '中文内容为简要介绍；中文语音暂不可用。';
      note.style.cssText = 'font-size:0.85em;color:#775c42;';
      zhPanel.appendChild(note);
      entry.slice(1).forEach(function (text) {
        var paragraph = document.createElement('p');
        paragraph.textContent = text;
        zhPanel.appendChild(paragraph);
      });
    });
  }
  function fmt(t) { t = Math.floor(t || 0); return Math.floor(t / 60) + ':' + ('0' + (t % 60)).slice(-2); }
  btn.onclick = function () { audio.paused ? audio.play() : audio.pause(); };
  audio.onplay = function () { btn.textContent = '❚❚'; };
  audio.onpause = audio.onended = function () { btn.textContent = '▶'; };
  audio.onloadedmetadata = function () { rng.max = audio.duration; dur.textContent = fmt(audio.duration); };
  audio.ontimeupdate = function () { rng.value = audio.currentTime; cur.textContent = fmt(audio.currentTime); };
  audio.onerror = function () { player.classList.add('none'); };
  rng.oninput = function () { audio.currentTime = rng.value; };

  var pageReady = document.readyState === 'complete';
  if (!pageReady) {
    window.addEventListener('load', function () {
      pageReady = true;
      if (!noAudio && audio.src) {
        audio.preload = 'metadata';
      }
    });
  }

  function setLang(l, fromParent) {
    lang = l;
    try { localStorage.setItem('lang', l); } catch (_) { /* storage unavailable */ }
    if (embedded && !fromParent) window.parent.postMessage({ type: 'spot-lang', lang: l }, '*');
    [].forEach.call(fl.children, function (b) { b.classList.toggle('on', b.dataset.l === l); });
    audio.pause();
    zhPanel.hidden = true;
    if (pageContainer) { pageContainer.hidden = false; pageContainer.style.display = ''; }
    if (l === 'ja') {
      player.classList.add('none');
      audio.removeAttribute('src');
      if (!isSoDo && pageContainer && !document.body.hasAttribute('data-ja-full')) {
        pageContainer.hidden = true;
        pageContainer.style.display = 'none';
        zhPanel.lang = 'ja';
        zhPanel.textContent = 'このページの日本語の解説は現在準備中です。';
        zhPanel.hidden = false;
      }
      return;
    }
    if (l === 'zh') {
      player.classList.add('none');
      audio.removeAttribute('src');
      if (!document.body.hasAttribute('data-zh-full')) showChinese();
      return;
    }
    if (noAudio) return;
    player.classList.remove('none');
    audio.preload = pageReady ? 'metadata' : 'none';
    audio.src = 'audio_' + l + '.mp3';
    rng.value = 0; cur.textContent = '0:00';
  }
  setLang(lang, true);
})();
