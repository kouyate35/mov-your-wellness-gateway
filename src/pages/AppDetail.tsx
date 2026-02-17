import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronRight, Menu, Settings } from "lucide-react";
import { apps } from "@/data/apps";
import { useAppSettings } from "@/hooks/useAppSettings";
import ConnectAppModal from "@/components/ConnectAppModal";
import ConnectionRequiredModal from "@/components/ConnectionRequiredModal";
import ProgramRequiredModal from "@/components/ProgramRequiredModal";
import CategorySelector from "@/components/CategorySelector";
import ChallengeCard from "@/components/ChallengeCard";
import { getAppIcon } from "@/components/AppIcons";
import { Category, getCategoryById } from "@/data/categories";

type CategoryId = Category["id"];

const AppDetail = () => {
  const { appId } = useParams<{ appId: string }>();
  const navigate = useNavigate();
  const { getAppSetting, toggleApp, setProgram } = useAppSettings();
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [showConnectionRequiredModal, setShowConnectionRequiredModal] = useState(false);
  const [showProgramRequiredModal, setShowProgramRequiredModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>("move");
  const [selectedProgramId, setSelectedProgramId] = useState<string | null>(null);
  const programSectionRef = useRef<HTMLDivElement>(null);

  const app = apps.find((a) => a.id === appId);
  const appSetting = appId ? getAppSetting(appId) : null;

  if (!app || !appSetting) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Application non trouvée</p>
      </div>
    );
  }

  const isConnected = appSetting.isActive;

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
    setProgram(app.id, id);
  };

  const handleProgramSelect = (programId: string) => {
    if (!isConnected) {
      setShowConnectionRequiredModal(true);
      return;
    }
    setSelectedProgramId(programId);
  };

  const handleOpenConnectFromRequired = () => {
    setShowConnectionRequiredModal(false);
    setShowConnectModal(true);
  };

  // Intercept back navigation when connected but no program selected
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

  // Get selected program name for challenge card
  const currentCategory = getCategoryById(selectedCategory);
  const selectedProgram = currentCategory?.programs.find(p => p.id === selectedProgramId);

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <header className="pt-6 pb-4 px-4">
        <div className="flex items-center gap-3">
          <button className="relative p-1">
            <Menu className="w-5 h-5 text-muted-foreground" />
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-blue-500 rounded-full" />
          </button>
          
          <button
            onClick={handleBack}
            className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
          >
            <span className="text-base font-medium">Applis</span>
          </button>
          
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
          <span className="text-base font-medium text-muted-foreground">{app.name}</span>
        </div>
      </header>

      {/* App Card */}
      <section className="px-4 pt-4">
        <div className="flex items-start gap-4">
          {getAppIcon(app.id, "xl", true)}
          
          <div className="flex flex-col gap-2 pt-1">
            <h1 className="text-2xl font-bold text-foreground">{app.name}</h1>
            
            <div className="flex items-center gap-2">
              {isConnected ? (
                <>
                  <button className="px-5 py-2 bg-white text-black text-sm font-medium rounded-full cursor-default w-fit">
                    Appli connectée
                  </button>
                  <button className="w-10 h-10 flex items-center justify-center rounded-full border border-muted-foreground/30 hover:bg-muted/50 transition-colors">
                    <Settings className="w-5 h-5 text-muted-foreground" />
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setShowConnectModal(true)}
                  className="px-5 py-2 bg-white text-black text-sm font-medium rounded-full hover:bg-white/90 transition-colors w-fit"
                >
                  Connecter
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Category Selection */}
      <section className="px-4 pt-8">
        <h2 className="text-white text-lg font-normal mb-6">
          Choisissez le plan qui vous convient
        </h2>
        
        <CategorySelector
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategorySelect}
          selectedProgramId={selectedProgramId}
          onSelectProgram={handleProgramSelect}
        />

        {/* Anchor for scrolling to program section */}
        <div ref={programSectionRef} />

        {/* Challenge Card - only when a program is selected */}
        {selectedProgramId && selectedProgram && (
          <ChallengeCard programName={selectedProgram.name} />
        )}
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
    </div>
  );
};

export default AppDetail;
