import { useState } from "react";
import { Clock, Flame, Lock, ChevronRight, type LucideIcon } from "lucide-react";
import StatDetailModal, { StatDetailData } from "./StatDetailModal";

type Stat = {
  id: string;
  icon: LucideIcon;
  value: string;
  unit?: string;
  label: string;
  color: string; // hex
  spark: number[];
  detail: StatDetailData;
};

const stats: Stat[] = [
  {
    id: "saved",
    icon: Clock,
    value: "2h 14m",
    label: "Écran économisé",
    color: "#9BE15D",
    spark: [0.2, 0.35, 0.3, 0.5, 0.55, 0.7, 0.65, 0.85],
    detail: {
      icon: Clock,
      color: "#9BE15D",
      label: "Écran économisé",
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
    label: "Calories",
    color: "#FF7A45",
    spark: [0.15, 0.25, 0.35, 0.3, 0.5, 0.55, 0.65, 0.7],
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
    id: "unlocks",
    icon: Lock,
    value: "18",
    label: "Apps débloquées",
    color: "#5BA8FF",
    spark: [0.3, 0.5, 0.4, 0.65, 0.5, 0.75, 0.6, 0.8],
    detail: {
      icon: Lock,
      color: "#5BA8FF",
      label: "Apps débloquées",
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

const Sparkline = ({ data, color }: { data: number[]; color: string }) => {
  const w = 100;
  const h = 30;
  const step = w / (data.length - 1);
  const points = data
    .map((v, i) => `${i * step},${h - v * (h - 2) - 1}`)
    .join(" ");
  const area = `0,${h} ${points} ${w},${h}`;
  const gid = `spark-${color.replace("#", "")}`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-8" preserveAspectRatio="none">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={area} fill={`url(#${gid})`} />
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeOpacity="1"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
};

const TodayProgress = () => {
  const [openStat, setOpenStat] = useState<Stat | null>(null);

  return (
    <section className="px-5 mb-6">
      <div className="flex items-baseline justify-between mb-3 px-0.5">
        <h2 className="text-[18px] font-bold tracking-tight text-foreground">
          Ta progression
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
              bg-white/[0.025] border border-white/[0.05]
              hover:bg-white/[0.04] hover:border-white/[0.08]
              transition-all duration-200 active:scale-[0.98]
              p-3 flex flex-col
            "
            style={{ aspectRatio: "1 / 1.18" }}
          >
            {/* Pill badge — matches AppList language */}
            <span
              className="inline-flex items-center gap-1 self-start px-2 py-[5px] rounded-full mb-2.5"
              style={{
                backgroundColor: `${s.color}14`,
                border: `1px solid ${s.color}33`,
              }}
            >
              <s.icon className="w-3 h-3" strokeWidth={2.2} style={{ color: s.color }} />
            </span>

            <div className="flex items-baseline gap-1 leading-none">
              <span className="text-foreground text-[17px] font-bold tabular-nums tracking-tight">
                {s.value}
              </span>
              {s.unit && (
                <span className="text-[10px] text-muted-foreground/70 font-medium">
                  {s.unit}
                </span>
              )}
            </div>

            <p className="mt-1.5 text-[10.5px] text-muted-foreground/75 leading-tight">
              {s.label}
            </p>

            <div className="mt-auto -mx-1">
              <Sparkline data={s.spark} color={s.color} />
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
