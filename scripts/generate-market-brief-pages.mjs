import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const briefsDir = path.join(root, 'src', 'content', 'market-briefs');
const distDir = path.join(root, 'dist');
const baseIndexPath = path.join(distDir, 'index.html');
const siteUrl = 'https://www.slcblackledger.org';
const previewImage = `${siteUrl}/assets/slc-banner-2026.webp`;

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function parseFrontmatter(raw = '') {
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
  if (!match) return { data: {}, body: raw };

  const data = {};
  for (const line of match[1].split('\n')) {
    const separator = line.indexOf(':');
    if (separator === -1) continue;
    const key = line.slice(0, separator).trim();
    let value = line.slice(separator + 1).trim();
    value = value.replace(/^['"]|['"]$/g, '');
    data[key] = value;
  }
  return { data, body: match[2].trim() };
}

function setTitle(html, value) {
  return html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(value)}</title>`);
}

function setMeta(html, selector, value) {
  const escaped = escapeHtml(value);
  const isProperty = selector.startsWith('og:') || selector.startsWith('article:');
  const attr = isProperty ? 'property' : 'name';
  const pattern = new RegExp(`<meta\\s+${attr}=["']${selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["']\\s+content=["'][^"']*["']\\s*\\/?>`, 'i');
  const replacement = `<meta ${attr}="${selector}" content="${escaped}" />`;

  if (pattern.test(html)) return html.replace(pattern, replacement);
  return html.replace('</head>', `    ${replacement}\n  </head>`);
}

function setCanonical(html, value) {
  const escaped = escapeHtml(value);
  const pattern = /<link\s+rel=["']canonical["']\s+href=["'][^"']*["']\s*\/?>/i;
  const replacement = `<link rel="canonical" href="${escaped}" />`;
  if (pattern.test(html)) return html.replace(pattern, replacement);
  return html.replace('</head>', `    ${replacement}\n  </head>`);
}

if (!fs.existsSync(baseIndexPath)) {
  throw new Error('dist/index.html does not exist. Run Vite build first.');
}

const baseHtml = fs.readFileSync(baseIndexPath, 'utf8');
const files = fs.readdirSync(briefsDir)
  .filter((name) => name.endsWith('.md') && !name.startsWith('_'));

for (const filename of files) {
  const raw = fs.readFileSync(path.join(briefsDir, filename), 'utf8');
  const { data } = parseFrontmatter(raw);
  const fallbackSlug = filename.replace(/\.md$/i, '');
  const slug = data.slug || fallbackSlug;
  const displayDate = data.displayDate || data.date || slug;
  const articleTitle = `SLC Weekly Market Brief — ${displayDate}`;
  const description = data.excerpt || 'The weekly SLC overview of the Solana memecoin market, what changed, and what matters next.';
  const canonicalUrl = `${siteUrl}/market-briefs/${slug}`;

  let html = baseHtml;
  html = setTitle(html, articleTitle);
  html = setCanonical(html, canonicalUrl);
  html = setMeta(html, 'description', description);
  html = setMeta(html, 'og:type', 'article');
  html = setMeta(html, 'og:title', articleTitle);
  html = setMeta(html, 'og:description', description);
  html = setMeta(html, 'og:url', canonicalUrl);
  html = setMeta(html, 'og:image', previewImage);
  html = setMeta(html, 'twitter:card', 'summary_large_image');
  html = setMeta(html, 'twitter:title', articleTitle);
  html = setMeta(html, 'twitter:description', description);
  html = setMeta(html, 'twitter:image', previewImage);
  html = setMeta(html, 'article:published_time', data.date || slug);

  const outputDir = path.join(distDir, 'market-briefs', slug);
  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(path.join(outputDir, 'index.html'), html, 'utf8');
  console.log(`Generated social preview page: /market-briefs/${slug}`);
}
