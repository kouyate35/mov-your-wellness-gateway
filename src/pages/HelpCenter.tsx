import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  Search,
  ChevronRight,
  MessageCircle,
  Rocket,
  Link2,
  Dumbbell,
  Trophy,
  BarChart3,
  Bell,
  UserCog,
  LifeBuoy,
} from "lucide-react";
import movIcon from "@/assets/workout-logo.png";

const articles = [
  { id: "getting-started", title: "Premiers pas", description: "Configurer Workout en quelques minutes.", icon: Rocket },
  { id: "connect-apps", title: "Connecter vos applications", description: "Lier vos apps favorites pour un suivi auto.", icon: Link2 },
  { id: "programs", title: "Programmes d'entraînement", description: "Tous les programmes disponibles.", icon: Dumbbell },
  { id: "challenges", title: "Challenges & récompenses", description: "Gagner des badges et rester motivé.", icon: Trophy },
  { id: "stats", title: "Statistiques & progression", description: "Comprendre vos données d'usage.", icon: BarChart3 },
  { id: "notifications", title: "Notifications", description: "Personnaliser rappels et alertes.", icon: Bell },
  { id: "account", title: "Gestion du compte", description: "Profil, abonnement, suppression.", icon: UserCog },
  { id: "troubleshooting", title: "Résolution de problèmes", description: "Solutions et questions fréquentes.", icon: LifeBuoy },
];

const popular = ["getting-started", "connect-apps", "programs"];

const HelpCenter = () => {
  const navigate = useNavigate();
  const [q, setQ] = useState("");

  const filtered = articles.filter(
    (a) =>
      a.title.toLowerCase().includes(q.toLowerCase()) ||
      a.description.toLowerCase().includes(q.toLowerCase())
  );

  const popularArticles = articles.filter((a) => popular.includes(a.id));

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-xl border-b border-white/[0.04]">
        <div className="px-5 pt-[max(env(safe-area-inset-top),12px)] pb-3 flex items-center">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 -ml-2 rounded-full flex items-center justify-center active:scale-95 transition-transform"
            aria-label="Retour"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="text-foreground text-[17px] font-semibold tracking-tight">
            Assistance
          </h1>
        </div>
      </header>

      <div className="px-5 pt-8 pb-24">
        {/* Hero */}
        <section className="mb-8">
          <div className="flex items-center gap-3.5 mb-5">
            <div className="w-12 h-12 rounded-2xl bg-black border border-white/[0.08] flex items-center justify-center overflow-hidden shadow-[0_8px_24px_-10px_rgba(0,0,0,0.6)]">
              <img src={movIcon} alt="Workout" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/70">
                Centre d'assistance
              </p>
              <h2 className="text-foreground text-[22px] font-semibold tracking-tight leading-tight">
                Comment t'aider ?
              </h2>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/70" />
            <input
              type="text"
              placeholder="Rechercher un article…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="w-full h-12 pl-11 pr-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-white/20 transition-colors text-[14px]"
            />
          </div>
        </section>

        {/* Popular */}
        {!q && (
          <section className="mb-9">
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/70 mb-3 px-1">
              Populaires
            </p>
            <div className="grid grid-cols-2 gap-2.5">
              {popularArticles.map((a) => (
                <button
                  key={a.id}
                  className="text-left rounded-2xl bg-white/[0.03] border border-white/[0.06] p-3.5 active:scale-[0.98] transition-transform"
                >
                  <div className="w-8 h-8 rounded-full bg-white/[0.05] border border-white/[0.05] flex items-center justify-center mb-3">
                    <a.icon className="w-3.5 h-3.5 text-foreground/85" strokeWidth={1.8} />
                  </div>
                  <p className="text-foreground text-[13px] font-semibold leading-tight">{a.title}</p>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Articles list */}
        <section>
          <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/70 mb-3 px-1">
            {q ? "Résultats" : "Toutes les rubriques"}
          </p>
          <div className="rounded-2xl bg-white/[0.02] border border-white/[0.05] overflow-hidden">
            {filtered.map((a, i, arr) => (
              <button
                key={a.id}
                className={`w-full flex items-center gap-3.5 px-4 py-3.5 text-left active:bg-white/[0.04] transition-colors ${
                  i < arr.length - 1 ? "border-b border-white/[0.04]" : ""
                }`}
              >
                <div className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/[0.05] flex items-center justify-center shrink-0">
                  <a.icon className="w-[15px] h-[15px] text-foreground/85" strokeWidth={1.7} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-foreground text-[13.5px] font-semibold leading-tight">{a.title}</p>
                  <p className="text-muted-foreground text-[11.5px] mt-0.5 truncate">{a.description}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground/50 shrink-0" />
              </button>
            ))}
            {filtered.length === 0 && (
              <div className="px-4 py-10 text-center text-muted-foreground text-[13px]">
                Aucun article trouvé.
              </div>
            )}
          </div>
        </section>

        {/* Contact CTA */}
        <section className="mt-8">
          <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-5 flex items-center gap-4">
            <div className="w-11 h-11 rounded-full bg-foreground flex items-center justify-center shrink-0">
              <MessageCircle className="w-5 h-5 text-background" strokeWidth={2} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-foreground text-[13.5px] font-semibold leading-tight">Besoin d'aide humaine ?</p>
              <p className="text-muted-foreground text-[11.5px] mt-0.5">Notre équipe répond en moins de 24h.</p>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground/50 shrink-0" />
          </div>
        </section>
      </div>
    </div>
  );
};

export default HelpCenter;
