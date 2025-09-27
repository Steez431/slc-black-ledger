import React, { useEffect, useState } from "react";
import { ArrowRight, CheckCircle, Shield, MessageSquare, Megaphone } from "lucide-react";

// Brand asset
const HERO_IMG = "https://images.slcblackledger.org/SLCMAINLOGO.jpeg";

/* =========================
   QUOTES (rotating strip)
   ========================= */
const QUOTES = [
 // Core pulls
  { text: "Absolutely insanely positive. A community closer to family.", who: "SLC Member" },
  { text: "Not blind shilled BS — real plays with metrics & pre-checks.", who: "SLC Member" },
  { text: "Everyone here wants us all to win. Unique and rare.", who: "SLC Member" },
  { text: "That night changed my life. I knew I could count on these guys.", who: "SLC Member" },
  { text: "Best investment you’ll make in 2025.", who: "SLC Member" },
  { text: "Already made more off that call than I will at work today.", who: "SLC Member" },
  { text: "Used $30 from washing a car and made more than the job.", who: "SLC Member" },
  { text: "Trusted the call… checked later: up over 1000% on $COPE.", who: "SLC Member" },
  { text: "Steez calls the metas.", who: "SLC Member" },
  { text: "Postcard from Barcelona — trip paid courtesy of SLC.", who: "SLC Member" },
  { text: "Such a hidden gem. Thank you again.", who: "SLC Member" },
  { text: "The ebook filter actually works.", who: "SLC Member" },
  { text: "All killer, no filler. Ice-cold execution.", who: "SLC Member" },
  { text: "Front-ran $AVP from 5k MC — vision & patience.", who: "SLC Member" },
  { text: "Made my entry fee back in under 24 hours.", who: "SLC Member" },
  { text: "Close-knit group slowly becoming family.", who: "SLC Member" },
  { text: "Never fade Steez.", who: "SLC Member" },
  { text: "Lose trades? Sure. But I’m learning risk & taking profit.", who: "SLC Member" },
  { text: "SLC chat finds one or two 10x opportunities every day.", who: "SLC Member" },
  { text: "People spot each other funds, no questions asked.", who: "SLC Member" },
  { text: "From relying on posts to anticipating pumps myself.", who: "SLC Member" },
  { text: "Don’t hesitate another moment.", who: "SLC Member" },
  { text: "Steez actually cares. Genuine. Does the right thing.", who: "SLC Member" },
  { text: "It’s not a scam — Steez builds, teaches, shows up.", who: "SLC Member" },
  { text: "Be greedy but be smart — take your profit.", who: "SLC Member" },
  { text: "Financial freedom is within your grasp.", who: "SLC Member" },
  { text: "This group rekindled the fire in me.", who: "SLC Member" },
  { text: "I would’ve lost everything if I hadn’t found your X.", who: "SLC Member" },
  { text: "One of my biggest days — almost a week’s pay.", who: "SLC Member" },
  { text: "Genuine, smart, relentless. You motivate me.", who: "SLC Member" },
  { text: "It’s insightful to trench & learn with you guys. I’m here to stay.", who: "SLC Member" },
  { text: "Wish I found you in March — fewer costly mistakes.", who: "SLC Member" },

  // More detailed testimony pulls
  { text: "Joined because Steez was early on X and actually engaged.", who: "SLC Member" },
  { text: "Wins and lessons — but the community feels like family.", who: "SLC Member" },
  { text: "Plays are backed by analytics, not blind hype.", who: "SLC Member" },
  { text: "Even if I couldn’t ape, everyone wanted me to win. Rare energy.", who: "SLC Member" },
  { text: "If you’re on the fence, SLC will be your best investment.", who: "SLC Member" },
  { text: "Alpha with receipts — improvements were immediate.", who: "SLC Member" },
  { text: "Mentorship with real experience — the next step I needed.", who: "SLC Member" },
  { text: "No FOMO, no adrenaline — patient, calculated entries.", who: "SLC Member" },
  { text: "Showed me what’s possible if I fully lock in and apply myself.", who: "SLC Member" },
  { text: "Team is locked-in yet lighthearted — trading is fun again.", who: "SLC Member" },
  { text: "Transparency & integrity unmatched in this space.", who: "SLC Member" },
  { text: "Still learning, but in SLC it’s inevitable I’ll figure it out.", who: "SLC Member" },
  { text: "More than memetrading — constant laughter and banter.", who: "SLC Member" },
  { text: "Losses were my mistakes — entries/profit taking. I’m improving.", who: "SLC Member" },
  { text: "Life-changing opportunities ahead. God bless Steez.", who: "SLC Member" },
  { text: "Feels like my old WoW guild: positive, supportive, effective.", who: "SLC Member" },
  { text: "We check on each other during life events — community first.", who: "SLC Member" },
  { text: "Went from waiting for CAs to spotting charts myself.", who: "SLC Member" },
  { text: "Owner shows up daily: Discord, books, feedback — not a scam.", who: "SLC Member" },
  { text: "You can always buy more; you can never re-sell. Take profit.", who: "SLC Member" },
  { text: "Couldn’t do it without SLC — you kept me from losing it all.", who: "SLC Member" },
  { text: "Printed almost a week’s pay in a day — surreal.", who: "SLC Member" },
  { text: "Months of effort for members — it shows.", who: "SLC Member" },
  { text: "Making steady progress despite IRL noise — grateful to be here.", who: "SLC Member" },

  // New batch you added
  { text: "THANK YOU STEEZ.", who: "SLC Member" },
  { text: "Thank you Jesus, thank you Leo, thank you Steez, thank you SLC. This tek is insane — THAT early is crazy.", who: "SLC Member" },
  { text: "So thankful. God bless everyone in this group. Just good people.", who: "SLC Member" },
  { text: "Was just gonna observe today, then this happens — love this group.", who: "SLC Member" },
  { text: "Ngl I love this group. One of the only legit pages on X; the rest are larps.", who: "SLC Member" },
  { text: "This group is 1 of 1.", who: "SLC Member" },
  { text: "Cannot emphasize enough how grateful I am to be here.", who: "SLC Member" },
  { text: "Spent my last SOL on this group and your books — best purchase I’ve made.", who: "SLC Member" },
  { text: "Least degen trench group ever — we’re just regular people here.", who: "SLC Member" },
  { text: "This group saved me from spiraling — Steez is the GOAT.", who: "SLC Member" },
  { text: "Stand-up man building something real — that’s the difference.", who: "SLC Member" },
  { text: "Win or lose, I love this group.", who: "SLC Member" },
  { text: "Where’s @Steez to celebrate with us?", who: "SLC Member" },
  { text: "Hope y’all took lots of profit.", who: "SLC Member" },
  { text: "This group is really starting to mean a lot to me.", who: "SLC Member" },
  { text: "A bunch of solid mfs — makes this game so much better.", who: "SLC Member" },
  { text: "Different people, places, takes, religions — same page.", who: "SLC Member" },
  { text: "Honored to be here. I came to change my life — it’s happening.", who: "SLC Member" },
  { text: "I can’t even list all the runners inside this group.", who: "SLC Member" },
  { text: "Cold streaks happen — someone else always sees the narrative.", who: "SLC Member" },
  { text: "Learning patterns, reading charts, dialing entries & exits.", who: "SLC Member" },
  { text: "Learning something new every day — this is the group.", who: "SLC Member" },
  { text: "This time we all win.", who: "SLC Member" },
  { text: "SLC is just different. It proves itself over and over.", who: "SLC Member" },
  { text: "SLC is how I get my news.", who: "SLC Member" },
  { text: "Y’all are better than TMZ, damn.", who: "SLC Member" },
  { text: "SLC for life.", who: "SLC Member" },
  { text: "We’re all gonna make it — feel it in my bones.", who: "SLC Member" },
  { text: "New wave of genuine people are finding the SLC.", who: "SLC Member" },
  { text: "SLC warriors-type run today.", who: "SLC Member" },
  { text: "SLC got soldiers in the streets.", who: "SLC Member" },
  { text: "All green everything — the SLC way.", who: "SLC Member" },
  { text: "SLC has been cooking all day. Casino never closes.", who: "SLC Member" },
  { text: "This gonna pay my SLC dues all year.", who: "SLC Member" },
  { text: "SLC never stops cooking.", who: "SLC Member" },
  { text: "Wow… so this is what the SLC experience is like.", who: "SLC Member" },
  { text: "The infamous ‘U’-shaped chart of early SLC calls.", who: "SLC Member" },
  { text: "I’m in much better hands now with SLC.", who: "SLC Member" },
  { text: "Another 100x for SLC in the past 2 days.", who: "SLC Member" },
  { text: "You prove what SLC is worth time and time again.", who: "SLC Member" },
  { text: "SLC went 60k to a millie on it so far.", who: "SLC Member" },
  { text: "The SLC is dialed. LFG — this is what we’re here for.", who: "SLC Member" },
  { text: "SLC is like a well-oiled machine at this point.", who: "SLC Member" },
  { text: "That SLC-sponsored vacation got me right.", who: "SLC Member" },
  { text: "First-time calls in SLC become crazy X’s.", who: "SLC Member" },
  { text: "I fucked with you long before SLC, Steezy — all good in my book.", who: "SLC Member" },
  { text: "Launch saved my portfolio and paid for SLC for months.", who: "SLC Member" },
  { text: "Got yelled at at work — SLC too fun.", who: "SLC Member" },
  { text: "SLC is a great radar for market strength.", who: "SLC Member" },
  { text: "SLC front-running the KOLs once again.", who: "SLC Member" },
  { text: "Win or lose, trading is 100000x better with SLC than solo.", who: "SLC Member" },
  { text: "SLC really has everyone leveling up.", who: "SLC Member" },
  { text: "I’m only buying SLC calls from here on out.", who: "SLC Member" },
  { text: "No other group like this — real family brewing.", who: "SLC Member" },
  { text: "SLC is too powerful.", who: "SLC Member" },
  { text: "Grateful I found you guys. More life, more wins — SLC forever.", who: "SLC Member" },
  { text: "It’s not always about X’s — it’s the help and advice you won’t find elsewhere.", who: "SLC Member" },
  { text: "SLC is the place to be, bros.", who: "SLC Member" },
];

/* Simple rotating quote component */
function RotatingQuotes({ items }) {
  const [i, setI] = React.useState(0);
  React.useEffect(() => {
    if (!items || items.length === 0) return;
    const id = setInterval(() => setI(v => (v + 1) % items.length), 4000); // 5s per quote
    return () => clearInterval(id);
  }, [items?.length]);
  if (!items || items.length === 0) return null;

  return (
    <div className="relative h-24 sm:h-20 flex items-center justify-center px-6">
      {items.map((q, idx) => (
        <div
          key={idx}
          className={`absolute w-full text-center transition-all duration-700 ${i === idx ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"}`}
        >
          <p className="text-base sm:text-lg text-zinc-100">
            “{q.text}” <span className="text-zinc-400 text-xs">— {q.who}</span>
          </p>
        </div>
      ))}
      {/* gold progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10">
        <div className="h-full bg-yellow-400 animate-[slcprogress_4s_linear_infinite]" />
      </div>
      <style>{`@keyframes slcprogress { from { width: 0% } to { width: 100% } }`}</style>
    </div>
  );
}

// ---- COPY (locked, no public editing) ----
const DEFAULT_COPY = {
  hero: {
    line1: "Quality over Quantity",
    line2: "SLC is 1 of 1",
    sub: "Honesty and integrity, above all.",
    earlyPrefix: "",
    earlyHandle: "",
    earlyUrl: "https://x.com/scanner_SLC",
    approvalNote: "Applications reviewed promptly.",
    ctaApply: "Apply to Black Ledger",
    ctaPricing: "View Pricing",
  },
  membership: {
    title: "Membership Information",
    p1: "Access to SLC is controlled to maintain integrity and security. To keep quality high and protect the community from bad actors, entry is vetted and paid.",
    p2b: "No member cap. Membership includes access to the private Discord, early calls, strong community",
  },
  pricing: {
    title: "Pricing",
    tagline: "Apply and get started.",
    showTrial: true, // <-- enabled
    trialTitle: "1-Week Trial",
    trialPrice: "$25 (SOL equivalent)",
    trialNote:
      "On the fence about joining? Try a week in the SLC (upon application approval; limited number of trials given per period).",
    trialBullets: ["Temporary access to Black Ledger", "Private Discord during trial", "1 on 1 with Steez and Operators"],
    blTitle: "Black Ledger Membership",
    blPrice: "0.5 SOL / mo",
    blAdmissionLine: "+ One-time admission fee 1.25 SOL",
    blBullets: [
      "Private Discord access",
      "Collective insight with genuine intention",
      "Structured calls",
      "Strong community",
    ],
  },
  apply: {
    title: "Apply to Black Ledger",
    intro: "No member cap. We review experience, mindset, and risk discipline. Transparency required.",
    approvalNote: "Applications reviewed promptly.",
    bullets: [
      "Tell us about your strategy & timeframe",
      "Share a couple of past plays (win/loss)",
      "Link your X + Telegram",
      "Confirm you understand risk & drawdown",
    ],
  },
  fit: {
    title: "Is this for you?",
    forTitle: "Who it’s for",
    forBullets: ["Disciplined traders", "Risk-aware; uses a plan", "Wants structured reviews", "Values integrity + signal quality"],
    notTitle: "Not for",
    notBullets: ["Copy-trade only", "Hype/alpha chasing", "No risk plan", "Seeking guaranteed returns"],
  },
  about: {
    title: "Why I created the SLC",
    body:
      "Hey all, Steez here. So I have been trading for a good while now. Joined back into the X /twitter spaces around a year ago. I kind of silently watched the terror that is CT. Got sick of seeing the constant scams, lies, misinformation and appearances of genuine intent with no actual action from many notable \"KOLs\" in the space. Really infuriating to me. Soo I became a little more vocal, in Jan / Feb of this last year I curated the idea of the SLC.\n\nA \"fishbowl\" style of group that removes the noise of CT, does not allow / permit / condone / endorse scams, and actually has good traders.\n\nGood traders: The SLC has members from all over the world, from professional traders, to individuals who downloaded a phantom wallet yesterday, both profitable. The SLC community does not have to scam to make profit. We encourage discipline , risk management, and good practice.\n\nI started the early access in May of 2025, it has been going fantastic. Over 100k in profit for members in the month of June alone. Daily large PnL’s. Great community. Genuine guys. The type of group I can see sitting at a table with in the future.\n\nA level of trust in a community I didn’t even think imaginable. I’ll see them loaning eachother funds, giving a helping hand, supporting eachother with life advice etc etc. Its really become something magnificent and we are just getting started.\n\nThe SLC is becoming a machine. A system is being established, members are becoming more dialed every day. It has been a pleasure to watch on my end. The SLC will continue to grow. Due to the lack of bots available for Discord trading servers - I code my own. This machine that is the SLC Discord will become a one stop shop for not just meme trading, but everything trading. In due time.\n\nRome was not built in a day.\n\nI can't guarauntee profits by joining the SLC.\n\nBut if you join the SLC and APPLY yourself. You will be profitable.",
  },
  disclaimer: {
    title: "Disclaimer",
    text:
      "The information, insights, and trade signals provided within the Steez Liquidity Cartel (SLC) Black Ledger are for informational and educational purposes only and should not be considered financial advice. Cryptocurrency, particularly memecoins, is highly volatile and speculative. Trading in these assets carries significant risk. Conduct your own research before making any financial decisions. SLC, its moderators, and Steez are not responsible for any financial losses incurred while following shared insights or strategies. By engaging with this platform, you acknowledge full responsibility for your trading activities and that Steez and SLC moderators reserve the right to remove any member at their sole discretion.",
    footnote: "gamble accordingly.",
  },
  formFields: [
    { type: "input", name: "x_username", placeholder: "X Username", required: true },
    { type: "input", name: "telegram_handle", placeholder: "Telegram @Username", required: true },
    { type: "input", name: "experience", placeholder: "How long have you been trading memecoins?", required: true },
    { type: "input", name: "portfolio_size", placeholder: "Portfolio size? (Optional)", required: false },
    { type: "textarea", name: "trading_strategy", placeholder: "Describe your trading strategy.", rows: 3, required: true },
    { type: "textarea", name: "risk_management", placeholder: "How do you approach risk management?", rows: 3, required: true },
    { type: "input", name: "alpha_groups", placeholder: "Have you been part of any other alpha groups? If so, which ones?", required: true },
    { type: "textarea", name: "long_term_goals", placeholder: "What are your long-term goals in the crypto space?", rows: 3, required: true },
    { type: "textarea", name: "research_methods", placeholder: "How do you find new memecoins before they pump?", rows: 3, required: true },
    { type: "input", name: "membership_duration", placeholder: "How long do you see yourself inside the SLC?", required: true },
    { type: "input", name: "desired_membership", placeholder: "How long have you been following Steez on X?", required: true },
    { type: "textarea", name: "why_allowed", placeholder: "Why should you be allowed into the SLC?", rows: 5, required: true },
    { type: "textarea", name: "skills_contribution", placeholder: "What skills or value can you bring to the SLC community?", rows: 5, required: true },
  ],
};

const Container = ({ children }) => <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>;
const Section = ({ id, className = "", children }) => <section id={id} className={`py-16 sm:py-24 ${className}`}>{children}</section>;
const Button = ({ href, children, variant = "default", type, ...props }) => {
  const base = "inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2";
  const styles = {
    default: "bg-gradient-to-br from-yellow-400 to-yellow-600 hover:to-yellow-500 text-black focus:ring-yellow-400",
    ghost: "bg-transparent hover:bg-white/5 text-white ring-1 ring-white/10",
    secondary: "bg-zinc-900 hover:bg-zinc-800 text-yellow-200 ring-1 ring-yellow-700/30 focus:ring-yellow-500",
  };
  const El = href ? "a" : "button";
  return (
    <El href={href} type={type} className={`${base} ${styles[variant]}`} {...props}>
      {children}
    </El>
  );
};
const Card = ({ className = "", children }) => <div className={`rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur ${className}`}>{children}</div>;

// Simple non-editable text wrapper (keeps your structure)
const EditableText = ({ value, Tag = "span", className }) => (
  <Tag className={className}>{value}</Tag>
);

const AnimatedBg = () => {
  useEffect(() => {
    const c = document.getElementById("slcbg");
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    let frame = 0;
    const dpr = window.devicePixelRatio || 1;
    const resize = () => {
      c.width = c.clientWidth * dpr;
      c.height = c.clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);
    const draw = () => {
      const width = c.clientWidth;
      const height = c.clientHeight;
      ctx.clearRect(0, 0, width, height);
      ctx.globalAlpha = 0.12;
      ctx.strokeStyle = "#d4af37";
      const step = 32;
      for (let x = 0; x < width; x += step) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke(); }
      for (let y = 0; y < height; y += step) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke(); }
      ctx.globalAlpha = 0.9;
      ctx.lineWidth = 2;
      const baseY = height * 0.6;
      ctx.strokeStyle = "rgba(212,175,55,0.9)";
      ctx.beginPath();
      for (let x = 0; x < width; x++) {
        const y = baseY + Math.sin((x + frame) * 0.01) * 18 + Math.cos((x + frame) * 0.005) * 10;
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
      frame += 1.2;
      requestAnimationFrame(draw);
    };
    draw();
    return () => window.removeEventListener("resize", resize);
  }, []);
  return <canvas id="slcbg" className="absolute inset-0 h-full w-full" />;
};

export default function App() {
  // lock to DEFAULT_COPY; no localStorage merge; no edit toggle
  const copy = DEFAULT_COPY;
  const [showThanks, setShowThanks] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0b0a] text-zinc-100 relative overflow-hidden">
      {/* Full-bleed background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-cover bg-center opacity-25" style={{ backgroundImage: `url(${HERO_IMG})` }} />
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "repeating-linear-gradient(45deg,#111 0 4px,#0c0c0c 4px 8px)" }} />
        <AnimatedBg />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/10">
        <Container>
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              <img src={HERO_IMG} alt="SLC crest" className="h-9 w-9 rounded-xl object-contain ring-1 ring-yellow-500/40 shadow" />
              <span className="font-semibold tracking-wide">SLC – Steez Liquidity Cartel</span>
            </div>
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <a href="#membership" className="hover:text-yellow-300">Membership</a>
              <a href="#pricing" className="hover:text-yellow-300">Pricing</a>
              <Button href="#apply" variant="ghost">Apply</Button>
            </nav>
          </div>
        </Container>
      </header>

      <main className="relative z-10">
        {/* Hero */}
        <Section id="hero" className="pt-20 sm:pt-28">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight">
                  <EditableText value={copy.hero.line1} Tag="span" />
                  <br />
                  <EditableText value={copy.hero.line2} Tag="span" className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600" />
                </h1>
                <EditableText value={copy.hero.sub} Tag="p" className="mt-4 text-zinc-300 max-w-xl" />
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button href="#apply"><Shield className="h-4 w-4"/> {copy.hero.ctaApply}</Button>
                  <Button href="#pricing" variant="ghost"><ArrowRight className="h-4 w-4"/> {copy.hero.ctaPricing}</Button>
                </div>
                {copy.hero.approvalNote ? (
                  <EditableText value={copy.hero.approvalNote} Tag="div" className="mt-2 text-xs text-zinc-400" />
                ) : null}
                {copy.hero.earlyPrefix && copy.hero.earlyHandle ? (
                  <div className="mt-3 text-xs text-zinc-400">
                    {copy.hero.earlyPrefix} <a href={copy.hero.earlyUrl} target="_blank" rel="noreferrer" className="underline hover:text-yellow-300">{copy.hero.earlyHandle}</a> on X.
                  </div>
                ) : null}
              </div>
              <div>
                <Card className="relative">
                  <img src={HERO_IMG} alt="SLC crest" className="w-full rounded-xl"/>
                </Card>
              </div>
            </div>
          </Container>
        </Section>

        {/* SLC Quotes and Testimonies (rotating strip) */}
        <Section className="bg-black/40">
          <Container>
            <h2 className="text-center text-sm tracking-wide uppercase text-yellow-300/80">
              SLC Quotes and Testimonies
            </h2>
            <p className="text-[11px] text-center text-zinc-500 mt-1 italic">
              * every quote can be backed up by screenshot — they are all real.
            </p>
            <div className="mt-3 relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r from-yellow-400/5 via-transparent to-yellow-400/5">
              <RotatingQuotes items={QUOTES} />
            </div>
          </Container>
        </Section>

        {/* Why SLC */}
        <Section id="why">
          <Container>
            <EditableText value={copy.about.title} Tag="h2" className="text-3xl font-bold" />
            <EditableText value={copy.about.body} Tag="p" className="mt-3 text-zinc-300 max-w-3xl whitespace-pre-wrap" />
          </Container>
        </Section>

        {/* Membership */}
        <Section id="membership" className="bg-black/40">
          <Container>
            <EditableText value={copy.membership.title} Tag="h2" className="text-3xl font-bold" />
            <div className="mt-4 space-y-3 text-sm text-zinc-300">
              <EditableText value={copy.membership.p1} Tag="p" />
              <EditableText value={copy.membership.p2b} Tag="p" />
            </div>
          </Container>
        </Section>

        {/* Fit / Not for */}
        <Section id="fit">
          <Container>
            <EditableText value={copy.fit.title} Tag="h2" className="text-3xl font-bold" />
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <EditableText value={copy.fit.forTitle} Tag="h3" className="text-lg font-semibold" />
                <ul className="mt-3 space-y-2 text-sm text-zinc-300">
                  {copy.fit.forBullets.map((b,i)=> (
                    <li key={`for-${i}`} className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 text-yellow-300"/>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </Card>
              <Card>
                <EditableText value={copy.fit.notTitle} Tag="h3" className="text-lg font-semibold" />
                <ul className="mt-3 space-y-2 text-sm text-zinc-300">
                  {copy.fit.notBullets.map((b,i)=> (
                    <li key={`not-${i}`} className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 text-yellow-300"/>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </Container>
        </Section>

        {/* Pricing */}
        <Section id="pricing">
          <Container>
            <EditableText value={copy.pricing.title} Tag="h2" className="text-3xl font-bold" />
            <EditableText value={copy.pricing.tagline} Tag="p" className="mt-2 text-zinc-300 max-w-2xl" />
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Optional trial card */}
              {copy.pricing.showTrial && (
                <Card>
                  <div className="flex items-baseline justify-between">
                    <EditableText value={copy.pricing.trialTitle} Tag="h3" className="text-lg font-semibold" />
                    <EditableText value={copy.pricing.trialPrice} Tag="div" className="text-2xl font-extrabold text-yellow-300" />
                  </div>
                  <EditableText value={copy.pricing.trialNote} Tag="div" className="mt-2 text-sm text-zinc-400" />
                  <ul className="mt-3 space-y-2 text-sm text-zinc-300">
                    {copy.pricing.trialBullets.map((f, i) => (
                      <li key={`trial-${i}`} className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-4 w-4 text-yellow-300"/>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5"><Button href="#apply"><ArrowRight className="h-4 w-4"/>Apply for Trial</Button></div>
                </Card>
              )}

              {/* Membership card */}
              <Card>
                <div className="flex items-baseline justify-between">
                  <EditableText value={copy.pricing.blTitle} Tag="h3" className="text-lg font-semibold" />
                  <EditableText value={copy.pricing.blPrice} Tag="div" className="text-2xl font-extrabold text-yellow-300" />
                </div>
                <EditableText value={copy.pricing.blAdmissionLine} Tag="div" className="mt-2 text-sm text-zinc-400" />
                <ul className="mt-3 space-y-2 text-sm text-zinc-300">
                  {copy.pricing.blBullets.map((f, i) => (
                    <li key={`bl-${i}`} className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 text-yellow-300"/>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5"><Button href="#apply"><ArrowRight className="h-4 w-4"/>Apply Now</Button></div>
              </Card>
            </div>
          </Container>
        </Section>

        {/* Apply */}
        <Section id="apply" className="bg-black/40">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <EditableText value={copy.apply.title} Tag="h2" className="text-3xl font-bold" />
                <EditableText value={copy.apply.intro} Tag="p" className="mt-2 text-zinc-300" />
                <ul className="mt-4 space-y-2 text-sm text-zinc-300">
                  {copy.apply.bullets.map((x, i) => (
                    <li key={`apb-${i}`} className="flex items-start gap-2">
                      <Shield className="mt-0.5 h-4 w-4 text-yellow-300"/>
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Card>
                <form className="space-y-3" onSubmit={(e)=>{
                  e.preventDefault();
                  const form = e.currentTarget;
                  const fd = new FormData(form);
                  const obj = {};
                  fd.forEach((v,k)=>{ obj[k] = v; });
                  fetch("https://formsubmit.co/ajax/431steez@gmail.com", {method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify(obj)})
                    .then(r=>r.json())
                    .then(()=>{ setShowThanks(true); form.reset(); })
                    .catch(()=> alert("Error submitting. Please try again."));
                }}>
                  {copy.formFields.map((f, i) => (
                    f.type === "textarea" ? (
                      <textarea key={i} name={f.name} placeholder={f.placeholder} required={!!f.required} rows={f.rows || 3} className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-yellow-400" />
                    ) : (
                      <input key={i} name={f.name} placeholder={f.placeholder} required={!!f.required} className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-yellow-400" />
                    )
                  ))}

                  {/* Interest checkboxes */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" name="interest_trial" className="h-4 w-4" />
                      I am interested in the 1 week SLC trial
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" name="interest_membership" className="h-4 w-4" />
                      I am interested in the SLC Black Ledger Membership
                    </label>
                  </div>

                  <div className="flex items-start gap-3 text-[11px] text-zinc-400">
                    <input type="checkbox" id="agree" required className="mt-1 h-4 w-4"/>
                    <label htmlFor="agree">By submitting this form, you agree to SLC rules and bylaws. You understand that Steez or any moderator can remove you from SLC at any time for any reason.</label>
                  </div>

                  <Button type="submit"><ArrowRight className="h-4 w-4"/> Submit Application</Button>
                </form>
                {copy.apply.approvalNote ? (
                  <EditableText value={copy.apply.approvalNote} Tag="div" className="mt-2 text-xs text-zinc-400" />
                ) : null}
                {/* Email disclosure intentionally removed */}
              </Card>
            </div>
          </Container>
        </Section>

        {/* Disclaimer */}
        <Section id="disclaimer" className="bg-black/60">
          <Container>
            <div className="rounded-2xl border border-white/10 p-6 text-sm text-zinc-300">
              <EditableText value={copy.disclaimer.title} Tag="div" className="font-semibold text-yellow-300 mb-2" />
              <EditableText value={copy.disclaimer.text} Tag="p" />
              <EditableText value={copy.disclaimer.footnote} Tag="p" className="mt-3 text-center font-semibold lowercase text-yellow-300" />
            </div>
          </Container>
        </Section>
      </main>

      {/* Elegant success modal */}
      {showThanks && (
        <div className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={()=>setShowThanks(false)}>
          <div className="relative w-full max-w-md rounded-2xl border border-yellow-500/40 bg-gradient-to-b from-black to-black/80 p-6 shadow-[0_0_40px_rgba(212,175,55,0.25)]" onClick={(e)=>e.stopPropagation()}>
            <img src={HERO_IMG} alt="SLC crest" className="mx-auto mb-3 h-12 w-12 rounded-xl object-contain ring-1 ring-yellow-500/40 shadow" />
            <h3 className="text-xl font-bold text-yellow-300 text-center">Thank you</h3>
            <p className="mt-2 text-sm text-zinc-300 text-center">Thank you for your submission, if your application is approved, you will be contacted by Steez via X.</p>
            <div className="mt-5 flex justify-center">
              <Button type="button" onClick={()=>setShowThanks(false)}>Close</Button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10">
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-8 text-sm text-zinc-400">
            <div className="flex items-center gap-3">
              <img src={HERO_IMG} alt="SLC crest" className="h-8 w-8 rounded-xl object-contain ring-1 ring-yellow-500/40 shadow" />
              <div>
                <div className="font-semibold text-zinc-200">Steez Liquidity Cartel</div>
                <div className="text-[12px]">© {new Date().getFullYear()} SLC. All rights reserved.</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <a href="https://x.com/431Steez" target="_blank" rel="noreferrer" className="hover:text-yellow-300 inline-flex items-center gap-2">
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4"><path fill="currentColor" d="M18.244 2H21l-6.74 7.71L22.5 22h-6.5l-5.09-6.62L4.756 22H2l7.2-8.24L1.5 2h6.6l4.55 5.94L18.244 2Zm-2.27 18.26h2.406L7.927 3.66H5.37l10.603 16.6Z"/></svg>
                @431Steez
              </a>
              <a href="https://t.me/+ELigdpxNJVhkODg5" target="_blank" rel="noreferrer" className="hover:text-yellow-300 inline-flex items-center gap-2"><MessageSquare className="h-4 w-4"/>Telegram</a>
              <a href="#contact" className="hover:text-yellow-300 inline-flex items-center gap-2"><Megaphone className="h-4 w-4"/>Contact</a>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
}
