import { Clock, Flame, Lock } from "lucide-react";

type Stat = {
  icon: typeof Clock;
  value: string;
  unit?: string;
  label: string;
  color: string; // hex
  spark: number[];
};

const stats: Stat[] = [
  {
    icon: Clock,
    value: "2h 14m",
    label: "Écran économisé",
    color: "#9BE15D",
    spark: [0.2, 0.35, 0.3, 0.5, 0.55, 0.7, 0.65, 0.85],
  },
  {
    icon: Flame,
    value: "124",
    unit: "kcal",
    label: "Calories",
    color: "#FF7A45",
    spark: [0.15, 0.25, 0.35, 0.3, 0.5, 0.55, 0.65, 0.7],
  },
  {
    icon: Lock,
    value: "18",
    label: "Apps débloquées",
    color: "#5BA8FF",
    spark: [0.3, 0.5, 0.4, 0.65, 0.5, 0.75, 0.6, 0.8],
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
  return (
    <section className="px-5 mb-6">
      <div className="flex items-baseline justify-between mb-3 px-0.5">
        <h2 className="text-[18px] font-bold tracking-tight text-foreground">
          Ta progression
        </h2>
        <button className="text-[12px] text-muted-foreground/80 hover:text-foreground transition-colors flex items-center gap-1">
          Voir tout
          <span className="text-[11px]">›</span>
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2.5">
        {stats.map((s) => (
          <div
            key={s.label}
            className="relative overflow-hidden rounded-[22px] bg-white/[0.03] border border-white/[0.06] p-3 flex flex-col"
            style={{ aspectRatio: "1 / 1.05" }}
          >
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center mb-2"
              style={{
                backgroundColor: `${s.color}1A`,
                border: `1px solid ${s.color}33`,
              }}
            >
              <s.icon className="w-3.5 h-3.5" strokeWidth={2} style={{ color: s.color }} />
            </div>

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
          </div>
        ))}
      </div>
    </section>
  );
};

export default TodayProgress;
