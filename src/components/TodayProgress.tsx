import { Clock, Flame, Unlock } from "lucide-react";

type Stat = {
  icon: typeof Clock;
  value: string;
  unit?: string;
  label: string;
  // sparkline points 0..1 (y, where 1 = top)
  spark: number[];
};

const stats: Stat[] = [
  {
    icon: Clock,
    value: "2h 14m",
    label: "Écran économisé",
    spark: [0.2, 0.35, 0.3, 0.5, 0.55, 0.7, 0.65, 0.85],
  },
  {
    icon: Flame,
    value: "124",
    unit: "kcal",
    label: "Calories",
    spark: [0.15, 0.25, 0.35, 0.3, 0.5, 0.55, 0.65, 0.7],
  },
  {
    icon: Unlock,
    value: "18",
    label: "Apps débloquées",
    spark: [0.3, 0.5, 0.4, 0.65, 0.5, 0.75, 0.6, 0.8],
  },
];

const Sparkline = ({ data }: { data: number[] }) => {
  const w = 100;
  const h = 28;
  const step = w / (data.length - 1);
  const points = data
    .map((v, i) => `${i * step},${h - v * (h - 2) - 1}`)
    .join(" ");
  const area = `0,${h} ${points} ${w},${h}`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-7" preserveAspectRatio="none">
      <defs>
        <linearGradient id="spark-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(var(--foreground))" stopOpacity="0.18" />
          <stop offset="100%" stopColor="hsl(var(--foreground))" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={area} fill="url(#spark-fill)" />
      <polyline
        points={points}
        fill="none"
        stroke="hsl(var(--foreground))"
        strokeOpacity="0.85"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
};

const TodayProgress = () => {
  return (
    <section className="px-5 mb-6">
      <div className="flex items-baseline justify-between mb-3 px-0.5">
        <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/70">
          Progression d'aujourd'hui
        </h2>
        <button className="text-[11.5px] text-muted-foreground/70 hover:text-foreground transition-colors flex items-center gap-1">
          Voir tout
          <span className="text-[10px]">›</span>
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2.5">
        {stats.map((s) => (
          <div
            key={s.label}
            className="relative overflow-hidden rounded-2xl bg-white/[0.025] border border-white/[0.05] p-3 flex flex-col gap-2"
          >
            <div className="w-7 h-7 rounded-full bg-white/[0.04] border border-white/[0.05] flex items-center justify-center">
              <s.icon className="w-3.5 h-3.5 text-foreground/80" strokeWidth={1.8} />
            </div>

            <div className="flex items-baseline gap-1 leading-none">
              <span className="text-foreground text-[17px] font-semibold tabular-nums tracking-tight">
                {s.value}
              </span>
              {s.unit && (
                <span className="text-[10px] text-muted-foreground/70 font-medium">
                  {s.unit}
                </span>
              )}
            </div>

            <p className="text-[10.5px] text-muted-foreground/75 leading-tight">
              {s.label}
            </p>

            <div className="mt-0.5 -mx-1">
              <Sparkline data={s.spark} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TodayProgress;
