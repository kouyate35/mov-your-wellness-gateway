import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import {
  X, User, Bell, Database, Shield, ChevronRight,
  Activity, BarChart3, Clock, Smartphone, Lock, Mail,
} from "lucide-react";
import { toast } from "sonner";

type SettingsTab = "profil" | "notifications" | "donnees" | "securite";

const tabs: { id: SettingsTab; label: string; icon: React.ElementType }[] = [
  { id: "profil", label: "Profil", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "donnees", label: "Données", icon: Database },
  { id: "securite", label: "Sécurité", icon: Lock },
];

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal = ({ isOpen, onClose }: SettingsModalProps) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<SettingsTab>("profil");

  const user = { name: "Jojo", email: "jojo@email.com", plan: "Free" as const };

  const [notifRappels, setNotifRappels] = useState(true);
  const [notifChallenges, setNotifChallenges] = useState(true);
  const [notifProgres, setNotifProgres] = useState(false);
  const [notifMaj, setNotifMaj] = useState(true);

  const handleDeleteAccount = () => {
    toast.error("Cette action est irréversible. Contactez le support pour supprimer votre compte.");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-lg mx-3 mb-3 sm:mb-0 bg-card/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl max-h-[85vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <h2 className="text-lg font-semibold text-foreground tracking-tight">Paramètres</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 px-5 pb-3 overflow-x-auto scrollbar-none">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? "bg-foreground/10 text-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
              }`}
            >
              <tab.icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Subtle separator */}
        <div className="h-px bg-border/50 mx-5" />

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {activeTab === "profil" && <ProfilTab user={user} onDeleteAccount={handleDeleteAccount} />}
          {activeTab === "notifications" && (
            <NotificationsTab
              notifRappels={notifRappels} setNotifRappels={setNotifRappels}
              notifChallenges={notifChallenges} setNotifChallenges={setNotifChallenges}
              notifProgres={notifProgres} setNotifProgres={setNotifProgres}
              notifMaj={notifMaj} setNotifMaj={setNotifMaj}
            />
          )}
          {activeTab === "donnees" && <DonneesTab navigate={navigate} onClose={onClose} />}
          {activeTab === "securite" && <SecuriteTab />}
        </div>
      </div>
    </div>
  );
};

/* ─── Tab Contents ─── */

const ProfilTab = ({ user, onDeleteAccount }: { user: { name: string; email: string }; onDeleteAccount: () => void }) => (
  <div className="space-y-5">
    <section>
      <h3 className="text-sm font-semibold text-foreground mb-4">Compte</h3>
      <div className="h-px bg-border/40 mb-4" />

      <SettingsRow label="Nom" value={user.name} />
      <SettingsRow label="E-mail" value={user.email} hasChevron />
    </section>

    <section>
      <div className="flex items-center justify-between mb-2">
        <span className="text-foreground text-sm font-medium">Obtenir Workout Plus</span>
        <button className="px-4 py-1.5 bg-foreground text-background text-xs font-semibold rounded-full hover:opacity-90 transition-opacity">
          Mettre à niveau
        </button>
      </div>

      <p className="text-muted-foreground text-xs mb-4 leading-relaxed">
        Bénéficiez de toutes les fonctionnalités de l'offre gratuite, et bien plus encore.
      </p>

      <div className="space-y-3.5">
        <FeatureItem icon={Activity} text="Programmes d'entraînement personnalisés et illimités" />
        <FeatureItem icon={BarChart3} text="Statistiques détaillées et suivi de progression avancé" />
        <FeatureItem icon={Shield} text="Challenges exclusifs avec récompenses et badges" />
        <FeatureItem icon={Clock} text="Rappels intelligents basés sur votre utilisation" />
        <FeatureItem icon={Smartphone} text="Connexion illimitée d'applications à surveiller" />
      </div>
    </section>

    <div className="h-px bg-border/40" />

    <div className="flex items-center justify-between py-1">
      <span className="text-foreground text-sm">Supprimer le compte</span>
      <button
        onClick={onDeleteAccount}
        className="px-4 py-1.5 rounded-full border border-destructive/60 text-destructive text-xs font-medium hover:bg-destructive/10 transition-colors"
      >
        Supprimer
      </button>
    </div>
  </div>
);

const NotificationsTab = ({
  notifRappels, setNotifRappels,
  notifChallenges, setNotifChallenges,
  notifProgres, setNotifProgres,
  notifMaj, setNotifMaj,
}: {
  notifRappels: boolean; setNotifRappels: (v: boolean) => void;
  notifChallenges: boolean; setNotifChallenges: (v: boolean) => void;
  notifProgres: boolean; setNotifProgres: (v: boolean) => void;
  notifMaj: boolean; setNotifMaj: (v: boolean) => void;
}) => (
  <div className="space-y-0">
    <h3 className="text-sm font-semibold text-foreground mb-4">Notifications</h3>
    <div className="h-px bg-border/40 mb-2" />
    <NotificationRow label="Rappels de session" description="Recevez un rappel lorsqu'il est temps de faire votre programme." enabled={notifRappels} onToggle={() => setNotifRappels(!notifRappels)} />
    <NotificationRow label="Challenges" description="Soyez notifié lorsqu'un nouveau challenge est disponible." enabled={notifChallenges} onToggle={() => setNotifChallenges(!notifChallenges)} />
    <NotificationRow label="Progrès hebdomadaire" description="Recevez un résumé de vos performances chaque semaine." enabled={notifProgres} onToggle={() => setNotifProgres(!notifProgres)} />
    <NotificationRow label="Mises à jour" description="Restez informé des nouvelles fonctionnalités." enabled={notifMaj} onToggle={() => setNotifMaj(!notifMaj)} />
  </div>
);

const DonneesTab = ({ navigate, onClose }: { navigate: (path: string) => void; onClose: () => void }) => (
  <div className="space-y-0">
    <h3 className="text-sm font-semibold text-foreground mb-4">Gestion des données</h3>
    <div className="h-px bg-border/40 mb-2" />
    <DataRow label="Historique d'activité" description="Consultez et gérez votre historique de sessions." actionLabel="Gérer" onAction={() => toast.info("Bientôt disponible")} />
    <DataRow label="Applications connectées" description="Gérez les applications liées à votre compte." actionLabel="Gérer" onAction={() => { navigate("/home"); onClose(); }} />
    <DataRow label="Réinitialiser la progression" description="Remet à zéro tous vos compteurs et statistiques." actionLabel="Réinitialiser" onAction={() => toast.error("Cette action est irréversible.")} destructive />
    <DataRow label="Exporter les données" description="Téléchargez une copie de toutes vos données." actionLabel="Exporter" onAction={() => toast.info("Export en cours de préparation...")} />
    <DataRow label="Supprimer toutes les données" description="Supprimez définitivement toutes vos données." actionLabel="Supprimer tout" onAction={() => toast.error("Cette action est irréversible.")} destructive />
  </div>
);

const SecuriteTab = () => (
  <div className="space-y-0">
    <h3 className="text-sm font-semibold text-foreground mb-4">Sécurité</h3>
    <div className="h-px bg-border/40 mb-2" />
    <DataRow
      label="Changer le mot de passe"
      description="Mettez à jour votre mot de passe pour sécuriser votre compte."
      actionLabel="Modifier"
      onAction={() => toast.info("Bientôt disponible")}
    />
    <DataRow
      label="Changer l'adresse e-mail"
      description="Modifiez l'adresse e-mail associée à votre compte."
      actionLabel="Modifier"
      onAction={() => toast.info("Bientôt disponible")}
    />
  </div>
);

/* ─── Sub-components ─── */

const SettingsRow = ({ label, value, hasChevron }: { label: string; value: string; hasChevron?: boolean }) => (
  <div className="flex items-center justify-between py-3.5 border-b border-border/30">
    <span className="text-foreground text-sm">{label}</span>
    <div className="flex items-center gap-1.5">
      <span className="text-muted-foreground text-sm truncate max-w-[180px]">{value}</span>
      {hasChevron && <ChevronRight className="w-4 h-4 text-muted-foreground/60 shrink-0" />}
    </div>
  </div>
);

const FeatureItem = ({ icon: Icon, text }: { icon: React.ElementType; text: string }) => (
  <div className="flex items-start gap-3">
    <Icon className="w-4.5 h-4.5 text-muted-foreground mt-0.5 shrink-0" />
    <span className="text-foreground/90 text-sm leading-snug">{text}</span>
  </div>
);

const NotificationRow = ({ label, description, enabled, onToggle }: { label: string; description: string; enabled: boolean; onToggle: () => void }) => (
  <div className="py-3.5 border-b border-border/30">
    <div className="flex items-center justify-between mb-1">
      <span className="text-foreground text-sm font-medium">{label}</span>
      <button
        onClick={onToggle}
        className={`relative w-10 h-[22px] rounded-full transition-colors ${enabled ? "bg-primary" : "bg-muted"}`}
      >
        <span className={`absolute top-[2px] w-[18px] h-[18px] rounded-full bg-white shadow-sm transition-transform ${enabled ? "left-[20px]" : "left-[2px]"}`} />
      </button>
    </div>
    <p className="text-muted-foreground text-xs pr-14 leading-relaxed">{description}</p>
  </div>
);

const DataRow = ({ label, description, actionLabel, onAction, destructive = false }: { label: string; description: string; actionLabel: string; onAction: () => void; destructive?: boolean }) => (
  <div className="py-3.5 border-b border-border/30">
    <div className="flex items-center justify-between mb-1">
      <span className="text-foreground text-sm font-medium">{label}</span>
      <button
        onClick={onAction}
        className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
          destructive
            ? "border border-destructive/60 text-destructive hover:bg-destructive/10"
            : "bg-foreground/10 text-foreground hover:bg-foreground/15"
        }`}
      >
        {actionLabel}
      </button>
    </div>
    <p className="text-muted-foreground text-xs pr-20 leading-relaxed">{description}</p>
  </div>
);

export default SettingsModal;
