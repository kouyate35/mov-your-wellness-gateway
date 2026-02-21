import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, ChevronRight, MessageCircle } from "lucide-react";
import movIcon from "@/assets/mov-icon.png";

const articles = [
  {
    id: "getting-started",
    title: "Premiers pas avec Workout",
    description: "Apprenez à configurer et utiliser Workout pour améliorer votre bien-être.",
  },
  {
    id: "connect-apps",
    title: "Connecter vos applications",
    description: "Comment lier vos applications favorites pour un suivi automatique.",
  },
  {
    id: "programs",
    title: "Programmes d'entraînement",
    description: "Découvrez les différents programmes disponibles et comment les utiliser.",
  },
  {
    id: "challenges",
    title: "Challenges et récompenses",
    description: "Participez aux challenges pour gagner des badges et rester motivé.",
  },
  {
    id: "stats",
    title: "Statistiques et progression",
    description: "Comprendre vos statistiques d'usage et suivre votre progression.",
  },
  {
    id: "notifications",
    title: "Gérer les notifications",
    description: "Personnalisez vos rappels et alertes pour rester sur la bonne voie.",
  },
  {
    id: "account",
    title: "Gestion du compte",
    description: "Modifier vos informations, votre abonnement ou supprimer votre compte.",
  },
  {
    id: "troubleshooting",
    title: "Résolution de problèmes",
    description: "Solutions aux problèmes courants et questions fréquentes.",
  },
];

const HelpCenter = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = articles.filter(
    (a) =>
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="px-4 pt-6 pb-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm">Retour</span>
        </button>

        <h1 className="text-2xl font-bold text-foreground mb-6">Centre d'assistance</h1>

        {/* Search */}
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Rechercher des articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-transparent border-b border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors text-sm"
          />
        </div>
      </header>

      {/* App Section */}
      <section className="px-4 mb-8">
        <p className="text-xs text-muted-foreground mb-4">Toutes les collections &gt; Workout</p>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-card border border-border/50 flex items-center justify-center overflow-hidden">
            <img src={movIcon} alt="Workout" className="w-10 h-10" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">Workout</h2>
            <p className="text-sm text-muted-foreground">Tout sur Workout</p>
          </div>
        </div>
      </section>

      {/* Articles List */}
      <section className="px-4 pb-24">
        <div className="border border-border/50 rounded-2xl overflow-hidden">
          {filteredArticles.map((article, index) => (
            <button
              key={article.id}
              onClick={() => {}}
              className={`w-full flex items-center justify-between px-5 py-5 text-left hover:bg-muted/30 transition-colors ${
                index !== filteredArticles.length - 1 ? "border-b border-border/30" : ""
              }`}
            >
              <div className="flex-1 pr-4">
                <h3 className="text-foreground text-sm font-medium mb-1">{article.title}</h3>
                {article.description && (
                  <p className="text-muted-foreground text-xs leading-relaxed">{article.description}</p>
                )}
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
            </button>
          ))}
        </div>
      </section>

      {/* Chat FAB */}
      <button className="fixed bottom-6 right-6 w-14 h-14 bg-foreground rounded-full flex items-center justify-center shadow-lg hover:opacity-90 transition-opacity">
        <MessageCircle className="w-6 h-6 text-background" />
      </button>
    </div>
  );
};

export default HelpCenter;
