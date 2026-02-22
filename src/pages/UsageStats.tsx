import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowUp, TrendingUp, Flame, Wind, StretchHorizontal, Brain, Clock, Zap, Target, Trophy, Calendar, BarChart3, Repeat } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip, AreaChart, Area, RadialBarChart, RadialBar } from "recharts";
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

// ── Habitudes data ─────────────────────────────────────────
const hourlyActivity = [
  { hour: "6h", value: 2 }, { hour: "8h", value: 5 }, { hour: "10h", value: 12 },
  { hour: "12h", value: 18 }, { hour: "14h", value: 32 }, { hour: "16h", value: 28 },
  { hour: "18h", value: 15 }, { hour: "20h", value: 22 }, { hour: "22h", value: 8 },
];

const weekdayConsistency = [
  { day: "L", score: 85 }, { day: "M", score: 92 }, { day: "M", score: 78 },
  { day: "J", score: 95 }, { day: "V", score: 100 }, { day: "S", score: 60 },
  { day: "D", score: 30 },
];

// ── Défis data ─────────────────────────────────────────────
const challengeHistory = [
  { date: "Aujourd'hui", app: "TikTok", type: "Squats", reps: 30, completed: true },
  { date: "Aujourd'hui", app: "Instagram", type: "Respiration", reps: null, duration: "3 min", completed: true },
  { date: "Hier", app: "YouTube", type: "Pompes", reps: 15, completed: true },
  { date: "Hier", app: "TikTok", type: "Étirement", reps: null, duration: "2 min", completed: false },
  { date: "20 fév", app: "Instagram", type: "Squats", reps: 25, completed: true },
  { date: "20 fév", app: "Snapchat", type: "Focus", reps: null, duration: "5 min", completed: true },
];

const personalRecords = [
  { label: "Plus long streak", value: "14 jours", icon: Flame },
  { label: "Meilleure série squats", value: "50 reps", icon: Trophy },
  { label: "Plus longue session focus", value: "12 min", icon: Brain },
  { label: "Défis en 1 jour", value: "9", icon: Target },
];

const periods = ["7J", "1M", "3M", "6M"] as const;
type Period = (typeof periods)[number];

const dataByPeriod: Record<Period, typeof weeklyData> = {
  "7J": weeklyData,
  "1M": monthlyData,
  "3M": quarterlyData,
  "6M": biannualData,
};

const tabs = ["Aperçu", "Habitudes", "Défis"] as const;
type Tab = (typeof tabs)[number];

// ── Custom tooltip ─────────────────────────────────────────
const ChartTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-popover border border-border/50 rounded-lg px-3 py-1.5 shadow-xl">
      <span className="text-foreground text-sm font-medium">{payload[0].value} min</span>
    </div>
  );
};

// ── Tab: Aperçu ────────────────────────────────────────────
const AperçuTab = () => (
  <div className="space-y-0">
    {/* Key data */}
    <section className="px-5 pb-4">
      <h2 className="text-foreground text-sm font-semibold tracking-tight mb-3">Données clés</h2>
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
    </section>

    <div className="mx-5 my-3 h-px bg-border/40" />

    {/* Wellness impact */}
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

    <div className="mx-5 my-3 h-px bg-border/40" />

    {/* Insight card */}
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
);

// ── Tab: Habitudes ─────────────────────────────────────────
const HabitudesTab = () => (
  <div className="space-y-0">
    {/* Hourly heatmap */}
    <section className="px-5 pb-5">
      <h2 className="text-foreground text-sm font-semibold tracking-tight mb-1">Heures d'activité</h2>
      <p className="text-muted-foreground text-xs mb-4">Quand tu lances le plus de défis</p>
      <div className="h-[140px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={hourlyActivity}>
            <defs>
              <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(0,0%,80%)" stopOpacity={0.3} />
                <stop offset="100%" stopColor="hsl(0,0%,80%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="hour"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(0,0%,45%)", fontSize: 10 }}
              dy={6}
            />
            <YAxis hide />
            <Tooltip content={<ChartTooltip />} cursor={false} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="hsl(0,0%,70%)"
              strokeWidth={2}
              fill="url(#areaGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-3 rounded-xl border border-border/20 bg-secondary/20 px-4 py-3 flex items-center gap-3">
        <Clock className="w-4 h-4 text-muted-foreground shrink-0" />
        <p className="text-muted-foreground text-xs">
          Pic d'activité : <span className="text-foreground font-medium">14h – 16h</span>
        </p>
      </div>
    </section>

    <div className="mx-5 my-3 h-px bg-border/40" />

    {/* Consistency */}
    <section className="px-5 pb-5">
      <h2 className="text-foreground text-sm font-semibold tracking-tight mb-1">Régularité</h2>
      <p className="text-muted-foreground text-xs mb-4">Ton score de constance par jour</p>
      <div className="flex justify-between gap-2">
        {weekdayConsistency.map((d, i) => (
          <div key={i} className="flex flex-col items-center gap-2 flex-1">
            <div className="w-full h-20 rounded-lg bg-secondary/40 relative overflow-hidden">
              <div
                className="absolute bottom-0 w-full rounded-lg transition-all duration-500"
                style={{
                  height: `${d.score}%`,
                  background: d.score >= 80
                    ? "hsl(0,0%,70%)"
                    : d.score >= 50
                    ? "hsl(0,0%,45%)"
                    : "hsl(0,0%,28%)",
                }}
              />
            </div>
            <span className="text-muted-foreground text-[10px] font-medium">{d.day}</span>
          </div>
        ))}
      </div>
    </section>

    <div className="mx-5 my-3 h-px bg-border/40" />

    {/* Streak & stats */}
    <section className="px-5 pb-8">
      <h2 className="text-foreground text-sm font-semibold tracking-tight mb-4">Streaks</h2>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-border/30 bg-secondary/30 p-4 flex flex-col gap-1">
          <Zap className="w-4 h-4 text-muted-foreground mb-1" />
          <span className="text-foreground text-2xl font-light tracking-tight">7</span>
          <span className="text-muted-foreground text-[11px]">Streak actuel (jours)</span>
        </div>
        <div className="rounded-2xl border border-border/30 bg-secondary/30 p-4 flex flex-col gap-1">
          <Flame className="w-4 h-4 text-muted-foreground mb-1" />
          <span className="text-foreground text-2xl font-light tracking-tight">14</span>
          <span className="text-muted-foreground text-[11px]">Meilleur streak</span>
        </div>
        <div className="rounded-2xl border border-border/30 bg-secondary/30 p-4 flex flex-col gap-1">
          <Repeat className="w-4 h-4 text-muted-foreground mb-1" />
          <span className="text-foreground text-2xl font-light tracking-tight">85%</span>
          <span className="text-muted-foreground text-[11px]">Taux de complétion</span>
        </div>
        <div className="rounded-2xl border border-border/30 bg-secondary/30 p-4 flex flex-col gap-1">
          <Calendar className="w-4 h-4 text-muted-foreground mb-1" />
          <span className="text-foreground text-2xl font-light tracking-tight">22/28</span>
          <span className="text-muted-foreground text-[11px]">Jours actifs ce mois</span>
        </div>
      </div>
    </section>
  </div>
);

// ── Tab: Défis ─────────────────────────────────────────────
const DéfisTab = () => (
  <div className="space-y-0">
    {/* Top apps */}
    <section className="px-5 pb-5">
      <h2 className="text-foreground text-sm font-semibold tracking-tight mb-4">Apps les plus défiées</h2>
      <div className="space-y-4">
        {topApps.map((app, i) => (
          <div key={app.id} className="flex items-center gap-3">
            <span className="text-muted-foreground text-xs w-4 text-right font-medium tabular-nums">{i + 1}</span>
            <div className="shrink-0">{getAppIcon(app.id, "sm", true)}</div>
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

    <div className="mx-5 my-3 h-px bg-border/40" />

    {/* Records */}
    <section className="px-5 pb-5">
      <h2 className="text-foreground text-sm font-semibold tracking-tight mb-4">Records personnels</h2>
      <div className="grid grid-cols-2 gap-3">
        {personalRecords.map((rec) => (
          <div
            key={rec.label}
            className="rounded-2xl border border-border/30 bg-secondary/30 p-4 flex flex-col gap-1"
          >
            <rec.icon className="w-4 h-4 text-muted-foreground mb-1" />
            <span className="text-foreground text-xl font-light tracking-tight">{rec.value}</span>
            <span className="text-muted-foreground text-[11px] leading-tight">{rec.label}</span>
          </div>
        ))}
      </div>
    </section>

    <div className="mx-5 my-3 h-px bg-border/40" />

    {/* Challenge history */}
    <section className="px-5 pb-8">
      <h2 className="text-foreground text-sm font-semibold tracking-tight mb-4">Historique récent</h2>
      <div className="space-y-3">
        {challengeHistory.map((ch, i) => {
          const prev = i > 0 ? challengeHistory[i - 1] : null;
          const showDate = !prev || prev.date !== ch.date;
          return (
            <div key={i}>
              {showDate && (
                <p className="text-muted-foreground text-[10px] uppercase tracking-widest mb-2 mt-1">{ch.date}</p>
              )}
              <div className="flex items-center gap-3 py-2">
                <div className="shrink-0">{getAppIcon(ch.app.toLowerCase().replace(/[^a-z]/g, "").replace("xtwitter", "twitter"), "sm", true)}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-foreground text-sm font-medium truncate">{ch.type}</p>
                  <p className="text-muted-foreground text-xs">
                    {ch.reps ? `${ch.reps} reps` : ch.duration} · {ch.app}
                  </p>
                </div>
                <div className={`w-2 h-2 rounded-full shrink-0 ${ch.completed ? "bg-foreground/60" : "bg-muted-foreground/30"}`} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  </div>
);

// ── Page ───────────────────────────────────────────────────
const UsageStats = () => {
  const navigate = useNavigate();
  const [activePeriod, setActivePeriod] = useState<Period>("7J");
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("Aperçu");

  const chartData = dataByPeriod[activePeriod];
  const maxValue = Math.max(...chartData.map((d) => d.value));

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      {/* ── Header ──────────────────────────── */}
      <header className="flex items-center gap-3 px-4 pt-[env(safe-area-inset-top,12px)] pb-3 shrink-0 bg-background/80 backdrop-blur-xl border-b border-border/20">
        <button
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-foreground text-lg font-semibold tracking-tight">Statistiques d'usage</h1>
      </header>

      {/* ── Scrollable content ──────────────── */}
      <div className="flex-1 overflow-y-auto overscroll-y-contain">
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

        {/* ── Tab navigation (TradingView style) ── */}
        <div className="px-5 mt-5 mb-4">
          <div className="flex gap-1 p-1 rounded-xl bg-secondary/30">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                  activeTab === tab
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* ── Tab content ───────────────────── */}
        {activeTab === "Aperçu" && <AperçuTab />}
        {activeTab === "Habitudes" && <HabitudesTab />}
        {activeTab === "Défis" && <DéfisTab />}
      </div>
    </div>
  );
};

export default UsageStats;
