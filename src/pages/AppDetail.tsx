import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronRight, Menu, Settings } from "lucide-react";
import { apps } from "@/data/apps";
import { getCategoryById } from "@/data/categories";
import { useAppSettings } from "@/hooks/useAppSettings";
import ConnectAppModal from "@/components/ConnectAppModal";
import { getAppIcon } from "@/components/AppIcons";

const AppDetail = () => {
  const { appId } = useParams<{ appId: string }>();
  const navigate = useNavigate();
  const { selectedCategory, getAppSetting, toggleApp, setProgram } = useAppSettings();
  const [showConnectModal, setShowConnectModal] = useState(false);

  const app = apps.find((a) => a.id === appId);
  const category = getCategoryById(selectedCategory);
  const appSetting = appId ? getAppSetting(appId) : null;

  if (!app || !category || !appSetting) {
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

      {/* App Card - ChatGPT style */}
      <section className="px-4 pt-8">
        {/* App Icon - Centered with circle border like ChatGPT */}
        <div className="flex justify-center mb-4">
          <div className="w-24 h-24 rounded-full border-2 border-muted flex items-center justify-center">
            {getAppIcon(app.id, "xl", true)}
          </div>
        </div>
        
        {/* App Name - Centered */}
        <h1 className="text-2xl font-bold text-foreground text-center mb-6">{app.name}</h1>
        
        {/* Action Row: Button + Settings icon */}
        <div className="flex items-center justify-center gap-3">
          {isConnected ? (
            <>
              {/* Connected button - white pill */}
              <button className="px-6 py-3 bg-white text-black text-base font-medium rounded-full">
                Appli connectée
              </button>
              
              {/* Settings icon - circle border */}
              <button className="w-12 h-12 rounded-full border-2 border-muted flex items-center justify-center hover:bg-muted/20 transition-colors">
                <Settings className="w-5 h-5 text-muted-foreground" />
              </button>
            </>
          ) : (
            <button
              onClick={() => setShowConnectModal(true)}
              className="px-6 py-3 bg-white text-black text-base font-medium rounded-full hover:bg-white/90 transition-colors"
            >
              Connecter
            </button>
          )}
        </div>
      </section>

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
