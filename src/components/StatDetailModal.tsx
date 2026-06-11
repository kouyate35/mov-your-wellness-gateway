import { useEffect } from "react";
import { X, TrendingUp, type LucideIcon } from "lucide-react";

export interface StatDetailData {
  icon: LucideIcon;
  color: string; // hex
  label: string;
  value: string;
  unit?: string;
  subtitle?: string;
  // Optional rich content
  trend?: { delta: string; direction: "up" | "down" }; // e.g. "+12%" "up"
  weeklyData?: number[]; // 7 normalized 0..1 values
  weeklyLabels?: string[]; // e.g. ["L","M","M","J","V","S","D"]
  breakdown?: { label: string; value: string }[];
  insight?: string;
}

interface StatDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: StatDetailData | null;
}

const StatDetailModal = ({ isOpen, onClose, data }: StatDetailModalProps) => {
  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !data) return null;

  const Icon = data.icon;
  const week = data.weeklyData ?? [0.35, 0.5, 0.4, 0.65, 0.55, 0.75, 0.85];
  const labels = data.weeklyLabels ?? ["L", "M", "M", "J", "V", "S", "D"];
  const max = Math.max(...week, 0.01);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/55 backdrop-blur-[6px] animate-in fade-in duration-200"
      />

      {/* Sheet */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          relative w-full sm:max-w-[420px] mx-0 sm:mx-4
          rounded-t-[28px] sm:rounded-[28px]
          bg-[#121214]
          border border-white/[0.06]
          shadow-[0_-20px_60px_-15px_rgba(0,0,0,0.7)]
          animate-in slide-in-from-bottom-6 sm:zoom-in-95 duration-300
          overflow-hidden
        "
      >
        {/* Soft color glow tied to stat */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-40 opacity-[0.18]"
          style={{
            background: `radial-gradient(120% 100% at 50% 0%, ${data.color}, transparent 70%)`,
          }}
        />

        {/* Grabber */}
        <div className="sm:hidden flex justify-center pt-2.5">
          <span className="w-9 h-1 rounded-full bg-white/15" />
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors z-10"
          aria-label="Fermer"
        >
          <X className="w-4 h-4" strokeWidth={2.2} />
        </button>

        <div className="relative px-5 pt-5 pb-7">
          {/* Header */}
          <div className="flex items-center gap-3 mb-5">
            <div
              className="w-11 h-11 rounded-2xl flex items-center justify-center"
              style={{
                backgroundColor: `${data.color}1F`,
                border: `1px solid ${data.color}40`,
              }}
            >
              <Icon className="w-5 h-5" style={{ color: data.color }} strokeWidth={2} />
            </div>
            <div className="min-w-0">
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/70 leading-none">
                Aujourd'hui
              </p>
              <h2 className="mt-1.5 text-[17px] font-semibold text-foreground leading-tight">
                {data.label}
              </h2>
            </div>
          </div>

          {/* Big metric */}
          <div className="flex items-end justify-between gap-4 mb-1">
            <div className="flex items-baseline gap-1.5 leading-none">
              <span className="text-foreground text-[48px] font-semibold tabular-nums tracking-tight">
                {data.value}
              </span>
              {data.unit && (
                <span className="text-[16px] font-semibold text-muted-foreground/80">
                  {data.unit}
                </span>
              )}
            </div>
            {data.trend && (
              <span
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold"
                style={{
                  backgroundColor: `${data.color}1A`,
                  color: data.color,
                  border: `1px solid ${data.color}30`,
                }}
              >
                <TrendingUp
                  className="w-3 h-3"
                  strokeWidth={2.6}
                  style={{ transform: data.trend.direction === "down" ? "rotate(180deg)" : undefined }}
                />
                {data.trend.delta}
              </span>
            )}
          </div>
          {data.subtitle && (
            <p className="text-[12.5px] text-muted-foreground/75">{data.subtitle}</p>
          )}

          {/* Weekly chart */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2.5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/60">
                7 derniers jours
              </p>
            </div>
            <div className="flex items-end gap-2 h-24">
              {week.map((v, i) => {
                const h = Math.max(8, (v / max) * 100);
                const isToday = i === week.length - 1;
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                    <div className="w-full flex-1 flex items-end">
                      <div
                        className="w-full rounded-[6px] transition-all"
                        style={{
                          height: `${h}%`,
                          background: isToday
                            ? `linear-gradient(180deg, ${data.color}, ${data.color}99)`
                            : `${data.color}38`,
                          boxShadow: isToday ? `0 0 18px ${data.color}55` : undefined,
                        }}
                      />
                    </div>
                    <span
                      className={`text-[9.5px] font-medium ${
                        isToday ? "text-foreground" : "text-muted-foreground/55"
                      }`}
                    >
                      {labels[i]}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Breakdown */}
          {data.breakdown && data.breakdown.length > 0 && (
            <div className="mt-6 rounded-2xl bg-white/[0.03] border border-white/[0.05] divide-y divide-white/[0.04]">
              {data.breakdown.map((b) => (
                <div key={b.label} className="flex items-center justify-between px-4 py-3">
                  <span className="text-[13px] text-muted-foreground/85">{b.label}</span>
                  <span className="text-[13.5px] font-semibold text-foreground tabular-nums">
                    {b.value}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Insight */}
          {data.insight && (
            <div className="mt-5 px-4 py-3 rounded-2xl border border-white/[0.05] bg-white/[0.02]">
              <p className="text-[12.5px] text-muted-foreground/85 leading-relaxed">
                {data.insight}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatDetailModal;
