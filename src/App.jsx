import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Activity,
  ArrowRight,
  BarChart3,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Database,
  Eye,
  Fingerprint,
  Images,
  Layers3,
  LockKeyhole,
  Radar,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Terminal,
  TrendingUp,
  Users,
  Wallet,
  Zap,
} from "lucide-react";

const LOGO_IMG = "/assets/slc-logo.webp";
const BANNER_IMG = "/assets/slc-banner-2026.webp";
const SCANNER_IMG = "/assets/slc-trench-scanner.webp";

// Public-access links stay intentionally closed until launch.
const FLOOR_URL = "#access";
const SCANNER_PRO_URL = "#access";

const PERFORMANCE = {
  "7d": {
    label: "7D",
    sublabel: "Last 7 Days",
    refresh: "Updated weekly",
    finalized: 296,
    outcomes: [
      { label: "1.5x+", count: 153, rate: 51.69 },
      { label: "2x+", count: 108, rate: 36.49 },
      { label: "3x+", count: 57, rate: 19.26 },
      { label: "5x+", count: 28, rate: 9.46 },
      { label: "10x+", count: 13, rate: 4.39 },
    ],
    topCalls: [
      { symbol: "$BULLSHIT", multiple: 55.71, entry: 78755, high: 4387558 },
      { symbol: "$PATE", multiple: 53.32, entry: 10751, high: 573274 },
      { symbol: "$KIRK", multiple: 40.0, entry: 127928, high: 5117681 },
    ],
  },
  "30d": {
    label: "30D",
    sublabel: "Last 30 Days",
    refresh: "Updated monthly",
    finalized: 825,
    outcomes: [
      { label: "1.5x+", count: 405, rate: 49.09 },
      { label: "2x+", count: 272, rate: 32.97 },
      { label: "3x+", count: 143, rate: 17.33 },
      { label: "5x+", count: 62, rate: 7.52 },
      { label: "10x+", count: 26, rate: 3.15 },
    ],
    topCalls: [
      { symbol: "$CHAM", multiple: 153.33, entry: 16916, high: 2593726 },
      { symbol: "$PITCOIN", multiple: 99.18, entry: 8317, high: 824871 },
      { symbol: "$BULLSHIT", multiple: 55.71, entry: 78755, high: 4387558 },
    ],
  },
};

const WINS = [
  { symbol: "$SMPL", gain: "+8,786%", image: "/assets/wins/smpl-8786.webp" },
  { symbol: "$PITCOIN", gain: "+3,360%", image: "/assets/wins/pitcoin-3360.webp" },
  { symbol: "$MAODIE", gain: "+2,015%", image: "/assets/wins/maodie-2015.webp" },
  { symbol: "$STRAIGHT", gain: "+1,870%", image: "/assets/wins/straight-1870.webp" },
  { symbol: "$JIMOTHY", gain: "+1,483%", image: "/assets/wins/jimothy-1483.webp" },
  { symbol: "$LINGANG", gain: "+945%", image: "/assets/wins/lingang-945.webp" },
  { symbol: "$QUBIT", gain: "+925%", image: "/assets/wins/qubit-925.webp" },
  { symbol: "$BOND", gain: "+909%", image: "/assets/wins/bond-909.webp" },
  { symbol: "$USD", gain: "+696%", image: "/assets/wins/usd-696.webp" },
  { symbol: "$ACTBLUE", gain: "+659%", image: "/assets/wins/actblue-659.webp" },
  { symbol: "$8B", gain: "+652%", image: "/assets/wins/8b-652.webp" },
  { symbol: "$MEM", gain: "+603%", image: "/assets/wins/mem-603.webp" },
  { symbol: "$JIWA", gain: "+578%", image: "/assets/wins/jiwa-578.webp" },
  { symbol: "$PIMP", gain: "+543%", image: "/assets/wins/pimp-543.webp" },
  { symbol: "$APEX", gain: "+509%", image: "/assets/wins/apex-509.webp" },
  { symbol: "$POGE", gain: "+449%", image: "/assets/wins/poge-449.webp" },
  { symbol: "$BLINDAPE", gain: "+397%", image: "/assets/wins/blindape-397.webp" },
  { symbol: "$SCG", gain: "+384%", image: "/assets/wins/scg-384.webp" },
];

const formatUsd = (value) => `$${Number(value).toLocaleString("en-US", { maximumFractionDigits: 0 })}`;

const Container = ({ children, className = "" }) => (
  <div className={`mx-auto w-full max-w-7xl px-5 sm:px-7 lg:px-8 ${className}`}>{children}</div>
);

const Section = ({ id, children, className = "" }) => (
  <section id={id} className={`relative py-20 sm:py-28 ${className}`}>{children}</section>
);

const Button = ({ href, children, variant = "gold", className = "" }) => {
  const variants = {
    gold: "border-yellow-400/45 bg-[linear-gradient(180deg,#f9df80,#d4af37_48%,#9e7010)] text-black hover:brightness-110 hover:shadow-[0_0_38px_rgba(212,175,55,.22)]",
    dark: "border-yellow-400/15 bg-black/45 text-white hover:border-yellow-400/35 hover:bg-black/70",
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

const Eyebrow = ({ children, icon: Icon = null }) => (
  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-yellow-400/20 bg-yellow-400/[.055] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.2em] text-yellow-300">
    {Icon ? <Icon className="h-3.5 w-3.5" /> : <span className="h-1.5 w-1.5 rounded-full bg-yellow-300 shadow-[0_0_12px_rgba(253,224,71,.8)]" />}
    {children}
  </div>
);

function useInViewOnce(threshold = 0.2) {
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

function CountUp({ value, decimals = 0, suffix = "", active = true }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!active) return;

    const duration = 900;
    const start = performance.now();
    let frame;

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(value * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, value]);

  return <>{display.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}{suffix}</>;
}

function AmbientSystem() {
  useEffect(() => {
    const root = document.documentElement;
    const pointer = (event) => {
      root.style.setProperty("--mx", `${event.clientX}px`);
      root.style.setProperty("--my", `${event.clientY}px`);
    };
    window.addEventListener("pointermove", pointer, { passive: true });
    return () => window.removeEventListener("pointermove", pointer);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[#030402]" />
      <div className="ambient-grid absolute inset-0" />
      <div className="ambient-pointer absolute inset-0" />
      <div className="absolute left-1/2 top-[-28rem] h-[50rem] w-[85rem] -translate-x-1/2 rounded-full bg-yellow-500/[.065] blur-[145px]" />
      <div className="absolute bottom-[-20rem] right-[-14rem] h-[42rem] w-[42rem] rounded-full bg-yellow-600/[.035] blur-[125px]" />
    </div>
  );
}

function SystemStatus() {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/[.045] px-3 py-1.5 text-[9px] font-black uppercase tracking-[.18em] text-emerald-300/90">
      <span className="status-dot h-1.5 w-1.5 rounded-full bg-emerald-300" />
      Intelligence system online
    </div>
  );
}

function HeroVisual() {
  return (
    <div className="relative mx-auto max-w-[660px]">
      <div className="hero-orbit absolute inset-[-8%] rounded-full border border-yellow-400/[.06]" />
      <div className="hero-orbit hero-orbit-delayed absolute inset-[2%] rounded-full border border-yellow-400/[.08]" />

      <div className="relative overflow-hidden rounded-[2rem] border border-yellow-400/20 bg-black/60 p-2.5 shadow-[0_40px_110px_rgba(0,0,0,.58)]">
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(212,175,55,.08),transparent_34%,transparent_70%,rgba(212,175,55,.04))]" />
        <img
          src={BANNER_IMG}
          alt="Steez Liquidity Cartel"
          className="relative w-full rounded-[1.55rem] border border-yellow-400/10 object-cover"
        />
        <div className="hero-scan-line absolute left-3 right-3 top-0 h-px bg-gradient-to-r from-transparent via-yellow-300/70 to-transparent" />
      </div>

      <div className="absolute -bottom-7 -left-3 hidden w-[230px] rounded-2xl border border-yellow-400/15 bg-[#090a07]/95 p-4 shadow-[0_24px_65px_rgba(0,0,0,.55)] backdrop-blur-xl sm:block">
        <div className="flex items-center justify-between">
          <span className="text-[9px] font-black uppercase tracking-[.18em] text-zinc-600">Signal State</span>
          <Activity className="h-3.5 w-3.5 text-yellow-300" />
        </div>
        <div className="mt-3 flex items-end justify-between gap-4">
          <div>
            <div className="text-xl font-black text-white">MONITORING</div>
            <div className="mt-1 text-[9px] uppercase tracking-[.14em] text-zinc-600">Validated observations</div>
          </div>
          <div className="signal-bars flex h-8 items-end gap-1">
            {[35, 58, 44, 76, 52, 88, 68].map((height, index) => (
              <span key={index} style={{ height: `${height}%`, animationDelay: `${index * 110}ms` }} />
            ))}
          </div>
        </div>
      </div>

      <div className="absolute -right-4 top-8 hidden rounded-2xl border border-yellow-400/15 bg-black/80 px-4 py-3 backdrop-blur-xl sm:block">
        <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[.18em] text-zinc-500">
          <Fingerprint className="h-3.5 w-3.5 text-yellow-300" />
          Proprietary pipeline
        </div>
      </div>
    </div>
  );
}

function ScannerAlertPreview() {
  return (
    <div className="terminal-shell relative overflow-hidden rounded-[1.7rem] border border-yellow-400/15 bg-[#080906]/92 p-1 shadow-[0_35px_90px_rgba(0,0,0,.5)]">
      <div className="terminal-top flex items-center justify-between border-b border-white/[.055] px-4 py-3">
        <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[.18em] text-zinc-500">
          <Terminal className="h-3.5 w-3.5 text-yellow-300" />
          Scanner output // sample
        </div>
        <div className="flex gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-zinc-700" />
          <span className="h-1.5 w-1.5 rounded-full bg-zinc-700" />
          <span className="h-1.5 w-1.5 rounded-full bg-yellow-400/70" />
        </div>
      </div>

      <div className="relative p-5 sm:p-6">
        <div className="terminal-scan absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-yellow-300/60 to-transparent" />
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[.18em] text-yellow-300/80">SLC Trench Scanner Alert</div>
            <div className="mt-2 text-2xl font-black text-white">SIGNAL DETECTED</div>
            <div className="mt-1 font-mono text-xs text-zinc-600">CA // 7gQ...fP3</div>
          </div>
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/[.045] px-3 py-1.5 text-[9px] font-black uppercase tracking-[.16em] text-emerald-300">
            <span className="status-dot h-1.5 w-1.5 rounded-full bg-emerald-300" />
            Tracking
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/[.055] bg-white/[.055] sm:grid-cols-4">
          {[
            ["Entry MC", "$42,810"],
            ["Volume 24H", "$186K"],
            ["Chain", "Solana"],
            ["Observation", "30s"],
          ].map(([label, value]) => (
            <div key={label} className="bg-[#090a07] px-4 py-4">
              <div className="text-[9px] uppercase tracking-[.16em] text-zinc-600">{label}</div>
              <div className="mt-2 text-sm font-black text-white">{value}</div>
            </div>
          ))}
        </div>

        <div className="mt-5 flex items-center gap-3 rounded-xl border border-yellow-400/10 bg-yellow-400/[.03] px-4 py-3 text-xs leading-5 text-zinc-500">
          <Radar className="h-4 w-4 shrink-0 text-yellow-300" />
          An eligible contract has entered the SLC intelligence pipeline. Entry data is locked and performance tracking begins.
        </div>
      </div>
    </div>
  );
}

function IntelligenceLayerCard({ icon: Icon, number, title, children, tone = "normal" }) {
  return (
    <div className={`intelligence-card group relative overflow-hidden rounded-2xl border p-5 sm:p-6 ${tone === "gold" ? "border-yellow-400/25 bg-yellow-400/[.045]" : "border-white/[.065] bg-white/[.018]"}`}>
      <div className="absolute right-4 top-3 font-mono text-[9px] tracking-[.18em] text-zinc-800">0{number}</div>
      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-yellow-400/15 bg-yellow-400/[.055] text-yellow-300 transition group-hover:border-yellow-400/30 group-hover:bg-yellow-400/[.08]">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mt-5 text-lg font-black text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-zinc-500">{children}</p>
    </div>
  );
}

function PerformanceLedger() {
  const [range, setRange] = useState("7d");
  const [ref, visible] = useInViewOnce(0.15);
  const [animationKey, setAnimationKey] = useState(0);
  const data = PERFORMANCE[range];
  const headline = data.outcomes[0];

  const maxRate = useMemo(() => Math.max(...data.outcomes.map((item) => item.rate)), [data]);

  const selectRange = (next) => {
    if (next === range) return;
    setRange(next);
    setAnimationKey((key) => key + 1);
  };

  return (
    <div ref={ref} className="performance-ledger relative mx-auto mt-12 max-w-6xl overflow-hidden rounded-[2rem] border border-yellow-400/18 bg-[#070805]/94 shadow-[0_45px_120px_rgba(0,0,0,.58)]">
      <div className="ledger-grid pointer-events-none absolute inset-0 opacity-45" />
      <div className="ledger-sweep pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-yellow-300/80 to-transparent" />

      <div className="relative border-b border-yellow-400/[.08] px-5 py-4 sm:px-7">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-yellow-400/20 bg-yellow-400/[.055]">
              <img src={LOGO_IMG} alt="SLC" className="h-7 w-7 rounded-full object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-sm font-black text-white">
                SLC Performance Ledger
                <span className="hidden rounded-md border border-white/[.06] bg-white/[.025] px-2 py-1 font-mono text-[8px] uppercase tracking-[.16em] text-zinc-600 sm:inline">Finalized data</span>
              </div>
              <div className="mt-1 text-[9px] uppercase tracking-[.16em] text-zinc-700">Entry → highest validated market cap</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-[.16em] text-emerald-300/85">
              <span className="status-dot h-1.5 w-1.5 rounded-full bg-emerald-300" />
              Tracker active
            </div>
            <div className="flex rounded-xl border border-white/[.065] bg-black/50 p-1">
              {Object.keys(PERFORMANCE).map((key) => (
                <button
                  key={key}
                  onClick={() => selectRange(key)}
                  className={`rounded-lg px-4 py-2 text-[10px] font-black uppercase tracking-[.14em] transition ${range === key ? "bg-yellow-400 text-black shadow-[0_0_24px_rgba(212,175,55,.15)]" : "text-zinc-600 hover:text-white"}`}
                  type="button"
                >
                  {PERFORMANCE[key].label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div key={animationKey} className="relative ledger-refresh">
        <div className="grid border-b border-yellow-400/[.08] lg:grid-cols-[1.15fr_.85fr]">
          <div className="px-5 py-8 sm:px-7 sm:py-9">
            <div className="grid gap-7 sm:grid-cols-3">
              <div className="sm:col-span-1">
                <div className="text-[9px] font-black uppercase tracking-[.18em] text-zinc-700">Finalized calls</div>
                <div className="mt-2 text-4xl font-black tracking-[-.04em] text-white sm:text-5xl">
                  <CountUp value={data.finalized} active={visible} />
                </div>
                <div className="mt-2 text-xs text-zinc-600">{data.sublabel} · {data.refresh}</div>
              </div>

              <div className="sm:col-span-2 sm:border-l sm:border-white/[.055] sm:pl-8">
                <div className="text-[9px] font-black uppercase tracking-[.18em] text-zinc-700">Opportunity rate</div>
                <div className="mt-2 flex flex-wrap items-end gap-x-4 gap-y-2">
                  <div className="text-5xl font-black tracking-[-.05em] text-yellow-300 sm:text-6xl">
                    <CountUp value={headline.rate} decimals={2} suffix="%" active={visible} />
                  </div>
                  <div className="pb-2 text-xs leading-5 text-zinc-600">
                    <span className="font-bold text-zinc-400">{headline.count}/{data.finalized}</span><br />
                    reached {headline.label.replace("+", " or higher")}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-yellow-400/[.08] bg-yellow-400/[.018] px-5 py-8 sm:px-7 lg:border-l lg:border-t-0">
            <div className="flex items-center justify-between">
              <div className="text-[9px] font-black uppercase tracking-[.18em] text-zinc-700">Proof protocol</div>
              <ShieldCheck className="h-4 w-4 text-yellow-300/70" />
            </div>
            <div className="mt-5 grid grid-cols-2 gap-2">
              {[
                ["ENTRY", "Locked"],
                ["OBSERVE", "30 sec"],
                ["WINDOW", "72 hours"],
                ["STATE", "Finalized"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-xl border border-white/[.055] bg-black/30 px-3 py-3">
                  <div className="font-mono text-[8px] tracking-[.16em] text-zinc-700">{label}</div>
                  <div className="mt-1 text-xs font-black text-zinc-300">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-[.9fr_1.1fr]">
          <div className="border-b border-yellow-400/[.08] px-5 py-7 sm:px-7 lg:border-b-0 lg:border-r">
            <div className="flex items-end justify-between gap-4">
              <div>
                <div className="text-[9px] font-black uppercase tracking-[.18em] text-zinc-700">Outcome distribution</div>
                <div className="mt-1 text-xs text-zinc-600">Not just the winners. The full finalized set.</div>
              </div>
              <TrendingUp className="h-4 w-4 text-yellow-300/55" />
            </div>

            <div className="mt-6 space-y-5">
              {data.outcomes.map((item, index) => {
                const width = Math.max(4, (item.rate / maxRate) * 100);
                return (
                  <div key={item.label} className="group">
                    <div className="mb-2 flex items-end justify-between gap-4">
                      <div className="flex items-baseline gap-3">
                        <span className="text-sm font-black text-white">{item.label}</span>
                        <span className="font-mono text-[9px] text-zinc-700">{item.count} calls</span>
                      </div>
                      <span className="text-sm font-black text-zinc-300">{item.rate.toFixed(2)}%</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-white/[.045]">
                      <div
                        className="distribution-bar h-full rounded-full bg-[linear-gradient(90deg,#8f6510,#d4af37,#f7dc7a)] shadow-[0_0_12px_rgba(212,175,55,.16)]"
                        style={{ "--bar-width": `${width}%`, animationDelay: `${index * 90}ms` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="px-5 py-7 sm:px-7">
            <div className="flex items-end justify-between gap-4">
              <div>
                <div className="text-[9px] font-black uppercase tracking-[.18em] text-zinc-700">Top 3 surfaced</div>
                <div className="mt-1 text-xs text-zinc-600">Unique contracts. Same measurement rules.</div>
              </div>
              <Sparkles className="h-4 w-4 text-yellow-300/55" />
            </div>

            <div className="mt-5 space-y-3">
              {data.topCalls.map((call, index) => (
                <div key={call.symbol} className="top-call-card group relative overflow-hidden rounded-2xl border border-white/[.06] bg-white/[.018] px-4 py-4 sm:px-5" style={{ animationDelay: `${index * 90}ms` }}>
                  <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-yellow-300/55 to-transparent" />
                  <div className="flex items-center gap-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-yellow-400/15 bg-yellow-400/[.055] font-mono text-xs font-black text-yellow-300">0{index + 1}</div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <div className="text-base font-black text-white">{call.symbol}</div>
                        <div className="runner-multiple text-2xl font-black tracking-[-.03em] text-yellow-300">{call.multiple.toFixed(2)}x</div>
                      </div>
                      <div className="mt-1 flex flex-wrap items-center gap-x-2 text-[10px] text-zinc-700">
                        <span>{formatUsd(call.entry)}</span>
                        <ArrowRight className="h-3 w-3" />
                        <span>{formatUsd(call.high)}</span>
                        <span className="ml-auto hidden rounded-md border border-emerald-400/10 bg-emerald-400/[.03] px-2 py-1 font-mono text-[8px] uppercase tracking-[.14em] text-emerald-300/70 sm:inline">validated</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-yellow-400/[.08] px-5 py-4 text-[9px] uppercase tracking-[.12em] text-zinc-700 sm:flex-row sm:items-center sm:justify-between sm:px-7">
          <span>Historical performance does not guarantee future results</span>
          <a href="#methodology" className="inline-flex items-center gap-1.5 font-bold text-zinc-500 transition hover:text-yellow-300">
            View measurement methodology <ArrowRight className="h-3 w-3" />
          </a>
        </div>
      </div>
    </div>
  );
}

function WinsArchive() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [ref, visible] = useInViewOnce(0.08);
  const total = WINS.length;

  const goTo = (index) => setActiveIndex((index + total) % total);
  const previousIndex = (activeIndex - 1 + total) % total;
  const nextIndex = (activeIndex + 1) % total;

  useEffect(() => {
    if (!visible || paused) return;
    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % total);
    }, 4800);
    return () => window.clearInterval(timer);
  }, [visible, paused, total]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "ArrowLeft") goTo(activeIndex - 1);
      if (event.key === "ArrowRight") goTo(activeIndex + 1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex]);

  const activeWin = WINS[activeIndex];
  const previousWin = WINS[previousIndex];
  const nextWin = WINS[nextIndex];

  return (
    <div
      ref={ref}
      className="wins-archive relative mt-12 overflow-hidden rounded-[2rem] border border-yellow-400/16 bg-[#060704]/95 px-4 py-5 shadow-[0_40px_110px_rgba(0,0,0,.5)] sm:px-6 sm:py-6"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="wins-grid pointer-events-none absolute inset-0 opacity-45" />
      <div className="wins-scan pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-yellow-300/65 to-transparent" />

      <div className="relative flex flex-col gap-4 border-b border-yellow-400/[.08] pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-yellow-400/20 bg-yellow-400/[.055] text-yellow-300">
            <Images className="h-4 w-4" />
          </div>
          <div>
            <div className="text-sm font-black text-white">SLC W Archive</div>
            <div className="mt-1 font-mono text-[8px] uppercase tracking-[.16em] text-zinc-700">Community-shared screenshots // rotating proof layer</div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-lg border border-white/[.055] bg-black/35 px-2.5 py-1.5 font-mono text-[8px] uppercase tracking-[.14em] text-zinc-600">{total} captures</span>
          <span className="inline-flex items-center gap-2 rounded-lg border border-emerald-400/10 bg-emerald-400/[.025] px-2.5 py-1.5 font-mono text-[8px] uppercase tracking-[.14em] text-emerald-300/70">
            <span className="status-dot h-1.5 w-1.5 rounded-full bg-emerald-300" />
            {paused ? "Paused" : "Auto rotation"}
          </span>
        </div>
      </div>

      <div className="wins-stage relative mt-6 grid items-center gap-4 lg:grid-cols-[.56fr_1fr_.56fr] lg:gap-5">
        <button
          type="button"
          onClick={() => goTo(activeIndex - 1)}
          className="wins-side-card wins-side-left group hidden overflow-hidden rounded-[1.5rem] border border-white/[.055] bg-black/55 p-2 text-left lg:block"
          aria-label={`View previous SLC W: ${previousWin.symbol}`}
        >
          <div className="relative h-[340px] overflow-hidden rounded-[1.15rem] bg-black/80">
            <img src={previousWin.image} alt={`${previousWin.symbol} SLC W`} className="h-full w-full object-contain opacity-55 transition duration-300 group-hover:opacity-80" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-transparent to-black/20" />
            <div className="absolute bottom-4 left-4">
              <div className="text-xs font-black text-zinc-400">{previousWin.symbol}</div>
              <div className="mt-1 text-lg font-black text-yellow-300/60">{previousWin.gain}</div>
            </div>
          </div>
        </button>

        <div key={activeWin.image} className="wins-active-card relative overflow-hidden rounded-[1.7rem] border border-yellow-400/18 bg-black/70 p-2.5 shadow-[0_28px_80px_rgba(0,0,0,.48),0_0_60px_rgba(212,175,55,.035)]">
          <div className="relative flex h-[430px] items-center justify-center overflow-hidden rounded-[1.25rem] border border-white/[.045] bg-[#030403] sm:h-[500px]">
            <img src={activeWin.image} alt={`${activeWin.symbol} SLC community W`} className="wins-active-image max-h-full w-full object-contain" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/60 to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />
            <div className="wins-image-scan pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-yellow-300/55 to-transparent" />

            <div className="absolute left-4 top-4 flex items-center gap-2 rounded-lg border border-yellow-400/12 bg-black/65 px-2.5 py-1.5 font-mono text-[8px] uppercase tracking-[.14em] text-zinc-500 backdrop-blur-md">
              Capture {String(activeIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </div>

            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4 sm:bottom-5 sm:left-5 sm:right-5">
              <div>
                <div className="text-lg font-black text-white sm:text-xl">{activeWin.symbol}</div>
                <div className="mt-1 font-mono text-[8px] uppercase tracking-[.16em] text-zinc-600">Shared inside SLC</div>
              </div>
              <div className="wins-gain text-3xl font-black tracking-[-.04em] text-yellow-300 sm:text-4xl">{activeWin.gain}</div>
            </div>
          </div>

          <div className="mt-2 h-0.5 overflow-hidden rounded-full bg-white/[.04]">
            <div key={`${activeIndex}-${paused}`} className="wins-progress h-full bg-gradient-to-r from-[#8f6510] via-[#d4af37] to-[#f7dc7a]" style={{ animationPlayState: paused ? "paused" : "running" }} />
          </div>
        </div>

        <button
          type="button"
          onClick={() => goTo(activeIndex + 1)}
          className="wins-side-card wins-side-right group hidden overflow-hidden rounded-[1.5rem] border border-white/[.055] bg-black/55 p-2 text-left lg:block"
          aria-label={`View next SLC W: ${nextWin.symbol}`}
        >
          <div className="relative h-[340px] overflow-hidden rounded-[1.15rem] bg-black/80">
            <img src={nextWin.image} alt={`${nextWin.symbol} SLC W`} className="h-full w-full object-contain opacity-55 transition duration-300 group-hover:opacity-80" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-l from-black/55 via-transparent to-black/20" />
            <div className="absolute bottom-4 right-4 text-right">
              <div className="text-xs font-black text-zinc-400">{nextWin.symbol}</div>
              <div className="mt-1 text-lg font-black text-yellow-300/60">{nextWin.gain}</div>
            </div>
          </div>
        </button>
      </div>

      <div className="relative mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => goTo(activeIndex - 1)} className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[.06] bg-white/[.018] text-zinc-500 transition hover:border-yellow-400/20 hover:text-yellow-300" aria-label="Previous SLC W">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button type="button" onClick={() => goTo(activeIndex + 1)} className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[.06] bg-white/[.018] text-zinc-500 transition hover:border-yellow-400/20 hover:text-yellow-300" aria-label="Next SLC W">
            <ChevronRight className="h-4 w-4" />
          </button>
          <div className="ml-2 flex items-center gap-1.5">
            {WINS.map((win, index) => (
              <button
                key={win.image}
                type="button"
                onClick={() => goTo(index)}
                aria-label={`View ${win.symbol}`}
                className={`h-1.5 rounded-full transition-all ${index === activeIndex ? "w-6 bg-yellow-300" : "w-1.5 bg-zinc-800 hover:bg-zinc-600"}`}
              />
            ))}
          </div>
        </div>

        <p className="max-w-xl text-[10px] leading-5 text-zinc-700 sm:text-right">
          Community-shared screenshots are shown as received. Individual outcomes vary. SLC does not execute trades or guarantee results.
        </p>
      </div>
    </div>
  );
}

function MethodStep({ number, icon: Icon, title, children, final = false }) {
  return (
    <div className="relative flex gap-5 pb-8 last:pb-0">
      {!final && <div className="absolute left-[19px] top-10 bottom-0 w-px bg-gradient-to-b from-yellow-400/25 to-white/[.04]" />}
      <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-yellow-400/18 bg-[#0a0b07] text-yellow-300 shadow-[0_0_25px_rgba(212,175,55,.06)]">
        <Icon className="h-[18px] w-[18px]" />
      </div>
      <div className="pt-0.5">
        <div className="font-mono text-[8px] font-bold uppercase tracking-[.2em] text-zinc-700">Protocol {number}</div>
        <h3 className="mt-1 text-base font-black text-white">{title}</h3>
        <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-500">{children}</p>
      </div>
    </div>
  );
}

function TrustCard({ icon: Icon, label, title, children }) {
  return (
    <div className="trust-card rounded-2xl border border-white/[.06] bg-white/[.017] p-5 sm:p-6">
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-yellow-400/15 bg-yellow-400/[.05] text-yellow-300">
          <Icon className="h-5 w-5" />
        </div>
        <span className="font-mono text-[8px] uppercase tracking-[.18em] text-zinc-700">{label}</span>
      </div>
      <h3 className="mt-5 text-lg font-black text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-zinc-500">{children}</p>
    </div>
  );
}

function FAQItem({ question, children }) {
  return (
    <details className="faq-item group border-b border-white/[.055] py-5 last:border-0">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left text-sm font-black text-white">
        {question}
        <ChevronDown className="h-4 w-4 shrink-0 text-zinc-600 transition group-open:rotate-180 group-open:text-yellow-300" />
      </summary>
      <p className="mt-3 max-w-3xl pr-8 text-sm leading-6 text-zinc-500">{children}</p>
    </details>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#030402] text-zinc-100 selection:bg-yellow-400 selection:text-black">
      <AmbientSystem />

      <header className="fixed inset-x-0 top-0 z-50 border-b border-yellow-400/[.07] bg-black/65 backdrop-blur-xl">
        <Container>
          <div className="flex h-16 items-center justify-between gap-4">
            <a href="#top" className="flex min-w-0 items-center gap-3">
              <img src={LOGO_IMG} alt="SLC" className="h-10 w-10 shrink-0 rounded-full border border-yellow-400/20 object-cover shadow-[0_0_26px_rgba(212,175,55,.10)]" />
              <div className="min-w-0 leading-none">
                <div className="text-sm font-black tracking-wide text-white">SLC</div>
                <div className="mt-1 truncate text-[8px] uppercase tracking-[.22em] text-zinc-600">Steez Liquidity Cartel</div>
              </div>
            </a>

            <nav className="hidden items-center gap-6 text-[10px] font-bold uppercase tracking-[.12em] text-zinc-500 lg:flex">
              <a href="#scanner" className="transition hover:text-white">Scanner</a>
              <a href="#performance" className="transition hover:text-white">Performance</a>
              <a href="#wins" className="transition hover:text-white">W's</a>
              <a href="#methodology" className="transition hover:text-white">Methodology</a>
              <a href="#ecosystem" className="transition hover:text-white">Ecosystem</a>
              <a href="#trust" className="transition hover:text-white">Trust</a>
            </nav>

            <div className="flex items-center gap-2">
              <div className="hidden sm:block"><SystemStatus /></div>
              <Button href={FLOOR_URL} variant="dark" className="px-4 py-2.5">Enter SLC</Button>
            </div>
          </div>
        </Container>
      </header>

      <main id="top" className="relative z-10">
        <section className="relative flex min-h-[100svh] items-center overflow-hidden pb-16 pt-28 sm:pt-32">
          <div className="hero-radial pointer-events-none absolute inset-0" />
          <Container>
            <div className="grid items-center gap-14 lg:grid-cols-[1.02fr_.98fr] lg:gap-16">
              <div className="relative z-10">
                <div className="mb-5"><SystemStatus /></div>
                <Eyebrow icon={Radar}>Proprietary trench intelligence</Eyebrow>
                <h1 className="max-w-4xl text-balance text-5xl font-black leading-[.94] tracking-[-.052em] text-white sm:text-7xl lg:text-[5.55rem]">
                  Information before
                  <span className="gold-text block">attention arrives.</span>
                </h1>
                <p className="mt-7 max-w-2xl text-pretty text-base leading-7 text-zinc-400 sm:text-lg">
                  SLC is a private-market intelligence ecosystem built to surface meaningful movement early, measure what happens next, and leave the final decision where it belongs — with you.
                </p>

                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <Button href={SCANNER_PRO_URL}>
                    Explore Scanner Pro <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button href="#performance" variant="dark">
                    View performance
                  </Button>
                </div>

                <div className="mt-8 grid max-w-2xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[.055] bg-white/[.055] sm:grid-cols-4">
                  {[
                    ["30s", "Validated observation"],
                    ["72h", "Tracking window"],
                    ["7D / 30D", "Public ledger"],
                    ["0", "Trade execution"],
                  ].map(([value, label]) => (
                    <div key={label} className="bg-[#060704]/92 px-4 py-4">
                      <div className="text-lg font-black text-white">{value}</div>
                      <div className="mt-1 text-[8px] uppercase tracking-[.12em] text-zinc-700">{label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <HeroVisual />
            </div>
          </Container>

          <div className="absolute inset-x-0 bottom-0 border-y border-yellow-400/[.06] bg-black/30 py-3 backdrop-blur-sm">
            <div className="ticker-track flex min-w-max items-center gap-8 text-[8px] font-black uppercase tracking-[.2em] text-zinc-700">
              {[...Array(2)].flatMap((_, repeat) => [
                "PROPRIETARY PIPELINE",
                "VALIDATED OBSERVATIONS",
                "NO COPY-TRADING",
                "PUBLIC PERFORMANCE LEDGER",
                "PRIVATE INTELLIGENCE LAYER",
                "DECISIONS STAY YOURS",
              ].map((item, index) => (
                <React.Fragment key={`${repeat}-${index}`}>
                  <span>{item}</span><span className="h-1 w-1 rounded-full bg-yellow-400/35" />
                </React.Fragment>
              )))}
            </div>
          </div>
        </section>

        <Section id="scanner" className="border-b border-yellow-400/[.07] bg-black/20">
          <Container>
            <div className="grid items-start gap-14 lg:grid-cols-[.92fr_1.08fr] lg:gap-20">
              <div className="lg:sticky lg:top-28">
                <Eyebrow icon={ScanLine}>SLC Trench Scanner</Eyebrow>
                <h2 className="max-w-xl text-4xl font-black tracking-[-.04em] text-white sm:text-5xl">
                  A cleaner view of a dirty market.
                </h2>
                <p className="mt-6 max-w-xl text-base leading-7 text-zinc-400">
                  The trenches are filled with noise, scams, manufactured conviction and recycled attention. Scanner Pro is designed to compress that chaos into structured information while movement is still developing.
                </p>
                <p className="mt-4 max-w-xl text-base leading-7 text-zinc-500">
                  SLC does not promise an outcome and does not execute a trade. It surfaces the opportunity, records the entry state, and measures what follows.
                </p>

                <div className="mt-8 overflow-hidden rounded-2xl border border-yellow-400/10 bg-yellow-400/[.025]">
                  <img src={SCANNER_IMG} alt="SLC Trench Scanner" className="w-full object-cover opacity-90" />
                </div>
              </div>

              <div>
                <ScannerAlertPreview />

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <IntelligenceLayerCard icon={Zap} number="1" title="Real-time surface">
                    Eligible contracts enter the Scanner pipeline while the information still has time value.
                  </IntelligenceLayerCard>
                  <IntelligenceLayerCard icon={Database} number="2" title="Locked entry state">
                    Entry market cap and timestamp are recorded before the performance outcome is known.
                  </IntelligenceLayerCard>
                  <IntelligenceLayerCard icon={Activity} number="3" title="Continuous validation">
                    Performance monitoring runs on validated observations rather than a single hindsight snapshot.
                  </IntelligenceLayerCard>
                  <IntelligenceLayerCard icon={ShieldCheck} number="4" title="Measured proof" tone="gold">
                    Finalized calls feed a public performance layer designed to make the Scanner accountable to its own data.
                  </IntelligenceLayerCard>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        <Section id="performance">
          <Container>
            <div className="mx-auto max-w-3xl text-center">
              <Eyebrow icon={BarChart3}>Performance ledger</Eyebrow>
              <h2 className="text-balance text-4xl font-black tracking-[-.04em] text-white sm:text-6xl">
                Private edge. <span className="gold-text">Public proof.</span>
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-zinc-400">
                We do not publish the machinery that creates the edge. We do publish what happens after an eligible contract enters the Scanner.
              </p>
            </div>

            <PerformanceLedger />
          </Container>
        </Section>

        <Section id="wins" className="border-y border-yellow-400/[.07] bg-black/20">
          <Container>
            <div className="mx-auto max-w-3xl text-center">
              <Eyebrow icon={Images}>SLC W's</Eyebrow>
              <h2 className="text-balance text-4xl font-black tracking-[-.04em] text-white sm:text-6xl">
                The stats tell one side. <span className="gold-text">These are the W's.</span>
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-zinc-400">
                Screenshots get shared back inside SLC every week. I wanted a piece of that history on the site too.
              </p>
            </div>

            <WinsArchive />
          </Container>
        </Section>

        <Section id="methodology" className="border-y border-yellow-400/[.07] bg-black/20">
          <Container>
            <div className="grid gap-14 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
              <div>
                <Eyebrow icon={Fingerprint}>Measurement methodology</Eyebrow>
                <h2 className="text-4xl font-black tracking-[-.04em] text-white sm:text-5xl">Transparent where it matters.</h2>
                <p className="mt-6 max-w-xl leading-7 text-zinc-400">
                  The source layer is proprietary. The measurement layer is not. Once an eligible contract surfaces through SLC, the performance process follows the same rules.
                </p>

                <div className="mt-8 rounded-2xl border border-yellow-400/12 bg-yellow-400/[.025] p-5">
                  <div className="flex items-start gap-3">
                    <LockKeyhole className="mt-0.5 h-5 w-5 shrink-0 text-yellow-300" />
                    <div>
                      <div className="text-sm font-black text-white">What stays private</div>
                      <p className="mt-2 text-sm leading-6 text-zinc-500">
                        Internal sourcing logic, contributor structure, weighting, filtering, thresholds and intelligence workflows are intentionally not disclosed.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 rounded-2xl border border-white/[.06] bg-white/[.015] p-5">
                  <div className="flex items-start gap-3">
                    <Eye className="mt-0.5 h-5 w-5 shrink-0 text-zinc-300" />
                    <div>
                      <div className="text-sm font-black text-white">What becomes measurable</div>
                      <p className="mt-2 text-sm leading-6 text-zinc-500">
                        The recorded entry, observation window, finalized performance distribution and top surfaced outcomes.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-[1.8rem] border border-white/[.06] bg-[#070805]/80 p-6 sm:p-8">
                <MethodStep number="01" icon={Radar} title="Surface">
                  An eligible contract enters the proprietary SLC intelligence pipeline. The public methodology begins here — not with disclosure of the source layer.
                </MethodStep>
                <MethodStep number="02" icon={Database} title="Record">
                  Entry market cap and timestamp are captured at the Scanner state used for performance measurement.
                </MethodStep>
                <MethodStep number="03" icon={ShieldCheck} title="Validate">
                  Abnormal market-cap observations are filtered through validation logic before they can alter recorded performance.
                </MethodStep>
                <MethodStep number="04" icon={Clock3} title="Track">
                  Market cap is observed on a 30-second cadence across a 72-hour tracking window.
                </MethodStep>
                <MethodStep number="05" icon={BarChart3} title="Finalize" final>
                  The completed record enters the performance ledger. Public statistics are calculated from finalized eligible calls under the same measurement rules.
                </MethodStep>
              </div>
            </div>
          </Container>
        </Section>

        <Section id="edge">
          <Container>
            <div className="overflow-hidden rounded-[2rem] border border-yellow-400/14 bg-[#070805]/90">
              <div className="grid lg:grid-cols-2">
                <div className="relative min-h-[420px] overflow-hidden border-b border-yellow-400/[.08] lg:border-b-0 lg:border-r">
                  <img src={BANNER_IMG} alt="SLC intelligence network" className="absolute inset-0 h-full w-full object-cover opacity-45" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/70" />
                  <div className="relative flex h-full min-h-[420px] flex-col justify-end p-7 sm:p-10">
                    <Eyebrow icon={Layers3}>The SLC edge</Eyebrow>
                    <h2 className="max-w-lg text-4xl font-black tracking-[-.04em] text-white sm:text-5xl">You can verify the output without owning the blueprint.</h2>
                    <p className="mt-5 max-w-lg leading-7 text-zinc-400">
                      Good intelligence products reveal enough to earn trust and protect enough to remain useful. SLC is built around that line.
                    </p>
                  </div>
                </div>

                <div className="grid gap-px bg-white/[.055] sm:grid-cols-2">
                  <div className="bg-[#080906] p-7 sm:p-8">
                    <Eye className="h-5 w-5 text-yellow-300" />
                    <div className="mt-5 text-[9px] font-black uppercase tracking-[.18em] text-zinc-700">Published</div>
                    <ul className="mt-4 space-y-3 text-sm text-zinc-400">
                      {["Finalized call counts", "Outcome distributions", "Top surfaced contracts", "Measurement protocol", "Risk disclosures"].map((item) => (
                        <li key={item} className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-yellow-300" />{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-[#080906] p-7 sm:p-8">
                    <LockKeyhole className="h-5 w-5 text-yellow-300" />
                    <div className="mt-5 text-[9px] font-black uppercase tracking-[.18em] text-zinc-700">Protected</div>
                    <ul className="mt-4 space-y-3 text-sm text-zinc-500">
                      {["Signal sourcing", "Internal weighting", "Contributor intelligence", "Filtering logic", "Private network structure"].map((item) => (
                        <li key={item} className="flex items-center gap-2"><span className="h-1 w-1 rounded-full bg-zinc-700" />{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-[#080906] p-7 sm:p-8">
                    <TrendingUp className="h-5 w-5 text-yellow-300" />
                    <div className="mt-5 text-[9px] font-black uppercase tracking-[.18em] text-zinc-700">Objective</div>
                    <p className="mt-4 text-sm leading-6 text-zinc-500">Increase the amount of useful information available before a trader commits capital — without replacing independent thought.</p>
                  </div>
                  <div className="bg-[linear-gradient(145deg,rgba(212,175,55,.08),#080906_55%)] p-7 sm:p-8">
                    <Fingerprint className="h-5 w-5 text-yellow-300" />
                    <div className="mt-5 text-[9px] font-black uppercase tracking-[.18em] text-zinc-700">Principle</div>
                    <p className="mt-4 text-sm font-black leading-6 text-white">Keep the edge private.<br />Make the results measurable.</p>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        <Section id="ecosystem" className="border-y border-yellow-400/[.07] bg-black/20">
          <Container>
            <div className="mx-auto max-w-3xl text-center">
              <Eyebrow icon={Layers3}>SLC ecosystem</Eyebrow>
              <h2 className="text-4xl font-black tracking-[-.04em] text-white sm:text-5xl">One system. Different depth.</h2>
              <p className="mx-auto mt-5 max-w-xl leading-7 text-zinc-400">The public layer builds context. Scanner Pro provides speed. The Black Ledger remains intentionally selective.</p>
            </div>

            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              <div className="tier-card flex flex-col rounded-[1.7rem] border border-white/[.065] bg-white/[.017] p-7">
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[.08] bg-white/[.025]"><Users className="h-5 w-5 text-zinc-300" /></div>
                  <span className="font-mono text-[8px] uppercase tracking-[.18em] text-zinc-700">Layer 01 // Free</span>
                </div>
                <h3 className="mt-7 text-2xl font-black text-white">SLC Floor</h3>
                <p className="mt-3 min-h-[72px] text-sm leading-6 text-zinc-500">The public-facing intelligence floor: market discussion, education, Scanner previews and proof of movement.</p>
                <ul className="mt-6 space-y-3 text-sm text-zinc-400">
                  {["Community access", "Scanner Preview", "Scanner milestones"].map((item) => <li key={item} className="flex items-center gap-2"><Check className="h-4 w-4 text-yellow-300" />{item}</li>)}
                </ul>
                <Button href={FLOOR_URL} variant="dark" className="mt-8 w-full">Floor access <ArrowRight className="h-4 w-4" /></Button>
              </div>

              <div className="tier-card tier-card-featured relative flex flex-col rounded-[1.7rem] border border-yellow-400/30 bg-[linear-gradient(165deg,rgba(212,175,55,.12),rgba(255,255,255,.02)_42%,rgba(0,0,0,.2))] p-7 shadow-[0_0_75px_rgba(212,175,55,.07)]">
                <div className="absolute right-5 top-5 rounded-full border border-yellow-400/20 bg-yellow-400/[.07] px-3 py-1 font-mono text-[8px] font-black uppercase tracking-[.18em] text-yellow-300">Flagship</div>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-yellow-400/25 bg-yellow-400/[.075]"><Zap className="h-5 w-5 text-yellow-300" /></div>
                <h3 className="mt-7 text-2xl font-black text-white">Scanner Pro</h3>
                <div className="mt-2 flex items-end gap-2"><span className="text-3xl font-black text-white">$44.99</span><span className="pb-1 text-xs text-zinc-600">/ month</span></div>
                <p className="mt-4 min-h-[72px] text-sm leading-6 text-zinc-300">Live Scanner access for traders who want the intelligence when it has the most time value.</p>
                <ul className="mt-6 space-y-3 text-sm text-zinc-200">
                  {["Real-time scanner", "Wallet alerts", "Scanner discussion", "Performance results"].map((item) => <li key={item} className="flex items-center gap-2"><Check className="h-4 w-4 text-yellow-300" />{item}</li>)}
                </ul>
                <Button href={SCANNER_PRO_URL} className="mt-8 w-full">Scanner Pro <ArrowRight className="h-4 w-4" /></Button>
              </div>

              <div className="tier-card flex flex-col rounded-[1.7rem] border border-white/[.065] bg-white/[.017] p-7">
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[.08] bg-white/[.025]"><LockKeyhole className="h-5 w-5 text-zinc-300" /></div>
                  <span className="font-mono text-[8px] uppercase tracking-[.18em] text-zinc-700">Layer 03 // Selective</span>
                </div>
                <h3 className="mt-7 text-2xl font-black text-white">Black Ledger</h3>
                <p className="mt-3 min-h-[72px] text-sm leading-6 text-zinc-500">The private intelligence layer inside SLC. Built around trusted contributors, research and conviction.</p>
                <ul className="mt-6 space-y-3 text-sm text-zinc-400">
                  {["Private intelligence", "Research layer", "Referral + vetting"].map((item) => <li key={item} className="flex items-center gap-2"><Check className="h-4 w-4 text-yellow-300" />{item}</li>)}
                </ul>
                <div className="mt-8 rounded-xl border border-white/[.06] bg-black/30 px-4 py-3 text-center text-[10px] font-black uppercase tracking-[.12em] text-zinc-600">Not publicly sold</div>
              </div>
            </div>
          </Container>
        </Section>

        <Section id="trust">
          <Container>
            <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
              <div>
                <Eyebrow icon={ShieldCheck}>Trust architecture</Eyebrow>
                <h2 className="text-4xl font-black tracking-[-.04em] text-white sm:text-5xl">Built to inform. Not to take control.</h2>
                <p className="mt-6 max-w-xl leading-7 text-zinc-400">SLC is intentionally separated from trade execution and asset custody. The Scanner provides information; it does not need control of your funds to do its job.</p>
                <div className="mt-7 flex flex-wrap gap-2">
                  {["No seed phrases", "No custody", "No trade execution", "No guaranteed returns"].map((tag) => (
                    <span key={tag} className="rounded-full border border-white/[.06] bg-white/[.018] px-3 py-2 text-[9px] font-black uppercase tracking-[.14em] text-zinc-600">{tag}</span>
                  ))}
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <TrustCard icon={ShieldCheck} label="Security" title="Edge-protected public site">The public SLC experience is served through Cloudflare with hardened browser security headers and a deliberately small attack surface.</TrustCard>
                <TrustCard icon={Wallet} label="Custody" title="Your capital stays yours">Scanner Pro is an informational product. SLC does not need your seed phrase or custody of your trading wallet.</TrustCard>
                <TrustCard icon={Fingerprint} label="Integrity" title="Measurement before outcome">Entry states are recorded before the result is known, and finalized performance follows a defined observation protocol.</TrustCard>
                <TrustCard icon={LockKeyhole} label="Privacy" title="The source layer stays protected">Transparency does not require publishing the internal network, proprietary sourcing logic or intelligence workflows.</TrustCard>
              </div>
            </div>
          </Container>
        </Section>

        <Section className="border-t border-yellow-400/[.07] bg-black/20">
          <Container>
            <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
              <div>
                <Eyebrow>Direct answers</Eyebrow>
                <h2 className="text-4xl font-black tracking-[-.04em] text-white">No smoke.</h2>
                <p className="mt-4 max-w-md text-sm leading-6 text-zinc-500">The things a skeptical trader should be able to understand before paying for anything.</p>
              </div>
              <div className="rounded-2xl border border-white/[.06] bg-white/[.015] px-5 sm:px-7">
                <FAQItem question="Does Scanner Pro tell me what to buy?">No. It surfaces market intelligence and tracks performance. Research, execution, sizing and risk decisions remain yours.</FAQItem>
                <FAQItem question="Are the performance cards only the winning calls?">The public distribution is calculated from finalized eligible calls in the selected reporting window. Top 3 runners are shown separately because they are the strongest outcomes inside that same measured set.</FAQItem>
                <FAQItem question="How does SLC find the contracts?">Eligible contracts surface through a proprietary SLC intelligence pipeline. The sourcing layer is part of the edge and is intentionally not published.</FAQItem>
                <FAQItem question="Why not disclose the entire system?">Because transparency and replication are different things. SLC exposes the measurement process and performance evidence while protecting the internal sourcing and filtering architecture.</FAQItem>
                <FAQItem question="Does historical performance guarantee anything?">No. Meme and cryptocurrency markets are highly speculative. Historical movement is evidence of past Scanner behavior, not a promise of future returns.</FAQItem>
              </div>
            </div>
          </Container>
        </Section>

        <Section id="access">
          <Container>
            <div className="access-panel relative overflow-hidden rounded-[2.1rem] border border-yellow-400/18 bg-black/60 px-6 py-14 text-center shadow-[0_40px_110px_rgba(0,0,0,.5)] sm:px-12 sm:py-20">
              <img src={BANNER_IMG} alt="" className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[.18]" aria-hidden="true" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,.11),rgba(0,0,0,.84)_58%)]" />
              <div className="relative mx-auto max-w-3xl">
                <img src={LOGO_IMG} alt="SLC" className="mx-auto h-16 w-16 rounded-full border border-yellow-400/20 object-cover shadow-[0_0_45px_rgba(212,175,55,.16)]" />
                <div className="mt-6 text-[9px] font-black uppercase tracking-[.22em] text-yellow-300/75">Public access // preparing launch</div>
                <h2 className="mt-4 text-balance text-4xl font-black tracking-[-.045em] text-white sm:text-6xl">The trenches will stay chaotic.</h2>
                <p className="gold-text mt-1 text-balance text-4xl font-black tracking-[-.045em] sm:text-6xl">Your information does not have to.</p>
                <p className="mx-auto mt-6 max-w-xl leading-7 text-zinc-400">The Floor is the front door. Scanner Pro is the intelligence layer built for speed. Access links will open when the public release is ready.</p>
                <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                  <Button href={FLOOR_URL}>SLC Floor <ArrowRight className="h-4 w-4" /></Button>
                  <Button href={SCANNER_PRO_URL} variant="dark">Scanner Pro — Soon</Button>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      </main>

      <footer className="relative z-10 border-t border-yellow-400/[.07] bg-black/35">
        <Container>
          <div className="grid gap-8 py-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <div className="flex items-center gap-3">
                <img src={LOGO_IMG} alt="SLC" className="h-9 w-9 rounded-full border border-yellow-400/20 object-cover" />
                <div>
                  <div className="text-sm font-black text-white">Steez Liquidity Cartel</div>
                  <div className="mt-1 font-mono text-[8px] uppercase tracking-[.18em] text-zinc-700">Private intelligence // public proof</div>
                </div>
              </div>
              <p className="mt-4 max-w-2xl text-[11px] leading-5 text-zinc-700">SLC provides informational market tools and community discussion only. Nothing displayed is financial advice. Cryptocurrency and memecoin trading involve substantial risk. Performance data describes historical observed movement and does not guarantee future results.</p>
            </div>
            <div className="text-[10px] uppercase tracking-[.12em] text-zinc-800">© {new Date().getFullYear()} SLC</div>
          </div>
        </Container>
      </footer>
    </div>
  );
}
