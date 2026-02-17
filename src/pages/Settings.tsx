import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, X, User, Bell, Database, Sparkles, ChevronRight, Trash2, Shield, Clock, Smartphone, Activity, BarChart3, Download } from "lucide-react";
import { toast } from "sonner";

type SettingsTab = "profil" | "notifications" | "donnees";

const tabs: { id: SettingsTab; label: string; icon: React.ElementType }[] = [
  { id: "profil", label: "Profil", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "donnees", label: "Données", icon: Database },
];

const Settings = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<SettingsTab>("profil");

  // Mock user — in production from auth context
  const user = {
    name: "Jojo",
    email: "jojo@email.com",
    plan: "Free" as const,
  };

  const userInitial = user.name.charAt(0).toUpperCase();

  // Notification states
  const [notifRappels, setNotifRappels] = useState(true);
  const [notifChallenges, setNotifChallenges] = useState(true);
  const [notifProgres, setNotifProgres] = useState(false);
  const [notifMaj, setNotifMaj] = useState(true);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Déconnexion réussie");
    navigate("/");
  };

  const handleDeleteAccount = () => {
    toast.error("Cette action est irréversible. Contactez le support pour supprimer votre compte.");
  };

  return (
    <div className="fixed inset-0 bg-background z-[60] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-5 pb-3">
        <h1 className="text-lg font-semibold text-foreground">Paramètres</h1>
        <button
          onClick={() => navigate(-1)}
          className="p-1 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 px-4 pb-3 overflow-x-auto scrollbar-none">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? "bg-secondary text-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 pb-8">
        {activeTab === "profil" && (
          <div className="space-y-6">
            {/* Section: Compte */}
            <section>
              <h2 className="text-base font-semibold text-foreground mb-3">Compte</h2>
              <div className="h-px bg-border mb-4" />

              {/* User info row */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-11 h-11 rounded-full bg-info flex items-center justify-center shrink-0">
                  <span className="text-info-foreground font-bold text-base">{userInitial}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-foreground font-medium text-sm">{user.name}</p>
                  <p className="text-muted-foreground text-xs truncate">{user.email}</p>
                </div>
              </div>

              {/* Nom */}
              <div className="flex items-center justify-between py-3.5 border-b border-border">
                <span className="text-foreground text-sm">Nom</span>
                <span className="text-muted-foreground text-sm">{user.name}</span>
              </div>

              {/* Email */}
              <div className="flex items-center justify-between py-3.5 border-b border-border">
                <span className="text-foreground text-sm">E-mail</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-muted-foreground text-sm truncate max-w-[180px]">{user.email}</span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                </div>
              </div>
            </section>

            {/* Section: Obtenir Workout Plus */}
            <section>
              <div className="flex items-center justify-between mb-3">
                <span className="text-foreground text-sm">Obtenir Workout Plus</span>
                <button className="px-4 py-1.5 bg-secondary rounded-full text-foreground text-xs font-medium hover:bg-secondary/80 transition-colors">
                  Mettre à niveau
                </button>
              </div>

              <p className="text-muted-foreground text-xs mb-4">
                Bénéficiez de toutes les fonctionnalités de l'offre gratuite, et bien plus encore.
              </p>

              <div className="space-y-4">
                <FeatureItem
                  icon={Activity}
                  text="Programmes d'entraînement personnalisés et illimités"
                />
                <FeatureItem
                  icon={BarChart3}
                  text="Statistiques détaillées et suivi de progression avancé"
                />
                <FeatureItem
                  icon={Shield}
                  text="Challenges exclusifs avec récompenses et badges"
                />
                <FeatureItem
                  icon={Clock}
                  text="Rappels intelligents basés sur votre utilisation"
                />
                <FeatureItem
                  icon={Smartphone}
                  text="Connexion illimitée d'applications à surveiller"
                />
              </div>
            </section>

            {/* Separator */}
            <div className="h-px bg-border" />

            {/* Delete account */}
            <div className="flex items-center justify-between py-2">
              <span className="text-foreground text-sm">Supprimer le compte</span>
              <button
                onClick={handleDeleteAccount}
                className="px-4 py-1.5 rounded-full border border-destructive text-destructive text-xs font-medium hover:bg-destructive/10 transition-colors"
              >
                Supprimer
              </button>
            </div>
          </div>
        )}

        {activeTab === "notifications" && (
          <div className="space-y-6">
            <section>
              <h2 className="text-base font-semibold text-foreground mb-3">Notifications</h2>
              <div className="h-px bg-border mb-4" />

              <NotificationRow
                label="Rappels de session"
                description="Recevez un rappel lorsqu'il est temps de faire votre programme d'exercice."
                enabled={notifRappels}
                onToggle={() => setNotifRappels(!notifRappels)}
              />

              <NotificationRow
                label="Challenges"
                description="Soyez notifié lorsqu'un nouveau challenge est disponible ou en cours."
                enabled={notifChallenges}
                onToggle={() => setNotifChallenges(!notifChallenges)}
              />

              <NotificationRow
                label="Progrès hebdomadaire"
                description="Recevez un résumé de vos performances chaque semaine."
                enabled={notifProgres}
                onToggle={() => setNotifProgres(!notifProgres)}
              />

              <NotificationRow
                label="Mises à jour"
                description="Restez informé des nouvelles fonctionnalités et améliorations de Workout."
                enabled={notifMaj}
                onToggle={() => setNotifMaj(!notifMaj)}
              />
            </section>
          </div>
        )}

        {activeTab === "donnees" && (
          <div className="space-y-6">
            <section>
              <h2 className="text-base font-semibold text-foreground mb-3">Gestion des données</h2>
              <div className="h-px bg-border mb-4" />

              <DataRow
                label="Historique d'activité"
                description="Consultez et gérez votre historique de sessions et d'exercices."
                actionLabel="Gérer"
                onAction={() => toast.info("Bientôt disponible")}
              />

              <DataRow
                label="Applications connectées"
                description="Gérez les applications liées à votre compte Workout."
                actionLabel="Gérer"
                onAction={() => { navigate("/home"); }}
              />

              <DataRow
                label="Réinitialiser la progression"
                description="Remet à zéro tous vos compteurs, badges et statistiques."
                actionLabel="Réinitialiser"
                onAction={() => toast.error("Cette action est irréversible.")}
                destructive
              />

              <DataRow
                label="Exporter les données"
                description="Téléchargez une copie de toutes vos données personnelles."
                actionLabel="Exporter"
                onAction={() => toast.info("Export en cours de préparation...")}
              />

              <DataRow
                label="Supprimer toutes les données"
                description="Supprimez définitivement toutes vos données de l'application."
                actionLabel="Supprimer tout"
                onAction={() => toast.error("Cette action est irréversible.")}
                destructive
              />
            </section>
          </div>
        )}
      </div>
    </div>
  );
};

/* Sub-components */

const FeatureItem = ({ icon: Icon, text }: { icon: React.ElementType; text: string }) => (
  <div className="flex items-start gap-3">
    <Icon className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
    <span className="text-foreground text-sm">{text}</span>
  </div>
);

const NotificationRow = ({
  label,
  description,
  enabled,
  onToggle,
}: {
  label: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
}) => (
  <div className="py-4 border-b border-border">
    <div className="flex items-center justify-between mb-1">
      <span className="text-foreground text-sm font-medium">{label}</span>
      <button
        onClick={onToggle}
        className={`relative w-11 h-6 rounded-full transition-colors ${
          enabled ? "bg-info" : "bg-secondary"
        }`}
      >
        <span
          className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
            enabled ? "left-[22px]" : "left-0.5"
          }`}
        />
      </button>
    </div>
    <p className="text-muted-foreground text-xs pr-14">{description}</p>
  </div>
);

const DataRow = ({
  label,
  description,
  actionLabel,
  onAction,
  destructive = false,
}: {
  label: string;
  description: string;
  actionLabel: string;
  onAction: () => void;
  destructive?: boolean;
}) => (
  <div className="py-4 border-b border-border">
    <div className="flex items-center justify-between mb-1">
      <span className="text-foreground text-sm font-medium">{label}</span>
      <button
        onClick={onAction}
        className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
          destructive
            ? "border border-destructive text-destructive hover:bg-destructive/10"
            : "bg-secondary text-foreground hover:bg-secondary/80"
        }`}
      >
        {actionLabel}
      </button>
    </div>
    <p className="text-muted-foreground text-xs pr-20">{description}</p>
  </div>
);

export default Settings;
