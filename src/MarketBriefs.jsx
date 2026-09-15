import React from 'react';
import { ArrowLeft, ArrowRight, CalendarDays, Clock3, Newspaper, Radar } from 'lucide-react';
import { MARKET_BRIEFS } from './marketBriefs';

const LOGO_IMG = '/assets/slc-logo.webp';

const shell = 'relative z-10 mx-auto w-full max-w-5xl px-5 sm:px-7 lg:px-8';

function renderInline(text, keyPrefix = 'i') {
  const pattern = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\(https?:\/\/[^)]+\))/g;
  const parts = String(text || '').split(pattern).filter(Boolean);

  return parts.map((part, index) => {
    const key = `${keyPrefix}-${index}`;
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={key}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={key}>{part.slice(1, -1)}</code>;
    }
    const link = part.match(/^\[([^\]]+)\]\((https?:\/\/[^)]+)\)$/);
    if (link) {
      return <a key={key} href={link[2]} target="_blank" rel="noopener noreferrer">{link[1]}</a>;
    }
    return <React.Fragment key={key}>{part}</React.Fragment>;
  });
}

function MarkdownBody({ source }) {
  const lines = String(source || '').replace(/\r\n/g, '\n').split('\n');
  const nodes = [];
  let paragraph = [];
  let list = [];
  let listType = null;

  const flushParagraph = () => {
    if (!paragraph.length) return;
    const text = paragraph.join(' ').trim();
    if (text) nodes.push(<p key={`p-${nodes.length}`}>{renderInline(text, `p-${nodes.length}`)}</p>);
    paragraph = [];
  };

  const flushList = () => {
    if (!list.length) return;
    const Tag = listType === 'ol' ? 'ol' : 'ul';
    nodes.push(
      <Tag key={`l-${nodes.length}`}>
        {list.map((item, index) => <li key={index}>{renderInline(item, `l-${nodes.length}-${index}`)}</li>)}
      </Tag>
    );
    list = [];
    listType = null;
  };

  lines.forEach((rawLine) => {
    const line = rawLine.trim();
    if (!line) {
      flushParagraph();
      flushList();
      return;
    }

    const heading = line.match(/^(#{1,3})\s+(.+)$/);
    if (heading) {
      flushParagraph();
      flushList();
      const level = heading[1].length;
      const Tag = level === 1 ? 'h1' : level === 2 ? 'h2' : 'h3';
      nodes.push(<Tag key={`h-${nodes.length}`}>{renderInline(heading[2], `h-${nodes.length}`)}</Tag>);
      return;
    }

    if (/^---+$/.test(line)) {
      flushParagraph();
      flushList();
      nodes.push(<hr key={`hr-${nodes.length}`} />);
      return;
    }

    if (line.startsWith('> ')) {
      flushParagraph();
      flushList();
      nodes.push(<blockquote key={`q-${nodes.length}`}>{renderInline(line.slice(2), `q-${nodes.length}`)}</blockquote>);
      return;
    }

    const unordered = line.match(/^[-*]\s+(.+)$/);
    if (unordered) {
      flushParagraph();
      if (listType && listType !== 'ul') flushList();
      listType = 'ul';
      list.push(unordered[1]);
      return;
    }

    const ordered = line.match(/^\d+\.\s+(.+)$/);
    if (ordered) {
      flushParagraph();
      if (listType && listType !== 'ol') flushList();
      listType = 'ol';
      list.push(ordered[1]);
      return;
    }

    flushList();
    paragraph.push(line);
  });

  flushParagraph();
  flushList();
  return <>{nodes}</>;
}

function BriefHeader({ onHome }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-yellow-400/[.07] bg-black/75 backdrop-blur-xl">
      <div className={`${shell} flex h-16 items-center justify-between gap-4`}>
        <a href="/" onClick={onHome} className="flex items-center gap-3">
          <img src={LOGO_IMG} alt="SLC" className="h-10 w-10 rounded-full border border-yellow-400/20 object-cover" />
          <div className="leading-none">
            <div className="text-sm font-black text-white">SLC</div>
            <div className="mt-1 text-[8px] uppercase tracking-[.22em] text-zinc-600">Weekly Market Brief</div>
          </div>
        </a>
        <a href="/" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[.14em] text-zinc-500 transition hover:text-white">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to SLC
        </a>
      </div>
    </header>
  );
}

function BriefFooter() {
  return (
    <footer className="relative z-10 border-t border-yellow-400/[.07] bg-black/35">
      <div className={`${shell} py-10`}>
        <p className="text-[11px] leading-5 text-zinc-700">
          SLC Market Briefs are informational market commentary only and are not financial advice. Cryptocurrency and memecoin markets are highly speculative and involve substantial risk.
        </p>
      </div>
    </footer>
  );
}

function BriefCard({ brief }) {
  return (
    <a href={`/market-briefs/${brief.slug}`} className="group block rounded-2xl border border-white/[.06] bg-white/[.016] p-6 transition hover:-translate-y-0.5 hover:border-yellow-400/20 hover:bg-yellow-400/[.025]">
      <div className="flex flex-wrap items-center gap-3 text-[9px] font-black uppercase tracking-[.16em] text-zinc-700">
        <span className="inline-flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5 text-yellow-300/70" />{brief.displayDate}</span>
        {brief.issue && <span>Brief #{brief.issue}</span>}
      </div>
      <h2 className="mt-4 text-2xl font-black tracking-[-.025em] text-white transition group-hover:text-yellow-200">{brief.title}</h2>
      {brief.excerpt && <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-500">{brief.excerpt}</p>}
      <div className="mt-5 inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[.14em] text-yellow-300">Read brief <ArrowRight className="h-3.5 w-3.5" /></div>
    </a>
  );
}

export function MarketBriefArchive() {
  return (
    <div className="min-h-screen bg-[#030402] text-zinc-100">
      <BriefHeader />
      <main className="relative z-10 pb-24 pt-32">
        <div className={shell}>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-yellow-400/20 bg-yellow-400/[.055] px-3 py-1.5 text-[10px] font-black uppercase tracking-[.18em] text-yellow-300">
              <Newspaper className="h-3.5 w-3.5" /> SLC Market Brief
            </div>
            <h1 className="mt-6 text-5xl font-black tracking-[-.05em] text-white sm:text-7xl">The week in the trenches.</h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-zinc-400">A weekly look at the Solana memecoin ecosystem — what changed, what matters, and what we are watching next.</p>
            <div className="mt-5 inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-[.16em] text-zinc-700"><Clock3 className="h-3.5 w-3.5 text-yellow-300/60" /> New brief every Monday</div>
          </div>

          <div className="mt-14 space-y-4">
            {MARKET_BRIEFS.length ? MARKET_BRIEFS.map((brief) => <BriefCard key={brief.slug} brief={brief} />) : (
              <div className="rounded-2xl border border-yellow-400/12 bg-yellow-400/[.025] p-7">
                <div className="flex items-center gap-2 text-sm font-black text-white"><Radar className="h-4 w-4 text-yellow-300" /> First brief incoming.</div>
                <p className="mt-2 text-sm leading-6 text-zinc-500">The SLC Weekly Market Brief will publish here every Monday.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <BriefFooter />
    </div>
  );
}

export function MarketBriefArticle({ brief }) {
  if (!brief) return <MarketBriefArchive />;

  return (
    <div className="min-h-screen bg-[#030402] text-zinc-100">
      <BriefHeader />
      <main className="relative z-10 pb-24 pt-32">
        <article className={shell}>
          <a href="/market-briefs" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[.14em] text-zinc-600 transition hover:text-white"><ArrowLeft className="h-3.5 w-3.5" /> All briefs</a>

          <header className="mt-10 border-b border-yellow-400/[.08] pb-10">
            <div className="text-[9px] font-black uppercase tracking-[.18em] text-yellow-300/75">SLC Market Brief {brief.issue ? `// #${brief.issue}` : ''}</div>
            <h1 className="mt-4 max-w-4xl text-balance text-4xl font-black tracking-[-.045em] text-white sm:text-6xl">{brief.title}</h1>
            <div className="mt-5 flex items-center gap-2 text-[10px] font-black uppercase tracking-[.14em] text-zinc-600"><CalendarDays className="h-3.5 w-3.5 text-yellow-300/65" /> {brief.displayDate}</div>
            {brief.excerpt && <p className="mt-6 max-w-3xl text-base leading-7 text-zinc-400">{brief.excerpt}</p>}
          </header>

          <div className="market-brief-prose mx-auto mt-10 max-w-3xl">
            <MarkdownBody source={brief.body} />
          </div>

          <div className="mx-auto mt-14 max-w-3xl border-t border-yellow-400/[.08] pt-8">
            <a href="/market-briefs" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[.14em] text-yellow-300">View market brief archive <ArrowRight className="h-3.5 w-3.5" /></a>
          </div>
        </article>
      </main>
      <BriefFooter />
    </div>
  );
}
