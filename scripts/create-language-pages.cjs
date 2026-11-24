// Create missing language entry points without overwriting edited translations.
const fs = require('node:fs');
const path = require('node:path');

const pagesRoot = path.join(__dirname, '..', 'public', 'pages');
const languages = { vi: 'vi', en: 'en', kr: 'ko', fr: 'fr', cn: 'zh-Hans', jp: 'ja' };
let created = 0;
function visit(directory) {
  const entries = fs.readdirSync(directory, { withFileTypes: true });
  if (entries.some(entry => entry.isFile() && entry.name === 'index.html')) {
    const source = fs.readFileSync(path.join(directory, 'index.html'), 'utf8');
    for (const [suffix, lang] of Object.entries(languages)) {
      const destination = path.join(directory, `index_${suffix}.html`);
      const content = source.replace(/<html\s+lang=["'][^"']+["']/, `<html lang="${lang}"`);
      try { fs.writeFileSync(destination, content, { encoding: 'utf8', flag: 'wx' }); created++; }
      catch (error) { if (error.code !== 'EEXIST') throw error; }
    }
  }
  for (const entry of entries) if (entry.isDirectory()) visit(path.join(directory, entry.name));
}
visit(pagesRoot);
console.log(`Created ${created} language files.`);
