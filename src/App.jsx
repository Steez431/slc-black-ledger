import React, { useEffect, useState } from "react";
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
    p2b: "No member cap. Membership includes access to the private Discord, call reviews, and weekly debriefs.",
  },
  pricing: {
    title: "Pricing",
    tagline: "Simple, clean, descriptive. Apply and get started.",
    showTrial: true, // <-- enabled
    trialTitle: "1-Week Trial",
    trialPrice: "$25 (SOL equivalent)",
    trialNote:
      "On the fence about joining? Try a week in the SLC (upon application approval; limited number of trials given per period).",
    trialBullets: ["Temporary access to Black Ledger", "Private Discord during trial", "Sample weekly debrief"],
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
