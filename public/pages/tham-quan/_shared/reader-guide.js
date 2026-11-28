const copy = {
  vi: { pdf: 'Đọc nội dung', back: 'Về phần thuyết minh', previous: 'Trước', next: 'Tiếp', pause: 'Tạm dừng', play: 'Phát', player: 'Điều khiển âm thanh', seek: 'Tua thời gian', rewind: 'Lùi 10 giây', forward: 'Tiến 10 giây', mute: 'Tắt tiếng', unmute: 'Bật tiếng' },
  en: { pdf: 'Read the article', back: 'Return to the audio guide', previous: 'Back', next: 'Next', pause: 'Pause', play: 'Play', player: 'Audio controls', seek: 'Seek audio', rewind: 'Back 10 seconds', forward: 'Forward 10 seconds', mute: 'Mute', unmute: 'Unmute' },
  fr: { pdf: 'Lire le texte', back: 'Revenir au guide audio', previous: 'Précédent', next: 'Suivant', pause: 'Mettre en pause', play: 'Lire', player: 'Contrôles audio', seek: 'Position de lecture', rewind: 'Reculer de 10 secondes', forward: 'Avancer de 10 secondes', mute: 'Couper le son', unmute: 'Réactiver le son' },
  ko: { pdf: '내용 읽기', back: '음성 안내로 돌아가기', previous: '이전', next: '다음', pause: '일시 정지', play: '재생', player: '오디오 제어', seek: '재생 위치', rewind: '10초 뒤로', forward: '10초 앞으로', mute: '음소거', unmute: '음소거 해제' },
  zh: { pdf: '阅读内容', back: '返回语音导览', previous: '上一页', next: '下一页', pause: '暂停', play: '播放', player: '音频控制', seek: '播放进度', rewind: '后退10秒', forward: '前进10秒', mute: '静音', unmute: '取消静音' },
  ja: { pdf: '解説を読む', back: '音声ガイドに戻る', previous: '前へ', next: '次へ', pause: '一時停止', play: '再生', player: '音声コントロール', seek: '再生位置', rewind: '10秒戻る', forward: '10秒進む', mute: 'ミュート', unmute: 'ミュート解除' },
};

const NO_END_WORDS = new Set([
  'của', 'và', 'với', 'trong', 'từ', 'đến', 'tới', 'về', 'tại', 'ở', 'trên', 'dưới', 'giữa', 'theo', 'như', 'là',
  'đã', 'đang', 'sẽ', 'được', 'bị', 'bằng', 'để', 'nhằm', 'cho', 'mà', 'nhưng', 'hay', 'hoặc', 'cùng', 'vì', 'nên',
  'nếu', 'tuy', 'khi', 'lúc', 'vẫn', 'cũng', 'chỉ', 'không', 'chưa', 'chẳng', 'rất', 'khá', 'còn', 'đều', 'vừa',
  'quá', 'những', 'các', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín', 'mười', 'mỗi', 'từng',
  'mọi', 'nhiều', 'ít', 'đầy', 'kiểu', 'dạng', 'bậc', 'vị', 'tấm', 'bức', 'bộ', 'đôi', 'chiếc', 'pho', 'khối',
  'hệ', 'lớp', 'mảng', 'sự', 'việc', 'nơi', 'tháng', 'ngày', 'thứ', 'bên', 'sau', 'trước', 'gần', 'làm', 'có',
  'mang', 'gồm', 'tạo', 'đặt', 'lập', 'dựng', 'dùng', 'lấy', 'gọi', 'xưng', 'đóng', 'mở', 'giữ', 'đưa', 'trao',
  'tạc', 'treo', 'đạt', 'gắn', 'hướng', 'trở', 'bước', 'đứng', 'tồn', 'phát', 'khởi', 'tôn', 'ca', 'ghi', 'gửi',
  'the', 'a', 'an', 'of', 'in', 'on', 'at', 'to', 'for', 'with', 'by', 'from', 'as', 'and', 'or', 'but', 'is',
  'are', 'was', 'were', 'be', 'been', 'has', 'have', 'had', 'that', 'which', 'who', 'this', 'these', 'those',
  'its', 'their', 'his', 'her', 'our', 'not', 'no', 'very', 'more', 'most', 'into', 'onto', 'upon', 'over',
  'under', 'between',
  'le', 'la', 'les', 'un', 'une', 'des', 'du', 'de', 'au', 'aux', 'en', 'dans', 'sur', 'sous', 'par', 'pour',
  'avec', 'sans', 'et', 'ou', 'mais', 'qui', 'que', 'ce', 'cet', 'cette', 'ces', 'son', 'sa', 'ses', 'leur',
  'leurs', 'ne', 'pas',
]);

const GOOD_BEFORE_WORDS = new Set([
  'và', 'nhưng', 'mà', 'với', 'của', 'trong', 'trên', 'dưới', 'tại', 'từ', 'đến', 'để', 'nhằm', 'khi', 'vì', 'nên',
  'như', 'bằng', 'theo', 'giữa', 'cùng', 'hay', 'hoặc', 'gồm', 'về', 'vừa', 'cũng', 'rồi', 'nơi', 'sau', 'trước',
  'là', 'đã', 'được', 'đồng', 'bên', 'đặc', 'tuy', 'qua', 'giúp',
  'and', 'but', 'or', 'with', 'from', 'into', 'for', 'that', 'which', 'where', 'when', 'while', 'because',
  'although', 'before', 'after', 'since', 'until', 'through', 'during', 'including', 'is', 'are', 'was', 'were',
  'et', 'mais', 'ou', 'avec', 'dans', 'pour', 'par', 'qui', 'que', 'où', 'dont', 'quand', 'car', 'avant', 'après',
]);

const NO_BEFORE_WORDS = new Set([
  'này', 'ấy', 'đó', 'kia', 'nay', 'xưa', 'hơn', 'nhất', 'nữa', 'cả',
]);

const TITLE_PREFIX = new Set([
  'vua', 'hoàng', 'thái', 'đền', 'chùa', 'phủ', 'đình', 'nhà', 'tòa', 'cầu', 'sông', 'núi', 'động', 'hồ', 'tỉnh',
  'huyện', 'xã', 'làng', 'thôn', 'châu', 'đất', 'vùng', 'triều', 'thời', 'chúa', 'bà', 'ông', 'đức', 'thánh',
  'bậc', 'tượng', 'bia', 'cổng', 'sân', 'cố', 'kinh', 'nước', 'bộ', 'thủ', 'tướng', 'nghi', 'long', 'phù', 'bái',
  'thiêu', 'chính', 'miếu', 'lăng', 'xưởng', 'cửa', 'trấn', 'tiền', 'hậu', 'nam', 'bắc', 'đông', 'tây', 'đại',
]);

const COHESIVE_PAIRS = new Set([
  'cố đô', 'kinh đô', 'trung ương', 'tập quyền', 'phong kiến', 'nhà nước', 'quốc gia', 'đất nước', 'nước ta',
  'dân tộc', 'nhân dân', 'thế kỷ', 'niên đại', 'lịch sử', 'văn hóa', 'văn bia', 'di tích', 'di sản', 'bảo vật',
  'hiện vật', 'quần thể', 'sự nghiệp', 'triều đại', 'cung điện', 'cung đình', 'độc lập', 'tự chủ', 'kiến trúc',
  'nghệ thuật', 'nghệ nhân', 'chạm khắc', 'chạm lộng', 'chạm nổi', 'chạm bong', 'điêu khắc', 'tinh xảo',
  'đặc sắc', 'tiêu biểu', 'độc đáo', 'truyền thống', 'tâm linh', 'tín ngưỡng', 'linh thiêng', 'uy quyền',
  'uy nghi', 'trang nghiêm', 'thành kính', 'long sàng', 'nghi môn', 'nhà bia', 'phù việt', 'phủ việt',
  'bái đường', 'thiêu hương', 'chính cung', 'hội ngộ', 'bội thu', 'vững chãi', 'uyển chuyển', 'tập trung',
  'đường nét', 'sửa soạn', 'chức năng', 'quân thành', 'chiến lược', 'kiên cố', 'công trình', 'không gian',
  'ngưỡng cửa', 'chân cột', 'hoa văn', 'thánh tượng', 'công đức', 'khí phách', 'thiên hạ', 'đồ thờ', 'lễ vật',
  'dâng cúng', 'sứ quân', 'hoàng đế', 'hoàng hậu', 'thái hậu', 'công chúa', 'hoàng tử', 'thứ sử', 'tướng quân',
  'niên hiệu', 'quốc hiệu', 'hát chèo', 'nông nghiệp', 'kinh tế', 'quân đội', 'bảo tồn', 'trưng bày',
  'đầu tiên', 'hào hùng', 'khởi đầu', 'kết cấu', 'trang trí', 'đề tài', 'đời sống', 'hình ảnh', 'hình tượng',
  'tác phẩm', 'giá trị', 'sáng tạo', 'kết hợp', 'tinh tế', 'gần gũi', 'hùng tráng', 'ngưỡng vọng', 'mập mạp',
  'sắc nhọn', 'phá cách', 'dân gian', 'con người', 'thô sơ', 'tuyệt mỹ', 'tối cao', 'sâu sắc', 'sông nước',
  'phân định', 'đời thường', 'lưu giữ', 'khẳng định', 'cộng đồng', 'mẫu tử', 'thượng võ', 'kiên cường',
  'hài hòa', 'tự hào', 'kính cẩn', 'anh hùng', 'hào kiệt', 'thống nhất', 'đào hào', 'triều nghi', 'nguy nga',
  'tráng lệ', 'bất khả', 'xâm phạm', 'giặc ngoài', 'thăng trầm', 'công lao', 'tưởng nhớ', 'tu bổ', 'tham quan',
  'thăm quan', 'chiêm bái', 'dấu tích', 'dấu ấn', 'huy hoàng', 'đa dạng', 'thờ tự', 'lăng tẩm', 'nổi tiếng',
  'trùng tu', 'phong cách', 'hiểm trở', 'tầm nhìn', 'xây dựng', 'kế tiếp', 'hiện nay', 'ngày nay', 'cho đến',
  'sau khi', 'trước khi', 'vì vậy', 'tuy nhiên', 'đặc biệt', 'bên cạnh', 'đồng thời', 'không chỉ', 'mà còn',
  'cũng như', 'từ đó', 'do đó', 'thông qua', 'trải qua', 'nhà vua', 'thủ tướng', 'chính phủ', 'quyết định',
  'công nhận', 'thể hiện', 'rõ nét', 'đạt đến', 'gắn liền', 'bàn tay', 'tên húy', 'nền móng', 'vùng đất',
  'thời kỳ', 'người việt', 'chính là', 'chủ đạo', 'làm nên', 'mỗi khi', 'hàng ngày', 'bên trái', 'bên phải',
  'về sau', 'kể từ', 'về mặt', 'ở đây', 'tại đây', 'nơi đây', 'từ bé', 'khéo léo', 'biến hóa', 'linh vật',
]);

const cleanToken = token => token.replace(/^["“‘'([«]+|["”’')\]».,!?:;…]+$/gu, '');
const endsSentence = (token, compact) => compact
  ? /[。！？；][”’」』）】]*$/u.test(token)
  : /[.!?…;][”’"')\]»]*$/u.test(token) && !/^(?:Mr|Mrs|Ms|Dr|St|Jr|Sr|vs|etc|e\.g|i\.e)\.$/i.test(token);

function splitIntoSentences(tokens, compact) {
  const sentences = [];
  let start = 0;
  for (let i = 0; i < tokens.length; i++) {
    if (endsSentence(tokens[i], compact)) {
      let end = i + 1;
      while (end < tokens.length && /^[”’"')\]»」』）】]+$/u.test(tokens[end])) end++;
      sentences.push({ start, end });
      start = end;
      i = end - 1;
    }
  }
  if (start < tokens.length) sentences.push({ start, end: tokens.length });
  return sentences;
}

function segmentSentence(tokens, offset, compact, separator) {
  const n = tokens.length;
  const prefLen = new Array(n + 1).fill(0);
  const parenDepth = new Array(n + 1).fill(0);
  const quoteDepth = new Array(n + 1).fill(0);
  let pDepth = 0;
  let qOpen = 0;
  for (let i = 0; i < n; i++) {
    prefLen[i + 1] = prefLen[i] + (i > 0 ? separator.length : 0) + tokens[i].length;
    for (const ch of tokens[i]) {
      if (ch === '(' || ch === '（' || ch === '[') pDepth++;
      else if (ch === ')' || ch === '）' || ch === ']') pDepth = Math.max(0, pDepth - 1);
      else if (ch === '“' || ch === '「' || ch === '『') qOpen++;
      else if (ch === '”' || ch === '」' || ch === '』') qOpen = Math.max(0, qOpen - 1);
    }
    parenDepth[i + 1] = pDepth;
    quoteDepth[i + 1] = qOpen;
  }
  const spanLen = (a, b) => prefLen[b] - prefLen[a] - (a > 0 ? separator.length : 0);
  const totalLen = spanLen(0, n);

  const singleMax = compact ? 36 : 92;
  if (totalLen <= singleMax) return [{ start: offset, end: offset + n }];

  const targetMax = compact ? 32 : 84;
  const hardMax = compact ? 40 : 96;
  const minChunk = compact ? 10 : 26;
  const slides = Math.max(2, Math.ceil(totalLen / targetMax));
  const ideal = totalLen / slides;

  function breakCost(b) {
    if (b >= n) return 0;
    const prev = tokens[b - 1];
    const next = tokens[b];
    if (compact) {
      if (/[，、：；,;:]$/u.test(prev)) return -75;
      if (/[”’」』）】]$/u.test(prev)) return -35;
      if (/[“‘「『（【]$/u.test(prev)) return 260;
      if (/^[，、。！？；：”’」』）】]/u.test(next)) return 300;
      return parenDepth[b] > 0 ? 120 : 0;
    }
    let cost = 0;
    const prevWord = cleanToken(prev);
    const nextWord = cleanToken(next);
    const prevClean = prevWord.toLowerCase();
    const nextClean = nextWord.toLowerCase();
    const prevEndsClause = /[,;:][”’"')\]»]*$/u.test(prev);
    const prevEndsParen = /[)\]»”"]$/u.test(prev) && !/^["“(\[]/u.test(prev);

    if (/[;:]$/u.test(prev)) cost -= 85;
    else if (prevEndsClause) cost -= 78;
    else if (prevEndsParen && parenDepth[b] === 0 && quoteDepth[b] === 0) cost -= 38;

    if (/^[-–—]+$/u.test(prev)) cost += 320;
    if (/^[-–—]+$/u.test(next)) {
      const afterDash = tokens[b + 1] || '';
      if (/^\p{Lu}/u.test(prevWord) && /^\p{Lu}/u.test(cleanToken(afterDash))) cost += 220;
      else cost -= 24;
    }

    if (/^[“‘"(\[]+$/u.test(prev) || (/^[“(\[]/u.test(prev) && !/[”)\]]$/u.test(prev))) cost += 240;
    if (parenDepth[b] > 0) cost += 145;
    if (quoteDepth[b] > 0 && !prevEndsClause) cost += 90;

    if (!prevEndsClause && GOOD_BEFORE_WORDS.has(nextClean)) cost -= 28;

    const prevIsCap = /^\p{Lu}/u.test(prevWord);
    const nextIsCap = /^\p{Lu}/u.test(nextWord);
    if (!prevEndsClause && !prevEndsParen && prevIsCap && nextIsCap) cost += 260;
    if (!prevEndsClause && TITLE_PREFIX.has(prevClean) && nextIsCap) cost += 220;

    if (!prevEndsClause && (/^\d/.test(nextClean) || /^[IVXLCDM]+$/.test(nextWord))) cost += 270;
    if (/^\d+$/.test(prevClean)) cost += 220;
    if (!prevEndsClause && !prevEndsParen && COHESIVE_PAIRS.has(`${prevClean} ${nextClean}`)) cost += 280;
    if (!prevEndsClause && !prevEndsParen && NO_END_WORDS.has(prevClean)) cost += 210;
    if (!prevEndsClause && !prevEndsParen && NO_BEFORE_WORDS.has(nextClean)) cost += 165;
    return cost;
  }

  const dp = new Array(n + 1).fill(Infinity);
  const prevIdx = new Array(n + 1).fill(-1);
  dp[0] = 0;

  for (let i = 0; i < n; i++) {
    if (!Number.isFinite(dp[i])) continue;
    for (let j = i + 1; j <= n; j++) {
      const len = spanLen(i, j);
      if (j > i + 1 && len > hardMax) break;
      const diff = (len - ideal) / ideal;
      let cost = diff * diff * 120;
      if (len > targetMax) cost += (len - targetMax) * (len - targetMax) * 0.7;
      if (len < minChunk) cost += 190 + (minChunk - len) * 14;
      cost += breakCost(j) + 24;
      if (dp[i] + cost < dp[j]) {
        dp[j] = dp[i] + cost;
        prevIdx[j] = i;
      }
    }
  }

  const lines = [];
  for (let cur = n; cur > 0; cur = prevIdx[cur]) {
    lines.push({ start: offset + prevIdx[cur], end: offset + cur });
  }
  return lines.reverse();
}

export function makeCaptions(paragraphs, language) {
  const compact = language === 'zh' || language === 'ja';
  const separator = compact ? '' : ' ';
  const words = [];
  const lines = [];
  for (const paragraph of paragraphs) {
    const text = paragraph.trim().replace(/\s+/gu, ' ');
    if (!text) continue;
    const tokens = compact ? Array.from(text) : text.split(' ');
    const base = words.length;
    words.push(...tokens);
    for (const sentence of splitIntoSentences(tokens, compact)) {
      lines.push(...segmentSentence(tokens.slice(sentence.start, sentence.end), base + sentence.start, compact, separator));
    }
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

const pdfBadgeIcon = `<span class="guide-pdf-inner" aria-hidden="true"><svg class="guide-pdf-svg" viewBox="0 0 24 26" fill="none"><path d="M5 2.5h9.2L19.5 7.8V22a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 22V4A1.5 1.5 0 0 1 5 2.5Z" stroke="#fce9bd" stroke-width="1.45" stroke-linejoin="round"/><path d="M14 2.7v4.3a1 1 0 0 0 1 1h4.3" stroke="#fce9bd" stroke-width="1.35" stroke-linejoin="round"/><text x="11.5" y="18.2" text-anchor="middle" fill="#fce9bd" font-size="6.3" font-weight="800" font-family="system-ui, sans-serif" letter-spacing="0.2">PDF</text></svg></span>`;
const pdfBackIcon = `<span class="guide-pdf-inner" aria-hidden="true"><svg class="guide-pdf-back-svg" viewBox="0 0 24 24" fill="none"><path d="M14.5 6.5 8.5 12l6 5.5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>`;

const audioPlayIcon = `<svg class="guide-audio-svg" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M8.5 5.8 18.8 12 8.5 18.2Z" fill="currentColor"/></svg>`;
const audioPauseIcon = `<svg class="guide-audio-svg" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="6.8" y="5.5" width="3.8" height="13" rx="1.2" fill="currentColor"/><rect x="13.4" y="5.5" width="3.8" height="13" rx="1.2" fill="currentColor"/></svg>`;
const audioRewindIcon = `<svg class="guide-audio-svg" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7.5 6.4A7.6 7.6 0 1 1 4.5 13" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M7.2 3.3 6.8 7l3.7.2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><text x="12" y="15.2" text-anchor="middle" fill="currentColor" font-size="7.4" font-weight="700" font-family="system-ui, sans-serif">10</text></svg>`;
const audioForwardIcon = `<svg class="guide-audio-svg" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M16.5 6.4A7.6 7.6 0 1 0 19.5 13" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M16.8 3.3 17.2 7l-3.7.2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><text x="12" y="15.2" text-anchor="middle" fill="currentColor" font-size="7.4" font-weight="700" font-family="system-ui, sans-serif">10</text></svg>`;
const audioSoundIcon = `<svg class="guide-audio-svg" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4.5 9.5h3.4l4.3-3.7v12.4l-4.3-3.7H4.5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1Z" fill="currentColor"/><path d="M15.4 9.2a4 4 0 0 1 0 5.6M17.8 6.8a7.4 7.4 0 0 1 0 10.4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`;
const audioMutedIcon = `<svg class="guide-audio-svg" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4.5 9.5h3.4l4.3-3.7v12.4l-4.3-3.7H4.5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1Z" fill="currentColor"/><path d="m15.5 9.3 5 5.4m0-5.4-5 5.4" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/></svg>`;

function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return '--:--';
  const total = Math.floor(seconds);
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const secs = total % 60;
  const pad = value => String(value).padStart(2, '0');
  return hours > 0 ? `${hours}:${pad(minutes)}:${pad(secs)}` : `${minutes}:${pad(secs)}`;
}

const headingFlourishSvg = `<div class="guide-heading-flourish" aria-hidden="true"><svg viewBox="0 0 220 16" fill="none"><defs><linearGradient id="guide-gold-line" x1="0" y1="8" x2="220" y2="8" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="#d89b3c" stop-opacity="0"/><stop offset="28%" stop-color="#d89b3c" stop-opacity="0.9"/><stop offset="50%" stop-color="#f2c464"/><stop offset="72%" stop-color="#d89b3c" stop-opacity="0.9"/><stop offset="100%" stop-color="#d89b3c" stop-opacity="0"/></linearGradient></defs><path d="M8 8h76M136 8h76" stroke="url(#guide-gold-line)" stroke-width="1.2" stroke-linecap="round"/><path d="M84 8c4.5 0 6.5-4.2 11-4.2 2.8 0 4.5 1.8 4.5 3.6 0 1.4-1 2.2-2.2 2.2-1.1 0-1.9-.7-1.9-1.6" stroke="#d89838" stroke-width="1.25" stroke-linecap="round"/><path d="M84 8c4.5 0 6.5 4.2 11 4.2 2.8 0 4.5-1.8 4.5-3.6" stroke="#d89838" stroke-width="1.1" stroke-linecap="round" opacity=".82"/><path d="M136 8c-4.5 0-6.5-4.2-11-4.2-2.8 0-4.5 1.8-4.5 3.6 0 1.4 1 2.2 2.2 2.2 1.1 0 1.9-.7 1.9-1.6" stroke="#d89838" stroke-width="1.25" stroke-linecap="round"/><path d="M136 8c-4.5 0-6.5 4.2-11 4.2-2.8 0-4.5-1.8-4.5-3.6" stroke="#d89838" stroke-width="1.1" stroke-linecap="round" opacity=".82"/><path d="M110 2.2 115.8 8 110 13.8 104.2 8Z" fill="#df9b36" stroke="#9e5f12" stroke-width="0.8"/><path d="M110 4.9 113.1 8 110 11.1 106.9 8Z" fill="#fde5a6"/><circle cx="77" cy="8" r="1.4" fill="#d89838"/><circle cx="143" cy="8" r="1.4" fill="#d89838"/></svg></div>`;

const frameCornersSvg = ['corner-tl', 'corner-tr', 'corner-bl', 'corner-br'].map(cls =>
  `<svg class="guide-frame-corner ${cls}" viewBox="0 0 48 48" fill="none" aria-hidden="true"><path d="M2.5 29V14C2.5 7.6 7.6 2.5 14 2.5h15L21.5 7c-2.5 0-4.5 2-4.5 4.5V13c0 2.2-1.8 4-4 4h-1.5C9 17 7 19 7 21.5Z" fill="rgba(96, 28, 14, 0.48)"/><path d="M2.5 30V14C2.5 7.6 7.6 2.5 14 2.5h16" stroke="#8f4f0a" stroke-width="3.2" stroke-linecap="round"/><path d="M2.5 30V14C2.5 7.6 7.6 2.5 14 2.5h16" stroke="#fde49d" stroke-width="1.5" stroke-linecap="round"/><path d="M7 43V21.5c0-2.5 2-4.5 4.5-4.5H13c2.2 0 4-1.8 4-4v-1.5c0-2.5 2-4.5 4.5-4.5H43" stroke="#854708" stroke-width="2.5" stroke-linecap="round"/><path d="M7 43V21.5c0-2.5 2-4.5 4.5-4.5H13c2.2 0 4-1.8 4-4v-1.5c0-2.5 2-4.5 4.5-4.5H43" stroke="#f7d37c" stroke-width="1.25" stroke-linecap="round"/><path d="M11.5 25.5c0-3 2.2-5 5-5 2.1 0 3.6 1.4 3.6 3.2 0 1.5-1.1 2.5-2.4 2.5-1 0-1.8-.7-1.8-1.6" stroke="#fce29c" stroke-width="1.35" stroke-linecap="round"/><path d="M25.5 11.5c-3 0-5 2.2-5 5 0 2.1 1.4 3.6 3.2 3.6 1.5 0 2.5-1.1 2.5-2.4 0-1-.7-1.8-1.6-1.8" stroke="#fce29c" stroke-width="1.35" stroke-linecap="round"/><circle cx="11.8" cy="11.8" r="2.4" fill="#df9b36" stroke="#fff0b8" stroke-width="1"/></svg>`
).join('');

const captionCurlsSvg = ['curl-tl', 'curl-tr', 'curl-bl', 'curl-br'].map(cls =>
  `<svg class="guide-caption-curl ${cls}" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M2.5 17V9.5c0-3.8 3.2-7 7-7H17" stroke="#d8a248" stroke-width="1.3" stroke-linecap="round"/><path d="M5.8 13.5c0-2.2 1.7-3.8 3.8-3.8 1.4 0 2.4.9 2.4 2.1 0 .9-.7 1.5-1.5 1.5" stroke="#dfb05c" stroke-width="1.1" stroke-linecap="round"/><circle cx="6.2" cy="6.2" r="1.2" fill="#d8a248"/></svg>`
).join('');

const waveSticksHtml = [3, 5, 7, 9, 11, 14, 11, 15, 17, 15, 11, 14, 11, 9, 7, 5, 3]
  .map((height, index) => `<span class="guide-wave-stick" style="--bar-h:${height}px;--bar-delay:${(Math.abs(index - 8) * 0.08).toFixed(2)}s"></span>`)
  .join('');

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
    if (document.activeElement === previous && previous.disabled && !next.disabled) next.focus?.();
    if (document.activeElement === next && next.disabled && !previous.disabled) previous.focus?.();
  }
  previous.textContent = `← ${words.previous}`;
  next.textContent = `${words.next} →`;
  function pulsePageTurn(direction) {
    if (!viewport.classList || window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches) return;
    const cls = direction > 0 ? 'is-turn-next' : 'is-turn-prev';
    viewport.classList.remove('is-turn-next', 'is-turn-prev');
    void viewport.offsetWidth;
    viewport.classList.add(cls);
  }
  previous.addEventListener('click', () => { page--; update(); pulsePageTurn(-1); });
  next.addEventListener('click', () => { page++; update(); pulsePageTurn(1); });
  flow.addEventListener('load', update, true);
  window.addEventListener('resize', update, { passive: true });
  if (typeof ResizeObserver !== 'undefined') new ResizeObserver(update).observe(viewport);
  document.fonts?.addEventListener('loadingdone', update);
  return update;
}

const slideMotions = ['kb-zoom-in', 'kb-pan-left', 'kb-pan-right', 'kb-zoom-out'];
const SLIDE_INTERVAL_MS = 10000;
const CUE_LEAD_MS = 180;

function normalizeCueText(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/[’‘`]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
}

export function resolveSlideCues(slides, captions, timing, language) {
  if (!Array.isArray(slides) || !slides.length) return null;
  const hasCueData = slides.some(item => item && (item.cue || Number.isFinite(item.at)));
  if (!hasCueData) return null;

  const words = captions?.words || [];
  const starts = timing?.starts || [];
  const duration = Number.isFinite(timing?.duration) && timing.duration > 0
    ? timing.duration
    : slides.length * SLIDE_INTERVAL_MS;
  const sep = captions?.separator ?? ' ';

  let fullText = '';
  const charToWord = [];
  for (let i = 0; i < words.length; i++) {
    if (i > 0 && sep) {
      fullText += sep;
      for (let k = 0; k < sep.length; k++) charToWord.push(i);
    }
    const piece = normalizeCueText(words[i]);
    fullText += piece;
    for (let k = 0; k < piece.length; k++) charToWord.push(i);
  }

  let cursor = 0;
  let prevMs = 0;
  const times = slides.map((slide, index) => {
    if (index === 0) return 0;
    let matchedMs = null;
    const rawCue = typeof slide?.cue === 'string' ? slide.cue : slide?.cue?.[language];
    if (rawCue && fullText) {
      const needle = normalizeCueText(rawCue);
      if (needle) {
        let pos = fullText.indexOf(needle, cursor);
        if (pos < 0) pos = fullText.indexOf(needle);
        if (pos >= 0) {
          cursor = Math.max(cursor, pos + needle.length);
          const wordIdx = charToWord[pos];
          if (wordIdx !== undefined && Number.isFinite(starts[wordIdx])) {
            matchedMs = Math.max(0, starts[wordIdx] - CUE_LEAD_MS);
          }
        }
      }
    }
    if (matchedMs === null) {
      const ratio = Number.isFinite(slide?.at) ? Math.max(0, Math.min(0.99, slide.at)) : index / slides.length;
      matchedMs = Math.max(0, ratio * duration - CUE_LEAD_MS);
    }
    const timeMs = Math.max(prevMs + 250, matchedMs);
    prevMs = timeMs;
    return timeMs;
  });

  return times.map((timeMs, index) => {
    const prevGap = index > 0 ? timeMs - times[index - 1] : Infinity;
    const nextGap = index + 1 < times.length ? times[index + 1] - timeMs : Infinity;
    return { timeMs, quick: index > 0 && (prevGap < 4000 || nextGap < 4000) };
  });
}

export function slideIndexAt(slides, resolvedCues, timeMs, intervalMs = SLIDE_INTERVAL_MS) {
  if (!Array.isArray(slides) || slides.length <= 1) return 0;
  const t = Math.max(0, Number.isFinite(timeMs) ? timeMs : 0);
  if (Array.isArray(resolvedCues) && resolvedCues.length === slides.length) {
    let active = 0;
    for (let i = 1; i < resolvedCues.length; i++) {
      if (t >= resolvedCues[i].timeMs) active = i;
      else break;
    }
    return active;
  }
  return Math.floor(t / intervalMs) % slides.length;
}

function normalizeAssetUrl(src) {
  if (!src) return '';
  try { return new URL(src, location.href).href; }
  catch { return src; }
}

function collectArticleSlides(article, leadPhoto) {
  const slides = [];
  const seen = new Set();
  const add = (img, fallbackPos = 'center 45%') => {
    const raw = img?.getAttribute?.('src') || img?.src;
    if (!raw) return;
    const key = normalizeAssetUrl(raw);
    if (seen.has(key)) return;
    seen.add(key);
    const portrait = Boolean(img.closest?.('.reader-figure-portrait'))
      || (Number(img.getAttribute?.('height')) > Number(img.getAttribute?.('width')));
    slides.push({ src: raw, pos: portrait ? 'center 22%' : fallbackPos });
  };
  add(leadPhoto, 'center 45%');
  for (const img of article.querySelectorAll?.('.reader-figure img') || []) add(img);
  return { slides, seen };
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
  const { slides, seen: seenSlides } = collectArticleSlides(article, photo);
  const guide = document.createElement('main');
  guide.className = 'reader-experience';
  guide.setAttribute?.('data-mode', 'story');
  guide.innerHTML = `
    <header class="guide-view-heading">
      <h1></h1>
      ${headingFlourishSvg}
      <button type="button" class="guide-pdf-button" aria-controls="guide-reading-view" aria-pressed="false">${pdfBadgeIcon}</button>
    </header>
    <section class="guide-story-view" data-playing="false">
      <button type="button" class="guide-story-photo">
        ${frameCornersSvg}
        <span class="guide-photo-viewport">
          <span class="guide-slide-stack" aria-hidden="true"></span>
          <span class="guide-photo-play" aria-hidden="true">▶</span>
          <span class="guide-slide-label" aria-hidden="true" hidden></span>
          <span class="guide-slide-dots" aria-hidden="true" hidden></span>
        </span>
      </button>
      <div class="guide-caption-card">
        ${captionCurlsSvg}
        <div class="guide-caption-body">
          <p class="guide-caption-line"><span class="guide-caption-read"></span><span class="guide-caption-rest"></span></p>
        </div>
        <div class="guide-waveform-bar" aria-hidden="true">
          <span class="guide-wave-dots"></span>
          <span class="guide-wave-eq">${waveSticksHtml}</span>
          <span class="guide-wave-dots"></span>
        </div>
      </div>
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
      <div class="guide-reading-player" role="group" hidden>
        <button type="button" class="guide-audio-toggle">${audioPlayIcon}</button>
        <button type="button" class="guide-audio-skip" data-skip="-10">${audioRewindIcon}</button>
        <div class="guide-audio-track">
          <div class="guide-audio-times">
            <span class="guide-audio-current">0:00</span>
            <span class="guide-audio-duration">--:--</span>
          </div>
          <input type="range" class="guide-audio-seek" min="0" max="100" step="0.1" value="0" disabled>
        </div>
        <button type="button" class="guide-audio-skip" data-skip="10">${audioForwardIcon}</button>
        <button type="button" class="guide-audio-mute" aria-pressed="false">${audioSoundIcon}</button>
      </div>
    </section>`;

  const pdfButton = guide.querySelector('.guide-pdf-button');
  const story = guide.querySelector('.guide-story-view');
  const photoButton = guide.querySelector('.guide-story-photo');
  const photoViewport = photoButton.querySelector?.('.guide-photo-viewport') || photoButton;
  const slideStack = photoButton.querySelector?.('.guide-slide-stack') || null;
  const slideLabel = photoButton.querySelector?.('.guide-slide-label') || null;
  const slideDots = photoButton.querySelector?.('.guide-slide-dots') || null;
  const captionCard = guide.querySelector('.guide-caption-card');
  const book = guide.querySelector('.guide-reading-view');
  const readingPlayer = book.querySelector?.('.guide-reading-player') || null;
  const audioToggleBtn = readingPlayer?.querySelector?.('.guide-audio-toggle') || null;
  const audioRewindBtn = readingPlayer?.querySelector?.('[data-skip="-10"]') || null;
  const audioForwardBtn = readingPlayer?.querySelector?.('[data-skip="10"]') || null;
  const audioSeek = readingPlayer?.querySelector?.('.guide-audio-seek') || null;
  const audioCurrentEl = readingPlayer?.querySelector?.('.guide-audio-current') || null;
  const audioDurationEl = readingPlayer?.querySelector?.('.guide-audio-duration') || null;
  const audioMuteBtn = readingPlayer?.querySelector?.('.guide-audio-mute') || null;
  const read = guide.querySelector('.guide-caption-read');
  const remaining = guide.querySelector('.guide-caption-rest');
  guide.querySelector('h1').textContent = title.textContent;
  pdfButton.setAttribute('aria-label', words.pdf);
  pdfButton.title = words.pdf;
  const hero = photo.cloneNode(false);
  hero.loading = 'eager';
  if (slides[0]?.pos && hero.style) hero.style.objectPosition = slides[0].pos;
  if (slideStack && typeof document.createElement === 'function') {
    const initialLayer = document.createElement('span');
    initialLayer.className = `guide-slide-layer is-current is-initial ${slideMotions[0]}`;
    initialLayer.append(hero);
    slideStack.append(initialLayer);
  } else {
    photoViewport.append(hero);
  }
  const flow = book.querySelector('.guide-page-flow');
  flow.append(lead.cloneNode(true), prose.cloneNode(true));

  let currentSlide = 0;
  let pendingSlide = -1;
  let slideOffset = 0;
  let slideToken = 0;
  let cueMode = false;
  let resolvedCues = null;
  const preloaded = new Set(slides[0]?.src ? [normalizeAssetUrl(slides[0].src)] : []);

  function slideLabelText(index) {
    const item = slides[index];
    if (!item?.label) return '';
    return typeof item.label === 'string' ? item.label : (item.label[language] || item.label.vi || '');
  }

  function updateSlideLabel(index) {
    if (!slideLabel) return;
    const text = slideLabelText(index);
    slideLabel.hidden = !text;
    if (slideLabel.textContent !== text) slideLabel.textContent = text;
  }

  function preloadSlide(index) {
    if (typeof Image === 'undefined' || !slides.length) return;
    const item = slides[(index + slides.length) % slides.length];
    if (!item?.src) return;
    const key = normalizeAssetUrl(item.src);
    if (preloaded.has(key)) return;
    preloaded.add(key);
    const loader = new Image();
    loader.decoding = 'async';
    loader.src = item.src;
  }

  function renderSlideDots() {
    if (!slideDots) return;
    if (slides.length <= 1) {
      slideDots.hidden = true;
      slideDots.innerHTML = '';
      return;
    }
    slideDots.hidden = false;
    if (slides.length <= 10) {
      slideDots.innerHTML = slides
        .map((_, i) => `<span class="guide-slide-dot${i === currentSlide ? ' is-active' : ''}"></span>`)
        .join('');
    } else {
      const pct = ((currentSlide + 1) / slides.length * 100).toFixed(1);
      slideDots.innerHTML = `<span class="guide-slide-bar"><span class="guide-slide-fill" style="width:${pct}%"></span></span><span class="guide-slide-count">${currentSlide + 1} / ${slides.length}</span>`;
    }
  }

  function updateActiveDot(index) {
    if (!slideDots || slideDots.hidden) return;
    if (slides.length <= 10) {
      const dots = slideDots.querySelectorAll?.('.guide-slide-dot') || [];
      dots.forEach((dot, i) => dot.classList?.toggle('is-active', i === index));
    } else {
      const fill = slideDots.querySelector?.('.guide-slide-fill');
      const count = slideDots.querySelector?.('.guide-slide-count');
      if (fill?.style) fill.style.width = `${((index + 1) / slides.length * 100).toFixed(1)}%`;
      if (count) count.textContent = `${index + 1} / ${slides.length}`;
    }
  }

  function showSlide(targetIndex, { quick = false } = {}) {
    if (!slideStack || slides.length <= 1) return;
    const nextIndex = ((targetIndex % slides.length) + slides.length) % slides.length;
    if (nextIndex === currentSlide || nextIndex === pendingSlide) return;
    const slide = slides[nextIndex];
    if (!slide?.src) return;
    pendingSlide = nextIndex;
    const myToken = ++slideToken;
    const img = document.createElement('img');
    img.alt = '';
    img.decoding = 'async';
    if (slide.pos && img.style) img.style.objectPosition = slide.pos;
    let committed = false;
    const commit = () => {
      if (committed || myToken !== slideToken) return;
      committed = true;
      pendingSlide = -1;
      const layer = document.createElement('span');
      layer.className = `guide-slide-layer is-current${quick ? ' is-quick' : ''} ${slideMotions[nextIndex % slideMotions.length]}`;
      layer.append(img);
      const oldLayers = [...(slideStack.querySelectorAll?.('.guide-slide-layer') || [])];
      for (const old of oldLayers) {
        if (old.classList?.contains('is-prev')) old.remove();
        else if (old.classList?.contains('is-current')) {
          old.classList.remove('is-current');
          old.classList.add('is-prev');
        }
      }
      slideStack.append(layer);
      currentSlide = nextIndex;
      updateActiveDot(nextIndex);
      updateSlideLabel(nextIndex);
      preloadSlide(nextIndex + 1);
      preloadSlide(nextIndex + 2);
      if (cueMode) {
        preloadSlide(nextIndex + 3);
        preloadSlide(nextIndex + 4);
      }
    };
    img.addEventListener('load', commit, { once: true });
    img.addEventListener('error', () => { if (myToken === slideToken) pendingSlide = -1; }, { once: true });
    img.src = slide.src;
    if (img.complete && img.naturalWidth > 0) commit();
  }

  renderSlideDots();
  updateSlideLabel(0);
  preloadSlide(1);
  preloadSlide(2);

  const pathMatch = (typeof location !== 'undefined' && location?.pathname || '').match(/\/pages\/tham-quan\/([^/?#]+)(?:\/|$)/);
  const srcMatch = (audio?.src || '').match(/\/pages\/tham-quan\/([^/?#]+)(?:\/|$)/);
  const topicSlug = pathMatch?.[1] || srcMatch?.[1] || '';
  if (topicSlug && typeof fetch === 'function') {
    try {
      fetch(new URL('./visit-gallery.json?v=2', import.meta.url))
        .then(response => response.ok ? response.json() : null)
        .then(gallery => {
          const entry = gallery?.[topicSlug];
          if (entry && !Array.isArray(entry) && entry.mode === 'cues' && Array.isArray(entry.slides) && entry.slides.length) {
            slides.length = 0;
            seenSlides.clear();
            for (const item of entry.slides) {
              if (!item?.src) continue;
              slides.push({
                src: item.src,
                pos: item.pos || 'center 45%',
                at: item.at,
                cue: item.cue || null,
                label: item.label || null,
              });
            }
            cueMode = true;
            resolvedCues = resolveSlideCues(slides, captions, timing, language);
            if (slides[0]?.src && normalizeAssetUrl(slides[0].src) !== normalizeAssetUrl(hero.getAttribute?.('src') || hero.src)) {
              hero.src = slides[0].src;
              if (slides[0].pos && hero.style) hero.style.objectPosition = slides[0].pos;
              preloaded.add(normalizeAssetUrl(slides[0].src));
            }
            renderSlideDots();
            updateSlideLabel(currentSlide);
            // Preload storyboard slides in background so quick landmark transitions have zero lag
            for (let i = 1; i < slides.length; i++) preloadSlide(i);
            syncCuePoller();
            paint();
            return;
          }
          const extras = Array.isArray(entry) ? entry : null;
          if (!extras || !extras.length) return;
          let added = false;
          for (const item of extras) {
            const src = typeof item === 'string' ? item : item?.src;
            if (!src) continue;
            const key = normalizeAssetUrl(src);
            if (seenSlides.has(key)) continue;
            seenSlides.add(key);
            slides.push({ src, pos: (typeof item === 'object' && item.pos) || 'center 45%' });
            added = true;
          }
          if (added) {
            renderSlideDots();
            preloadSlide(currentSlide + 1);
            paint();
          }
        })
        .catch(() => {});
    } catch { /* gallery unavailable */ }
  }

  let recordedTiming;
  let timing = estimatedStarts(captions);
  let elapsed = 0;
  let lastTick = performance.now();
  let textPlaying = !audio && !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  const audioPlaying = () => audio && !audio.paused && !audio.ended && !audio.error;
  const audioDuration = () => (audio && Number.isFinite(audio.duration) && audio.duration > 0 ? audio.duration : 0);
  let lastPlayerPlaying = null;
  let lastPlayerMuted = null;

  function syncReadingPlayer() {
    if (!audio || !readingPlayer) return;
    const playing = Boolean(audioPlaying());
    const muted = Boolean(audio.muted || audio.volume === 0);
    const duration = audioDuration();
    const current = Number.isFinite(audio.currentTime) && audio.currentTime >= 0 ? audio.currentTime : 0;

    if (audioToggleBtn && lastPlayerPlaying !== playing) {
      lastPlayerPlaying = playing;
      const playLabel = playing ? words.pause : words.play;
      audioToggleBtn.innerHTML = playing ? audioPauseIcon : audioPlayIcon;
      audioToggleBtn.setAttribute('aria-label', playLabel);
      audioToggleBtn.setAttribute('data-playing', String(playing));
      audioToggleBtn.title = playLabel;
    }
    if (audioMuteBtn && lastPlayerMuted !== muted) {
      lastPlayerMuted = muted;
      const muteLabel = muted ? words.unmute : words.mute;
      audioMuteBtn.innerHTML = muted ? audioMutedIcon : audioSoundIcon;
      audioMuteBtn.setAttribute('aria-pressed', String(muted));
      audioMuteBtn.setAttribute('aria-label', muteLabel);
      audioMuteBtn.title = muteLabel;
    }
    if (audioCurrentEl) {
      const text = formatTime(current);
      if (audioCurrentEl.textContent !== text) audioCurrentEl.textContent = text;
    }
    if (audioDurationEl) {
      const text = duration ? formatTime(duration) : '--:--';
      if (audioDurationEl.textContent !== text) audioDurationEl.textContent = text;
    }
    if (audioSeek) {
      if (duration) {
        const clamped = Math.max(0, Math.min(duration, current));
        audioSeek.disabled = false;
        audioSeek.max = String(duration);
        audioSeek.value = String(clamped);
        audioSeek.style?.setProperty?.('--progress', `${(clamped / duration * 100).toFixed(2)}%`);
        audioSeek.setAttribute?.('aria-valuetext', `${formatTime(clamped)} / ${formatTime(duration)}`);
      } else {
        audioSeek.disabled = true;
        audioSeek.max = '100';
        audioSeek.value = '0';
        audioSeek.style?.setProperty?.('--progress', '0%');
        audioSeek.removeAttribute?.('aria-valuetext');
      }
    }
  }

  function skipAudio(delta) {
    if (!audio) return;
    const duration = audioDuration();
    const base = Number.isFinite(audio.currentTime) ? audio.currentTime : 0;
    const next = duration ? Math.max(0, Math.min(duration, base + delta)) : Math.max(0, base + delta);
    audio.currentTime = next;
    slideOffset = 0;
    paint();
  }

  let cuePollerId = null;
  function syncCuePoller() {
    if (!audio) return;
    const needPoll = cueMode && Boolean(audioPlaying());
    if (needPoll && cuePollerId === null && typeof window.setInterval === 'function') {
      cuePollerId = window.setInterval(paint, 100);
    } else if (!needPoll && cuePollerId !== null) {
      window.clearInterval?.(cuePollerId);
      cuePollerId = null;
    }
  }

  function updatePhotoButton() {
    const playing = audio ? audioPlaying() : textPlaying;
    const label = playing ? words.pause : words.play;
    photoButton.setAttribute('data-playing', String(playing));
    story.setAttribute?.('data-playing', String(playing));
    photoButton.setAttribute('aria-label', label);
    photoButton.title = label;
    syncReadingPlayer();
    syncCuePoller();
  }
  function playAudio() {
    if (audio.error) audio.load();
    if (audio.ended) audio.currentTime = 0;
    audio.play()?.catch(updatePhotoButton);
    updatePhotoButton();
  }
  function togglePlayback() {
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
  }

  function syncSlide(time) {
    if (slides.length <= 1) return;
    const baseIndex = slideIndexAt(slides, resolvedCues, time, SLIDE_INTERVAL_MS);
    const target = ((baseIndex + slideOffset) % slides.length + slides.length) % slides.length;
    const quick = Boolean(resolvedCues?.[target]?.quick);
    showSlide(target, { quick });
  }

  function paint() {
    const time = audio ? audio.currentTime * 1000 : elapsed;
    const line = captionAt(captions, timing.starts, time);
    if (read.textContent !== line.read) read.textContent = line.read;
    if (remaining.textContent !== line.remaining) remaining.textContent = line.remaining;
    syncSlide(time);
    syncReadingPlayer();
  }

  function refreshTiming() {
    const duration = audio?.duration * 1000;
    const usable = recordedTiming && recordedTiming.starts?.length === captions.words.length
      && (!duration || Math.abs(duration - recordedTiming.duration) < 2000);
    timing = usable ? recordedTiming : estimatedStarts(captions, duration);
    if (cueMode) {
      resolvedCues = resolveSlideCues(slides, captions, timing, language);
    }
    paint();
  }

  if (audio) {
    audio.preload = 'metadata';
    for (const event of ['timeupdate', 'seeked', 'ended']) audio.addEventListener(event, paint);
    audio.addEventListener('seeked', () => { slideOffset = 0; paint(); });
    const syncAudioButton = () => updatePhotoButton();
    for (const event of ['play', 'playing', 'pause', 'ended', 'error']) audio.addEventListener(event, syncAudioButton);
    for (const event of ['loadedmetadata', 'durationchange']) audio.addEventListener(event, refreshTiming);
    audio.addEventListener('volumechange', syncReadingPlayer);
    window.addEventListener('pagehide', () => {
      if (cuePollerId !== null) {
        window.clearInterval?.(cuePollerId);
        cuePollerId = null;
      }
    });
    if (readingPlayer) {
      readingPlayer.hidden = false;
      readingPlayer.setAttribute?.('aria-label', words.player);
      audioToggleBtn?.addEventListener('click', togglePlayback);
      if (audioRewindBtn) {
        audioRewindBtn.setAttribute('aria-label', words.rewind);
        audioRewindBtn.title = words.rewind;
        audioRewindBtn.addEventListener('click', () => skipAudio(-10));
      }
      if (audioForwardBtn) {
        audioForwardBtn.setAttribute('aria-label', words.forward);
        audioForwardBtn.title = words.forward;
        audioForwardBtn.addEventListener('click', () => skipAudio(10));
      }
      if (audioSeek) {
        audioSeek.setAttribute('aria-label', words.seek);
        audioSeek.addEventListener('input', () => {
          const duration = audioDuration();
          if (!duration) return;
          const target = Math.max(0, Math.min(duration, Number(audioSeek.value) || 0));
          audio.currentTime = target;
          slideOffset = 0;
          paint();
        });
      }
      if (audioMuteBtn) {
        audioMuteBtn.addEventListener('click', () => {
          if (audio.muted || audio.volume === 0) {
            audio.muted = false;
            if (audio.volume === 0) audio.volume = 1;
          } else {
            audio.muted = true;
          }
          syncReadingPlayer();
        });
      }
      syncReadingPlayer();
    }
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

  let touchStartX = null;
  let suppressClick = false;
  photoButton.addEventListener('touchstart', event => {
    if (event.touches?.length === 1) touchStartX = event.touches[0].clientX;
  }, { passive: true });
  photoButton.addEventListener('touchend', event => {
    if (touchStartX === null || !event.changedTouches?.length) return;
    const dx = event.changedTouches[0].clientX - touchStartX;
    touchStartX = null;
    if (Math.abs(dx) >= 42 && slides.length > 1) {
      slideOffset += dx < 0 ? 1 : -1;
      suppressClick = true;
      paint();
      window.setTimeout(() => { suppressClick = false; }, 250);
    }
  }, { passive: true });

  photoButton.addEventListener('click', () => {
    if (suppressClick) return;
    togglePlayback();
  });
  captionCard?.addEventListener('click', togglePlayback);
  guide.addEventListener?.('pointerdown', (event) => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches) return;
    const btn = event.target?.closest?.('.guide-page-buttons button, .guide-reading-player button, .guide-pdf-button');
    if (!btn || btn.disabled) return;
    const rect = btn.getBoundingClientRect?.();
    if (!rect || !rect.width) return;
    const size = Math.max(rect.width, rect.height) * 1.6;
    const wave = document.createElement('span');
    wave.className = 'guide-tap-ripple';
    if (wave.style) {
      wave.style.width = `${size}px`;
      wave.style.height = `${size}px`;
      wave.style.left = `${event.clientX - rect.left - size / 2}px`;
      wave.style.top = `${event.clientY - rect.top - size / 2}px`;
    }
    if (typeof getComputedStyle === 'function' && getComputedStyle(btn).position === 'static') {
      btn.classList?.add('has-tap-ripple-rel');
    }
    btn.classList?.add('has-tap-ripple');
    btn.append?.(wave);
    const remove = () => wave.remove?.();
    wave.addEventListener?.('animationend', remove, { once: true });
    window.setTimeout?.(remove, 480);
  }, { passive: true });

  document.body.append(guide);
  article.hidden = true;
  document.body.classList.add('reader-guide');
  const layoutPages = installPageButtons(book, words);
  pdfButton.addEventListener('click', () => {
    const reading = book.hidden;
    story.hidden = reading;
    book.hidden = !reading;
    guide.setAttribute?.('data-mode', reading ? 'reading' : 'story');
    pdfButton.innerHTML = reading ? pdfBackIcon : pdfBadgeIcon;
    pdfButton.setAttribute('aria-pressed', String(reading));
    pdfButton.setAttribute('aria-label', reading ? words.back : words.pdf);
    pdfButton.title = reading ? words.back : words.pdf;
    if (reading) {
      syncReadingPlayer();
      layoutPages();
    }
  });
  refreshTiming();
  if (audio && !audioPlaying()) playAudio();
  else updatePhotoButton();
  return true;
}
