import { useState } from "react";
import { getAppIcon } from "@/components/AppIcons";
import { useNavigate } from "react-router-dom";
import {
  X, User, Bell, Database, Shield, ChevronRight, ChevronLeft,
  Activity, BarChart3, Clock, Smartphone, Lock,
  ShieldCheck, Trophy, Sunrise, Timer, Check,
} from "lucide-react";
import { toast } from "sonner";

type SettingsTab = "profil" | "notifications" | "donnees" | "securite";
type AppPanel = "root" | "challenge" | "notifications" | "confidentialite";

const fullTabs: { id: SettingsTab; label: string; icon: React.ElementType }[] = [
  { id: "profil", label: "Profil", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "donnees", label: "Données", icon: Database },
  { id: "securite", label: "Sécurité", icon: Lock },
];

interface AppInfo {
  id: string;
  name: string;
}

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  appInfo?: AppInfo;
  onDisconnectApp?: () => void;
}

const SettingsModal = ({ isOpen, onClose, appInfo, onDisconnectApp }: SettingsModalProps) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<SettingsTab>("profil");
  const [appPanel, setAppPanel] = useState<AppPanel>("root");

  const user = { name: "Jojo", email: "jojo@email.com", plan: "Free" as const };

  const [notifRappels, setNotifRappels] = useState(true);
  const [notifChallenges, setNotifChallenges] = useState(true);
  const [notifProgres, setNotifProgres] = useState(false);
  const [notifMaj, setNotifMaj] = useState(true);

  const [shareUsage, setShareUsage] = useState(false);
  const [bgDetection, setBgDetection] = useState(true);
  const [selectedChallenge, setSelectedChallenge] = useState<string>("morning-unlock");

  const handleDeleteAccount = () => {
    toast.error("Cette action est irréversible. Contactez le support pour supprimer votre compte.");
  };

  if (!isOpen) return null;

  const panelTitle =
    appPanel === "challenge" ? "Challenge" :
    appPanel === "notifications" ? "Notifications" :
    appPanel === "confidentialite" ? "Confidentialité" :
    "Paramètres";

  return (
    <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-lg mx-3 mb-3 sm:mb-0 bg-card/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl max-h-[85vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <div className="flex items-center gap-2 min-w-0">
            {appInfo && appPanel !== "root" && (
              <button
                onClick={() => setAppPanel("root")}
                className="p-1 -ml-1 rounded-full hover:bg-muted/60 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
            <h2 className="text-lg font-semibold text-foreground tracking-tight truncate">{panelTitle}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs (full settings only) */}
        {!appInfo && (
          <>
            <div className="flex gap-1 px-5 pb-3 overflow-x-auto scrollbar-none">
              {fullTabs.map((tab) => (
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
            <div className="h-px bg-border/50 mx-5" />
          </>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {appInfo ? (
            <>
              {appPanel === "root" && (
                <AppRootPanel
                  appInfo={appInfo}
                  onDisconnectApp={onDisconnectApp}
                  onOpenPanel={setAppPanel}
                />
              )}
              {appPanel === "challenge" && (
                <ChallengePanel selectedChallenge={selectedChallenge} onSelect={setSelectedChallenge} />
              )}
              {appPanel === "notifications" && (
                <NotificationsTab
                  appInfo={appInfo}
                  notifRappels={notifRappels} setNotifRappels={setNotifRappels}
                  notifChallenges={notifChallenges} setNotifChallenges={setNotifChallenges}
                  notifProgres={notifProgres} setNotifProgres={setNotifProgres}
                  notifMaj={notifMaj} setNotifMaj={setNotifMaj}
                />
              )}
              {appPanel === "confidentialite" && (
                <ConfidentialitePanel
                  appInfo={appInfo}
                  shareUsage={shareUsage} setShareUsage={setShareUsage}
                  bgDetection={bgDetection} setBgDetection={setBgDetection}
                />
              )}
            </>
          ) : (
            <>
              {activeTab === "profil" && (
                <ProfilTab user={user} onDeleteAccount={handleDeleteAccount} />
              )}
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

/* ─── App-mode panels ─── */

const AppRootPanel = ({
  appInfo, onDisconnectApp, onOpenPanel,
}: {
  appInfo: AppInfo;
  onDisconnectApp?: () => void;
  onOpenPanel: (p: AppPanel) => void;
}) => (
  <div className="space-y-5">
    <section>
      <div className="flex items-center gap-3 py-3">
        {getAppIcon(appInfo.id, "md", true)}
        <span className="text-foreground text-base font-semibold flex-1">{appInfo.name}</span>
        <button
          onClick={onDisconnectApp}
          className="px-4 py-2 rounded-full border border-border text-foreground text-xs font-medium hover:bg-muted/50 transition-colors"
        >
          Déconnecter
        </button>
      </div>
      <div className="h-px bg-border/40 mt-1" />
    </section>

    <section className="space-y-1">
      <PanelRow icon={Trophy} label="Challenge" description="Choisissez le défi associé à cette appli." onClick={() => onOpenPanel("challenge")} />
      <PanelRow icon={Bell} label="Notifications" description="Gérez les rappels et alertes liés à cette appli." onClick={() => onOpenPanel("notifications")} />
      <PanelRow icon={ShieldCheck} label="Confidentialité" description="Détection, partage et données liées à cette appli." onClick={() => onOpenPanel("confidentialite")} />
    </section>
  </div>
);

const PanelRow = ({
  icon: Icon, label, description, onClick,
}: {
  icon: React.ElementType;
  label: string;
  description: string;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className="w-full flex items-center gap-3 py-3 px-2 -mx-2 rounded-xl hover:bg-foreground/5 transition-colors text-left"
  >
    <div className="w-9 h-9 rounded-full bg-foreground/8 border border-border/40 flex items-center justify-center shrink-0">
      <Icon className="w-4 h-4 text-foreground" strokeWidth={1.8} />
    </div>
    <div className="flex-1 min-w-0">
      <div className="text-foreground text-sm font-medium leading-tight">{label}</div>
      <p className="text-muted-foreground text-xs mt-0.5 leading-snug truncate">{description}</p>
    </div>
    <ChevronRight className="w-4 h-4 text-muted-foreground/60 shrink-0" />
  </button>
);

const ChallengePanel = ({
  selectedChallenge, onSelect,
}: { selectedChallenge: string; onSelect: (id: string) => void }) => {
  const items = [
    {
      id: "morning-unlock",
      icon: Sunrise,
      title: "Défi du matin",
      description: "Effectuez votre programme dès le premier déverrouillage du matin.",
    },
    {
      id: "time-based",
      icon: Timer,
      title: "Défi de durée",
      description: "Toutes les 45 minutes d'usage, un programme est requis pour continuer.",
    },
  ];
  return (
    <div className="space-y-2">
      <p className="text-muted-foreground text-xs leading-relaxed mb-2">
        Sélectionnez le déclencheur de votre défi pour cette appli.
      </p>
      {items.map((item) => {
        const isSelected = selectedChallenge === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={`w-full flex items-start gap-3 p-3 rounded-2xl border transition-all text-left ${
              isSelected
                ? "border-foreground/40 bg-foreground/5"
                : "border-border/40 hover:border-border hover:bg-foreground/[0.03]"
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-foreground/8 border border-border/40 flex items-center justify-center shrink-0">
              <item.icon className="w-4.5 h-4.5 text-foreground" strokeWidth={1.8} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-foreground text-sm font-semibold">{item.title}</span>
                {isSelected && (
                  <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-foreground text-background">
                    <Check className="w-3 h-3" strokeWidth={3} />
                  </span>
                )}
              </div>
              <p className="text-muted-foreground text-xs mt-1 leading-relaxed">{item.description}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
};

const ConfidentialitePanel = ({
  appInfo, shareUsage, setShareUsage, bgDetection, setBgDetection,
}: {
  appInfo: AppInfo;
  shareUsage: boolean; setShareUsage: (v: boolean) => void;
  bgDetection: boolean; setBgDetection: (v: boolean) => void;
}) => (
  <div className="space-y-0">
    <p className="text-muted-foreground text-xs leading-relaxed mb-2">
      Contrôlez les données collectées et partagées pour {appInfo.name}.
    </p>
    <NotificationRow
      label="Détection en arrière-plan"
      description={`Autoriser Workout à détecter l'ouverture de ${appInfo.name} pour déclencher les micro-défis.`}
      enabled={bgDetection}
      onToggle={() => setBgDetection(!bgDetection)}
    />
    <NotificationRow
      label="Partager les statistiques"
      description={`Partager anonymement votre temps d'utilisation de ${appInfo.name} pour améliorer Workout.`}
      enabled={shareUsage}
      onToggle={() => setShareUsage(!shareUsage)}
    />
    <DataRow
      label="Effacer les données liées"
      description={`Supprimer l'historique d'utilisation et les sessions liées à ${appInfo.name}.`}
      actionLabel="Effacer"
      onAction={() => toast.error("Cette action est irréversible.")}
      destructive
    />
  </div>
);

/* ─── Full Settings tabs ─── */

const ProfilTab = ({ user, onDeleteAccount }: {
  user: { name: string; email: string };
  onDeleteAccount: () => void;
}) => (
  <div className="space-y-7">
    <section>
      <h3 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/70 mb-3">
        Compte
      </h3>
      <SettingsRow label="Nom" value={user.name} />
      <SettingsRow label="E-mail" value={user.email} hasChevron />
    </section>

    <section>
      <h3 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/70 mb-3">
        Plan
      </h3>
      <div className="rounded-2xl bg-white/[0.025] border border-white/[0.06] p-4">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="min-w-0">
            <p className="text-foreground text-[14px] font-semibold leading-tight">Workout Plus</p>
            <p className="text-muted-foreground text-[12px] mt-1 leading-relaxed">
              Programmes illimités, statistiques avancées et défis exclusifs.
            </p>
          </div>
          <button
            onClick={() => window.location.href = "/subscription"}
            className="px-3.5 py-1.5 bg-foreground text-background text-[11px] font-semibold rounded-full hover:opacity-90 transition-opacity shrink-0"
          >
            Mettre à niveau
          </button>
        </div>
        <div className="space-y-2.5 pt-3 border-t border-white/[0.05]">
          <FeatureItem icon={Activity} text="Programmes personnalisés et illimités" />
          <FeatureItem icon={BarChart3} text="Statistiques détaillées et progression" />
          <FeatureItem icon={Shield} text="Challenges exclusifs avec récompenses" />
          <FeatureItem icon={Clock} text="Rappels intelligents basés sur l'usage" />
          <FeatureItem icon={Smartphone} text="Connexion illimitée d'applications" />
        </div>
      </div>
    </section>

    <section>
      <h3 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/70 mb-3">
        Zone de danger
      </h3>
      <div className="flex items-center justify-between py-2">
        <span className="text-foreground text-[13.5px]">Supprimer le compte</span>
        <button
          onClick={onDeleteAccount}
          className="px-3.5 py-1.5 rounded-full border border-destructive/50 text-destructive text-[11px] font-semibold hover:bg-destructive/10 transition-colors"
        >
          Supprimer
        </button>
      </div>
    </section>
  </div>
);

const NotificationsTab = ({
  appInfo,
  notifRappels, setNotifRappels,
  notifChallenges, setNotifChallenges,
  notifProgres, setNotifProgres,
  notifMaj, setNotifMaj,
}: {
  appInfo?: AppInfo;
  notifRappels: boolean; setNotifRappels: (v: boolean) => void;
  notifChallenges: boolean; setNotifChallenges: (v: boolean) => void;
  notifProgres: boolean; setNotifProgres: (v: boolean) => void;
  notifMaj: boolean; setNotifMaj: (v: boolean) => void;
}) => (
  <div className="space-y-0">
    {appInfo ? (
      <>
        <p className="text-muted-foreground text-xs leading-relaxed mb-2">
          Gérez les notifications déclenchées par {appInfo.name}.
        </p>
        <NotificationRow label={`Rappels ${appInfo.name}`} description={`Recevez un rappel avant chaque session déclenchée par ${appInfo.name}.`} enabled={notifRappels} onToggle={() => setNotifRappels(!notifRappels)} />
        <NotificationRow label="Micro-défis" description={`Soyez notifié à chaque micro-défi déclenché à l'ouverture de ${appInfo.name}.`} enabled={notifChallenges} onToggle={() => setNotifChallenges(!notifChallenges)} />
        <NotificationRow label="Résumé d'utilisation" description={`Résumé hebdomadaire de votre temps passé sur ${appInfo.name}.`} enabled={notifProgres} onToggle={() => setNotifProgres(!notifProgres)} />
      </>
    ) : (
      <>
        <h3 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/70 mb-3">Notifications</h3>
        <NotificationRow label="Rappels de session" description="Recevez un rappel lorsqu'il est temps de faire votre programme." enabled={notifRappels} onToggle={() => setNotifRappels(!notifRappels)} />
        <NotificationRow label="Challenges" description="Soyez notifié lorsqu'un nouveau challenge est disponible." enabled={notifChallenges} onToggle={() => setNotifChallenges(!notifChallenges)} />
        <NotificationRow label="Progrès hebdomadaire" description="Recevez un résumé de vos performances chaque semaine." enabled={notifProgres} onToggle={() => setNotifProgres(!notifProgres)} />
        <NotificationRow label="Mises à jour" description="Restez informé des nouvelles fonctionnalités." enabled={notifMaj} onToggle={() => setNotifMaj(!notifMaj)} />
      </>
    )}
  </div>
);

const DonneesTab = ({ navigate, onClose }: { navigate: (path: string) => void; onClose: () => void }) => (
  <div className="space-y-0">
    <h3 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/70 mb-3">Gestion des données</h3>
    <DataRow label="Historique d'activité" description="Consultez et gérez votre historique de sessions." actionLabel="Gérer" onAction={() => toast.info("Bientôt disponible")} />
    <DataRow label="Applications connectées" description="Gérez les applications liées à votre compte." actionLabel="Gérer" onAction={() => { navigate("/home"); onClose(); }} />
    <DataRow label="Réinitialiser la progression" description="Remet à zéro tous vos compteurs et statistiques." actionLabel="Réinitialiser" onAction={() => toast.error("Cette action est irréversible.")} destructive />
    <DataRow label="Exporter les données" description="Téléchargez une copie de toutes vos données." actionLabel="Exporter" onAction={() => toast.info("Export en cours de préparation...")} />
    <DataRow label="Supprimer toutes les données" description="Supprimez définitivement toutes vos données." actionLabel="Supprimer tout" onAction={() => toast.error("Cette action est irréversible.")} destructive />
  </div>
);

const SecuriteTab = () => (
  <div className="space-y-0">
    <h3 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/70 mb-3">Sécurité</h3>
    <DataRow label="Changer le mot de passe" description="Mettez à jour votre mot de passe pour sécuriser votre compte." actionLabel="Modifier" onAction={() => toast.info("Bientôt disponible")} />
    <DataRow label="Changer l'adresse e-mail" description="Modifiez l'adresse e-mail associée à votre compte." actionLabel="Modifier" onAction={() => toast.info("Bientôt disponible")} />
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
