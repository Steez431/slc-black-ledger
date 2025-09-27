import React, { useEffect, useState, useRef } from "react";
import { ArrowRight, CheckCircle, Shield, MessageSquare, Megaphone } from "lucide-react";

// Brand asset
const HERO_IMG = "https://images.slcblackledger.org/SLCMAINLOGO.jpeg";

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
    tagline: "Simple, clean, descriptive. Apply and get started.",
    showTrial: true, // <-- Trial enabled
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
      "Hey all, Steez here. So I have been trading for a good while now. Joined back into the X /twitter spaces around a year ago. I kind of silently watched the terror that is CT. Got sick of seeing the constant scams, lies, misinformation and appearances of genuine intent with no actual action from many notable \"KOLs\" in the space. Really infuriating to me. Soo I became a lil more vocal, in Jan / Feb of this last year I curated the idea of the SLC.\n\nA \"fishbowl\" style of group that removes the noise of ct, doesnt allow / permit / condone / endorse scams, and actually has good traders. (Good traders don’t have to scam to profit)\n\nI started the early access in May of 2025, its been going fantastic. Over 100k in profit for members in the month of June alone. Daily large PnL’s. Great community. Genuine guys. The type of group I can see sitting at a table with in the future.\n\nA level of trust in a community I didn’t even think imaginable. I’ll see them loaning eachother funds, giving a helping hand, supporting eachother with life advice etc etc. Its really become something magnificent and we are just getting started.\n\nThe SLC is becoming a machine. A system is being established, members are becoming more dialed every day. It has been a pleasure to watch on my end. The SLC will continue to grow. Due to the lack of bots available for Discord trading servers - I code my own. This machine that is the SLC Discord will become a one stop shop for not just meme trading, but everything trading. In due time.\n\nRome was not built in a day.\n\nI can't guarauntee profits by joining the SLC. But I can guarauntee profits if you join the SLC and APPLY yourself. You will be profitable.",
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

// Primitives
const Container = ({ children }) => <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>;
const Section = ({ id, className = "", children }) => <section id={id} className={`py-16 sm:py-24 ${className}`}>{children}</section>;

const Button = ({ href, children, variant = "default", ...props }) => {
  const base =
    "inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold transition will-change-transform focus:outline-none focus:ring-2 focus:ring-offset-2 active:translate-y-[1px]";
  const styles = {
    default:
      "bg-gradient-to-br from-yellow-400 to-yellow-600 hover:shadow-[0_0_24px_rgba(212,175,55,.35)] text-black focus:ring-yellow-400",
    ghost: "bg-transparent hover:bg-white/5 text-white ring-1 ring-white/10",
    secondary: "bg-zinc-900 hover:bg-zinc-800 text-yellow-200 ring-1 ring-yellow-700/30 focus:ring-yellow-500",
  };
  const El = href ? "a" : "button";
  return (
    <El href={href} className={`${base} ${styles[variant]}`} {...props}>
      {children}
    </El>
  );
};

const Card = ({ className = "", children }) => (
  <div className={`rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur ${className}`}>{children}</div>
);

// Fancy gold glass card
const FancyCard = ({ className = "", children }) => (
  <div className={`relative rounded-2xl ${className}`}>
    <div className="absolute -inset-[1px] rounded-2xl bg-[linear-gradient(135deg,rgba(212,175,55,.35),rgba(212,175,55,.05))] blur-[2px]" />
    <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur">
      {children}
    </div>
  </div>
);

// Simple non-editable text wrapper
const EditableText = ({ value, Tag = "span", className }) => <Tag className={className}>{value}</Tag>;

// Animated background grid + line
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
      // grid
      ctx.globalAlpha = 0.12;
      ctx.strokeStyle = "#d4af37";
      const isMobile = window.matchMedia("(max-width: 640px)").matches;
      const step = isMobile ? 40 : 32;
      for (let x = 0; x < width; x += step) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke(); }
      for (let y = 0; y < height; y += step) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke(); }
      // flowing line
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
      const speed = isMobile ? 0.8 : 1.2;
      frame += speed;
      requestAnimationFrame(draw);
    };
    draw();
    return () => window.removeEventListener("resize", resize);
  }, []);
  return <canvas id="slcbg" className="absolute inset-0 h-full w-full" />;
};

// Rotating quotes strip (5s interval)
const QUOTES = [
  // Short punchy quotes you supplied earlier
  "already made more off that call then I'm gonna make at work today lol, genuinely thank you fellas.",
  "I slaved away washing a car last night, used 30 bucks of that and made more than washing the car.",
  "Trusted the call, got in a little late to $Cope. Been busy with IRL… finally checked my position, up over 1000%! LFG!",
  "Steez calls the metas.",
  "Im so thankful for you guys.",
  "Steez such a boss.",
  "Postcard from Barcelona. Trip paid for courtesy of SLC.",
  "Such a hidden gem. Thank you again.",
  "I am actively learning, applying info from the ebook. The filter you shared actually works.",
  "Never fade Steez.",
  "THANK YOU STEEZ.",
  "This tek is insane, THAT early is crazy.",
  "So thankful, God bless everyone in this group. Just good people.",
  "Ngl I love this group. Steez is one of the few legit pages on X.",
  "This group is 1 of 1.",
  "Best purchase I’ve ever made.",
  "This group saved me from spiraling, Steez is the mf goat.",
  "Win or lose I love this group.",
  "This group is really starting to mean a lot to me.",
  "A bunch of solid mfs. Makes this game so much better.",
  "Different people, places, takes, religions — all on the same page.",
  "I’m honoured to be a part of the SLC. Came in to change my life and it’s happened.",
  "I cannot even list all the runners inside this group.",
  "Being in this group is great because if someone is cold, someone else sees the narrative.",
  "I'm learning something new every day — this is the group.",
  "This group is the real “this time we all win”.",
  "SLC is just different — proves itself over and over.",
  "SLC is how I get my news.",
  "SLC 4 life.",
  "We’re all gonna make it, feel it in my bones.",
  "New wave of genuine people are finding the SLC.",
  "SLC Warriors type run today.",
  "SLC got soldiers in the streets.",
  "All green everything. The SLC Way.",
  "SLC has been cooking all day. Casino never closes and SLC never sleeps.",
  "This gonna pay my SLC dues all year.",
  "SLC as a whole never stops cooking.",
  "Wow… so this is what the SLC experience is like.",
  "I feel like I'm in much better hands now with SLC.",
  "Another 100x for the SLC in the past 2 days.",
  "You prove what the SLC is worth time and time again.",
  "SLC went 60k to a Millie on it so far.",
  "The SLC is dialed. LFG boys — this is what we’re here for.",
  "SLC is like a well oiled machine at this point.",
  "That SLC-sponsored vacation just really got me right.",
  "What is up with first time calls in the SLC being some crazy X’s.",
  "Morning guys! Launch!!!! saved my portfolio and paid for SLC for a few months!",
  "Got yelled at at work for being superglued to my phone. SLC too fun.",
  "SLC is a good radar for market strength.",
  "SLC front running the KOLs once again.",
  "Win or lose, trading is much better with the SLC — 100000x better than alone.",
  "SLC really got everyone leveling up.",
  "I’m only buying SLC calls from here on out.",
  "No other group like this. A real family brewing.",
  "SLC is TOO POWERFUL.",
  "Feeling so much gratitude I found you guys. SLC 4 ever.",
  "It’s not always about Xs and money — people here willing to help, talk, advise.",
  "SLC is the place to be bros.",
  // Longer testimonial highlights condensed to strip-friendly lines
  "Actual plays that respect metrics/analytics — not blind shills.",
  "Entries are patient and calculated. Ice cold execution.",
  "Caught AVP at 5k MC ~90 minutes before the crowd — eye opening.",
  "Best investment I’ve made in myself and my trading.",
  "Community that feels like family — positive, supportive, accountable.",
  "Knowledge is priceless here. Financial literacy lasts forever.",
  "Genuine leadership; integrity is unmatched.",
];

function RotatingQuotes({ items, interval = 5000 }) {
  const [i, setI] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => setI((v) => (v + 1) % items.length), interval);
    return () => clearInterval(timerRef.current);
  }, [items.length, interval]);

  const q = items[i] || "";

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/30">
      {/* subtle rail shimmer */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(212,175,55,.06),transparent)]" />
      <div className="px-4 sm:px-6 py-5">
        <div className="h-6 sm:h-7 relative">
          <div key={i} className="absolute inset-0 flex items-center transition-all duration-700 ease-out opacity-100">
            <p className="w-full truncate text-base sm:text-lg text-zinc-100">
              “{q}”
            </p>
          </div>
        </div>
        {/* progress bar synced to 5s */}
        <div className="mt-3 h-0.5 w-full bg-white/10 rounded">
          <div className="h-full bg-yellow-400 animate-[slcprogress_5s_linear_infinite]" />
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const copy = DEFAULT_COPY;
  const [showThanks, setShowThanks] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0b0a] text-zinc-100 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-cover bg-center opacity-25" style={{ backgroundImage: `url(${HERO_IMG})` }} />
        {/* Carbon-fiber whisper texture */}
        <div
          className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, #000 2px, transparent 2px),
              radial-gradient(circle at 75% 75%, #000 2px, transparent 2px)
            `,
            backgroundSize: "10px 10px",
          }}
        />
        <AnimatedBg />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/40 backdrop-blur supports-[backdrop-filter]:bg-black/30">
        <Container>
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              <img src={HERO_IMG} alt="SLC crest" className="h-9 w-9 rounded-xl object-contain ring-1 ring-yellow-500/40 shadow" />
              <span className="font-semibold tracking-wide">SLC – Steez Liquidity Cartel</span>
            </div>
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <a href="#membership" className="hover:text-yellow-300">Membership</a>
              <a href="#quotes" className="hover:text-yellow-300">Quotes</a>
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
                  <span>{copy.hero.line1}</span><br/>
                  <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                    {copy.hero.line2}
                    <span className="absolute inset-0 pointer-events-none [mask-image:linear-gradient(75deg,transparent,black,transparent)] animate-[sheen_3.5s_ease-in-out_infinite]" />
                  </span>
                </h1>
                <EditableText value={copy.hero.sub} Tag="p" className="mt-4 text-zinc-300 max-w-xl" />
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button href="#apply"><Shield className="h-4 w-4"/> {copy.hero.ctaApply}</Button>
                  <Button href="#pricing" variant="ghost"><ArrowRight className="h-4 w-4"/> {copy.hero.ctaPricing}</Button>
                </div>
                {copy.hero.approvalNote ? (
                  <EditableText value={copy.hero.approvalNote} Tag="div" className="mt-2 text-xs text-zinc-400" />
                ) : null}
              </div>
              <div>
                <FancyCard>
                  <img src={HERO_IMG} alt="SLC crest" className="w-full rounded-2xl"/>
                </FancyCard>
              </div>
            </div>
          </Container>
        </Section>

        <div className="mx-auto my-8 h-px w-11/12 max-w-5xl bg-gradient-to-r from-transparent via-yellow-500/40 to-transparent shadow-[0_0_20px_rgba(212,175,55,0.25)]" />

        {/* Why SLC */}
        <Section id="why">
          <Container>
            <EditableText value={copy.about.title} Tag="h2" className="text-3xl font-bold" />
            <EditableText value={copy.about.body} Tag="p" className="mt-3 text-zinc-300 max-w-3xl whitespace-pre-wrap" />
          </Container>
        </Section>

        <div className="mx-auto my-8 h-px w-11/12 max-w-5xl bg-gradient-to-r from-transparent via-yellow-500/40 to-transparent shadow-[0_0_20px_rgba(212,175,55,0.25)]" />

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

        <div className="mx-auto my-8 h-px w-11/12 max-w-5xl bg-gradient-to-r from-transparent via-yellow-500/40 to-transparent shadow-[0_0_20px_rgba(212,175,55,0.25)]" />

        {/* SLC Quotes & Testimonies (rotating strip) */}
        <Section id="quotes">
          <Container>
            <h2 className="text-3xl font-bold">SLC Quotes and Testimonies</h2>
            <p className="mt-2 text-xs text-zinc-400">* every quote can be backed up by screenshot, they are all real.</p>
            <div className="mt-5">
              <RotatingQuotes items={QUOTES} interval={5000} />
            </div>
          </Container>
        </Section>

        <div className="mx-auto my-8 h-px w-11/12 max-w-5xl bg-gradient-to-r from-transparent via-yellow-500/40 to-transparent shadow-[0_0_20px_rgba(212,175,55,0.25)]" />

        {/* Fit / Not for */}
        <Section id="fit">
          <Container>
            <EditableText value={copy.fit.title} Tag="h2" className="text-3xl font-bold" />
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <FancyCard>
                <EditableText value={copy.fit.forTitle} Tag="h3" className="text-lg font-semibold" />
                <ul className="mt-3 space-y-2 text-sm text-zinc-300">
                  {copy.fit.forBullets.map((b,i)=> (
                    <li key={`for-${i}`} className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 text-yellow-300"/>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </FancyCard>
              <FancyCard>
                <EditableText value={copy.fit.notTitle} Tag="h3" className="text-lg font-semibold" />
                <ul className="mt-3 space-y-2 text-sm text-zinc-300">
                  {copy.fit.notBullets.map((b,i)=> (
                    <li key={`not-${i}`} className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 text-yellow-300"/>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </FancyCard>
            </div>
          </Container>
        </Section>

        <div className="mx-auto my-8 h-px w-11/12 max-w-5xl bg-gradient-to-r from-transparent via-yellow-500/40 to-transparent shadow-[0_0_20px_rgba(212,175,55,0.25)]" />

        {/* Pricing */}
        <Section id="pricing">
          <Container>
            <EditableText value={copy.pricing.title} Tag="h2" className="text-3xl font-bold" />
            <EditableText value={copy.pricing.tagline} Tag="p" className="mt-2 text-zinc-300 max-w-2xl" />
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Trial */}
              {copy.pricing.showTrial && (
                <FancyCard>
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
                </FancyCard>
              )}

              {/* Membership */}
              <FancyCard>
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
              </FancyCard>
            </div>
          </Container>
        </Section>

        <div className="mx-auto my-8 h-px w-11/12 max-w-5xl bg-gradient-to-r from-transparent via-yellow-500/40 to-transparent shadow-[0_0_20px_rgba(212,175,55,0.25)]" />

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
              <FancyCard>
                <form
                  className="space-y-3 p-1"
                  onSubmit={(e)=>{
                    e.preventDefault();
                    const form = e.currentTarget;
                    const fd = new FormData(form);
                    const obj = {};
                    fd.forEach((v,k)=>{ obj[k] = v; });
                    fetch("https://formsubmit.co/ajax/431steez@gmail.com", {
                      method:"POST",
                      headers:{"Content-Type":"application/json"},
                      body: JSON.stringify(obj)
                    })
                      .then(r=>r.json())
                      .then(()=>{ setShowThanks(true); form.reset(); })
                      .catch(()=> alert("Error submitting. Please try again."));
                  }}
                >
                  {DEFAULT_COPY.formFields.map((f, i) =>
                    f.type === "textarea" ? (
                      <textarea
                        key={i}
                        name={f.name}
                        placeholder={f.placeholder}
                        required={!!f.required}
                        rows={f.rows || 3}
                        className="w-full rounded-2xl bg-black/40 border border-white/10 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-yellow-400"
                      />
                    ) : (
                      <input
                        key={i}
                        name={f.name}
                        placeholder={f.placeholder}
                        required={!!f.required}
                        className="w-full rounded-2xl bg-black/40 border border-white/10 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-yellow-400"
                      />
                    )
                  )}

                  {/* Interest checkboxes */}
                  <div className="space-y-2 pt-1">
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
                  <EditableText value={copy.apply.approvalNote} Tag="div" className="mt-2 text-xs text-zinc-400 px-6 pb-4" />
                ) : null}
              </FancyCard>
            </div>
          </Container>
        </Section>

        <div className="mx-auto my-8 h-px w-11/12 max-w-5xl bg-gradient-to-r from-transparent via-yellow-500/40 to-transparent shadow-[0_0_20px_rgba(212,175,55,0.25)]" />

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

      {/* Success modal */}
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

      {/* Local keyframes */}
      <style>{`
        @keyframes sheen {
          0% { transform: translateX(-120%); opacity: 0; }
          35% { opacity: .18; }
          60% { opacity: 0; }
          100% { transform: translateX(120%); opacity: 0; }
        }
        @keyframes slcprogress { from { width: 0% } to { width: 100% } }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: .001ms !important; animation-iteration-count: 1 !important; transition-duration: .001ms !important; }
        }
      `}</style>
    </div>
  );
}
