import { useNavigate } from "react-router-dom";
import { ChevronLeft, Dumbbell, Flame, Smartphone, Trophy, Sunrise, Pause, Activity } from "lucide-react";
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
        <div className="px-5 pt-8">

          {/* HERO — single number, editorial */}
          <section className="mb-12">
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/70 mb-3">
              Discipline cette semaine
            </p>
            <div className="flex items-baseline gap-3">
              <h2 className="text-foreground text-[64px] font-semibold leading-none tracking-tight">
                +23<span className="text-[44px] text-muted-foreground/60">%</span>
              </h2>
            </div>
            <p className="text-[14px] text-muted-foreground mt-3 leading-relaxed max-w-[280px]">
              Tu débloques moins d'apps et bouges plus. Meilleure semaine en 6 mois.
            </p>
          </section>

          {/* KEY METRICS — clean trio */}
          <section className="mb-12 grid grid-cols-3 gap-2">
            {[
              { icon: Dumbbell, value: "342", label: "Pompes" },
              { icon: Trophy, value: "37", label: "Défis" },
              { icon: Flame, value: "1842", label: "kcal" },
            ].map((m) => (
              <div key={m.label} className="bg-white/[0.025] border border-white/[0.05] rounded-2xl p-4">
                <m.icon className="w-3.5 h-3.5 text-muted-foreground/70 mb-3" strokeWidth={2} />
                <p className="text-foreground text-[22px] font-semibold leading-none tracking-tight">
                  {m.value}
                </p>
                <p className="text-[10.5px] uppercase tracking-[0.12em] text-muted-foreground/70 mt-2 font-medium">
                  {m.label}
                </p>
              </div>
            ))}
          </section>

          {/* WEEKLY CHART — minimal bars */}
          <section className="mb-12">
            <div className="flex items-baseline justify-between mb-6">
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/70">
                Activité hebdo
              </p>
              <p className="text-[11px] text-muted-foreground">37 défis</p>
            </div>
            <div className="flex items-end justify-between gap-2 h-[140px] mb-3">
              {weekBars.map((b, i) => (
                <div key={i} className="flex flex-col items-center flex-1 gap-2">
                  <div className="flex-1 w-full flex items-end">
                    <div
                      className={`w-full rounded-md transition-all ${
                        b.peak ? "bg-foreground" : "bg-white/[0.08]"
                      }`}
                      style={{ height: `${(b.value / maxBar) * 100}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-muted-foreground/60 font-medium">{b.day}</span>
                </div>
              ))}
            </div>
          </section>

          {/* SECONDARY METRICS — minimal list */}
          <section className="mb-12">
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/70 mb-4">
              Autres signaux
            </p>
            <div className="space-y-0">
              {[
                { icon: Smartphone, label: "Apps débloquées", value: "47" },
                { icon: Sunrise, label: "Défis matinaux", value: "5/7" },
                { icon: Pause, label: "Pauses respectées", value: "12" },
              ].map((m, i, arr) => (
                <div
                  key={m.label}
                  className={`flex items-center gap-3 py-3.5 ${i < arr.length - 1 ? "border-b border-white/[0.04]" : ""}`}
                >
                  <m.icon className="w-4 h-4 text-muted-foreground/70" strokeWidth={1.8} />
                  <span className="flex-1 text-[14px] text-foreground/90">{m.label}</span>
                  <span className="text-[14px] font-semibold text-foreground tabular-nums">{m.value}</span>
                </div>
              ))}
            </div>
          </section>

          {/* PILLARS — sober */}
          <section className="mb-12">
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/70 mb-4">
              Répartition par pilier
            </p>
            <div className="space-y-3.5">
              {[
                { name: "MOVE", count: 18, pct: 48 },
                { name: "FLEX", count: 9, pct: 24 },
                { name: "BREATH", count: 5, pct: 14 },
                { name: "FOCUS", count: 3, pct: 8 },
                { name: "PAUSE", count: 2, pct: 6 },
              ].map((p) => (
                <div key={p.name} className="flex items-center gap-3">
                  <span className="text-[10.5px] font-semibold w-14 text-foreground/80 tracking-[0.12em]">
                    {p.name}
                  </span>
                  <div className="flex-1 h-[3px] rounded-full overflow-hidden bg-white/[0.06]">
                    <div
                      className="h-full rounded-full bg-foreground/80 transition-all"
                      style={{ width: `${p.pct}%` }}
                    />
                  </div>
                  <span className="text-[11px] text-muted-foreground w-6 text-right tabular-nums">{p.count}</span>
                </div>
              ))}
            </div>
          </section>

          {/* ACHIEVEMENTS — minimalist list */}
          <section className="mb-8">
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/70 mb-4">
              Accomplissements
            </p>
            <div className="space-y-0">
              {[
                { icon: Flame, title: "Série de 12 jours", desc: "Aucun défi matinal raté" },
                { icon: Trophy, title: "Record de pompes", desc: "75 pompes en une session" },
                { icon: Activity, title: "Discipline numérique", desc: "47 apps débloquées par l'effort" },
              ].map((a, i, arr) => (
                <div
                  key={a.title}
                  className={`flex items-center gap-3 py-4 ${i < arr.length - 1 ? "border-b border-white/[0.04]" : ""}`}
                >
                  <div className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/[0.05] flex items-center justify-center shrink-0">
                    <a.icon className="w-4 h-4 text-foreground/80" strokeWidth={1.8} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-foreground text-[13.5px] font-medium leading-tight">{a.title}</p>
                    <p className="text-muted-foreground text-[11.5px] mt-0.5 truncate">{a.desc}</p>
                  </div>
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
