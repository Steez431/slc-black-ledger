import React, { useEffect } from "react";
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

const HERO_IMG = "https://images.slcblackledger.org/SLCMAINLOGO.jpeg";

// Replace these two links before launch.
const FLOOR_URL = "#access";
const SCANNER_PRO_URL = "#access";

const PERFORMANCE = {
  period: "Last 7 Days",
  finalized: 296,
  opportunityRate: "51.69%",
  twoX: "36.49%",
  threeX: "19.26%",
  fiveX: "9.46%",
  topCalls: [
    { symbol: "$BULLSHIT", multiple: "55.71x", entry: "$78,755", high: "$4,387,558" },
    { symbol: "$PATE", multiple: "53.32x", entry: "$10,751", high: "$573,274" },
    { symbol: "$KIRK", multiple: "40.00x", entry: "$127,928", high: "$5,117,681" },
  ],
};

const Container = ({ children, className = "" }) => (
  <div className={`mx-auto w-full max-w-6xl px-5 sm:px-7 lg:px-8 ${className}`}>{children}</div>
);

const Section = ({ id, children, className = "" }) => (
  <section id={id} className={`relative py-20 sm:py-28 ${className}`}>{children}</section>
);

const Button = ({ href, children, variant = "gold", className = "" }) => {
  const variants = {
    gold: "border-yellow-400/50 bg-yellow-400 text-black hover:bg-yellow-300 hover:shadow-[0_0_35px_rgba(212,175,55,.22)]",
    dark: "border-white/10 bg-white/[.04] text-white hover:border-yellow-400/35 hover:bg-white/[.07]",
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

const Stat = ({ value, label }) => (
  <div>
    <div className="text-3xl font-black tracking-tight text-white sm:text-4xl">{value}</div>
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
      <div className="absolute inset-0 bg-[#070806]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(212,175,55,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,.035)_1px,transparent_1px)] bg-[size:52px_52px] [mask-image:linear-gradient(to_bottom,black,transparent_75%)]" />
      <div className="ambient-pointer absolute inset-0 opacity-70" />
      <div className="absolute left-1/2 top-[-20rem] h-[34rem] w-[70rem] -translate-x-1/2 rounded-full bg-yellow-500/[.08] blur-[120px]" />
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#070806] text-zinc-100 selection:bg-yellow-400 selection:text-black">
      <AmbientGrid />

      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[.06] bg-black/65 backdrop-blur-xl">
        <Container>
          <div className="flex h-16 items-center justify-between">
            <a href="#top" className="flex items-center gap-3">
              <img src={HERO_IMG} alt="SLC" className="h-9 w-9 rounded-full border border-yellow-400/20 object-cover" />
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

            <Button href={FLOOR_URL} variant="dark" className="px-4 py-2.5">Join SLC</Button>
          </div>
        </Container>
      </header>

      <main id="top" className="relative z-10">
        <Section className="flex min-h-[92vh] items-center pt-32 sm:pt-36">
          <Container>
            <div className="mx-auto max-w-4xl text-center">
              <Eyebrow>Built for the trenches</Eyebrow>

              <h1 className="text-balance text-5xl font-black leading-[.96] tracking-[-.045em] text-white sm:text-7xl lg:text-[5.8rem]">
                Spot the movement.
                <span className="gold-text block">Before the masses.</span>
              </h1>

              <p className="mx-auto mt-7 max-w-2xl text-pretty text-base leading-7 text-zinc-400 sm:text-lg">
                SLC surfaces real-time market movement from inside a private trading network — giving you more information when it is time to make your own decision.
              </p>

              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                <Button href={SCANNER_PRO_URL}>
                  Get Scanner Pro <ArrowRight className="h-4 w-4" />
                </Button>
                <Button href={FLOOR_URL} variant="dark">
                  Join the SLC Floor
                </Button>
              </div>

              <div className="mt-7 flex flex-wrap items-center justify-center gap-x-7 gap-y-2 text-[11px] uppercase tracking-[.12em] text-zinc-600">
                <span>Real-time alerts</span>
                <span className="hidden h-1 w-1 rounded-full bg-zinc-700 sm:block" />
                <span>Validated performance</span>
                <span className="hidden h-1 w-1 rounded-full bg-zinc-700 sm:block" />
                <span>No copy-trading</span>
              </div>
            </div>
          </Container>
        </Section>

        <Section id="scanner" className="border-y border-white/[.06] bg-black/25">
          <Container>
            <div className="grid items-center gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
              <div>
                <Eyebrow>SLC Trench Scanner</Eyebrow>
                <h2 className="max-w-xl text-4xl font-black tracking-[-.035em] text-white sm:text-5xl">
                  Information first. Decisions stay yours.
                </h2>
                <p className="mt-6 max-w-xl leading-7 text-zinc-400">
                  The trenches are filled with noise, scams and manufactured conviction. The Scanner is built to cut through it — surfacing movement as it appears inside the SLC.
                </p>
                <p className="mt-4 max-w-xl leading-7 text-zinc-400">
                  Ape it. Research it. Fade it. The Scanner does not tell you what to buy. It puts the opportunity in front of you.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  [Zap, "Real-Time Alerts", "Movement surfaced as it happens — not after the timeline finds it."],
                  [Radar, "Momentum Tracking", "Automated monitoring follows calls as market cap expands."],
                  [BarChart3, "Performance Proof", "Scanner calls are tracked and measured instead of forgotten."],
                  [ShieldCheck, "Signal Over Noise", "Built around information from inside the SLC ecosystem."],
                ].map(([Icon, title, text]) => (
                  <div key={title} className="premium-card rounded-2xl p-6">
                    <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl border border-yellow-400/20 bg-yellow-400/[.07] text-yellow-300">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-bold text-white">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-zinc-500">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </Section>

        <Section id="performance">
          <Container>
            <div className="mx-auto max-w-3xl text-center">
              <Eyebrow>Tracked. Not cherry-picked.</Eyebrow>
              <h2 className="text-4xl font-black tracking-[-.035em] text-white sm:text-5xl">The numbers speak.</h2>
              <p className="mx-auto mt-5 max-w-2xl leading-7 text-zinc-400">
                Recent performance across finalized Scanner calls. Every call is measured from scanner entry to its highest validated market cap during the completed tracking window.
              </p>
            </div>

            <div className="mx-auto mt-12 max-w-5xl overflow-hidden rounded-3xl border border-yellow-400/15 bg-black/45 shadow-[0_30px_100px_rgba(0,0,0,.45)]">
              <div className="border-b border-white/[.06] px-6 py-5 sm:px-8">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-sm font-bold text-white">SLC Scanner Performance</div>
                  <div className="text-xs uppercase tracking-[.18em] text-zinc-600">{PERFORMANCE.period}</div>
                </div>
              </div>

              <div className="grid gap-8 px-6 py-8 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
                <Stat value={PERFORMANCE.finalized} label="Finalized Calls" />
                <Stat value={PERFORMANCE.opportunityRate} label="Reached 1.5x" />
                <Stat value={PERFORMANCE.twoX} label="Reached 2x" />
                <Stat value={PERFORMANCE.threeX} label="Reached 3x" />
              </div>

              <div className="grid border-t border-white/[.06] lg:grid-cols-[.72fr_1.28fr]">
                <div className="border-b border-white/[.06] px-6 py-7 sm:px-8 lg:border-b-0 lg:border-r">
                  <div className="text-xs font-bold uppercase tracking-[.16em] text-zinc-500">Outcome Distribution</div>
                  <div className="mt-5 space-y-4">
                    {[
                      ["1.5x+", PERFORMANCE.opportunityRate],
                      ["2x+", PERFORMANCE.twoX],
                      ["3x+", PERFORMANCE.threeX],
                      ["5x+", PERFORMANCE.fiveX],
                    ].map(([label, value]) => (
                      <div key={label} className="flex items-center justify-between border-b border-white/[.05] pb-3 last:border-0 last:pb-0">
                        <span className="text-sm text-zinc-500">{label}</span>
                        <span className="font-bold text-white">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="px-6 py-7 sm:px-8">
                  <div className="text-xs font-bold uppercase tracking-[.16em] text-zinc-500">Top 3 Calls This Period</div>
                  <div className="mt-5 space-y-5">
                    {PERFORMANCE.topCalls.map((call, index) => (
                      <div key={call.symbol} className="flex items-start gap-4">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-yellow-400/15 bg-yellow-400/[.05] text-xs font-black text-yellow-300">
                          {index + 1}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-baseline justify-between gap-2">
                            <div className="font-black text-white">{call.symbol}</div>
                            <div className="text-xl font-black text-yellow-300">{call.multiple}</div>
                          </div>
                          <div className="mt-1 text-xs text-zinc-600">{call.entry} → {call.high}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-white/[.06] px-6 py-4 text-center text-[10px] uppercase tracking-[.13em] text-zinc-700 sm:px-8">
                Current tracker uses validated 30-second observations • Historical performance does not guarantee future results
              </div>
            </div>
          </Container>
        </Section>

        <Section id="ecosystem" className="border-y border-white/[.06] bg-black/25">
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

              <div className="relative flex flex-col rounded-3xl border border-yellow-400/30 bg-[linear-gradient(180deg,rgba(212,175,55,.10),rgba(255,255,255,.025))] p-7 shadow-[0_0_60px_rgba(212,175,55,.08)]">
                <div className="absolute right-5 top-5 rounded-full border border-yellow-400/25 bg-yellow-400/[.08] px-3 py-1 text-[9px] font-black uppercase tracking-[.18em] text-yellow-300">Flagship</div>
                <div className="mb-7 flex h-11 w-11 items-center justify-center rounded-xl border border-yellow-400/25 bg-yellow-400/[.08]">
                  <Zap className="h-5 w-5 text-yellow-300" />
                </div>
                <h3 className="text-2xl font-black text-white">Scanner Pro</h3>
                <div className="mt-2 flex items-end gap-2">
                  <div className="text-3xl font-black text-white">$44.99</div>
                  <div className="pb-1 text-xs text-zinc-500">/ month</div>
                </div>
                <p className="mt-4 min-h-[72px] text-sm leading-6 text-zinc-400">
                  Live Scanner access for traders who want the information when it happens — not after.
                </p>
                <ul className="mt-6 space-y-3 text-sm text-zinc-300">
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
            <div className="relative overflow-hidden rounded-3xl border border-yellow-400/20 bg-black/50 px-6 py-12 text-center shadow-[0_30px_100px_rgba(0,0,0,.4)] sm:px-12 sm:py-16">
              <div className="absolute left-1/2 top-0 h-36 w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-400/[.10] blur-[70px]" />
              <Sparkles className="mx-auto h-6 w-6 text-yellow-300" />
              <h2 className="relative mt-5 text-4xl font-black tracking-[-.035em] text-white sm:text-5xl">SLC is just getting started.</h2>
              <p className="relative mx-auto mt-5 max-w-xl leading-7 text-zinc-400">
                Join the Floor now. Be there when Scanner Pro opens to the public.
              </p>
              <div className="relative mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Button href={FLOOR_URL}>Join the SLC Floor <ArrowRight className="h-4 w-4" /></Button>
                <Button href={SCANNER_PRO_URL} variant="dark">Scanner Pro</Button>
              </div>
            </div>
          </Container>
        </Section>
      </main>

      <footer className="relative z-10 border-t border-white/[.06] bg-black/20">
        <Container>
          <div className="flex flex-col gap-7 py-10 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <img src={HERO_IMG} alt="SLC" className="h-8 w-8 rounded-full border border-yellow-400/20 object-cover" />
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
