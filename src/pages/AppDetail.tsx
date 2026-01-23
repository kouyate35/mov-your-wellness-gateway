import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronRight, Menu, Settings } from "lucide-react";
import { apps } from "@/data/apps";
import { useAppSettings } from "@/hooks/useAppSettings";
import ConnectAppModal from "@/components/ConnectAppModal";
import CategorySelector from "@/components/CategorySelector";
import { getAppIcon } from "@/components/AppIcons";

const AppDetail = () => {
  const { appId } = useParams<{ appId: string }>();
  const navigate = useNavigate();
  const { getAppSetting, toggleApp, setProgram } = useAppSettings();
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<"move" | "breath" | "focus">("move");
  const [selectedProgramId, setSelectedProgramId] = useState<string | null>(null);

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
  };

  const handleCategorySelect = (id: "move" | "breath" | "focus") => {
    setSelectedCategory(id);
    setSelectedProgramId(null); // Reset program when category changes
    setProgram(app.id, id);
  };

  const handleProgramSelect = (programId: string) => {
    setSelectedProgramId(programId);
  };

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header - ChatGPT style with hamburger + breadcrumb */}
      <header className="pt-6 pb-4 px-4">
        <div className="flex items-center gap-3">
          {/* Hamburger menu with blue dot */}
          <button className="relative p-1">
            <Menu className="w-5 h-5 text-muted-foreground" />
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-blue-500 rounded-full" />
          </button>
          
          {/* Breadcrumb: Applis > AppName */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
          >
            <span className="text-base font-medium">Applis</span>
          </button>
          
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
          
          <span className="text-base font-medium text-muted-foreground">{app.name}</span>
        </div>
      </header>

      {/* App Card - Same layout for connected and not connected */}
      <section className="px-4 pt-4">
        <div className="flex items-start gap-4">
          {/* Squircle icon with real app background */}
          {getAppIcon(app.id, "xl", true)}
          
          {/* App name + button */}
          <div className="flex flex-col gap-2 pt-1">
            <h1 className="text-2xl font-bold text-foreground">{app.name}</h1>
            
            {/* Button row with settings icon when connected */}
            <div className="flex items-center gap-2">
              {isConnected ? (
                <>
                  {/* Connected state: "Appli connectée" button + settings icon */}
                  <button
                    className="px-5 py-2 bg-white text-black text-sm font-medium rounded-full cursor-default w-fit"
                  >
                    Appli connectée
                  </button>
                  <button
                    className="w-10 h-10 flex items-center justify-center rounded-full border border-muted-foreground/30 hover:bg-muted/50 transition-colors"
                  >
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

      {/* Category Selection - Only shown when connected (ChatGPT style) */}
      {isConnected && (
        <section className="px-4 pt-8">
          {/* Title - ChatGPT style */}
          <h2 className="text-white text-lg font-normal mb-6">
            Choisissez le plan qui vous convient
          </h2>
          
          {/* Category Carousel with selection */}
          <CategorySelector
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategorySelect}
            selectedProgramId={selectedProgramId}
            onSelectProgram={handleProgramSelect}
          />
        </section>
      )}

      {/* Connection Modal */}
      <ConnectAppModal
        app={app}
        isOpen={showConnectModal}
        onClose={() => setShowConnectModal(false)}
        onConnect={handleConnect}
      />
    </div>
  );
};

export default AppDetail;
