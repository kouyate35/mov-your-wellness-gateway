import { useState } from "react";
import { Clock, Flame, ShieldCheck, ChevronRight, ArrowUp, type LucideIcon } from "lucide-react";
import StatDetailModal, { StatDetailData } from "./StatDetailModal";

type Stat = {
  id: string;
  icon: LucideIcon;
  value: string;
  unit?: string;
  label: string;
  color: string; // hex
  pct: number; // 0..1 for gauge
  delta: string; // e.g. "+22 min"
  detail: StatDetailData;
};

const stats: Stat[] = [
  {
    id: "saved",
    icon: Clock,
    value: "2h 14",
    label: "Temps récupéré",
    color: "#9BE15D",
    pct: 0.73,
    delta: "+22 min",
    detail: {
      icon: Clock,
      color: "#9BE15D",
      label: "Temps récupéré",
      value: "2h 14m",
      subtitle: "Temps que tu n'as pas passé à scroller aujourd'hui.",
      trend: { delta: "+18%", direction: "up" },
      weeklyData: [0.3, 0.45, 0.4, 0.55, 0.6, 0.7, 0.82],
      breakdown: [
        { label: "Moyenne 7 jours", value: "1h 48m" },
        { label: "Meilleure journée", value: "3h 02m" },
        { label: "Apps concernées", value: "5" },
      ],
      insight: "Tu es au-dessus de ta moyenne hebdo. Continue, chaque minute compte.",
    },
  },
  {
    id: "kcal",
    icon: Flame,
    value: "124",
    unit: "kcal",
    label: "Dépensées",
    color: "#FF7A45",
    pct: 0.58,
    delta: "+16 kcal",
    detail: {
      icon: Flame,
      color: "#FF7A45",
      label: "Calories brûlées",
      value: "124",
      unit: "kcal",
      subtitle: "Estimation basée sur tes challenges du jour.",
      trend: { delta: "+9%", direction: "up" },
      weeklyData: [0.2, 0.35, 0.3, 0.45, 0.55, 0.6, 0.72],
      breakdown: [
        { label: "Challenges complétés", value: "6" },
        { label: "Moyenne quotidienne", value: "98 kcal" },
        { label: "Total cette semaine", value: "742 kcal" },
      ],
      insight: "Encore 1 challenge et tu passes la barre des 150 kcal.",
    },
  },
  {
    id: "blocked",
    icon: ShieldCheck,
    value: "18",
    label: "Tentatives bloquées",
    color: "#5BA8FF",
    pct: 0.65,
    delta: "+4",
    detail: {
      icon: ShieldCheck,
      color: "#5BA8FF",
      label: "Tentatives bloquées",
      value: "18",
      subtitle: "Chaque déverrouillage = un mouvement validé.",
      trend: { delta: "+24%", direction: "up" },
      weeklyData: [0.4, 0.55, 0.5, 0.7, 0.6, 0.75, 0.88],
      breakdown: [
        { label: "App la plus débloquée", value: "Instagram" },
        { label: "Moyenne quotidienne", value: "14" },
        { label: "Temps moyen accordé", value: "8 min" },
      ],
      insight: "Tu as bougé 18 fois aujourd'hui pour accéder à tes apps.",
    },
  },
];

// Half-circle dotted gauge (top-right corner accent — image 6 style)
const ArcGauge = ({ pct, color }: { pct: number; color: string }) => {
  const size = 56;
  const total = 18;
  const filled = Math.round(pct * total);
  const cx = size / 2;
  const cy = size / 2;
  const inner = size / 2 - 8;
  const outer = size / 2 - 1;
  return (
    <svg width={size} height={size} className="block" aria-hidden>
      {Array.from({ length: total }).map((_, i) => {
        // Arc from 200deg -> 340deg (top-right quadrant feel)
        const startDeg = -78;
        const endDeg = 78;
        const t = i / (total - 1);
        const deg = startDeg + (endDeg - startDeg) * t;
        const rad = (deg * Math.PI) / 180;
        const x1 = cx + Math.cos(rad) * inner;
        const y1 = cy + Math.sin(rad) * inner;
        const x2 = cx + Math.cos(rad) * outer;
        const y2 = cy + Math.sin(rad) * outer;
        const active = i < filled;
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={active ? color : "rgba(255,255,255,0.10)"}
            strokeWidth="1.6"
            strokeLinecap="round"
            opacity={active ? 0.95 : 1}
          />
        );
      })}
    </svg>
  );
};

const TodayProgress = () => {
  const [openStat, setOpenStat] = useState<Stat | null>(null);

  return (
    <section className="px-5 mb-6">
      <div className="flex items-baseline justify-between mb-3 px-0.5">
        <h2 className="text-[18px] font-bold tracking-tight text-foreground">
          Ton impact aujourd'hui
        </h2>
        <button className="text-[12px] text-muted-foreground/80 hover:text-foreground transition-colors flex items-center gap-1">
          Voir tout
          <ChevronRight className="w-3 h-3" strokeWidth={2.4} />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2.5">
        {stats.map((s) => (
          <button
            key={s.id}
            onClick={() => setOpenStat(s)}
            className="
              group relative text-left overflow-hidden rounded-[22px]
              bg-white/[0.025] border border-white/[0.06]
              hover:bg-white/[0.04] hover:border-white/[0.10]
              transition-all duration-200 active:scale-[0.98]
              p-3 flex flex-col
            "
            style={{ aspectRatio: "1 / 1.32" }}
          >
            {/* Soft color glow from corresponding accent */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.16]"
              style={{
                background: `radial-gradient(120% 90% at 50% 100%, ${s.color}, transparent 70%)`,
              }}
            />

            {/* Top row: icon + arc gauge */}
            <div className="relative flex items-start justify-between">
              <span
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: `${s.color}1F`,
                  border: `1px solid ${s.color}40`,
                }}
              >
                <s.icon
                  className="w-[15px] h-[15px]"
                  strokeWidth={2.4}
                  style={{ color: s.color }}
                />
              </span>
              <div className="-mr-1 -mt-1">
                <ArcGauge pct={s.pct} color={s.color} />
              </div>
            </div>

            {/* Value */}
            <div className="relative mt-1.5 flex items-baseline gap-1 leading-none">
              <span className="text-foreground text-[19px] font-bold tabular-nums tracking-tight">
                {s.value}
              </span>
              {s.unit && (
                <span className="text-[10px] text-muted-foreground/70 font-medium">
                  {s.unit}
                </span>
              )}
            </div>

            {/* Label */}
            <p className="relative mt-1 text-[10.5px] text-muted-foreground/80 leading-tight">
              {s.label}
            </p>

            {/* Delta pill */}
            <div
              className="relative mt-auto inline-flex items-center gap-1 self-start px-2 py-[4px] rounded-full"
              style={{
                backgroundColor: `${s.color}14`,
                border: `1px solid ${s.color}2A`,
              }}
            >
              <ArrowUp className="w-2.5 h-2.5" strokeWidth={2.8} style={{ color: s.color }} />
              <span className="text-[9.5px] font-semibold" style={{ color: s.color }}>
                {s.delta}
              </span>
              <span className="text-[9.5px] text-muted-foreground/70 font-medium">
                vs hier
              </span>
            </div>
          </button>
        ))}
      </div>

      <StatDetailModal
        isOpen={!!openStat}
        onClose={() => setOpenStat(null)}
        data={openStat?.detail ?? null}
      />
    </section>
  );
};

export default TodayProgress;
