const copy = {
  vi: { pdf: 'Đọc nội dung', back: 'Về phần thuyết minh', previous: 'Trước', next: 'Tiếp', pause: 'Tạm dừng', play: 'Phát' },
  en: { pdf: 'Read the article', back: 'Return to the audio guide', previous: 'Back', next: 'Next', pause: 'Pause', play: 'Play' },
  fr: { pdf: 'Lire le texte', back: 'Revenir au guide audio', previous: 'Précédent', next: 'Suivant', pause: 'Mettre en pause', play: 'Lire' },
  ko: { pdf: '내용 읽기', back: '음성 안내로 돌아가기', previous: '이전', next: '다음', pause: '일시 정지', play: '재생' },
  zh: { pdf: '阅读内容', back: '返回语音导览', previous: '上一页', next: '下一页', pause: '暂停', play: '播放' },
  ja: { pdf: '解説を読む', back: '音声ガイドに戻る', previous: '前へ', next: '次へ', pause: '一時停止', play: '再生' },
};

export function makeCaptions(paragraphs, language) {
  const compact = language === 'zh' || language === 'ja';
  const separator = compact ? '' : ' ';
  const maxLength = compact ? 34 : 86;
  const words = [];
  const lines = [];
  for (const paragraph of paragraphs) {
    const text = paragraph.trim().replace(/\s+/gu, ' ');
    if (!text) continue;
    const tokens = compact ? Array.from(text) : text.split(' ');
    let start = words.length;
    let length = 0;
    for (const token of tokens) {
      if (length && length + separator.length + token.length > maxLength) {
        lines.push({ start, end: words.length });
        start = words.length;
        length = 0;
      }
      length += (length ? separator.length : 0) + token.length;
      words.push(token);
      if (length > maxLength * .58 && /[.!?…;。！？；][”"]?$/u.test(token)) {
        lines.push({ start, end: words.length });
        start = words.length;
        length = 0;
      }
    }
    if (words.length > start) lines.push({ start, end: words.length });
  }
  return { words, lines, separator, compact };
}

export function estimatedStarts(captions, duration) {
  const weights = captions.words.map(word => Math.max(2, word.length));
  const total = weights.reduce((sum, weight) => sum + weight, 0);
  const length = Number.isFinite(duration) && duration > 0
    ? duration
    : total * (captions.compact ? 135 : 67);
  let offset = 0;
  return {
    duration: length,
    starts: weights.map(weight => {
      const start = offset / total * length;
      offset += weight;
      return start;
    }),
  };
}

export function captionAt(captions, starts, time) {
  if (!starts.length) return { read: '', remaining: '' };
  let left = 0;
  let right = starts.length - 1;
  while (left < right) {
    const middle = Math.ceil((left + right) / 2);
    if (starts[middle] <= time) left = middle;
    else right = middle - 1;
  }
  const line = captions.lines.find(({ end }) => left < end);
  if (!line) return { read: '', remaining: '' };
  const { words, separator } = captions;
  const read = words.slice(line.start, left + 1).join(separator);
  const remaining = words.slice(left + 1, line.end).join(separator);
  return { read, remaining: remaining ? separator + remaining : '' };
}

export function columnCount(width, scrollWidth, gap) {
  return width > 0 ? Math.max(1, Math.round((scrollWidth + gap) / (width + gap))) : 1;
}

function installPageButtons(book, words) {
  const viewport = book.querySelector('.guide-page-viewport');
  const flow = book.querySelector('.guide-page-flow');
  const previous = book.querySelector('.guide-page-previous');
  const next = book.querySelector('.guide-page-next');
  const counter = book.querySelector('.guide-page-number');
  let page = 0;
  function update() {
    if (book.hidden) return;
    const width = viewport.getBoundingClientRect().width;
    if (!width) return;
    const gap = Number.parseFloat(getComputedStyle(flow).columnGap) || 0;
    const pages = columnCount(width, viewport.scrollWidth, gap);
    page = Math.max(0, Math.min(page, pages - 1));
    viewport.scrollLeft = page * (width + gap);
    counter.textContent = `${page + 1} / ${pages}`;
    previous.disabled = page === 0;
    next.disabled = page === pages - 1;
  }
  previous.textContent = `‹ ${words.previous}`;
  next.textContent = `${words.next} ›`;
  previous.addEventListener('click', () => { page--; update(); });
  next.addEventListener('click', () => { page++; update(); });
  flow.addEventListener('load', update, true);
  window.addEventListener('resize', update, { passive: true });
  if (typeof ResizeObserver !== 'undefined') new ResizeObserver(update).observe(viewport);
  document.fonts?.addEventListener('loadingdone', update);
  return update;
}

export function mountVisitGuide(audio) {
  const article = document.querySelector('.visit-document');
  const title = article?.querySelector('.reader-heading h1');
  const lead = article?.querySelector('.reader-lead');
  const photo = lead?.querySelector('img');
  const prose = article?.querySelector('.reader-prose');
  if (!title || !photo || !prose) return false;

  const language = document.documentElement.lang.toLowerCase().split('-')[0];
  const words = copy[language] || copy.vi;
  const captions = makeCaptions([...prose.querySelectorAll('p')].map(p => p.textContent), language);
  const guide = document.createElement('main');
  guide.className = 'reader-experience';
  guide.innerHTML = `
    <header class="guide-view-heading">
      <h1></h1>
      <button type="button" class="guide-pdf-button" aria-controls="guide-reading-view" aria-pressed="false">PDF</button>
    </header>
    <section class="guide-story-view">
      <button type="button" class="guide-story-photo"><span class="guide-photo-play" aria-hidden="true">▶</span></button>
      <p class="guide-caption-line"><span class="guide-caption-read"></span><span class="guide-caption-rest"></span></p>
    </section>
    <section class="guide-reading-view" id="guide-reading-view" aria-label="PDF" hidden>
      <div class="guide-page-viewport"><div class="guide-page-flow"></div></div>
      <nav class="guide-page-buttons" aria-label="PDF">
        <span class="guide-page-number" aria-live="polite"></span>
        <div>
          <button type="button" class="guide-page-previous"></button>
          <button type="button" class="guide-page-next"></button>
        </div>
      </nav>
    </section>`;

  const pdfButton = guide.querySelector('.guide-pdf-button');
  const story = guide.querySelector('.guide-story-view');
  const photoButton = guide.querySelector('.guide-story-photo');
  const book = guide.querySelector('.guide-reading-view');
  const read = guide.querySelector('.guide-caption-read');
  const remaining = guide.querySelector('.guide-caption-rest');
  guide.querySelector('h1').textContent = title.textContent;
  pdfButton.setAttribute('aria-label', words.pdf);
  pdfButton.title = words.pdf;
  const hero = photo.cloneNode(false);
  hero.loading = 'eager';
  photoButton.append(hero);
  const flow = book.querySelector('.guide-page-flow');
  flow.append(lead.cloneNode(true), prose.cloneNode(true));

  let recordedTiming;
  let timing = estimatedStarts(captions);
  let elapsed = 0;
  let lastTick = performance.now();
  let textPlaying = !audio && !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  const audioPlaying = () => audio && !audio.paused && !audio.ended && !audio.error;
  function updatePhotoButton() {
    const playing = audio ? audioPlaying() : textPlaying;
    const label = playing ? words.pause : words.play;
    photoButton.setAttribute('data-playing', String(playing));
    photoButton.setAttribute('aria-label', label);
    photoButton.title = label;
  }
  function playAudio() {
    if (audio.error) audio.load();
    if (audio.ended) audio.currentTime = 0;
    audio.play()?.catch(updatePhotoButton);
    updatePhotoButton();
  }

  function paint() {
    const time = audio ? audio.currentTime * 1000 : elapsed;
    const line = captionAt(captions, timing.starts, time);
    if (read.textContent !== line.read) read.textContent = line.read;
    if (remaining.textContent !== line.remaining) remaining.textContent = line.remaining;
  }

  function refreshTiming() {
    const duration = audio?.duration * 1000;
    const usable = recordedTiming && recordedTiming.starts?.length === captions.words.length
      && (!duration || Math.abs(duration - recordedTiming.duration) < 2000);
    timing = usable ? recordedTiming : estimatedStarts(captions, duration);
    paint();
  }

  if (audio) {
    for (const event of ['timeupdate', 'seeked', 'ended']) audio.addEventListener(event, paint);
    const syncAudioButton = () => updatePhotoButton();
    for (const event of ['play', 'playing', 'pause', 'ended', 'error']) audio.addEventListener(event, syncAudioButton);
    for (const event of ['loadedmetadata', 'durationchange']) audio.addEventListener(event, refreshTiming);
    if (language === 'vi') {
      const slug = new URL(audio.src).pathname.split('/').at(-2);
      fetch(new URL('./visit-timings-vi.json', import.meta.url))
        .then(response => response.ok ? response.json() : null)
        .then(entries => { recordedTiming = entries?.[slug]; refreshTiming(); })
        .catch(() => {});
    }
  } else {
    const textTimer = window.setInterval(() => {
      const tick = performance.now();
      if (textPlaying && !story.hidden && !document.hidden) {
        elapsed = Math.min(timing.duration, elapsed + tick - lastTick);
        if (elapsed >= timing.duration) {
          textPlaying = false;
          updatePhotoButton();
        }
        paint();
      }
      lastTick = tick;
    }, 120);
    document.addEventListener('visibilitychange', () => { lastTick = performance.now(); });
    window.addEventListener('pagehide', event => {
      if (!event.persisted) window.clearInterval(textTimer);
    });
  }

  photoButton.addEventListener('click', () => {
    if (audio) {
      if (audioPlaying()) audio.pause();
      else playAudio();
    } else {
      if (elapsed >= timing.duration) elapsed = 0;
      textPlaying = !textPlaying;
      lastTick = performance.now();
      paint();
    }
    updatePhotoButton();
  });

  document.body.append(guide);
  article.hidden = true;
  document.body.classList.add('reader-guide');
  const layoutPages = installPageButtons(book, words);
  pdfButton.addEventListener('click', () => {
    const reading = book.hidden;
    story.hidden = reading;
    book.hidden = !reading;
    pdfButton.textContent = reading ? '‹' : 'PDF';
    pdfButton.setAttribute('aria-pressed', String(reading));
    pdfButton.setAttribute('aria-label', reading ? words.back : words.pdf);
    pdfButton.title = reading ? words.back : words.pdf;
    if (reading) layoutPages();
  });
  refreshTiming();
  if (audio && !audioPlaying()) playAudio();
  else updatePhotoButton();
  return true;
}
