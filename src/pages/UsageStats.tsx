import { useNavigate } from "react-router-dom";
import { ChevronLeft, Dumbbell, Flame, Smartphone, Trophy, Sunrise, Pause, ArrowRight, Activity } from "lucide-react";
import BottomNavBar from "@/components/BottomNavBar";
import HeroFigureAnimation from "@/components/HeroFigureAnimation";

// ── Premium palette ─────────────────────────────────────
const COLORS = {
  info: "#3b82f6",
  success: "#10b981",
  warning: "#f59e0b",
  fire: "#FF6B6B",
  successText: "#6ee7b7",
  orange: "#FF8A00",
};

// ── Weekly chart: défis Workout réussis par jour ────────
const weekBars = [
  { day: "Lun", height: 90, value: 3, type: "low" as const },
  { day: "Mar", height: 130, value: 5, type: "soft" as const },
  { day: "Mer", height: 175, value: 7, type: "peak-mid" as const },
  { day: "Jeu", height: 110, value: 4, type: "low" as const },
  { day: "Ven", height: 200, value: 9, type: "peak-fire" as const },
  { day: "Sam", height: 140, value: 6, type: "soft" as const },
  { day: "Dim", height: 95, value: 3, type: "low-soft" as const },
];

const UsageStats = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      {/* ── Header sticky ───────────────────────── */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border/40">
        <div className="px-5 pt-[max(env(safe-area-inset-top),12px)] pb-3 flex items-center">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 -ml-2 rounded-full flex items-center justify-center active:scale-95 transition-transform"
            aria-label="Retour"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="text-foreground text-[22px] font-medium tracking-tight">
            Statistiques
          </h1>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto overscroll-y-contain pb-32">
        <div className="px-5 pt-6 sm:px-8 sm:pt-10">

          {/* ── HERO SECTION ───────────────────── */}
          <section className="mb-10">
            <div
              className="relative overflow-hidden rounded-xl p-6 sm:p-8 min-h-[240px] flex flex-col justify-end"
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              }}
            >
              <div
                className="absolute -top-10 -right-10 w-[200px] h-[200px] rounded-full pointer-events-none"
                style={{ background: "rgba(255,255,255,0.05)" }}
              />
              <div
                className="absolute -bottom-20 -left-16 w-[280px] h-[280px] rounded-full pointer-events-none"
                style={{ background: "rgba(255,255,255,0.03)" }}
              />

              <div className="relative z-10 flex items-end gap-3">
                <div className="flex-1 min-w-0">
                  <p
                    className="text-[11px] font-semibold uppercase tracking-[1px] mb-3"
                    style={{ color: "rgba(255,255,255,0.8)" }}
                  >
                    Discipline Workout
                  </p>
                  <h2 className="text-white text-[48px] font-semibold leading-[1.1] mb-2 tracking-tight">
                    +23%
                  </h2>
                  <p
                    className="text-[15px] leading-relaxed max-w-[220px]"
                    style={{ color: "rgba(255,255,255,0.95)" }}
                  >
                    Tu débloques moins d'apps et bouges plus. Meilleure semaine en 6 mois 🔥
                  </p>
                </div>
                <div className="relative shrink-0 w-[110px] h-[170px] sm:w-[140px] sm:h-[200px] -mb-2">
                  <HeroFigureAnimation />
                </div>
              </div>
            </div>
          </section>

          {/* ── PILLAR METRICS — adaptés à Workout ─────────────────── */}
          <section className="mb-10 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {/* Pillar 1 — Pompes effectuées */}
            <article className="rounded-xl bg-card border border-border/40 overflow-hidden">
              <div
                className="px-5 pt-5 pb-4 border-b border-border/40 flex gap-3 items-start"
                style={{
                  background: `linear-gradient(to right, ${COLORS.info}, hsl(var(--secondary)))`,
                }}
              >
                <div className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0" style={{ background: "rgba(255,255,255,0.2)" }}>
                  <Dumbbell className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.5px] text-white/85 mb-1">
                    Pompes effectuées
                  </p>
                  <p className="text-white text-[28px] font-semibold leading-none">
                    342
                  </p>
                </div>
              </div>
              <div className="px-5 py-4">
                <div className="flex items-center justify-between text-[13px] mb-3">
                  <span className="text-muted-foreground">Cette semaine</span>
                  <span className="font-semibold" style={{ color: COLORS.successText }}>+18%</span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden bg-secondary mb-3">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: "78%",
                      background: `linear-gradient(to right, ${COLORS.info}, ${COLORS.success})`,
                    }}
                  />
                </div>
                <p className="text-[11px] text-muted-foreground">Objectif 400/sem ✓ presque</p>
              </div>
            </article>

            {/* Pillar 2 — Défis réussis */}
            <article className="rounded-xl bg-card border border-border/40 overflow-hidden">
              <div
                className="px-5 pt-5 pb-4 border-b border-border/40 flex gap-3 items-start"
                style={{
                  background: `linear-gradient(to right, ${COLORS.warning}, hsl(var(--secondary)))`,
                }}
              >
                <div className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0" style={{ background: "rgba(255,255,255,0.2)" }}>
                  <Trophy className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.5px] text-white/85 mb-1">
                    Défis réussis
                  </p>
                  <p className="text-white text-[28px] font-semibold leading-none">
                    37
                  </p>
                </div>
              </div>
              <div className="px-5 py-4">
                <p className="text-[12px] text-muted-foreground">+9 cette semaine • 3 défis matinaux</p>
              </div>
            </article>

            {/* Pillar 3 — Calories brûlées */}
            <article className="rounded-xl bg-card border border-border/40 overflow-hidden">
              <div
                className="px-5 pt-5 pb-4 border-b border-border/40 flex gap-3 items-start"
                style={{
                  background: `linear-gradient(to right, ${COLORS.success}, hsl(var(--secondary)))`,
                }}
              >
                <div className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0" style={{ background: "rgba(255,255,255,0.2)" }}>
                  <Flame className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.5px] text-white/85 mb-1">
                    Calories brûlées
                  </p>
                  <p className="text-white text-[28px] font-semibold leading-none">
                    1842
                  </p>
                </div>
              </div>
              <div className="px-5 py-4">
                <p className="text-[12px] text-muted-foreground">kcal • via challenges Workout</p>
              </div>
            </article>
          </section>

          {/* ── SECONDARY METRICS — Workout-specific ─────────── */}
          <section className="mb-10 grid grid-cols-3 gap-3">
            {[
              { icon: <Smartphone className="w-4 h-4" />, label: "Apps débloquées", value: "47", sub: "challenges complétés", color: COLORS.orange },
              { icon: <Sunrise className="w-4 h-4" />, label: "Défis matinaux", value: "5/7", sub: "cette semaine", color: COLORS.warning },
              { icon: <Pause className="w-4 h-4" />, label: "Pauses respectées", value: "12", sub: "sessions de 45min", color: COLORS.info },
            ].map((m) => (
              <div key={m.label} className="rounded-xl bg-card border border-border/40 p-3 flex flex-col gap-2">
                <div
                  className="w-7 h-7 rounded-md flex items-center justify-center text-white"
                  style={{ background: m.color }}
                >
                  {m.icon}
                </div>
                <div>
                  <p className="text-foreground text-[18px] font-semibold leading-none mb-1">{m.value}</p>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.4px] text-muted-foreground leading-tight">{m.label}</p>
                  <p className="text-[10px] text-muted-foreground/70 mt-0.5">{m.sub}</p>
                </div>
              </div>
            ))}
          </section>

          {/* ── VISUAL CHART — Défis Workout par jour ────────── */}
          <section className="mb-10 rounded-xl bg-card border border-border/40 px-6 py-8">
            <div className="mb-8">
              <p className="text-[12px] font-semibold uppercase tracking-[0.5px] text-muted-foreground mb-1.5">
                Activité hebdomadaire
              </p>
              <h3 className="text-foreground text-[18px] font-semibold">
                Défis Workout réussis par jour
              </h3>
            </div>

            <div className="flex items-end justify-around gap-2 h-[220px] mb-8 px-1 sm:px-0">
              {weekBars.map((b, i) => {
                let bg = COLORS.info;
                let opacity = 1;
                let shadow = "";
                if (b.type === "peak-mid") {
                  bg = `linear-gradient(to top, ${COLORS.success}, ${COLORS.info})`;
                  shadow = "0 8px 16px rgba(0,0,0,0.25)";
                } else if (b.type === "peak-fire") {
                  bg = `linear-gradient(to top, ${COLORS.fire}, ${COLORS.warning})`;
                  shadow = "0 8px 20px rgba(255,107,107,0.25)";
                } else if (b.type === "low") {
                  opacity = 0.5;
                } else if (b.type === "low-soft") {
                  opacity = 0.6;
                } else if (b.type === "soft") {
                  opacity = 0.75;
                }

                return (
                  <div key={b.day} className="flex flex-col items-center flex-1">
                    <p className="text-[10px] font-semibold text-foreground/70 mb-1.5">{b.value}</p>
                    <div
                      className="w-full max-w-[36px] rounded-lg mb-3 animate-fade-in-up"
                      style={{
                        height: `${b.height}px`,
                        background: bg.includes("gradient") ? bg : COLORS.info,
                        opacity,
                        boxShadow: shadow,
                        animationDelay: `${i * 60}ms`,
                      }}
                    />
                    <p className="text-[12px] font-semibold text-foreground">{b.day}</p>
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-border/40">
              <div className="text-center">
                <p className="text-[11px] font-semibold uppercase tracking-[0.5px] text-muted-foreground mb-1.5">
                  Total
                </p>
                <p className="text-foreground text-[20px] font-semibold">37</p>
              </div>
              <div className="text-center">
                <p className="text-[11px] font-semibold uppercase tracking-[0.5px] text-muted-foreground mb-1.5">
                  Moyenne
                </p>
                <p className="text-foreground text-[20px] font-semibold">5,3/j</p>
              </div>
              <div className="text-center">
                <p className="text-[11px] font-semibold uppercase tracking-[0.5px] text-muted-foreground mb-1.5">
                  Peak
                </p>
                <p className="text-foreground text-[20px] font-semibold">9 (Ven)</p>
              </div>
            </div>
          </section>

          {/* ── PILIERS ACTIVITÉ — répartition MOVE / FLEX / BREATH / FOCUS / PAUSE ─ */}
          <section className="mb-10">
            <p className="text-[12px] font-semibold uppercase tracking-[0.5px] text-muted-foreground mb-3">
              Répartition par pilier
            </p>
            <div className="rounded-xl bg-card border border-border/40 p-5 flex flex-col gap-4">
              {[
                { name: "MOVE", count: 18, pct: 48, color: COLORS.fire },
                { name: "FLEX", count: 9, pct: 24, color: COLORS.info },
                { name: "BREATH", count: 5, pct: 14, color: COLORS.success },
                { name: "FOCUS", count: 3, pct: 8, color: COLORS.warning },
                { name: "PAUSE", count: 2, pct: 6, color: "#a78bfa" },
              ].map((p) => (
                <div key={p.name} className="flex items-center gap-3">
                  <span className="text-[12px] font-semibold w-14 text-foreground tracking-wider">{p.name}</span>
                  <div className="flex-1 h-2 rounded-full overflow-hidden bg-secondary">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${p.pct}%`, background: p.color }}
                    />
                  </div>
                  <span className="text-[12px] text-muted-foreground w-8 text-right">{p.count}</span>
                </div>
              ))}
            </div>
          </section>

          {/* ── ACHIEVEMENTS — adaptés Workout ──────────── */}
          <section className="mb-10">
            <p className="text-[12px] font-semibold uppercase tracking-[0.5px] text-muted-foreground mb-3">
              Tes accomplissements
            </p>
            <div className="flex flex-col gap-3">
              {[
                {
                  icon: <Flame className="w-7 h-7" fill="white" />,
                  title: "Série de 12 jours",
                  desc: "Tu n'as pas raté un seul défi matinal",
                  gradient: "linear-gradient(135deg, #fa709a, #fee140)",
                },
                {
                  icon: <Trophy className="w-7 h-7" />,
                  title: "Record de pompes",
                  desc: "75 pompes en une session — ton meilleur",
                  gradient: "linear-gradient(135deg, #f093fb, #f5576c)",
                },
                {
                  icon: <Activity className="w-7 h-7" fill="white" />,
                  title: "Discipline numérique",
                  desc: "47 apps débloquées par l'effort cette semaine",
                  gradient: "linear-gradient(135deg, #667eea, #764ba2)",
                },
              ].map((a, i) => (
                <article
                  key={a.title}
                  className="rounded-xl bg-card border border-border/40 p-5 flex gap-4 items-center transition-transform active:scale-[0.99] animate-fade-in-up"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div
                    className="w-14 h-14 rounded-lg flex items-center justify-center shrink-0 text-white"
                    style={{ background: a.gradient }}
                  >
                    {a.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-foreground text-[14px] font-semibold mb-1">{a.title}</h4>
                    <p className="text-muted-foreground text-[12px]">{a.desc}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground shrink-0" />
                </article>
              ))}
            </div>
          </section>

          {/* ── INSIGHTS — adaptés Workout ──────────── */}
          <section
            className="mb-8 rounded-xl border border-border/40 px-6 py-8"
            style={{
              background: "linear-gradient(135deg, hsl(var(--secondary)), hsl(var(--card)))",
            }}
          >
            <p className="text-[12px] font-semibold uppercase tracking-[0.5px] text-muted-foreground mb-3">
              Recommandations
            </p>
            <h2 className="text-foreground text-[20px] font-semibold mb-6">
              Pour progresser cette semaine
            </h2>

            <div className="flex flex-col gap-4">
              {[
                { n: 1, color: COLORS.fire, title: "Reproduis ton vendredi", desc: "9 défis ce jour-là — ton record. Réessaie ce rythme." },
                { n: 2, color: COLORS.warning, title: "Renforce les lundis", desc: "Seulement 3 défis lundi. Active un défi matinal pour démarrer fort." },
                { n: 3, color: COLORS.info, title: "Explore le pilier FOCUS", desc: "Seulement 8% de tes défis. Essaie une session de respiration guidée." },
              ].map((s) => (
                <div key={s.n} className="flex gap-3">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[12px] font-semibold shrink-0"
                    style={{ background: s.color }}
                  >
                    {s.n}
                  </div>
                  <div>
                    <h4 className="text-foreground text-[13px] font-semibold mb-0.5">{s.title}</h4>
                    <p className="text-muted-foreground text-[12px]">{s.desc}</p>
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
