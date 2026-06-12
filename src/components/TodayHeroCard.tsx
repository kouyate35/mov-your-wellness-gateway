import { Clock, Flame, ShieldCheck, ChevronRight } from "lucide-react";

interface TodayHeroCardProps {
  hours: number;
  minutes: number;
  deltaMinutes: number;
  goalHours: number;
  kcal: number;
  blocked: number;
  onDetails?: () => void;
}

const TodayHeroCard = ({
  hours,
  minutes,
  deltaMinutes,
  goalHours,
  kcal,
  blocked,
  onDetails,
}: TodayHeroCardProps) => {
  const goalMinutes = goalHours * 60;
  const savedMinutes = hours * 60 + minutes;
  const pct = Math.min(100, Math.round((savedMinutes / goalMinutes) * 100));

  // Circular gauge with outer tick marks (Apple-watch style)
  const size = 108;
  const stroke = 9;
  const r = (size - stroke) / 2 - 8;
  const c = 2 * Math.PI * r;
  const dash = (pct / 100) * c;

  return (
    <section className="px-5 mb-5">
      <div
        className="
          relative overflow-hidden rounded-[26px] p-5
          bg-white/[0.025] border border-white/[0.06]
          shadow-[inset_0_1px_0_hsl(0_0%_100%/0.04)]
        "
      >
        {/* Subtle ambient glow tied to accent */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-16 -right-10 w-[260px] h-[260px] rounded-full opacity-[0.18] blur-3xl"
          style={{
            background:
              "radial-gradient(circle, hsl(199 89% 48% / 0.9), transparent 70%)",
          }}
        />

        {/* Top row: badge */}
        <div className="relative flex items-center gap-1.5 mb-4">
          <Clock className="w-3 h-3 text-info" strokeWidth={2.4} />
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-info">
            Aujourd'hui
          </span>
        </div>

        {/* Main row: stats left, gauge right */}
        <div className="relative flex items-start justify-between gap-3">
          <div className="min-w-0 pt-1">
            <div className="flex items-baseline gap-1 leading-none">
              <span className="text-foreground text-[44px] font-bold tabular-nums tracking-tight">
                {hours}
              </span>
              <span className="text-muted-foreground/80 text-[18px] font-semibold mr-1">
                h
              </span>
              <span className="text-foreground text-[44px] font-bold tabular-nums tracking-tight">
                {String(minutes).padStart(2, "0")}
              </span>
            </div>
            <p className="mt-1.5 text-[18px] font-semibold text-foreground/90 leading-tight">
              économisées
            </p>
            <p className="mt-2 text-[11.5px] text-muted-foreground">
              Soit{" "}
              <span className="text-info font-semibold">
                +{deltaMinutes} min
              </span>{" "}
              par rapport à hier
            </p>

            <button
              onClick={onDetails}
              className="
                mt-4 inline-flex items-center gap-1.5
                px-3.5 py-2 rounded-full
                bg-foreground text-background
                text-[12px] font-semibold
                shadow-[0_8px_24px_-8px_hsl(0_0%_100%/0.25)]
                active:scale-[0.97] transition-transform
              "
            >
              Voir mes détails
              <ChevronRight className="w-3.5 h-3.5" strokeWidth={2.6} />
            </button>
          </div>

          {/* Gauge */}
          <div className="relative shrink-0" style={{ width: size, height: size }}>
            <svg width={size} height={size} className="-rotate-90">
              <defs>
                <linearGradient id="heroGauge" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="hsl(199 89% 58%)" />
                  <stop offset="100%" stopColor="hsl(154 70% 62%)" />
                </linearGradient>
              </defs>
              {/* Tick marks ring */}
              {Array.from({ length: 56 }).map((_, i) => {
                const angle = (i / 56) * 360;
                const rad = (angle * Math.PI) / 180;
                const inner = size / 2 - 3;
                const outer = size / 2;
                const x1 = size / 2 + Math.cos(rad) * inner;
                const y1 = size / 2 + Math.sin(rad) * inner;
                const x2 = size / 2 + Math.cos(rad) * outer;
                const y2 = size / 2 + Math.sin(rad) * outer;
                return (
                  <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="hsl(0 0% 100% / 0.12)"
                    strokeWidth="1"
                  />
                );
              })}
              {/* Track */}
              <circle
                cx={size / 2}
                cy={size / 2}
                r={r}
                fill="none"
                stroke="hsl(0 0% 100% / 0.07)"
                strokeWidth={stroke}
              />
              {/* Progress */}
              <circle
                cx={size / 2}
                cy={size / 2}
                r={r}
                fill="none"
                stroke="url(#heroGauge)"
                strokeWidth={stroke}
                strokeLinecap="round"
                strokeDasharray={`${dash} ${c}`}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="flex items-baseline gap-0.5 leading-none">
                <span className="text-[22px] font-bold text-foreground tabular-nums">
                  {pct}
                </span>
                <span className="text-[11px] font-semibold text-muted-foreground">
                  %
                </span>
              </div>
              <span className="mt-0.5 text-[8.5px] font-medium uppercase tracking-[0.14em] text-muted-foreground/75">
                Atteint
              </span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="relative my-4 h-px bg-white/[0.05]" />

        {/* Bottom row: kcal + blocked */}
        <div className="relative grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2.5">
            <span
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: "hsl(18 90% 60% / 0.14)",
                border: "1px solid hsl(18 90% 60% / 0.28)",
              }}
            >
              <Flame className="w-4 h-4" style={{ color: "hsl(18 90% 62%)" }} strokeWidth={2.2} />
            </span>
            <div className="min-w-0">
              <div className="flex items-baseline gap-1 leading-none">
                <span className="text-foreground text-[15px] font-bold tabular-nums">
                  {kcal}
                </span>
                <span className="text-muted-foreground/75 text-[10px] font-medium">
                  kcal
                </span>
              </div>
              <p className="mt-1 text-[10.5px] text-muted-foreground/75 leading-none">
                brûlées
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <span
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: "hsl(210 90% 60% / 0.14)",
                border: "1px solid hsl(210 90% 60% / 0.28)",
              }}
            >
              <ShieldCheck className="w-4 h-4" style={{ color: "hsl(210 90% 65%)" }} strokeWidth={2.2} />
            </span>
            <div className="min-w-0">
              <div className="flex items-baseline gap-1 leading-none">
                <span className="text-foreground text-[15px] font-bold tabular-nums">
                  {blocked}
                </span>
              </div>
              <p className="mt-1 text-[10.5px] text-muted-foreground/75 leading-none">
                ouvertures évitées
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TodayHeroCard;
