import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  ShieldCheck,
  ScrollText,
  Database,
  Cookie,
  Plug,
  Coins,
  Briefcase,
} from "lucide-react";

const sections = [
  {
    title: "Pour les particuliers",
    items: [
      { icon: FileText, name: "Conditions d'utilisation", desc: "Règles d'usage de Workout et de ses services." },
      { icon: ShieldCheck, name: "Politique de confidentialité", desc: "Comment nous traitons vos données personnelles." },
      { icon: ScrollText, name: "Conditions de service", desc: "Conditions complémentaires sur des services spécifiques." },
    ],
  },
  {
    title: "Données & sécurité",
    items: [
      { icon: Database, name: "Traitement des données", desc: "Garanties sur la sécurité et la conformité RGPD." },
      { icon: Cookie, name: "Politique cookies", desc: "Cookies et technologies similaires utilisés." },
    ],
  },
  {
    title: "Pour les pros",
    items: [
      { icon: Plug, name: "Connecteurs & actions", desc: "Création et utilisation de vos intégrations." },
      { icon: Coins, name: "Crédits de service", desc: "Conditions des crédits échangeables." },
      { icon: Briefcase, name: "Accord services Workout", desc: "Pour entreprises et développeurs." },
    ],
  },
];

const Terms = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground">
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
            Conditions & politiques
          </h1>
        </div>
      </header>

      <div className="px-5 pt-8 pb-16">
        {/* Intro */}
        <section className="mb-9">
          <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/70 mb-3">
            Documents juridiques
          </p>
          <h2 className="text-foreground text-[26px] font-semibold tracking-tight leading-[1.15] mb-3">
            Transparence et clarté.
          </h2>
          <p className="text-muted-foreground text-[13.5px] leading-relaxed max-w-[320px]">
            Tous les textes qui encadrent ton usage de Workout, en un seul endroit.
          </p>
        </section>

        {sections.map((s) => (
          <section key={s.title} className="mb-7">
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/70 mb-3 px-1">
              {s.title}
            </p>
            <div className="rounded-2xl bg-white/[0.02] border border-white/[0.05] overflow-hidden">
              {s.items.map((it, i) => (
                <button
                  key={it.name}
                  className={`w-full flex items-center gap-3.5 px-4 py-3.5 text-left active:bg-white/[0.04] transition-colors ${
                    i < s.items.length - 1 ? "border-b border-white/[0.04]" : ""
                  }`}
                >
                  <div className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/[0.05] flex items-center justify-center shrink-0">
                    <it.icon className="w-[15px] h-[15px] text-foreground/85" strokeWidth={1.7} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-foreground text-[13.5px] font-semibold leading-tight">{it.name}</p>
                    <p className="text-muted-foreground text-[11.5px] mt-0.5 leading-snug">{it.desc}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground/50 shrink-0" />
                </button>
              ))}
            </div>
          </section>
        ))}

        <p className="text-muted-foreground/60 text-[11px] text-center mt-8">
          Dernière mise à jour · Mai 2026
        </p>
      </div>
    </div>
  );
};

export default Terms;
