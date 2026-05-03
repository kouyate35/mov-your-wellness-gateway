import { useState, useRef, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronRight, Menu, Settings } from "lucide-react";
import { apps } from "@/data/apps";
import { useAppSettings } from "@/hooks/useAppSettings";
import ConnectAppModal from "@/components/ConnectAppModal";
import ConnectionRequiredModal from "@/components/ConnectionRequiredModal";
import ProgramRequiredModal from "@/components/ProgramRequiredModal";
import ChallengeModal from "@/components/ChallengeModal";
import FireEmojiAnimation from "@/components/FireEmojiAnimation";
import SettingsModal from "@/components/SettingsModal";
import CategorySelector from "@/components/CategorySelector";
import { getAppIcon } from "@/components/AppIcons";
import { Category, getCategoryById, categories } from "@/data/categories";

type CategoryId = Category["id"];

const AppDetail = () => {
  const { appId } = useParams<{ appId: string }>();
  const navigate = useNavigate();
  const { getAppSetting, toggleApp, setProgram, updateAppSetting } = useAppSettings();
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [showConnectionRequiredModal, setShowConnectionRequiredModal] = useState(false);
  const [showProgramRequiredModal, setShowProgramRequiredModal] = useState(false);
  const [showChallengeModal, setShowChallengeModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showFireAnimation, setShowFireAnimation] = useState(false);

  // Helper to find which category a program belongs to
  const findCategoryOfProgram = (programId: string | null): CategoryId | null => {
    if (!programId) return null;
    for (const cat of categories) {
      if (cat.programs.find((p) => p.id === programId)) return cat.id;
    }
    return null;
  };

  const initialSetting = appId ? getAppSetting(appId) : null;
  const initialCategory = (findCategoryOfProgram(initialSetting?.selectedProgramId ?? null) ?? (initialSetting?.categoryId as CategoryId) ?? "move") as CategoryId;
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>(initialCategory);
  const [selectedProgramId, setSelectedProgramId] = useState<string | null>(initialSetting?.selectedProgramId ?? null);
  const programSectionRef = useRef<HTMLDivElement>(null);

  const app = apps.find((a) => a.id === appId);
  const appSetting = appId ? getAppSetting(appId) : null;

  const isConnected = appSetting?.isActive ?? false;

  // Intercept browser back button (Android)
  useEffect(() => {
    if (!isConnected || selectedProgramId) return;

    window.history.pushState({ programGuard: true }, "");

    const handlePopState = () => {
      setShowProgramRequiredModal(true);
      window.history.pushState({ programGuard: true }, "");
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isConnected, selectedProgramId]);

  const handleFireComplete = useCallback(() => {
    setShowFireAnimation(false);
  }, []);

  if (!app || !appSetting) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Application non trouvée</p>
      </div>
    );
  }

  const handleConnect = () => {
    toggleApp(app.id);
    setShowConnectModal(false);
    setShowConnectionRequiredModal(false);
  };

  const handleCategorySelect = (id: CategoryId) => {
    if (!isConnected) {
      setShowConnectionRequiredModal(true);
      return;
    }
    setSelectedCategory(id);
    setSelectedProgramId(null);
    updateAppSetting(app.id, { categoryId: id as AppSetting["categoryId"], selectedProgramId: null });
  };

  const handleProgramSelect = (programId: string) => {
    if (!isConnected) {
      setShowConnectionRequiredModal(true);
      return;
    }
    setSelectedProgramId(programId);
    setProgram(app.id, programId);
  };

  const handleOpenConnectFromRequired = () => {
    setShowConnectionRequiredModal(false);
    setShowConnectModal(true);
  };

  const handleBack = () => {
    if (isConnected && !selectedProgramId) {
      setShowProgramRequiredModal(true);
      return;
    }
    navigate(-1);
  };

  const scrollToPrograms = () => {
    setShowProgramRequiredModal(false);
    programSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const handleChallengeClick = () => {
    setShowFireAnimation(true);
    setShowChallengeModal(true);
  };


  // Get selected program name
  const currentCategory = getCategoryById(selectedCategory);
  const selectedProgram = currentCategory?.programs.find(p => p.id === selectedProgramId);

  return (
    <div className="min-h-screen bg-background pb-4">
      <FireEmojiAnimation isActive={showFireAnimation} onComplete={handleFireComplete} />

      {/* Header */}
      <header className="pt-4 pb-2 px-4">
        <div className="flex items-center gap-3">
          <button className="relative p-1">
            <Menu className="w-5 h-5 text-muted-foreground" />
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-primary rounded-full" />
          </button>
          
          <button
            onClick={handleBack}
            className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
          >
            <span className="text-base font-medium">Applis</span>
          </button>
          
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
          <span className="text-base font-medium text-muted-foreground">{app.name}</span>

          {/* Challenge button - visible only when program is selected */}
          {selectedProgramId && selectedProgram && (
            <button
              onClick={handleChallengeClick}
              className="ml-auto flex items-center gap-1.5 px-4 py-2 bg-white text-black text-sm font-semibold rounded-full hover:bg-white/90 transition-all active:scale-95"
            >
              <span className="text-base animate-pulse">🔥</span>
              <span>Challenge</span>
            </button>
          )}
        </div>
      </header>

      {/* App Card */}
      <section className="px-4 pt-2">
        <div className="flex items-center gap-3">
          {getAppIcon(app.id, "lg", true)}
          
          <div className="flex flex-col gap-1.5">
            <h1 className="text-xl font-bold text-foreground leading-tight">{app.name}</h1>
            
            <div className="flex items-center gap-2">
              {isConnected ? (
                <>
                  <button className="px-4 py-1.5 bg-white text-black text-xs font-medium rounded-full cursor-default w-fit">
                    Appli connectée
                  </button>
                  <button
                    onClick={() => setShowSettingsModal(true)}
                    className="w-8 h-8 flex items-center justify-center rounded-full border border-muted-foreground/30 hover:bg-muted/50 transition-colors"
                  >
                    <Settings className="w-4 h-4 text-muted-foreground" />
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setShowConnectModal(true)}
                  className="px-4 py-1.5 bg-white text-black text-xs font-medium rounded-full hover:bg-white/90 transition-colors w-fit"
                >
                  Connecter
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Category Selection */}
      <section className="px-4 pt-3">
        <h2 className="text-xs font-medium mb-2 text-muted-foreground">
          Choisissez le plan qui vous convient
        </h2>
        
        <CategorySelector
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategorySelect}
          selectedProgramId={selectedProgramId}
          onSelectProgram={handleProgramSelect}
        />

        <div ref={programSectionRef} />
      </section>

      {/* Modals */}
      <ConnectAppModal
        app={app}
        isOpen={showConnectModal}
        onClose={() => setShowConnectModal(false)}
        onConnect={handleConnect}
      />

      <ConnectionRequiredModal
        isOpen={showConnectionRequiredModal}
        onClose={() => setShowConnectionRequiredModal(false)}
        onConnect={handleOpenConnectFromRequired}
      />

      <ProgramRequiredModal
        isOpen={showProgramRequiredModal}
        onClose={() => setShowProgramRequiredModal(false)}
        onSelectProgram={scrollToPrograms}
      />

      {selectedProgram && (
        <ChallengeModal
          isOpen={showChallengeModal}
          onClose={() => setShowChallengeModal(false)}
          programName={selectedProgram.name}
        />
      )}

      <SettingsModal
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
        appInfo={app ? { id: app.id, name: app.name } : undefined}
        onDisconnectApp={() => {
          if (appId) {
            toggleApp(appId);
            setShowSettingsModal(false);
          }
        }}
      />
    </div>
  );
};

export default AppDetail;
