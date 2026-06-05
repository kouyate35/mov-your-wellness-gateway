import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  BarChart3,
  Activity as ActivityIcon,
  PieChart,
  Trophy,
  Clock,
  Flame,
  Lock,
  Leaf,
  Hourglass,
  ChevronDown,
  ChevronRight,
  Calendar,
  Star,
  Footprints,
  Zap,
  Info,
} from "lucide-react";
import BottomNavBar from "@/components/BottomNavBar";
import categoryMoveVideo from "@/assets/category-move-video.mp4";
import categoryFlexVideo from "@/assets/category-flex-video.mp4";
import categoryBreathVideo from "@/assets/category-breath-video.mp4";
import categoryFocusVideo from "@/assets/category-focus-video.mp4";


const tabs = [
  { id: "overview", label: "Aperçu", icon: BarChart3 },
  { id: "activity", label: "Activité", icon: ActivityIcon },
  { id: "stats", label: "Stats", icon: PieChart },
  { id: "achievements", label: "Succès", icon: Trophy },
] as const;

const weekBars = [
  { day: "Lun", value: 0.62 },
  { day: "Mar", value: 0.95, peak: true },
  { day: "Mer", value: 0.4 },
  { day: "Jeu", value: 0.88 },
  { day: "Ven", value: 0.7 },
  { day: "Sam", value: 0.45 },
  { day: "Dim", value: 0, empty: true },
];

const monthlyData = [
  0.25, 0.3, 0.42, 0.4, 0.5, 0.6, 0.55, 0.6, 0.7, 0.65, 0.55, 0.58, 0.7, 0.75, 0.65, 0.8, 0.75,
  0.7, 0.72, 0.66, 0.7, 0.62, 0.55, 0.62, 0.68, 0.7, 0.74, 0.7, 0.66, 0.62, 0.68,
];

const UsageStats = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]["id"]>("overview");

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <header className="px-5 pt-[max(env(safe-area-inset-top),16px)] pb-5 flex items-start gap-3">
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 -ml-2 rounded-full flex items-center justify-center active:scale-95 transition-transform"
          aria-label="Retour"
        >
          <ChevronLeft className="w-5 h-5 text-foreground" />
        </button>
        <div className="flex-1">
          <h1 className="text-[30px] leading-[0.95] tracking-tight font-bold text-foreground">
            <span className="font-light text-foreground/45">Ta</span>{" "}
            <span className="font-bold">progression<span className="text-foreground/70">.</span></span>
          </h1>
        </div>
      </header>


      {/* Tabs */}
      <div className="px-5 mb-6">
        <div className="flex items-center gap-1 p-1 rounded-full bg-white/[0.025] border border-white/[0.05]">
          {tabs.map((t) => {
            const active = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex-1 flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-full text-[11.5px] font-semibold transition-all ${
                  active
                    ? "bg-foreground text-background shadow-[0_4px_14px_-4px_rgba(255,255,255,0.25)]"
                    : "text-muted-foreground/75"
                }`}
              >
                <t.icon className="w-3.5 h-3.5" strokeWidth={2} />
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {activeTab === "activity" && <ActivityView />}

      {activeTab !== "overview" && activeTab !== "activity" && (
        <div className="px-5 py-16 text-center text-[12.5px] text-muted-foreground/70">
          Bientôt disponible.
        </div>
      )}

      {activeTab === "overview" && (<>
      {/* This week — hero card */}
      <section className="px-5 mb-6">
        <div className="flex items-baseline justify-between mb-3 px-0.5">
          <h2 className="text-[15px] font-semibold text-foreground">Cette semaine</h2>
          <button className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.05] text-[10.5px] text-muted-foreground/85">
            5 – 11 mai
            <Calendar className="w-3 h-3" strokeWidth={2} />
          </button>
        </div>

        <div className="rounded-3xl bg-white/[0.025] border border-white/[0.05] p-5">
          <div className="flex items-center gap-5">
            {/* Progress ring */}
            <div className="relative w-[110px] h-[110px] shrink-0">
              <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90">
                <defs>
                  <linearGradient id="ring-grad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#5BA8FF" />
                    <stop offset="100%" stopColor="#9BE15D" />
                  </linearGradient>
                </defs>
                <circle cx="50" cy="50" r="44" stroke="hsl(var(--foreground))" strokeOpacity="0.08" strokeWidth="6" fill="none" />
                <circle
                  cx="50"
                  cy="50"
                  r="44"
                  stroke="url(#ring-grad)"
                  strokeWidth="6"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 44 * 0.78} ${2 * Math.PI * 44}`}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-foreground text-[26px] font-semibold tabular-nums leading-none tracking-tight">
                  78<span className="text-[13px] text-muted-foreground/70">%</span>
                </span>
                <span className="text-[9.5px] text-muted-foreground/70 mt-1 uppercase tracking-[0.14em]">
                  Atteint
                </span>
              </div>
            </div>

            {/* Mini stats */}
            <div className="flex-1 grid grid-cols-3 gap-2 min-w-0">
              {[
                { icon: Clock, value: "2h 14m", label: "Économisé", color: "#9BE15D" },
                { icon: Flame, value: "1240", label: "kcal", color: "#FF7A45" },
                { icon: Lock, value: "18", label: "Apps", color: "#5BA8FF" },
              ].map((s) => (
                <div key={s.label} className="rounded-xl bg-white/[0.03] border border-white/[0.05] p-2.5">
                  <div
                    className="w-5 h-5 rounded-md flex items-center justify-center mb-1.5"
                    style={{ backgroundColor: `${s.color}1A`, border: `1px solid ${s.color}33` }}
                  >
                    <s.icon className="w-2.5 h-2.5" strokeWidth={2} style={{ color: s.color }} />
                  </div>
                  <p className="text-foreground text-[13px] font-semibold tabular-nums leading-none">{s.value}</p>
                  <p className="text-[9px] text-muted-foreground/65 mt-1.5 leading-none">{s.label}</p>
                </div>
              ))}
            </div>

          </div>

          <p className="mt-4 text-[12.5px] text-muted-foreground">
            <span className="text-foreground/90 font-medium">Bon travail, Alex.</span> Tu construis une vraie habitude.
          </p>
        </div>
      </section>

      {/* Weekly bar chart */}
      <section className="px-5 mb-6">
        <div className="rounded-3xl bg-white/[0.025] border border-white/[0.05] p-5">
          <div className="flex items-end justify-between gap-2 h-[140px] mb-3">
            {weekBars.map((b, i) => (
              <div key={i} className="flex-1 flex flex-col items-center justify-end h-full gap-2">
                <div className="w-full flex-1 flex items-end relative">
                  {b.empty ? (
                    <div className="w-full h-full rounded-md border border-dashed border-white/[0.08]" />
                  ) : (
                    <div
                      className="w-full rounded-md transition-all duration-500"
                      style={{
                        height: `${b.value * 100}%`,
                        background: b.peak
                          ? "linear-gradient(180deg, #5BA8FF 0%, #9BE15D 100%)"
                          : "rgba(255,255,255,0.12)",
                        boxShadow: b.peak ? "0 8px 20px -8px rgba(91,168,255,0.45)" : undefined,
                      }}
                    />
                  )}

                </div>
                <span
                  className={`text-[9.5px] tabular-nums ${
                    b.peak ? "text-foreground font-semibold" : "text-muted-foreground/55"
                  }`}
                >
                  {b.day}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-3 pt-3 border-t border-white/[0.05] flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#F5C84B1A", border: "1px solid #F5C84B33" }}
              >
                <Star className="w-3.5 h-3.5" strokeWidth={1.8} style={{ color: "#F5C84B" }} />
              </div>
              <div className="leading-tight">
                <p className="text-[9.5px] uppercase tracking-[0.14em] text-muted-foreground/65">Meilleur jour</p>
                <p className="text-[12px] text-foreground font-semibold">Mardi · 96%</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#FF7A451A", border: "1px solid #FF7A4533" }}
              >
                <Flame className="w-3.5 h-3.5" strokeWidth={1.8} style={{ color: "#FF7A45" }} />
              </div>
              <div className="leading-tight">
                <p className="text-[9.5px] uppercase tracking-[0.14em] text-muted-foreground/65">Série</p>
                <p className="text-[12px] text-foreground font-semibold">7 jours</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Your impact */}
      <section className="px-5 mb-6">
        <div className="flex items-baseline justify-between mb-3 px-0.5">
          <h2 className="text-[15px] font-semibold text-foreground">Ton impact</h2>
          <button className="flex items-center gap-1 text-[11px] text-muted-foreground/70">
            Tout
            <ChevronDown className="w-3 h-3" strokeWidth={2} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {[
            { icon: Hourglass, value: "16h 42m", label: "Temps écran économisé", trend: "+28%", color: "#9BE15D" },
            { icon: Flame, value: "8 274", label: "Calories brûlées", trend: "+32%", color: "#FF7A45" },
            { icon: Lock, value: "143", label: "Apps débloquées", trend: "+18%", color: "#5BA8FF" },
            { icon: Leaf, value: "21,6 kg", label: "CO₂ évité (approx.)", trend: "+15%", color: "#7FD1B9" },
          ].map((m) => (
            <div key={m.label} className="rounded-2xl bg-white/[0.025] border border-white/[0.05] p-3.5">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center mb-3"
                style={{ backgroundColor: `${m.color}1A`, border: `1px solid ${m.color}33` }}
              >
                <m.icon className="w-3.5 h-3.5" strokeWidth={1.8} style={{ color: m.color }} />
              </div>
              <p className="text-foreground text-[18px] font-semibold tabular-nums leading-none tracking-tight">
                {m.value}
              </p>
              <p className="mt-2 text-[10.5px] text-muted-foreground/70 leading-tight">{m.label}</p>
              <p className="mt-2 text-[10px] tabular-nums font-medium" style={{ color: m.color }}>
                {m.trend} <span className="text-muted-foreground/55 font-normal">vs mois dernier</span>
              </p>
            </div>
          ))}
        </div>

      </section>

      {/* Monthly progress line */}
      <section className="px-5 mb-6">
        <div className="flex items-baseline justify-between mb-3 px-0.5">
          <h2 className="text-[15px] font-semibold text-foreground">Mois</h2>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.05] text-[10.5px] text-muted-foreground/85">
              Mai 2026
              <ChevronDown className="w-3 h-3" strokeWidth={2} />
            </button>
            <button className="w-6 h-6 rounded-full bg-white/[0.03] border border-white/[0.05] flex items-center justify-center text-muted-foreground/70">
              <ChevronLeft className="w-3 h-3" />
            </button>
            <button className="w-6 h-6 rounded-full bg-white/[0.03] border border-white/[0.05] flex items-center justify-center text-muted-foreground/70">
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        <div className="rounded-3xl bg-white/[0.025] border border-white/[0.05] p-5">
          <MonthlyLineChart data={monthlyData} />
        </div>
      </section>
      </>)}


      <BottomNavBar />
    </div>
  );
};

const categoryVideos: Record<string, string> = {
  move: categoryMoveVideo,
  flex: categoryFlexVideo,
  breath: categoryBreathVideo,
  focus: categoryFocusVideo,
};

const todaySessions = [
  { id: "move", name: "MOVE", subtitle: "Corps & mobilité", meta: "12 min · 4 défis", kcal: 96 },
  { id: "flex", name: "FLEX", subtitle: "Souplesse", meta: "8 min · 3 défis", kcal: 54 },
  { id: "breath", name: "BREATH", subtitle: "Respiration", meta: "6 min · 5 défis", kcal: 22 },
  { id: "focus", name: "FOCUS", subtitle: "Discipline", meta: "4 min · 2 défis", kcal: 18 },
];

const hourlyBars = [
  3, 2, 1, 0, 0, 0, 8, 22, 48, 65, 80, 72, 55, 38, 30, 60, 95, 70, 42, 28, 58, 88, 50, 14,
];

const weekRings = [
  { d: "Lun", v: 0.82 },
  { d: "Mar", v: 0.96, best: true },
  { d: "Mer", v: 0.61 },
  { d: "Jeu", v: 1.0 },
  { d: "Ven", v: 0.78 },
  { d: "Sam", v: 0.45 },
  { d: "Dim", v: 0 },
];

const ActivityView = () => {
  const maxBar = Math.max(...hourlyBars);
  return (
    <div className="px-5 space-y-5">
      {/* Today header */}
      <div className="flex items-baseline justify-between px-0.5">
        <h2 className="text-[15px] font-semibold text-foreground">Aujourd'hui</h2>
        <button className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.05] text-[10.5px] text-muted-foreground/85">
          11 mai 2026
          <Calendar className="w-3 h-3" strokeWidth={2} />
        </button>
      </div>

      {/* Hero ring + mini stats */}
      <div className="rounded-3xl bg-white/[0.025] border border-white/[0.05] p-5">
        <div className="flex items-center gap-5">
          <div className="relative w-[118px] h-[118px] shrink-0">
            <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90">
              <defs>
                <linearGradient id="act-ring" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#5BA8FF" />
                  <stop offset="100%" stopColor="#9BE15D" />
                </linearGradient>
              </defs>
              <circle cx="50" cy="50" r="44" stroke="hsl(var(--foreground))" strokeOpacity="0.08" strokeWidth="6" fill="none" />
              <circle cx="50" cy="50" r="44" stroke="url(#act-ring)" strokeWidth="6" fill="none" strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 44 * 0.7} ${2 * Math.PI * 44}`} />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-foreground text-[28px] font-semibold tabular-nums leading-none tracking-tight">642</span>
              <span className="text-[9.5px] text-muted-foreground/70 mt-1 uppercase tracking-[0.14em]">kcal actives</span>
            </div>
          </div>

          <div className="flex-1 grid grid-cols-1 gap-2 min-w-0">
            {[
              { icon: Footprints, value: "7 842", label: "Pas" },
              { icon: Zap, value: "62 min", label: "Mouvement" },
              { icon: Trophy, value: "5", label: "Sessions" },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05] px-2.5 py-2">
                <div className="w-6 h-6 rounded-md bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
                  <s.icon className="w-3 h-3 text-foreground/80" strokeWidth={2} />
                </div>
                <div className="leading-tight flex-1">
                  <p className="text-foreground text-[13px] font-semibold tabular-nums">{s.value}</p>
                  <p className="text-[9.5px] text-muted-foreground/65 mt-0.5">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between mb-1.5">
            <p className="text-[11px] text-muted-foreground/80">
              <span className="text-foreground/90 font-medium">70%</span> de ton objectif quotidien
            </p>
            <p className="text-[11px] text-foreground/80 font-semibold tabular-nums">70%</p>
          </div>
          <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
            <div className="h-full rounded-full" style={{ width: "70%", background: "linear-gradient(90deg, #5BA8FF 0%, #9BE15D 100%)" }} />
          </div>
        </div>
      </div>

      {/* Activity timeline */}
      <div className="rounded-3xl bg-white/[0.025] border border-white/[0.05] p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1.5">
            <h3 className="text-[13px] font-semibold text-foreground">Timeline du jour</h3>
            <Info className="w-3 h-3 text-muted-foreground/50" />
          </div>
          <button className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.05] text-[10.5px] text-muted-foreground/85">
            Calories
            <ChevronDown className="w-3 h-3" strokeWidth={2} />
          </button>
        </div>

        <div className="flex items-end justify-between gap-[3px] h-[110px]">
          {hourlyBars.map((v, i) => {
            const isPeak = v === maxBar;
            return (
              <div key={i} className="flex-1 flex items-end h-full">
                <div
                  className="w-full rounded-sm transition-all"
                  style={{
                    height: `${(v / maxBar) * 100}%`,
                    background: isPeak
                      ? "linear-gradient(180deg, #5BA8FF 0%, #9BE15D 100%)"
                      : "rgba(255,255,255,0.10)",
                  }}
                />
              </div>
            );
          })}
        </div>
        <div className="flex justify-between mt-2 text-[9px] text-muted-foreground/55 tabular-nums">
          <span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>24:00</span>
        </div>
      </div>

      {/* Sessions per category */}
      <div>
        <div className="flex items-baseline justify-between mb-3 px-0.5">
          <h2 className="text-[15px] font-semibold text-foreground">Sessions</h2>
          <button className="flex items-center gap-1 text-[11px] text-muted-foreground/70">
            Tout
            <ChevronRight className="w-3 h-3" strokeWidth={2} />
          </button>
        </div>

        <div className="space-y-2">
          {todaySessions.map((s) => {
            const video = categoryVideos[s.id];
            return (
              <div
                key={s.id}
                className="flex items-center gap-3 rounded-2xl bg-white/[0.025] border border-white/[0.05] p-3"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-semibold text-foreground leading-tight">{s.name}</p>
                  <p className="text-[10.5px] uppercase tracking-[0.12em] text-muted-foreground/70 mt-1 font-medium">
                    {s.subtitle}
                  </p>
                  <p className="text-[10.5px] text-muted-foreground/60 mt-1 tabular-nums">{s.meta}</p>
                </div>

                {/* Animated category bubble */}
                <div className="relative flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-2xl bg-white/[0.04] border border-white/[0.06] shrink-0">
                  <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-black shrink-0">
                    {video ? (
                      <video
                        src={video}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-white/15 to-white/[0.02]" />
                    )}
                  </div>
                  <div className="flex flex-col leading-tight">
                    <span className="text-[11.5px] font-semibold text-foreground tabular-nums">
                      {s.kcal} kcal
                    </span>
                    <span className="text-[10px] text-muted-foreground/75">Terminé</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Weekly rings */}
      <div className="rounded-3xl bg-white/[0.025] border border-white/[0.05] p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[13px] font-semibold text-foreground">Anneaux de la semaine</h3>
          <span className="text-[10.5px] text-muted-foreground/70">5 – 11 mai</span>
        </div>
        <div className="flex items-end justify-between gap-1">
          {weekRings.map((r) => {
            const C = 2 * Math.PI * 16;
            return (
              <div key={r.d} className="flex flex-col items-center gap-1.5">
                <div className="relative w-9 h-9">
                  <svg viewBox="0 0 40 40" className="-rotate-90">
                    <circle cx="20" cy="20" r="16" stroke="hsl(var(--foreground))" strokeOpacity="0.08" strokeWidth="3.5" fill="none" />
                    {r.v > 0 && (
                      <circle
                        cx="20" cy="20" r="16"
                        stroke={r.best ? "url(#act-ring)" : "rgba(255,255,255,0.55)"}
                        strokeWidth="3.5"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={`${C * Math.min(r.v, 1)} ${C}`}
                      />
                    )}
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[9px] font-semibold text-foreground/90 tabular-nums">
                      {r.v > 0 ? `${Math.round(r.v * 100)}` : "–"}
                    </span>
                  </div>
                </div>
                <span className="text-[9.5px] text-muted-foreground/65">{r.d}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const MonthlyLineChart = ({ data }: { data: number[] }) => {

  const W = 320;
  const H = 130;
  const step = W / (data.length - 1);
  const points = data.map((v, i) => [i * step, H - v * (H - 16) - 8] as const);
  const polyline = points.map((p) => p.join(",")).join(" ");
  const area = `0,${H} ${polyline} ${W},${H}`;

  // Highlight day 16
  const highlightIdx = 15;
  const [hx, hy] = points[highlightIdx];

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${W} ${H + 28}`} className="w-full">
        {/* Grid */}
        {[0, 0.33, 0.66, 1].map((t) => (
          <line
            key={t}
            x1={0}
            x2={W}
            y1={H - t * (H - 16) - 8}
            y2={H - t * (H - 16) - 8}
            stroke="hsl(var(--foreground))"
            strokeOpacity="0.05"
            strokeDasharray="2 3"
          />
        ))}

        <defs>
          <linearGradient id="line-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5BA8FF" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#5BA8FF" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="line-stroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#5BA8FF" />
            <stop offset="100%" stopColor="#9BE15D" />
          </linearGradient>
        </defs>

        <polygon points={area} fill="url(#line-fill)" />
        <polyline
          points={polyline}
          fill="none"
          stroke="url(#line-stroke)"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Highlight dot */}
        <circle cx={hx} cy={hy} r="4.5" fill="#5BA8FF" />
        <circle cx={hx} cy={hy} r="8" fill="#5BA8FF" fillOpacity="0.2" />


        {/* X labels */}
        {[1, 7, 14, 21, 28, 31].map((d) => (
          <text
            key={d}
            x={(d - 1) * step}
            y={H + 18}
            fontSize="9"
            fill="hsl(var(--muted-foreground))"
            fillOpacity="0.6"
            textAnchor="middle"
          >
            {d}
          </text>
        ))}
      </svg>

      {/* Tooltip */}
      <div
        className="absolute -translate-x-1/2 -translate-y-full px-2.5 py-1.5 rounded-lg bg-white/[0.06] border border-white/[0.08] backdrop-blur-sm shadow-lg pointer-events-none"
        style={{
          left: `${(hx / W) * 100}%`,
          top: `${(hy / (H + 28)) * 100}%`,
          marginTop: "-6px",
        }}
      >
        <p className="text-[9px] text-muted-foreground/70 leading-none">16 mai</p>
        <p className="text-[11px] font-semibold text-foreground tabular-nums leading-tight mt-0.5">2h 32m</p>
      </div>
    </div>
  );
};

export default UsageStats;
