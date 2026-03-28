import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Flame, Check, Zap, Clock, Target, ChevronRight, ChevronDown,
  TrendingUp, Trophy, Brain, Wind, StretchHorizontal, Calendar, Repeat,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip,
  AreaChart, Area,
} from "recharts";
import { getAppIcon } from "@/components/AppIcons";
import BottomNavBar from "@/components/BottomNavBar";

// ── Orange accent color ────────────────────────────────────
const ORANGE = "hsl(30, 100%, 50%)";
const ORANGE_BG = "hsla(30, 100%, 50%, 0.12)";
const ORANGE_BG_SOLID = "hsl(30, 100%, 50%)";
const GREEN = "hsl(142, 70%, 45%)";

// ── Mock data ──────────────────────────────────────────────
const streakDays = [
  { day: "L", done: true },
  { day: "M", done: true },
  { day: "M", done: true },
  { day: "J", done: true },
  { day: "V", done: false, current: true },
  { day: "S", done: false },
  { day: "D", done: false },
];

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

const personalRecords = [
  { label: "Plus long streak", value: "14 jours", icon: Flame },
  { label: "Meilleure série squats", value: "50 reps", icon: Trophy },
  { label: "Plus longue session focus", value: "12 min", icon: Brain },
  { label: "Défis en 1 jour", value: "9", icon: Target },
];

const challengeHistory = [
  { date: "Aujourd'hui", app: "TikTok", appId: "tiktok", type: "Squats", detail: "30 reps" },
  { date: "Aujourd'hui", app: "Instagram", appId: "instagram", type: "Respiration", detail: "3 min" },
  { date: "Hier", app: "YouTube", appId: "youtube", type: "Pompes", detail: "15 reps" },
  { date: "Hier", app: "TikTok", appId: "tiktok", type: "Étirement", detail: "2 min" },
  { date: "20 fév", app: "Instagram", appId: "instagram", type: "Squats", detail: "25 reps" },
  { date: "20 fév", app: "Snapchat", appId: "snapchat", type: "Focus", detail: "5 min" },
];

const hourlyActivity = [
  { hour: "6h", value: 2 }, { hour: "8h", value: 5 }, { hour: "10h", value: 12 },
  { hour: "12h", value: 18 }, { hour: "14h", value: 32 }, { hour: "16h", value: 28 },
  { hour: "18h", value: 15 }, { hour: "20h", value: 22 }, { hour: "22h", value: 8 },
];

const periods = ["7J", "1M", "3M", "6M"] as const;
type Period = (typeof periods)[number];
const dataByPeriod: Record<Period, typeof weeklyData> = {
  "7J": weeklyData, "1M": monthlyData, "3M": quarterlyData, "6M": biannualData,
};

// ── Tooltip ────────────────────────────────────────────────
const ChartTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-popover border border-border/50 rounded-lg px-3 py-1.5 shadow-xl">
      <span className="text-foreground text-sm font-medium">{payload[0].value} min</span>
    </div>
  );
};

// ── Expandable Section ─────────────────────────────────────
const ExpandableSection = ({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-t border-border/20">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left"
      >
        <span className="text-foreground text-sm font-semibold tracking-tight">{title}</span>
        {open ? (
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        ) : (
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        )}
      </button>
      {open && <div className="px-5 pb-5 animate-fade-in">{children}</div>}
    </div>
  );
};

// ── Page ───────────────────────────────────────────────────
const UsageStats = () => {
  const navigate = useNavigate();
  const [activePeriod, setActivePeriod] = useState<Period>("7J");
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  const chartData = dataByPeriod[activePeriod];
  const maxValue = Math.max(...chartData.map((d) => d.value));

  // Get current day name
  const now = new Date();
  const dayNames = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
  const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
  const greeting = now.getHours() < 12 ? "Bonjour" : now.getHours() < 18 ? "Bon après-midi" : "Bonsoir";
  const dateStr = `${dayNames[now.getDay()]} ${now.getDate()} ${monthNames[now.getMonth()]}`;

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      {/* ── Scrollable content ──────────────── */}
      <div className="flex-1 overflow-y-auto overscroll-y-contain pb-20">
        {/* ── Hero Header ───────────────────── */}
        <section className="px-5 pt-[env(safe-area-inset-top,16px)] pb-2">
          <p className="text-muted-foreground text-xs mt-2">{dateStr}</p>
          <div className="flex items-start justify-between mt-1">
            <h1 className="text-foreground text-2xl font-bold tracking-tight leading-tight">
              {greeting},<br />Bakar
            </h1>
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold mt-1"
              style={{ background: "hsl(0,0%,22%)", color: "hsl(0,0%,70%)" }}
            >
              B
            </div>
          </div>
        </section>

        {/* ── Streak Card ───────────────────── */}
        <section className="px-5 py-3">
          <div className="rounded-2xl border border-border/30 bg-secondary/40 p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4" style={{ color: ORANGE }} />
                <span className="text-foreground text-sm font-semibold">Streak actuel</span>
              </div>
              <span
                className="text-xs font-bold px-2.5 py-1 rounded-lg"
                style={{ background: ORANGE_BG, color: ORANGE }}
              >
                7 jours
              </span>
            </div>
            <div className="flex items-center justify-between">
              {streakDays.map((d, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  {d.done ? (
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center"
                      style={{ background: ORANGE_BG_SOLID }}
                    >
                      <Check className="w-4 h-4 text-white" strokeWidth={3} />
                    </div>
                  ) : d.current ? (
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center border-2"
                      style={{ borderColor: ORANGE }}
                    >
                      <span className="text-xs font-bold" style={{ color: ORANGE }}>{d.day}</span>
                    </div>
                  ) : (
                    <div className="w-9 h-9 rounded-full flex items-center justify-center border border-border/40">
                      <span className="text-xs text-muted-foreground">{d.day}</span>
                    </div>
                  )}
                  <span
                    className={`text-[10px] font-medium ${
                      d.current ? "" : "text-muted-foreground"
                    }`}
                    style={d.current ? { color: ORANGE } : undefined}
                  >
                    {d.day}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Quick Stats Row ───────────────── */}
        <section className="px-5 py-2">
          <div className="grid grid-cols-2 gap-3">
            {/* Reps today */}
            <div className="rounded-2xl border border-border/30 bg-secondary/40 p-4">
              <div className="flex items-center gap-1.5 mb-2">
                <Zap className="w-3.5 h-3.5" style={{ color: ORANGE }} />
                <span className="text-muted-foreground text-xs">Reps aujourd'hui</span>
              </div>
              <span className="text-foreground text-3xl font-bold tracking-tight">47</span>
              <p className="text-xs mt-1" style={{ color: GREEN }}>+12 vs hier</p>
            </div>
            {/* Time saved */}
            <div className="rounded-2xl border border-border/30 bg-secondary/40 p-4">
              <div className="flex items-center gap-1.5 mb-2">
                <Clock className="w-3.5 h-3.5" style={{ color: ORANGE }} />
                <span className="text-muted-foreground text-xs">Temps gagné</span>
              </div>
              <span className="text-foreground text-3xl font-bold tracking-tight">2h</span>
              <p className="text-xs mt-1" style={{ color: GREEN }}>Objectif atteint</p>
            </div>
          </div>
        </section>

        {/* ── Daily Objective ───────────────── */}
        <section className="px-5 py-2">
          <div className="rounded-2xl border border-border/30 bg-secondary/40 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4" style={{ color: ORANGE }} />
                <span className="text-foreground text-sm font-semibold">Objectif du jour</span>
              </div>
              <span className="text-sm font-bold" style={{ color: ORANGE }}>94%</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground text-xs">Pompes</span>
              <span className="text-muted-foreground text-xs">47 / 50</span>
            </div>
            <div className="h-2 w-full rounded-full overflow-hidden" style={{ background: "hsl(0,0%,22%)" }}>
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: "94%", background: ORANGE }}
              />
            </div>
          </div>
        </section>

        {/* ── Session du jour CTA ───────────── */}
        <section className="px-5 py-3">
          <button
            onClick={() => navigate("/")}
            className="w-full rounded-2xl p-4 flex items-center justify-between"
            style={{ background: ORANGE }}
          >
            <div>
              <p className="text-white text-sm font-bold">Session du jour</p>
              <p className="text-white/80 text-xs mt-0.5">20 pompes pour débloquer</p>
            </div>
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: "hsla(0,0%,100%,0.25)" }}
            >
              <ChevronRight className="w-4 h-4 text-white" />
            </div>
          </button>
        </section>

        {/* ── Expandable: Temps économisé (chart) ── */}
        <ExpandableSection title="Temps économisé" defaultOpen={false}>
          <p className="text-muted-foreground text-xs uppercase tracking-widest mb-1">Cette semaine</p>
          <div className="flex items-end gap-3 mb-1">
            <span className="text-foreground text-[2.5rem] leading-none font-extralight tracking-tighter">
              12h 45m
            </span>
            <div
              className="flex items-center gap-1 mb-1 px-2 py-0.5 rounded-full"
              style={{ background: "hsla(142, 70%, 45%, 0.12)" }}
            >
              <TrendingUp className="w-3 h-3" style={{ color: GREEN }} />
              <span className="text-xs font-medium" style={{ color: GREEN }}>+2,24%</span>
            </div>
          </div>

          <div className="h-[160px] w-full mt-4">
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
                <Bar dataKey="value" radius={[6, 6, 4, 4]}
                  onMouseEnter={(_, i) => setHoveredBar(i)}
                  onMouseLeave={() => setHoveredBar(null)}
                >
                  {chartData.map((_, i) => (
                    <Cell
                      key={i}
                      fill={hoveredBar === i ? ORANGE : "hsl(0,0%,30%)"}
                      style={{ transition: "fill 0.2s ease" }}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex justify-center gap-1.5 mt-3">
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
        </ExpandableSection>

        {/* ── Expandable: Données clés ──────── */}
        <ExpandableSection title="Données clés">
          {keyData.map((item, i) => (
            <div
              key={i}
              className={`flex items-center justify-between py-3 ${
                i < keyData.length - 1 ? "border-b border-border/20" : ""
              }`}
            >
              <span className="text-muted-foreground text-sm">{item.label}</span>
              <span className="text-foreground text-sm font-medium">{item.value}</span>
            </div>
          ))}
        </ExpandableSection>

        {/* ── Expandable: Apps les plus défiées ── */}
        <ExpandableSection title="Apps les plus défiées">
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
                  <div className="h-1 w-full rounded-full overflow-hidden" style={{ background: "hsl(0,0%,22%)" }}>
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${(app.sessions / app.max) * 100}%`, background: "hsl(0,0%,40%)" }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ExpandableSection>

        {/* ── Expandable: Records personnels ── */}
        <ExpandableSection title="Records personnels">
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
        </ExpandableSection>

        {/* ── Expandable: Impact bien-être ──── */}
        <ExpandableSection title="Impact bien-être">
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
        </ExpandableSection>

        {/* ── Expandable: Activité horaire ──── */}
        <ExpandableSection title="Activité horaire">
          <div className="h-[140px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={hourlyActivity}>
                <defs>
                  <linearGradient id="areaGradOrange" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={ORANGE} stopOpacity={0.3} />
                    <stop offset="100%" stopColor={ORANGE} stopOpacity={0} />
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
                  stroke={ORANGE}
                  strokeWidth={2}
                  fill="url(#areaGradOrange)"
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
        </ExpandableSection>

        {/* ── Expandable: Historique récent ──── */}
        <ExpandableSection title="Historique récent">
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
                    <div className="shrink-0">{getAppIcon(ch.appId, "sm", true)}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-foreground text-sm font-medium truncate">{ch.type}</p>
                      <p className="text-muted-foreground text-xs">{ch.detail} · {ch.app}</p>
                    </div>
                    <div className="w-2 h-2 rounded-full shrink-0 bg-foreground/40" />
                  </div>
                </div>
              );
            })}
          </div>
        </ExpandableSection>

        {/* ── Insight card ──────────────────── */}
        <section className="px-5 py-5 border-t border-border/20">
          <div className="rounded-2xl border border-border/20 bg-secondary/20 p-5 flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-secondary/60 flex items-center justify-center shrink-0 mt-0.5">
              <TrendingUp className="w-4 h-4 text-foreground/70" />
            </div>
            <div className="flex-1">
              <p className="text-foreground text-sm font-medium mb-0.5">Ton insight</p>
              <p className="text-muted-foreground text-[13px] leading-relaxed">
                Tu es le plus actif entre <span className="text-foreground font-medium">14h et 16h</span>.
                C'est le moment idéal pour lancer tes défis les plus exigeants.
              </p>
            </div>
          </div>
        </section>
      </div>

      <BottomNavBar />
    </div>
  );
};

export default UsageStats;
