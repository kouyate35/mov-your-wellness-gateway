import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Flame, ChevronLeft, Trophy, ArrowRight, Check,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip,
  PieChart, Pie, Cell as PieCell,
} from "recharts";
import BottomNavBar from "@/components/BottomNavBar";

// ── Apple-style Green palette ──────────────────────────────
const GREEN = "hsl(150, 55%, 60%)";
const GREEN_SOFT = "hsl(150, 30%, 25%)";
const GREEN_DARK_BG = "hsl(155, 35%, 14%)";

// ── Mock data ──────────────────────────────────────────────
const weeklyData = [
  { day: "Lun", value: 62 },
  { day: "Mar", value: 48 },
  { day: "Mer", value: 84 },
  { day: "Jeu", value: 45 },
  { day: "Ven", value: 75 },
  { day: "Sam", value: 28 },
  { day: "Dim", value: 52 },
];
const monthlyData = [
  { day: "S1", value: 210 },
  { day: "S2", value: 285 },
  { day: "S3", value: 190 },
  { day: "S4", value: 320 },
];
const yearlyData = [
  { day: "Jan", value: 620 }, { day: "Fév", value: 780 }, { day: "Mar", value: 540 },
  { day: "Avr", value: 910 }, { day: "Mai", value: 670 }, { day: "Jun", value: 850 },
  { day: "Jul", value: 720 }, { day: "Aoû", value: 690 }, { day: "Sep", value: 880 },
  { day: "Oct", value: 760 }, { day: "Nov", value: 940 }, { day: "Déc", value: 820 },
];

const repartition = [
  { name: "Pompes", value: 35, color: "hsl(150, 55%, 60%)" },
  { name: "Squats", value: 28, color: "hsl(150, 50%, 50%)" },
  { name: "Étirements", value: 19, color: "hsl(150, 45%, 40%)" },
  { name: "Gainage", value: 18, color: "hsl(150, 40%, 32%)" },
];

// ── Tooltip ────────────────────────────────────────────────
const ChartTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-popover/95 backdrop-blur border border-border/40 rounded-lg px-3 py-1.5 shadow-xl">
      <span className="text-foreground text-xs font-medium">{payload[0].value} min</span>
    </div>
  );
};

// ── Detail Page (Statistiques) ─────────────────────────────
type Period = "Semaine" | "Mois" | "Année";

const StatsDetail = ({ onClose }: { onClose: () => void }) => {
  const [period, setPeriod] = useState<Period>("Semaine");

  const data = period === "Semaine" ? weeklyData : period === "Mois" ? monthlyData : yearlyData;
  const total = useMemo(() => data.reduce((a, b) => a + b.value, 0), [data]);
  const totalLabel = period === "Semaine"
    ? `${Math.floor(total / 60)}h ${total % 60}m`
    : `${Math.floor(total / 60)}h`;
  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <div className="fixed inset-0 z-[90] bg-background flex flex-col animate-fade-in">
      {/* Header */}
      <div className="px-5 pt-[max(env(safe-area-inset-top),16px)] pb-3 flex items-center gap-3">
        <button
          onClick={onClose}
          className="w-9 h-9 rounded-full bg-secondary/60 flex items-center justify-center active:scale-95 transition-transform"
        >
          <ChevronLeft className="w-5 h-5 text-foreground" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-28">
        {/* Title */}
        <h1 className="text-foreground text-[34px] font-bold tracking-tight leading-tight mb-5">
          Statistiques
        </h1>

        {/* Segmented control */}
        <div className="flex items-center gap-1 p-1 rounded-full bg-secondary/50 mb-6">
          {(["Semaine", "Mois", "Année"] as Period[]).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`flex-1 py-2.5 rounded-full text-[13px] font-semibold transition-all ${
                period === p
                  ? "bg-foreground text-background shadow-sm"
                  : "text-muted-foreground"
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Temps libéré card */}
        <div className="rounded-3xl bg-card border border-border/30 p-5 mb-4">
          <p className="text-muted-foreground text-[13px] font-medium mb-2">Temps libéré</p>
          <div className="flex items-end justify-between mb-5">
            <span className="text-foreground text-[44px] leading-none font-bold tracking-tight">
              {totalLabel}
            </span>
            <span className="text-[15px] font-semibold mb-1.5" style={{ color: GREEN }}>
              +12%
            </span>
          </div>

          <div className="h-[160px] -mx-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} barCategoryGap="28%">
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "hsl(0,0%,55%)", fontSize: 11, fontWeight: 500 }}
                  dy={8}
                />
                <YAxis hide domain={[0, maxValue * 1.15]} />
                <Tooltip content={<ChartTooltip />} cursor={false} />
                <Bar dataKey="value" radius={[8, 8, 8, 8]}>
                  {data.map((_, i) => (
                    <Cell key={i} fill={GREEN} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Two-column row */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="rounded-3xl bg-card border border-border/30 p-5">
            <p className="text-muted-foreground text-[13px] font-medium mb-3">Défis réalisés</p>
            <span className="text-foreground text-[34px] font-bold tracking-tight leading-none">28</span>
            <p className="text-muted-foreground text-[12px] mt-3">+7 cette semaine</p>
          </div>
          <div className="rounded-3xl bg-card border border-border/30 p-5">
            <p className="text-muted-foreground text-[13px] font-medium mb-3">Calories brûlées</p>
            <span className="text-foreground text-[26px] font-bold tracking-tight leading-none">1 842 <span className="text-base font-semibold text-muted-foreground">kcal</span></span>
            <p className="text-muted-foreground text-[12px] mt-3">≈ 2 repas</p>
          </div>
        </div>

        {/* Répartition */}
        <div className="rounded-3xl bg-card border border-border/30 p-5">
          <p className="text-foreground text-[15px] font-semibold mb-4">Répartition</p>
          <div className="flex items-center gap-4">
            <div className="flex-1 space-y-2.5">
              {repartition.map((r) => (
                <div key={r.name} className="flex items-center justify-between text-[13px]">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ background: r.color }} />
                    <span className="text-foreground">{r.name}</span>
                  </div>
                  <span className="text-muted-foreground font-medium tabular-nums">{r.value}%</span>
                </div>
              ))}
            </div>
            <div className="w-[110px] h-[110px] shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={repartition}
                    innerRadius={32}
                    outerRadius={52}
                    paddingAngle={2}
                    dataKey="value"
                    stroke="none"
                  >
                    {repartition.map((r, i) => (
                      <PieCell key={i} fill={r.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Main "Aujourd'hui" Dashboard ───────────────────────────
const UsageStats = () => {
  const navigate = useNavigate();
  const [showDetail, setShowDetail] = useState(false);

  // Donut for "Temps libéré" (24:58 of let's say 60min daily goal => ~83%)
  const tempsLibereMinutes = 24 + 58 / 60;
  const tempsGoal = 60;
  const tempsPercent = Math.min(100, (tempsLibereMinutes / tempsGoal) * 100);
  // SVG ring math
  const radius = 78;
  const circumference = 2 * Math.PI * radius;
  const dash = (tempsPercent / 100) * circumference;

  const weekProgressData = weeklyData;
  const maxWeekly = Math.max(...weekProgressData.map(d => d.value));

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto overscroll-y-contain pb-24">
        {/* ── Top bar ───────────────────────── */}
        <div className="px-5 pt-[max(env(safe-area-inset-top),16px)] pb-2 flex justify-end">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/60">
            <span className="text-[13px]">🔥</span>
            <span className="text-foreground text-[13px] font-semibold tabular-nums">12</span>
          </div>
        </div>

        {/* ── Greeting ──────────────────────── */}
        <section className="px-5 pt-2 pb-5">
          <h1 className="text-foreground text-[32px] font-bold tracking-tight leading-tight">
            Aujourd'hui
          </h1>
        </section>

        {/* ── Hero row : Donut + Defis ─────── */}
        <section className="px-5">
          <div className="grid grid-cols-2 gap-3">
            {/* Donut card */}
            <div
              className="rounded-3xl p-4 aspect-square flex items-center justify-center relative overflow-hidden"
              style={{ background: GREEN_DARK_BG }}
            >
              <svg viewBox="0 0 200 200" className="w-full h-full">
                <circle
                  cx="100" cy="100" r={radius}
                  fill="none"
                  stroke={GREEN_SOFT}
                  strokeWidth="14"
                />
                <circle
                  cx="100" cy="100" r={radius}
                  fill="none"
                  stroke={GREEN}
                  strokeWidth="14"
                  strokeLinecap="round"
                  strokeDasharray={`${dash} ${circumference}`}
                  transform="rotate(-90 100 100)"
                  style={{ transition: "stroke-dasharray 0.8s ease" }}
                />
                <text x="100" y="98" textAnchor="middle" fill="hsl(0,0%,98%)" fontSize="32" fontWeight="700" letterSpacing="-1">
                  24:58
                </text>
                <text x="100" y="122" textAnchor="middle" fill="hsl(0,0%,75%)" fontSize="14" fontWeight="500">
                  Temps libéré
                </text>
              </svg>
            </div>

            {/* Défis card */}
            <div className="rounded-3xl bg-card border border-border/30 p-5 flex flex-col">
              <span className="text-foreground text-[44px] font-bold leading-none tracking-tight">5</span>
              <p className="text-muted-foreground text-[14px] mt-1.5">Défis réalisés</p>
              <div className="flex-1 flex items-end justify-end">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ background: GREEN_DARK_BG }}
                >
                  <Check className="w-5 h-5" style={{ color: GREEN }} strokeWidth={2.5} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Progression ───────────────────── */}
        <section className="px-5 mt-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-foreground text-[20px] font-bold tracking-tight">Progression</h2>
            <span className="text-[13px] font-medium" style={{ color: GREEN }}>Cette semaine</span>
          </div>

          <div className="h-[180px] -mx-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weekProgressData} barCategoryGap="32%">
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "hsl(0,0%,55%)", fontSize: 11, fontWeight: 500 }}
                  dy={8}
                />
                <YAxis hide domain={[0, maxWeekly * 1.15]} />
                <Tooltip content={<ChartTooltip />} cursor={false} />
                <Bar dataKey="value" radius={[8, 8, 8, 8]}>
                  {weekProgressData.map((_, i) => (
                    <Cell key={i} fill={GREEN} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* ── 3 Stat tiles ──────────────────── */}
        <section className="px-5 mt-5">
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-2xl bg-card border border-border/30 p-4">
              <p className="text-muted-foreground text-[12px] font-medium">Série</p>
              <div className="flex items-center gap-1.5 mt-2">
                <span className="text-base">🔥</span>
                <span className="text-foreground text-[22px] font-bold leading-none">8</span>
              </div>
              <p className="text-muted-foreground text-[12px] mt-2">7 jours</p>
            </div>
            <div className="rounded-2xl bg-card border border-border/30 p-4">
              <p className="text-muted-foreground text-[12px] font-medium">Meilleur temps</p>
              <Trophy className="w-5 h-5 mt-2" style={{ color: "hsl(45, 90%, 55%)" }} />
              <p className="text-foreground text-[15px] font-bold mt-2">1h 32m</p>
            </div>
            <div className="rounded-2xl bg-card border border-border/30 p-4">
              <p className="text-muted-foreground text-[12px] font-medium">Calories</p>
              <span className="text-base mt-2 inline-block">🔥</span>
              <p className="text-foreground text-[15px] font-bold mt-2">463 <span className="text-[12px] font-semibold text-muted-foreground">kcal</span></p>
            </div>
          </div>
        </section>

        {/* ── CTA "Voir mes statistiques" ─── */}
        <section className="px-5 mt-5">
          <button
            onClick={() => setShowDetail(true)}
            className="w-full rounded-2xl bg-card border border-border/30 px-5 py-4 flex items-center justify-between active:scale-[0.99] transition-transform"
          >
            <span className="text-foreground text-[15px] font-semibold">Voir mes statistiques</span>
            <ArrowRight className="w-5 h-5 text-foreground" />
          </button>
        </section>
      </div>

      <BottomNavBar />

      {showDetail && <StatsDetail onClose={() => setShowDetail(false)} />}
    </div>
  );
};

export default UsageStats;
