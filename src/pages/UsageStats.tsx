import { useNavigate } from "react-router-dom";
import { ChevronLeft, Dumbbell, Flame, Smartphone, Trophy, Sunrise, Pause, Activity, TrendingUp, ArrowUpRight } from "lucide-react";
import BottomNavBar from "@/components/BottomNavBar";

const weekBars = [
  { day: "L", value: 3 },
  { day: "M", value: 5 },
  { day: "M", value: 7 },
  { day: "J", value: 4 },
  { day: "V", value: 9, peak: true },
  { day: "S", value: 6 },
  { day: "D", value: 3 },
];

const maxBar = Math.max(...weekBars.map((b) => b.value));
const totalWeek = weekBars.reduce((s, b) => s + b.value, 0);

const UsageStats = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-xl border-b border-white/[0.04]">
        <div className="px-5 pt-[max(env(safe-area-inset-top),12px)] pb-3 flex items-center">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 -ml-2 rounded-full flex items-center justify-center active:scale-95 transition-transform"
            aria-label="Retour"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="text-foreground text-[17px] font-semibold tracking-tight">
            Statistiques
          </h1>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto overscroll-y-contain pb-32">
        <div className="px-5 pt-7">

          {/* Period switcher */}
          <div className="inline-flex items-center gap-1 p-1 rounded-full bg-white/[0.04] border border-white/[0.06] mb-7">
            {["Semaine", "Mois", "Année"].map((p, i) => (
              <button
                key={p}
                className={`px-3.5 py-1.5 rounded-full text-[11.5px] font-semibold transition-colors ${
                  i === 0 ? "bg-foreground text-background" : "text-muted-foreground"
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          {/* HERO */}
          <section className="mb-10">
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/70 mb-3">
              Discipline cette semaine
            </p>
            <div className="flex items-end justify-between">
              <div className="flex items-baseline gap-1">
                <h2 className="text-foreground text-[64px] font-semibold leading-none tracking-tight">
                  +23
                </h2>
                <span className="text-[36px] font-semibold text-muted-foreground/50 leading-none">%</span>
              </div>
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/20 mb-2">
                <ArrowUpRight className="w-3 h-3 text-emerald-300" />
                <span className="text-[10.5px] font-semibold text-emerald-300">vs sem. dernière</span>
              </div>
            </div>
            <p className="text-[13.5px] text-muted-foreground mt-3 leading-relaxed max-w-[300px]">
              Tu débloques moins d'apps et bouges plus. Meilleure semaine en 6 mois.
            </p>
          </section>

          {/* WEEKLY CHART — premium */}
          <section className="mb-10">
            <div className="rounded-2xl bg-white/[0.025] border border-white/[0.05] p-5">
              <div className="flex items-baseline justify-between mb-5">
                <div>
                  <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/70">
                    Activité hebdo
                  </p>
                  <p className="text-foreground text-[20px] font-semibold tracking-tight mt-1.5 tabular-nums">
                    {totalWeek} <span className="text-[12px] text-muted-foreground/60 font-medium">défis</span>
                  </p>
                </div>
                <div className="flex items-center gap-1 text-emerald-300">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span className="text-[11px] font-semibold">+12%</span>
                </div>
              </div>
              <div className="flex items-end justify-between gap-2 h-[120px]">
                {weekBars.map((b, i) => (
                  <div key={i} className="flex flex-col items-center flex-1 gap-2 h-full">
                    <div className="flex-1 w-full flex items-end relative">
                      <div
                        className={`w-full rounded-t-md transition-all duration-500 ${
                          b.peak ? "bg-foreground" : "bg-white/[0.1]"
                        }`}
                        style={{ height: `${(b.value / maxBar) * 100}%` }}
                      />
                      {b.peak && (
                        <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-semibold text-foreground tabular-nums">
                          {b.value}
                        </span>
                      )}
                    </div>
                    <span className={`text-[10px] font-medium tabular-nums ${b.peak ? "text-foreground" : "text-muted-foreground/55"}`}>
                      {b.day}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* KEY METRICS */}
          <section className="mb-10 grid grid-cols-3 gap-2.5">
            {[
              { icon: Dumbbell, value: "342", label: "Pompes" },
              { icon: Trophy, value: "37", label: "Défis" },
              { icon: Flame, value: "1842", label: "kcal" },
            ].map((m) => (
              <div key={m.label} className="bg-white/[0.025] border border-white/[0.05] rounded-2xl p-3.5">
                <m.icon className="w-3.5 h-3.5 text-muted-foreground/70 mb-2.5" strokeWidth={1.8} />
                <p className="text-foreground text-[20px] font-semibold leading-none tracking-tight tabular-nums">
                  {m.value}
                </p>
                <p className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground/65 mt-2 font-medium">
                  {m.label}
                </p>
              </div>
            ))}
          </section>

          {/* SECONDARY METRICS */}
          <section className="mb-10">
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/70 mb-3 px-1">
              Autres signaux
            </p>
            <div className="rounded-2xl bg-white/[0.02] border border-white/[0.05] overflow-hidden">
              {[
                { icon: Smartphone, label: "Apps débloquées", value: "47" },
                { icon: Sunrise, label: "Défis matinaux", value: "5/7" },
                { icon: Pause, label: "Pauses respectées", value: "12" },
              ].map((m, i, arr) => (
                <div
                  key={m.label}
                  className={`flex items-center gap-3.5 px-4 py-3.5 ${i < arr.length - 1 ? "border-b border-white/[0.04]" : ""}`}
                >
                  <div className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/[0.05] flex items-center justify-center shrink-0">
                    <m.icon className="w-[15px] h-[15px] text-foreground/85" strokeWidth={1.7} />
                  </div>
                  <span className="flex-1 text-[13.5px] text-foreground/90">{m.label}</span>
                  <span className="text-[14px] font-semibold text-foreground tabular-nums">{m.value}</span>
                </div>
              ))}
            </div>
          </section>

          {/* PILLARS */}
          <section className="mb-10">
            <div className="flex items-baseline justify-between mb-4 px-1">
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/70">
                Répartition par pilier
              </p>
              <p className="text-[11px] text-muted-foreground/65 tabular-nums">37 sessions</p>
            </div>
            <div className="rounded-2xl bg-white/[0.02] border border-white/[0.05] p-5 space-y-4">
              {[
                { name: "MOVE", count: 18, pct: 48 },
                { name: "FLEX", count: 9, pct: 24 },
                { name: "BREATH", count: 5, pct: 14 },
                { name: "FOCUS", count: 3, pct: 8 },
                { name: "PAUSE", count: 2, pct: 6 },
              ].map((p) => (
                <div key={p.name}>
                  <div className="flex items-baseline justify-between mb-1.5">
                    <span className="text-[11px] font-semibold text-foreground/85 tracking-[0.16em]">
                      {p.name}
                    </span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-[13px] font-semibold text-foreground tabular-nums">{p.count}</span>
                      <span className="text-[10px] text-muted-foreground/60 tabular-nums">· {p.pct}%</span>
                    </div>
                  </div>
                  <div className="h-[3px] rounded-full overflow-hidden bg-white/[0.05]">
                    <div
                      className="h-full rounded-full bg-foreground/85 transition-all duration-700"
                      style={{ width: `${p.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ACHIEVEMENTS */}
          <section className="mb-8">
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/70 mb-3 px-1">
              Accomplissements
            </p>
            <div className="rounded-2xl bg-white/[0.02] border border-white/[0.05] overflow-hidden">
              {[
                { icon: Flame, title: "Série de 12 jours", desc: "Aucun défi matinal raté", value: "12" },
                { icon: Trophy, title: "Record de pompes", desc: "75 pompes en une session", value: "75" },
                { icon: Activity, title: "Discipline numérique", desc: "47 apps débloquées par l'effort", value: "47" },
              ].map((a, i, arr) => (
                <div
                  key={a.title}
                  className={`flex items-center gap-3.5 px-4 py-3.5 ${i < arr.length - 1 ? "border-b border-white/[0.04]" : ""}`}
                >
                  <div className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/[0.05] flex items-center justify-center shrink-0">
                    <a.icon className="w-[15px] h-[15px] text-foreground/85" strokeWidth={1.7} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-foreground text-[13.5px] font-semibold leading-tight">{a.title}</p>
                    <p className="text-muted-foreground text-[11.5px] mt-0.5 truncate">{a.desc}</p>
                  </div>
                  <span className="text-foreground/90 text-[15px] font-semibold tabular-nums shrink-0">{a.value}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      <BottomNavBar />
    </div>
  );
};

export default UsageStats;
