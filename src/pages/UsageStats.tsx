import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  TrendingUp,
  Flame,
  Wind,
  StretchHorizontal,
  Brain,
  Zap,
  Trophy,
  Calendar,
  Clock,
  ChevronRight,
  Target,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { getAppIcon } from "@/components/AppIcons";

// ── Mock data ──────────────────────────────────────────────
const weeklyData = [
  { day: "Lun", value: 42, prev: 38 },
  { day: "Mar", value: 28, prev: 35 },
  { day: "Mer", value: 65, prev: 50 },
  { day: "Jeu", value: 51, prev: 45 },
  { day: "Ven", value: 73, prev: 60 },
  { day: "Sam", value: 35, prev: 42 },
  { day: "Dim", value: 18, prev: 25 },
];

const monthlyData = [
  { day: "S1", value: 210, prev: 180 },
  { day: "S2", value: 285, prev: 240 },
  { day: "S3", value: 190, prev: 220 },
  { day: "S4", value: 320, prev: 260 },
];

const quarterlyData = [
  { day: "Jan", value: 620, prev: 500 },
  { day: "Fév", value: 780, prev: 620 },
  { day: "Mar", value: 540, prev: 700 },
];

const biannualData = [
  { day: "Jan", value: 620, prev: 500 },
  { day: "Fév", value: 780, prev: 620 },
  { day: "Mar", value: 540, prev: 700 },
  { day: "Avr", value: 910, prev: 540 },
  { day: "Mai", value: 670, prev: 850 },
  { day: "Jun", value: 850, prev: 670 },
];

const topApps = [
  { id: "tiktok", name: "TikTok", sessions: 47, max: 47, trend: "+12%" },
  { id: "instagram", name: "Instagram", sessions: 34, max: 47, trend: "+8%" },
  { id: "youtube", name: "YouTube", sessions: 21, max: 47, trend: "-3%" },
  { id: "twitter", name: "X (Twitter)", sessions: 12, max: 47, trend: "+5%" },
  { id: "snapchat", name: "Snapchat", sessions: 8, max: 47, trend: "+1%" },
];

const wellnessCards = [
  { icon: Flame, label: "Squats", value: "1 240", unit: "reps", color: "hsl(var(--move))", progress: 82 },
  { icon: Wind, label: "Respiration", value: "87", unit: "min", color: "hsl(var(--breath))", progress: 65 },
  { icon: StretchHorizontal, label: "Étirement", value: "64", unit: "min", color: "hsl(142, 70%, 45%)", progress: 48 },
  { icon: Brain, label: "Focus", value: "31", unit: "sessions", color: "hsl(var(--focus))", progress: 38 },
];

const streakData = [
  { day: "L", active: true },
  { day: "M", active: true },
  { day: "M", active: true },
  { day: "J", active: true },
  { day: "V", active: true },
  { day: "S", active: false },
  { day: "D", active: false },
];

const periods = ["7J", "1M", "3M", "6M"] as const;
type Period = (typeof periods)[number];

const dataByPeriod: Record<Period, typeof weeklyData> = {
  "7J": weeklyData,
  "1M": monthlyData,
  "3M": quarterlyData,
  "6M": biannualData,
};

// ── Progress Ring SVG ─────────────────────────────────────
const ProgressRing = ({
  progress,
  size = 64,
  strokeWidth = 4,
  color,
  children,
}: {
  progress: number;
  size?: number;
  strokeWidth?: number;
  color: string;
  children?: React.ReactNode;
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="hsl(0 0% 20%)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};

// ── Custom tooltip ─────────────────────────────────────────
const ChartTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-popover/95 backdrop-blur-md border border-border/50 rounded-xl px-3.5 py-2 shadow-2xl">
      <p className="text-foreground text-sm font-semibold">{payload[0].value} min</p>
      {payload[1] && (
        <p className="text-muted-foreground text-xs">vs {payload[1].value} min</p>
      )}
    </div>
  );
};

// ── Page ───────────────────────────────────────────────────
const UsageStats = () => {
  const navigate = useNavigate();
  const [activePeriod, setActivePeriod] = useState<Period>("7J");

  const chartData = dataByPeriod[activePeriod];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* ── Header ──────────────────────────── */}
      <header className="flex items-center justify-between px-4 pt-[env(safe-area-inset-top,12px)] pb-3 sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border/20">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-secondary/60 flex items-center justify-center text-foreground/80 hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-foreground text-base font-semibold">Statistiques</h1>
        <button className="w-10 h-10 rounded-full bg-secondary/60 flex items-center justify-center text-foreground/80">
          <Calendar className="w-4.5 h-4.5" />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto">
        {/* ── Hero Section — Big Ring + Metric ── */}
        <section className="px-5 pt-8 pb-6 flex flex-col items-center text-center">
          <ProgressRing progress={78} size={140} strokeWidth={6} color="hsl(142, 70%, 45%)">
            <div className="flex flex-col items-center">
              <span className="text-foreground text-3xl font-bold tracking-tight leading-none">78%</span>
              <span className="text-muted-foreground text-[10px] mt-0.5">objectif</span>
            </div>
          </ProgressRing>

          <div className="mt-5">
            <p className="text-muted-foreground text-xs uppercase tracking-[0.15em] mb-1.5">
              Temps économisé
            </p>
            <span className="text-foreground text-[2.75rem] leading-none font-bold tracking-tighter">
              12h 45m
            </span>
            <div className="flex items-center justify-center gap-1.5 mt-2">
              <div
                className="flex items-center gap-0.5 px-2.5 py-1 rounded-full"
                style={{ background: "hsla(142, 70%, 45%, 0.12)" }}
              >
                <ArrowUp className="w-3 h-3" style={{ color: "hsl(142, 70%, 45%)" }} />
                <span className="text-xs font-semibold" style={{ color: "hsl(142, 70%, 45%)" }}>
                  +2,24%
                </span>
              </div>
              <span className="text-muted-foreground text-xs">vs semaine passée</span>
            </div>
          </div>
        </section>

        {/* ── Streak Section ────────────────── */}
        <section className="px-5 pb-6">
          <div className="rounded-2xl border border-border/30 bg-secondary/20 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4" style={{ color: "hsl(45, 100%, 55%)" }} />
                <span className="text-foreground text-sm font-semibold">5 jours de streak</span>
              </div>
              <span className="text-muted-foreground text-xs">Record: 14j</span>
            </div>
            <div className="flex justify-between">
              {streakData.map((d, i) => (
                <div key={i} className="flex flex-col items-center gap-1.5">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      d.active
                        ? "text-background"
                        : "bg-secondary/60 text-muted-foreground"
                    }`}
                    style={d.active ? { background: "hsl(142, 70%, 45%)" } : {}}
                  >
                    {d.active ? "✓" : ""}
                  </div>
                  <span className={`text-[10px] font-medium ${d.active ? "text-foreground" : "text-muted-foreground"}`}>
                    {d.day}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Chart ─────────────────────────── */}
        <section className="px-5 pb-2">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-foreground text-sm font-semibold">Activité</h2>
            <div className="flex gap-1">
              {periods.map((p) => (
                <button
                  key={p}
                  onClick={() => setActivePeriod(p)}
                  className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all duration-200 ${
                    activePeriod === p
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className="h-[160px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(142, 70%, 45%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(142, 70%, 45%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "hsl(0,0%,40%)", fontSize: 10, fontWeight: 500 }}
                  dy={8}
                />
                <YAxis hide />
                <Tooltip content={<ChartTooltip />} cursor={false} />
                <Area
                  type="monotone"
                  dataKey="prev"
                  stroke="hsl(0,0%,25%)"
                  strokeWidth={1.5}
                  fill="none"
                  strokeDasharray="4 4"
                  dot={false}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(142, 70%, 45%)"
                  strokeWidth={2.5}
                  fill="url(#colorValue)"
                  dot={false}
                  activeDot={{
                    r: 4,
                    stroke: "hsl(142, 70%, 45%)",
                    strokeWidth: 2,
                    fill: "hsl(0,0%,13%)",
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* ── Quick Stats Row ───────────────── */}
        <section className="px-5 py-5">
          <div className="grid grid-cols-3 gap-2.5">
            {[
              { icon: Target, label: "Sessions", value: "122", sub: "ce mois" },
              { icon: Clock, label: "Moy./jour", value: "4,2", sub: "sessions" },
              { icon: Trophy, label: "Meilleur", value: "Ven", sub: "73 min" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-border/20 bg-secondary/20 p-3.5 flex flex-col items-center text-center gap-1"
              >
                <div className="w-8 h-8 rounded-full bg-secondary/80 flex items-center justify-center mb-0.5">
                  <stat.icon className="w-3.5 h-3.5 text-foreground/70" />
                </div>
                <span className="text-foreground text-lg font-bold tracking-tight">{stat.value}</span>
                <span className="text-muted-foreground text-[10px] leading-tight">{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Wellness Impact — Ring Cards ──── */}
        <section className="px-5 pb-5">
          <h2 className="text-foreground text-sm font-semibold mb-3">Impact bien-être</h2>
          <div className="grid grid-cols-2 gap-3">
            {wellnessCards.map((card) => (
              <div
                key={card.label}
                className="rounded-2xl border border-border/20 bg-secondary/20 p-4 flex items-center gap-3"
              >
                <ProgressRing progress={card.progress} size={48} strokeWidth={3.5} color={card.color}>
                  <card.icon className="w-4 h-4" style={{ color: card.color }} />
                </ProgressRing>
                <div className="flex flex-col min-w-0">
                  <span className="text-foreground text-xl font-bold tracking-tight leading-none">
                    {card.value}
                  </span>
                  <span className="text-muted-foreground text-[10px] mt-0.5">{card.unit}</span>
                  <span className="text-muted-foreground text-[11px] truncate">{card.label}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Top Apps ──────────────────────── */}
        <section className="px-5 pb-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-foreground text-sm font-semibold">Apps les plus défiées</h2>
            <button className="text-muted-foreground text-xs flex items-center gap-0.5 hover:text-foreground transition-colors">
              Voir tout <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          <div className="rounded-2xl border border-border/20 bg-secondary/15 overflow-hidden divide-y divide-border/20">
            {topApps.map((app, i) => (
              <div key={app.id} className="flex items-center gap-3 px-4 py-3">
                <span className="text-muted-foreground text-xs w-4 text-center font-bold tabular-nums">
                  {i + 1}
                </span>
                <div className="shrink-0">{getAppIcon(app.id, "sm", true)}</div>
                <div className="flex-1 min-w-0">
                  <span className="text-foreground text-sm font-medium truncate block">{app.name}</span>
                </div>
                <span className="text-muted-foreground text-xs tabular-nums">{app.sessions} sess.</span>
                <span
                  className="text-[11px] font-semibold tabular-nums"
                  style={{
                    color: app.trend.startsWith("+") ? "hsl(142, 70%, 45%)" : "hsl(0, 70%, 55%)",
                  }}
                >
                  {app.trend}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Insight Card ──────────────────── */}
        <section className="px-5 pt-1 pb-10">
          <div
            className="rounded-2xl p-5 flex items-start gap-3.5 relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, hsla(142, 70%, 45%, 0.1) 0%, hsla(210, 80%, 55%, 0.08) 100%)",
              border: "1px solid hsla(142, 70%, 45%, 0.15)",
            }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: "hsla(142, 70%, 45%, 0.15)" }}
            >
              <TrendingUp className="w-5 h-5" style={{ color: "hsl(142, 70%, 45%)" }} />
            </div>
            <div className="flex-1">
              <p className="text-foreground text-sm font-semibold mb-1">Insight personnalisé</p>
              <p className="text-muted-foreground text-[13px] leading-relaxed">
                Tu es le plus actif entre{" "}
                <span className="text-foreground font-medium">14h et 16h</span>. Profite de ce créneau pour tes défis
                les plus exigeants 💪
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UsageStats;
