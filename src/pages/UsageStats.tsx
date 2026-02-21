import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowUp, TrendingUp, Flame, Wind, StretchHorizontal, Brain } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip } from "recharts";
import { getAppIcon } from "@/components/AppIcons";

// ── Mock data ──────────────────────────────────────────────
const weeklyData = [
  { day: "Lun", value: 42 },
  { day: "Mar", value: 28 },
  { day: "Mer", value: 65 },
  { day: "Jeu", value: 51 },
  { day: "Ven", value: 73 },
  { day: "Sam", value: 35 },
  { day: "Dim", value: 18 },
];

const monthlyData = [
  { day: "S1", value: 210 },
  { day: "S2", value: 285 },
  { day: "S3", value: 190 },
  { day: "S4", value: 320 },
];

const quarterlyData = [
  { day: "Jan", value: 620 },
  { day: "Fév", value: 780 },
  { day: "Mar", value: 540 },
];

const biannualData = [
  { day: "Jan", value: 620 },
  { day: "Fév", value: 780 },
  { day: "Mar", value: 540 },
  { day: "Avr", value: 910 },
  { day: "Mai", value: 670 },
  { day: "Jun", value: 850 },
];

const topApps = [
  { id: "tiktok", name: "TikTok", sessions: 47, max: 47 },
  { id: "instagram", name: "Instagram", sessions: 34, max: 47 },
  { id: "youtube", name: "YouTube", sessions: 21, max: 47 },
  { id: "twitter", name: "X (Twitter)", sessions: 12, max: 47 },
  { id: "snapchat", name: "Snapchat", sessions: 8, max: 47 },
];

const keyData = [
  { label: "Sessions complétées", value: "122" },
  { label: "Moyenne par jour", value: "4,2" },
  { label: "Meilleur jour", value: "Vendredi" },
  { label: "Heure optimale", value: "14h – 16h" },
];

const wellnessCards = [
  { icon: Flame, label: "Squats effectués", value: "1 240" },
  { icon: Wind, label: "Min. respiration", value: "87" },
  { icon: StretchHorizontal, label: "Min. étirement", value: "64" },
  { icon: Brain, label: "Sessions focus", value: "31" },
];

const periods = ["7J", "1M", "3M", "6M"] as const;
type Period = typeof periods[number];

const dataByPeriod: Record<Period, typeof weeklyData> = {
  "7J": weeklyData,
  "1M": monthlyData,
  "3M": quarterlyData,
  "6M": biannualData,
};

// ── Custom tooltip ─────────────────────────────────────────
const ChartTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-popover border border-border/50 rounded-lg px-3 py-1.5 shadow-xl">
      <span className="text-foreground text-sm font-medium">{payload[0].value} min</span>
    </div>
  );
};

// ── Page ───────────────────────────────────────────────────
const UsageStats = () => {
  const navigate = useNavigate();
  const [activePeriod, setActivePeriod] = useState<Period>("7J");
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  const chartData = dataByPeriod[activePeriod];
  const maxValue = Math.max(...chartData.map(d => d.value));

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* ── Header ──────────────────────────── */}
      <header className="flex items-center gap-3 px-4 pt-[env(safe-area-inset-top,12px)] pb-3 sticky top-0 z-30 bg-background/80 backdrop-blur-xl">
        <button
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-foreground text-lg font-semibold tracking-tight">Statistiques d'usage</h1>
      </header>

      <div className="flex-1 overflow-y-auto pb-12">
        {/* ── Hero metric ───────────────────── */}
        <section className="px-5 pt-4 pb-6">
          <p className="text-muted-foreground text-xs uppercase tracking-widest mb-1">Temps économisé</p>
          <div className="flex items-end gap-3">
            <span className="text-foreground text-[3.25rem] leading-none font-extralight tracking-tighter">
              12h 45m
            </span>
            <div className="flex items-center gap-1 mb-2 px-2 py-0.5 rounded-full" style={{ background: "hsla(142, 70%, 45%, 0.12)" }}>
              <ArrowUp className="w-3 h-3" style={{ color: "hsl(142, 70%, 45%)" }} />
              <span className="text-xs font-medium" style={{ color: "hsl(142, 70%, 45%)" }}>+2,24%</span>
            </div>
          </div>
          <p className="text-muted-foreground text-xs mt-1">cette semaine</p>
        </section>

        {/* ── Chart ─────────────────────────── */}
        <section className="px-5 pb-2">
          <div className="h-[180px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} barCategoryGap="22%">
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "hsl(0,0%,45%)", fontSize: 11, fontWeight: 500 }}
                  dy={8}
                />
                <YAxis hide domain={[0, maxValue * 1.15]} />
                <Tooltip content={<ChartTooltip />} cursor={false} />
                <Bar
                  dataKey="value"
                  radius={[6, 6, 4, 4]}
                  onMouseEnter={(_, i) => setHoveredBar(i)}
                  onMouseLeave={() => setHoveredBar(null)}
                >
                  {chartData.map((_, i) => (
                    <Cell
                      key={i}
                      fill={hoveredBar === i ? "hsl(0,0%,95%)" : "hsl(0,0%,30%)"}
                      style={{ transition: "fill 0.2s ease" }}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Period selector pills */}
          <div className="flex justify-center gap-1.5 mt-4">
            {periods.map((p) => (
              <button
                key={p}
                onClick={() => setActivePeriod(p)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  activePeriod === p
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </section>

        {/* ── Separator ─────────────────────── */}
        <div className="mx-5 my-5 h-px bg-border/40" />

        {/* ── Key data (TradingView style) ──── */}
        <section className="px-5 pb-4">
          <h2 className="text-foreground text-sm font-semibold tracking-tight mb-3">Données clés</h2>
          <div className="space-y-0">
            {keyData.map((item, i) => (
              <div
                key={i}
                className={`flex items-center justify-between py-3 ${
                  i < keyData.length - 1 ? "border-b border-border/30" : ""
                }`}
              >
                <span className="text-muted-foreground text-sm">{item.label}</span>
                <span className="text-foreground text-sm font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Separator ─────────────────────── */}
        <div className="mx-5 my-3 h-px bg-border/40" />

        {/* ── Top apps ──────────────────────── */}
        <section className="px-5 pb-4">
          <h2 className="text-foreground text-sm font-semibold tracking-tight mb-4">Apps les plus défiées</h2>
          <div className="space-y-4">
            {topApps.map((app, i) => (
              <div key={app.id} className="flex items-center gap-3">
                {/* Rank */}
                <span className="text-muted-foreground text-xs w-4 text-right font-medium tabular-nums">{i + 1}</span>
                {/* Icon */}
                <div className="shrink-0">{getAppIcon(app.id, "sm", true)}</div>
                {/* Name + bar */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-foreground text-sm font-medium truncate">{app.name}</span>
                    <span className="text-muted-foreground text-xs tabular-nums">{app.sessions}</span>
                  </div>
                  <div className="h-1 w-full rounded-full bg-secondary/80 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-foreground/40 transition-all duration-500"
                      style={{ width: `${(app.sessions / app.max) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Separator ─────────────────────── */}
        <div className="mx-5 my-3 h-px bg-border/40" />

        {/* ── Wellness impact grid ──────────── */}
        <section className="px-5 pb-4">
          <h2 className="text-foreground text-sm font-semibold tracking-tight mb-4">Impact bien-être</h2>
          <div className="grid grid-cols-2 gap-3">
            {wellnessCards.map((card) => (
              <div
                key={card.label}
                className="rounded-2xl border border-border/30 bg-secondary/30 p-4 flex flex-col gap-1"
              >
                <card.icon className="w-4 h-4 text-muted-foreground mb-1" />
                <span className="text-foreground text-2xl font-light tracking-tight">{card.value}</span>
                <span className="text-muted-foreground text-[11px] leading-tight">{card.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Insight card ──────────────────── */}
        <section className="px-5 pt-2 pb-8">
          <div className="rounded-2xl border border-border/20 bg-secondary/20 backdrop-blur-sm p-5 flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-secondary/60 flex items-center justify-center shrink-0 mt-0.5">
              <TrendingUp className="w-4 h-4 text-foreground/70" />
            </div>
            <div className="flex-1">
              <p className="text-foreground text-sm font-medium mb-0.5">Ton insight</p>
              <p className="text-muted-foreground text-[13px] leading-relaxed">
                Tu es le plus actif entre <span className="text-foreground font-medium">14h et 16h</span>. C'est le moment idéal pour lancer tes défis les plus exigeants.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UsageStats;
