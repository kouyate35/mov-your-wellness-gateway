import { useNavigate } from "react-router-dom";
import { ChevronLeft, Calendar, Settings, Timer, Target, Flame, Star, Trophy, ArrowRight } from "lucide-react";
import BottomNavBar from "@/components/BottomNavBar";

// ── Premium palette (exact spec) ───────────────────────────
const COLORS = {
  info: "#3b82f6",
  success: "#10b981",
  warning: "#f59e0b",
  fire: "#FF6B6B",
  successText: "#6ee7b7",
};

// ── Weekly chart data (exact spec heights) ─────────────────
const weekBars = [
  { day: "Lun", height: 120, type: "low" as const },
  { day: "Mar", height: 85, type: "low" as const },
  { day: "Mer", height: 170, type: "peak-mid" as const },
  { day: "Jeu", height: 95, type: "low" as const },
  { day: "Ven", height: 150, type: "peak-fire" as const },
  { day: "Sam", height: 110, type: "low-soft" as const },
  { day: "Dim", height: 135, type: "soft" as const },
];

const UsageStats = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      {/* ── Header sticky ───────────────────────── */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border/40">
        <div className="px-5 pt-[max(env(safe-area-inset-top),12px)] pb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
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
          <div className="flex items-center gap-2">
            <button className="h-9 px-3 rounded-lg border border-border/60 text-muted-foreground text-[13px] flex items-center gap-1.5 active:scale-95 transition-transform">
              <Calendar className="w-4 h-4" />
            </button>
            <button className="h-9 px-3 rounded-lg border border-border/60 text-muted-foreground text-[13px] flex items-center gap-1.5 active:scale-95 transition-transform">
              <Settings className="w-4 h-4" />
            </button>
          </div>
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
              {/* Decorative circles */}
              <div
                className="absolute -top-10 -right-10 w-[200px] h-[200px] rounded-full pointer-events-none"
                style={{ background: "rgba(255,255,255,0.05)" }}
              />
              <div
                className="absolute -bottom-20 -left-16 w-[280px] h-[280px] rounded-full pointer-events-none"
                style={{ background: "rgba(255,255,255,0.03)" }}
              />

              <div className="relative z-10">
                <p
                  className="text-[11px] font-semibold uppercase tracking-[1px] mb-3"
                  style={{ color: "rgba(255,255,255,0.8)" }}
                >
                  Votre performance
                </p>
                <h2 className="text-white text-[48px] font-semibold leading-[1.1] mb-2 tracking-tight">
                  +23%
                </h2>
                <p
                  className="text-[15px] leading-relaxed max-w-[260px]"
                  style={{ color: "rgba(255,255,255,0.95)" }}
                >
                  Vous surpassez vos objectifs. C'est votre meilleure performance en 6 mois 🔥
                </p>
              </div>
            </div>
          </section>

          {/* ── PILLAR METRICS ─────────────────── */}
          <section className="mb-10 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {/* Pillar 1 — Focus time */}
            <article className="rounded-xl bg-card border border-border/40 overflow-hidden">
              <div
                className="px-5 pt-5 pb-4 border-b border-border/40 flex gap-3 items-start"
                style={{
                  background: `linear-gradient(to right, ${COLORS.info}, hsl(var(--secondary)))`,
                }}
              >
                <div className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0" style={{ background: "rgba(255,255,255,0.2)" }}>
                  <Timer className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.5px] text-white/85 mb-1">
                    Temps de focus
                  </p>
                  <p className="text-white text-[28px] font-semibold leading-none">
                    6h 34m
                  </p>
                </div>
              </div>
              <div className="px-5 py-4">
                <div className="flex items-center justify-between text-[13px] mb-3">
                  <span className="text-muted-foreground">Progression</span>
                  <span className="font-semibold" style={{ color: COLORS.successText }}>+12%</span>
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
                <p className="text-[11px] text-muted-foreground">Cible atteinte ✓</p>
              </div>
            </article>

            {/* Pillar 2 — Défis */}
            <article className="rounded-xl bg-card border border-border/40 overflow-hidden">
              <div
                className="px-5 pt-5 pb-4 border-b border-border/40 flex gap-3 items-start"
                style={{
                  background: `linear-gradient(to right, ${COLORS.warning}, hsl(var(--secondary)))`,
                }}
              >
                <div className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0" style={{ background: "rgba(255,255,255,0.2)" }}>
                  <Target className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.5px] text-white/85 mb-1">
                    Défis réussis
                  </p>
                  <p className="text-white text-[28px] font-semibold leading-none">
                    28
                  </p>
                </div>
              </div>
              <div className="px-5 py-4">
                <p className="text-[12px] text-muted-foreground">+7 cette semaine</p>
              </div>
            </article>

            {/* Pillar 3 — Calories */}
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
                <p className="text-[12px] text-muted-foreground">kcal • ≈ 2 repas</p>
              </div>
            </article>
          </section>

          {/* ── VISUAL CHART ───────────────────── */}
          <section className="mb-10 rounded-xl bg-card border border-border/40 px-6 py-8">
            <div className="mb-8">
              <p className="text-[12px] font-semibold uppercase tracking-[0.5px] text-muted-foreground mb-1.5">
                Progression hebdomadaire
              </p>
              <h3 className="text-foreground text-[18px] font-semibold">
                Votre semaine jour par jour
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
                  opacity = 0.6;
                } else if (b.type === "low-soft") {
                  opacity = 0.7;
                } else if (b.type === "soft") {
                  opacity = 0.7;
                }

                return (
                  <div key={b.day} className="flex flex-col items-center flex-1">
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

            <div className="grid grid-cols-2 gap-3 pt-6 border-t border-border/40">
              <div className="text-center">
                <p className="text-[12px] font-semibold uppercase tracking-[0.5px] text-muted-foreground mb-1.5">
                  Moyenne
                </p>
                <p className="text-foreground text-[20px] font-semibold">56m</p>
              </div>
              <div className="text-center">
                <p className="text-[12px] font-semibold uppercase tracking-[0.5px] text-muted-foreground mb-1.5">
                  Peak
                </p>
                <p className="text-foreground text-[20px] font-semibold">1h 45m</p>
              </div>
            </div>
          </section>

          {/* ── ACHIEVEMENTS ───────────────────── */}
          <section className="mb-10">
            <p className="text-[12px] font-semibold uppercase tracking-[0.5px] text-muted-foreground mb-3">
              Vos accomplissements
            </p>
            <div className="flex flex-col gap-3">
              {[
                {
                  icon: <Star className="w-7 h-7" fill="white" />,
                  title: "Série de 5 jours",
                  desc: "Vous avez travaillé 5 jours consécutifs",
                  gradient: "linear-gradient(135deg, #667eea, #764ba2)",
                },
                {
                  icon: <Trophy className="w-7 h-7" />,
                  title: "Record personnel",
                  desc: "Meilleure session: 1h 45m",
                  gradient: "linear-gradient(135deg, #f093fb, #f5576c)",
                },
                {
                  icon: <Flame className="w-7 h-7" fill="white" />,
                  title: "Peak performance",
                  desc: "Vendredi: +150% vs votre moyenne",
                  gradient: "linear-gradient(135deg, #fa709a, #fee140)",
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

          {/* ── INSIGHTS ───────────────────────── */}
          <section
            className="mb-8 rounded-xl border border-border/40 px-6 py-8"
            style={{
              background: "linear-gradient(135deg, hsl(var(--secondary)), hsl(var(--card)))",
            }}
          >
            <p className="text-[12px] font-semibold uppercase tracking-[0.5px] text-muted-foreground mb-3">
              Prochaines étapes
            </p>
            <h2 className="text-foreground text-[20px] font-semibold mb-6">
              Maintenez cette dynamique
            </h2>

            <div className="flex flex-col gap-4">
              {[
                { n: 1, color: COLORS.info, title: "Continuez le rythme du vendredi", desc: "Vous êtes 3x plus productif en fin de semaine" },
                { n: 2, color: COLORS.success, title: "Stabilisez les lundis", desc: "C'est votre jour le plus faible: -40% vs moyenne" },
                { n: 3, color: COLORS.warning, title: "Visez 8 semaines de suite", desc: "Au rythme actuel, vous atteindrez votre meilleur record" },
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
