const briefModules = import.meta.glob('./content/market-briefs/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

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

function formatBriefDate(value) {
  if (!value) return '';
  const date = new Date(`${value}T12:00:00Z`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

export const MARKET_BRIEFS = Object.entries(briefModules)
  .filter(([path]) => !path.split('/').pop()?.startsWith('_'))
  .map(([path, raw]) => {
    const { data, body } = parseFrontmatter(raw);
    const filename = path.split('/').pop()?.replace(/\.md$/i, '') || '';
    const slug = data.slug || filename;
    const date = data.date || filename;
    return {
      slug,
      date,
      displayDate: data.displayDate || formatBriefDate(date),
      title: data.title || 'SLC Weekly Market Brief',
      issue: data.issue || data.number || '',
      excerpt: data.excerpt || '',
      body,
    };
  })
  .sort((a, b) => {
    // Sort by the actual calendar date, not the raw frontmatter string.
    // This keeps older briefs using "September 14, 2026" compatible with
    // newer ISO dates like "2026-09-21" and guarantees newest-first order.
    const aTime = Date.parse(a.date) || 0;
    const bTime = Date.parse(b.date) || 0;
    if (aTime !== bTime) return bTime - aTime;
    return String(b.slug).localeCompare(String(a.slug));
  });

export const LATEST_MARKET_BRIEF = MARKET_BRIEFS[0] || null;

export function getMarketBrief(slug) {
  return MARKET_BRIEFS.find((brief) => brief.slug === slug) || null;
}
