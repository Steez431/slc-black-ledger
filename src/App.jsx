import React, { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  Check,
  Eye,
  LockKeyhole,
  Radar,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";

const LOGO_IMG = "/assets/slc-logo.webp";
const BANNER_IMG = "/assets/slc-banner-2026.webp";
const SCANNER_IMG = "/assets/slc-trench-scanner.webp";

// Replace these two links before launch.
const FLOOR_URL = "#access";
const SCANNER_PRO_URL = "#access";

const PERFORMANCE = {
  "7d": {
    label: "7 Days",
    finalized: 296,
    opportunityRate: "51.69%",
    twoX: "36.49%",
    threeX: "19.26%",
    fiveX: "9.46%",
    tenX: "4.39%",
    topCalls: [
      { symbol: "$BULLSHIT", multiple: "55.71x", entry: "$78,755", high: "$4,387,558" },
      { symbol: "$PATE", multiple: "53.32x", entry: "$10,751", high: "$573,274" },
      { symbol: "$KIRK", multiple: "40.00x", entry: "$127,928", high: "$5,117,681" },
    ],
  },
  "30d": {
    label: "30 Days",
    finalized: 825,
    opportunityRate: "49.09%",
    twoX: "32.97%",
    threeX: "17.33%",
    fiveX: "7.52%",
    tenX: "3.15%",
    topCalls: [
      { symbol: "$CHAM", multiple: "153.33x", entry: "$16,916", high: "$2,593,726" },
      { symbol: "$PITCOIN", multiple: "99.18x", entry: "$8,317", high: "$824,871" },
      { symbol: "$BULLSHIT", multiple: "55.71x", entry: "$78,755", high: "$4,387,558" },
    ],
  },
};

const Container = ({ children, className = "" }) => (
  <div className={`mx-auto w-full max-w-7xl px-5 sm:px-7 lg:px-8 ${className}`}>{children}</div>
);

const Section = ({ id, children, className = "" }) => (
  <section id={id} className={`relative py-20 sm:py-28 ${className}`}>{children}</section>
);

const Button = ({ href, children, variant = "gold", className = "" }) => {
  const variants = {
    gold: "border-yellow-400/40 bg-[linear-gradient(180deg,#f7dc7a,#d4af37_48%,#a97812)] text-black hover:brightness-110 hover:shadow-[0_0_35px_rgba(212,175,55,.25)]",
    dark: "border-yellow-400/15 bg-black/45 text-white hover:border-yellow-400/35 hover:bg-black/65",
  };

  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-xl border px-5 py-3 text-sm font-semibold transition duration-200 ${variants[variant]} ${className}`}
    >
      {children}
    </a>
  );
};

const Eyebrow = ({ children }) => (
  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-yellow-400/20 bg-yellow-400/[.06] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[.2em] text-yellow-300">
    <span className="h-1.5 w-1.5 rounded-full bg-yellow-300 shadow-[0_0_12px_rgba(253,224,71,.8)]" />
    {children}
  </div>
);

function useInViewOnce(threshold = 0.28) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current || visible) return;

    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, visible]);

  return [ref, visible];
}

const AnimatedValue = ({ value, active }) => {
  const isPercent = String(value).includes("%");
  const numeric = Number.parseFloat(String(value).replace(/[^0-9.]/g, "")) || 0;
  const decimals = String(value).includes(".") ? String(value).split(".")[1].replace(/\D/g, "").length : 0;
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!active) return;

    const duration = 1050;
    const startedAt = performance.now();
    let frame;

    const tick = (now) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(numeric * eased);

      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, numeric]);

  const formatted = decimals > 0 ? display.toFixed(decimals) : Math.round(display).toLocaleString();
  return <>{formatted}{isPercent ? "%" : ""}</>;
};

const Stat = ({ value, label, active }) => (
  <div className="performance-stat">
    <div className="text-3xl font-black tracking-tight text-white sm:text-4xl">
      <AnimatedValue value={value} active={active} />
    </div>
    <div className="mt-1 text-xs uppercase tracking-[.16em] text-zinc-500">{label}</div>
  </div>
);

function AmbientGrid() {
  useEffect(() => {
    const el = document.documentElement;
    const update = (event) => {
      el.style.setProperty("--mx", `${event.clientX}px`);
      el.style.setProperty("--my", `${event.clientY}px`);
    };
    window.addEventListener("pointermove", update, { passive: true });
    return () => window.removeEventListener("pointermove", update);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#040503]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(212,175,55,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,.03)_1px,transparent_1px)] bg-[size:52px_52px] [mask-image:linear-gradient(to_bottom,black,transparent_80%)]" />
      <div className="ambient-pointer absolute inset-0 opacity-75" />
      <div className="absolute left-1/2 top-[-20rem] h-[34rem] w-[70rem] -translate-x-1/2 rounded-full bg-yellow-500/[.08] blur-[120px]" />
    </div>
  );
}

export default function App() {
  const [performanceRef, performanceActive] = useInViewOnce();
  const [performanceRange, setPerformanceRange] = useState("7d");
  const performance = PERFORMANCE[performanceRange];

  return (
    <div className="min-h-screen bg-[#040503] text-zinc-100 selection:bg-yellow-400 selection:text-black">
      <AmbientGrid />

      <header className="fixed inset-x-0 top-0 z-50 border-b border-yellow-400/[.08] bg-black/60 backdrop-blur-xl">
        <Container>
          <div className="flex h-16 items-center justify-between">
            <a href="#top" className="flex items-center gap-3">
              <img src={LOGO_IMG} alt="SLC" className="h-10 w-10 rounded-full border border-yellow-400/20 object-cover shadow-[0_0_25px_rgba(212,175,55,.12)]" />
              <div className="leading-none">
                <div className="text-sm font-bold tracking-wide text-white">SLC</div>
                <div className="mt-1 text-[9px] uppercase tracking-[.22em] text-zinc-500">Steez Liquidity Cartel</div>
              </div>
            </a>

            <nav className="hidden items-center gap-7 text-xs font-semibold text-zinc-400 md:flex">
              <a href="#scanner" className="transition hover:text-white">Scanner</a>
              <a href="#performance" className="transition hover:text-white">Performance</a>
              <a href="#ecosystem" className="transition hover:text-white">Ecosystem</a>
            </nav>

            <Button href={FLOOR_URL} variant="dark" className="px-4 py-2.5">Enter SLC</Button>
          </div>
        </Container>
      </header>

      <main id="top" className="relative z-10">
        <Section className="flex min-h-[92vh] items-center pt-32 sm:pt-36">
          <Container>
            <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-14">
              <div>
                <Eyebrow>Premium trench intelligence</Eyebrow>
                <h1 className="text-balance text-5xl font-black leading-[.96] tracking-[-.045em] text-white sm:text-7xl lg:text-[5.8rem]">
                  Spot the movement.
                  <span className="gold-text block">Before the masses.</span>
                </h1>

                <p className="mt-7 max-w-2xl text-pretty text-base leading-7 text-zinc-400 sm:text-lg">
                  Steez Liquidity Cartel is a premium intelligence ecosystem built to surface market movement early — with the SLC Trench Scanner at the center of it.
                </p>

                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <Button href={SCANNER_PRO_URL}>
                    Get Scanner Pro <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button href={FLOOR_URL} variant="dark">
                    Join the SLC Floor
                  </Button>
                </div>

                <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-2 text-[11px] uppercase tracking-[.12em] text-zinc-600">
                  <span>Honesty & integrity</span>
                  <span className="hidden h-1 w-1 rounded-full bg-zinc-700 sm:block" />
                  <span>Validated performance</span>
                  <span className="hidden h-1 w-1 rounded-full bg-zinc-700 sm:block" />
                  <span>Information before attention</span>
                </div>
              </div>

              <div className="relative">
                <div className="glow-frame overflow-hidden rounded-[2rem] border border-yellow-400/20 bg-black/55 p-3 shadow-[0_30px_90px_rgba(0,0,0,.5)]">
                  <img
                    src={BANNER_IMG}
                    alt="SLC banner"
                    className="w-full rounded-[1.45rem] border border-yellow-400/10 object-cover"
                  />
                </div>
              </div>
            </div>
          </Container>
        </Section>

        <Section id="scanner" className="border-y border-yellow-400/[.08] bg-black/25">
          <Container>
            <div className="grid items-center gap-12 lg:grid-cols-[.95fr_1.05fr] lg:gap-20">
              <div className="relative order-2 lg:order-1">
                <div className="glow-frame overflow-hidden rounded-[2rem] border border-yellow-400/18 bg-[radial-gradient(circle_at_top,rgba(212,175,55,.08),rgba(0,0,0,.7)_48%)] p-3">
                  <img src={SCANNER_IMG} alt="SLC Trench Scanner" className="w-full rounded-[1.45rem] border border-yellow-400/10 object-cover" />
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <Eyebrow>SLC Trench Scanner</Eyebrow>
                <h2 className="max-w-xl text-4xl font-black tracking-[-.035em] text-white sm:text-5xl">
                  Early movement. Clean presentation. Decisions still yours.
                </h2>
                <p className="mt-6 max-w-xl leading-7 text-zinc-400">
                  The trenches are full of noise, scams, false conviction and recycled calls. The Scanner is built to surface movement as it appears — fast enough to matter, structured enough to use.
                </p>
                <p className="mt-4 max-w-xl leading-7 text-zinc-400">
                  It does not tell you what to buy. It gives you more information when it is time to decide.
                </p>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {[
                    [Zap, "Real-Time Alerts", "Movement surfaced while it is forming — not after the feed notices it."],
                    [Radar, "Momentum Tracking", "Scanner calls are monitored as market cap expands."],
                    [BarChart3, "Performance Proof", "Results are measured and reported instead of forgotten."],
                    [ShieldCheck, "Signal Over Noise", "Built around intelligence inside the SLC ecosystem."],
                  ].map(([Icon, title, text]) => (
                    <div key={title} className="premium-card rounded-2xl p-5">
                      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-yellow-400/20 bg-yellow-400/[.07] text-yellow-300">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="font-bold text-white">{title}</h3>
                      <p className="mt-2 text-sm leading-6 text-zinc-500">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </Section>

        <Section id="performance">
          <Container>
            <div className="mx-auto max-w-3xl text-center">
              <Eyebrow>Tracked. Not cherry-picked.</Eyebrow>
              <h2 className="text-4xl font-black tracking-[-.035em] text-white sm:text-5xl">Proof over promises.</h2>
              <p className="mx-auto mt-5 max-w-2xl leading-7 text-zinc-400">
                Recent performance across finalized Scanner calls. Measured from scanner entry to the highest validated market cap observed during the completed tracking window.
              </p>
            </div>

            <div ref={performanceRef} className="performance-terminal relative mx-auto mt-12 max-w-6xl overflow-hidden rounded-3xl border border-yellow-400/15 bg-black/55 shadow-[0_30px_100px_rgba(0,0,0,.45)]">
              <div className="performance-scanline pointer-events-none absolute inset-x-0 z-20 h-px" />
              <div className="performance-radar pointer-events-none absolute inset-0" />

              <div className="relative z-10 border-b border-yellow-400/[.08] px-6 py-5 sm:px-8">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3 text-sm font-bold text-white">
                    <img src={LOGO_IMG} alt="SLC" className="h-7 w-7 rounded-full border border-yellow-400/20 object-cover" />
                    SLC Scanner Performance
                  </div>
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.16em] text-yellow-300/75">
                      <span className="tracker-pulse h-1.5 w-1.5 rounded-full bg-yellow-300" />
                      Tracker active
                    </div>
                    <div className="performance-range-tabs flex items-center rounded-lg border border-yellow-400/10 bg-black/45 p-1">
                      {[
                        ["7d", "7D"],
                        ["30d", "30D"],
                      ].map(([range, label]) => (
                        <button
                          key={range}
                          type="button"
                          onClick={() => setPerformanceRange(range)}
                          className={`rounded-md px-3 py-1.5 text-[10px] font-black uppercase tracking-[.16em] transition ${
                            performanceRange === range
                              ? "bg-yellow-400 text-black shadow-[0_0_18px_rgba(212,175,55,.18)]"
                              : "text-zinc-600 hover:text-zinc-300"
                          }`}
                          aria-pressed={performanceRange === range}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div key={`stats-${performanceRange}`} className="performance-data-swap relative z-10 grid gap-8 px-6 py-8 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
                <Stat value={performance.finalized} label="Finalized Calls" active={performanceActive} />
                <Stat value={performance.opportunityRate} label="Reached 1.5x" active={performanceActive} />
                <Stat value={performance.twoX} label="Reached 2x" active={performanceActive} />
                <Stat value={performance.threeX} label="Reached 3x" active={performanceActive} />
              </div>

              <div className="relative z-10 grid border-t border-yellow-400/[.08] lg:grid-cols-[.72fr_1.28fr]">
                <div className="border-b border-yellow-400/[.08] px-6 py-7 sm:px-8 lg:border-b-0 lg:border-r">
                  <div className="text-xs font-bold uppercase tracking-[.16em] text-zinc-500">Outcome Distribution</div>
                  <div key={`distribution-${performanceRange}`} className="performance-data-swap mt-5 space-y-4">
                    {[
                      ["1.5x+", performance.opportunityRate],
                      ["2x+", performance.twoX],
                      ["3x+", performance.threeX],
                      ["5x+", performance.fiveX],
                      ["10x+", performance.tenX],
                    ].map(([label, value], index) => (
                      <div key={label} className="border-b border-white/[.05] pb-3 last:border-0 last:pb-0">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-zinc-500">{label}</span>
                          <span className="font-bold text-white">{value}</span>
                        </div>
                        <div className="mt-2 h-[2px] overflow-hidden rounded-full bg-white/[.04]">
                          <div
                            className="performance-bar h-full rounded-full"
                            style={{
                              width: performanceActive ? value : "0%",
                              transitionDelay: `${180 + index * 110}ms`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="px-6 py-7 sm:px-8">
                  <div className="text-xs font-bold uppercase tracking-[.16em] text-zinc-500">Top 3 Calls This Period</div>
                  <div key={`top-${performanceRange}`} className="performance-data-swap mt-5 space-y-5">
                    {performance.topCalls.map((call, index) => (
                      <div
                        key={call.symbol}
                        className={`top-call-row flex items-start gap-4 ${performanceActive ? "is-visible" : ""}`}
                        style={{ transitionDelay: `${420 + index * 130}ms` }}
                      >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-yellow-400/15 bg-yellow-400/[.05] text-xs font-black text-yellow-300">
                          {index + 1}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-baseline justify-between gap-2">
                            <div className="font-black text-white">{call.symbol}</div>
                            <div className="performance-multiple text-xl font-black text-yellow-300">{call.multiple}</div>
                          </div>
                          <div className="mt-1 text-xs text-zinc-600">{call.entry} → {call.high}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="relative z-10 border-t border-yellow-400/[.08] px-6 py-4 text-center text-[10px] uppercase tracking-[.13em] text-zinc-700 sm:px-8">
                Current tracker uses validated 30-second observations • Historical performance does not guarantee future results
              </div>
            </div>
          </Container>
        </Section>

        <Section id="ecosystem" className="border-y border-yellow-400/[.08] bg-black/25">
          <Container>
            <div className="mx-auto max-w-3xl text-center">
              <Eyebrow>One ecosystem</Eyebrow>
              <h2 className="text-4xl font-black tracking-[-.035em] text-white sm:text-5xl">Choose your depth.</h2>
              <p className="mx-auto mt-5 max-w-xl leading-7 text-zinc-400">
                Start free. Upgrade for speed. The Black Ledger remains intentionally selective.
              </p>
            </div>

            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              <div className="premium-card flex flex-col rounded-3xl p-7">
                <div className="mb-7 flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[.04]">
                    <Eye className="h-5 w-5 text-zinc-300" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-[.16em] text-zinc-600">Free</span>
                </div>
                <h3 className="text-2xl font-black text-white">SLC Floor</h3>
                <p className="mt-3 min-h-[72px] text-sm leading-6 text-zinc-500">
                  The front door to SLC. Market discussion, education, delayed scanner previews and milestone proof.
                </p>
                <ul className="mt-6 space-y-3 text-sm text-zinc-400">
                  {["Community access", "Scanner Preview", "Scanner milestones"].map((item) => (
                    <li key={item} className="flex items-center gap-2"><Check className="h-4 w-4 text-yellow-300" />{item}</li>
                  ))}
                </ul>
                <Button href={FLOOR_URL} variant="dark" className="mt-8 w-full">Join the Floor</Button>
              </div>

              <div className="relative flex flex-col rounded-3xl border border-yellow-400/30 bg-[linear-gradient(180deg,rgba(212,175,55,.12),rgba(255,255,255,.025))] p-7 shadow-[0_0_60px_rgba(212,175,55,.08)]">
                <div className="absolute right-5 top-5 rounded-full border border-yellow-400/25 bg-yellow-400/[.08] px-3 py-1 text-[9px] font-black uppercase tracking-[.18em] text-yellow-300">Flagship</div>
                <div className="mb-7 flex h-11 w-11 items-center justify-center rounded-xl border border-yellow-400/25 bg-yellow-400/[.08]">
                  <Zap className="h-5 w-5 text-yellow-300" />
                </div>
                <h3 className="text-2xl font-black text-white">Scanner Pro</h3>
                <div className="mt-2 flex items-end gap-2">
                  <div className="text-3xl font-black text-white">$44.99</div>
                  <div className="pb-1 text-xs text-zinc-500">/ month</div>
                </div>
                <p className="mt-4 min-h-[72px] text-sm leading-6 text-zinc-300">
                  Live Scanner access for traders who want the information when it matters — without the public lag.
                </p>
                <ul className="mt-6 space-y-3 text-sm text-zinc-200">
                  {["Real-time scanner", "Wallet alerts", "Scanner discussion", "Performance results"].map((item) => (
                    <li key={item} className="flex items-center gap-2"><Check className="h-4 w-4 text-yellow-300" />{item}</li>
                  ))}
                </ul>
                <Button href={SCANNER_PRO_URL} className="mt-8 w-full">Get Scanner Pro <ArrowRight className="h-4 w-4" /></Button>
              </div>

              <div className="premium-card flex flex-col rounded-3xl p-7">
                <div className="mb-7 flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[.04]">
                    <LockKeyhole className="h-5 w-5 text-zinc-300" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-[.16em] text-zinc-600">Selective</span>
                </div>
                <h3 className="text-2xl font-black text-white">Black Ledger</h3>
                <p className="mt-3 min-h-[72px] text-sm leading-6 text-zinc-500">
                  The private intelligence layer inside SLC. Built around trusted contributors, research and conviction.
                </p>
                <ul className="mt-6 space-y-3 text-sm text-zinc-400">
                  {["Private calls & research", "Operator intelligence", "Member referrals + vetting"].map((item) => (
                    <li key={item} className="flex items-center gap-2"><Check className="h-4 w-4 text-yellow-300" />{item}</li>
                  ))}
                </ul>
                <div className="mt-8 rounded-xl border border-white/[.07] bg-black/25 px-4 py-3 text-center text-xs font-semibold text-zinc-500">
                  Not publicly sold
                </div>
              </div>
            </div>
          </Container>
        </Section>

        <Section id="access">
          <Container>
            <div className="relative overflow-hidden rounded-3xl border border-yellow-400/20 bg-black/55 px-6 py-12 text-center shadow-[0_30px_100px_rgba(0,0,0,.4)] sm:px-12 sm:py-16">
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url(${BANNER_IMG})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
              <div className="absolute inset-0 bg-black/65" />
              <div className="absolute left-1/2 top-0 h-36 w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-400/[.10] blur-[70px]" />
              <div className="relative">
                <Sparkles className="mx-auto h-6 w-6 text-yellow-300" />
                <h2 className="mt-5 text-4xl font-black tracking-[-.035em] text-white sm:text-5xl">SLC is just getting started.</h2>
                <p className="mx-auto mt-5 max-w-xl leading-7 text-zinc-300">
                  Join the Floor now. Be there when Scanner Pro opens to the public.
                </p>
                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                  <Button href={FLOOR_URL}>Join the SLC Floor <ArrowRight className="h-4 w-4" /></Button>
                  <Button href={SCANNER_PRO_URL} variant="dark">Scanner Pro</Button>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      </main>

      <footer className="relative z-10 border-t border-yellow-400/[.08] bg-black/20">
        <Container>
          <div className="flex flex-col gap-7 py-10 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <img src={LOGO_IMG} alt="SLC" className="h-9 w-9 rounded-full border border-yellow-400/20 object-cover" />
                <span className="text-sm font-bold text-white">Steez Liquidity Cartel</span>
              </div>
              <p className="mt-4 max-w-xl text-xs leading-5 text-zinc-600">
                SLC provides informational market tools and community discussion only. Nothing displayed is financial advice. Cryptocurrency and memecoin trading involve substantial risk. Do your own research and make your own decisions.
              </p>
            </div>
            <div className="text-xs text-zinc-700">© {new Date().getFullYear()} SLC</div>
          </div>
        </Container>
      </footer>
    </div>
  );
}
