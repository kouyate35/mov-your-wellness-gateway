import { useState, useMemo, useEffect, useCallback } from "react";
import CategoryCarousel from "@/components/CategoryCarousel";
import SearchBar from "@/components/SearchBar";
import AppList from "@/components/AppList";
import SectionTabs from "@/components/SectionTabs";
import InsightsSection from "@/components/InsightsSection";
import ProgramsSection from "@/components/ProgramsSection";
import SideMenu from "@/components/SideMenu";
import AppAccessModal from "@/components/AppAccessModal";
import AppScanAnimation from "@/components/AppScanAnimation";
import ProgressionSection from "@/components/ProgressionSection";
import { apps } from "@/data/apps";
import { useAppSettings } from "@/hooks/useAppSettings";
import { useInstalledApps } from "@/hooks/useInstalledApps";
import { Menu, Globe } from "lucide-react";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAccessModal, setShowAccessModal] = useState(false);
  const [showScanAnimation, setShowScanAnimation] = useState(false);
  const { selectedCategory, setSelectedCategory, settings } = useAppSettings();
  const { 
    hasAccessGranted, 
    hasAccessDenied, 
    detectedApps, 
    isDetecting, 
    needsPermission,
    grantAccess, 
    denyAccess,
    openPermissionSettings,
  } = useInstalledApps();

  // Afficher le modal au premier lancement si accès non accordé/refusé
  useEffect(() => {
    if (!hasAccessGranted && !hasAccessDenied) {
      // Petit délai pour que l'interface se charge d'abord
      const timer = setTimeout(() => setShowAccessModal(true), 500);
      return () => clearTimeout(timer);
    }
  }, [hasAccessGranted, hasAccessDenied]);

  // Utiliser les apps détectées si disponibles, sinon toutes les apps
  const availableApps = hasAccessGranted && detectedApps.length > 0 ? detectedApps : apps;

  const filteredApps = useMemo(() => {
    if (!searchQuery.trim()) return availableApps;
    const query = searchQuery.toLowerCase();
    return availableApps.filter(
      (app) =>
        app.name.toLowerCase().includes(query) ||
        app.description.toLowerCase().includes(query)
    );
  }, [searchQuery, availableApps]);

  const handleGrantAccess = async () => {
    setShowAccessModal(false);
    // Afficher l'animation de scan
    setShowScanAnimation(true);
    // Lancer la détection en parallèle
    await grantAccess();
  };

  const handleScanComplete = useCallback(() => {
    setShowScanAnimation(false);
  }, []);

  const handleDenyAccess = () => {
    denyAccess();
    setShowAccessModal(false);
  };

  const activeApps = useMemo(() => {
    return Object.fromEntries(
      Object.entries(settings).map(([appId, setting]) => [appId, setting.isActive])
    );
  }, [settings]);

  const renderTabContent = () => {
    return <AppList apps={filteredApps} activeApps={activeApps} />;
  };

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Scan Animation */}
      <AppScanAnimation 
        isScanning={showScanAnimation} 
        onComplete={handleScanComplete} 
      />

      {/* App Access Modal */}
      <AppAccessModal
        isOpen={showAccessModal && !showScanAnimation}
        isDetecting={isDetecting}
        needsPermission={needsPermission}
        onGrantAccess={handleGrantAccess}
        onDenyAccess={handleDenyAccess}
        onOpenSettings={openPermissionSettings}
      />

      {/* Side Menu */}
      <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* Header */}
      <header className="pt-3 pb-4 px-4">
        {/* Top bar with hamburger and globe icon */}
        <div className="flex items-center justify-between mb-4">
          <button 
            className="p-1 -ml-1"
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu className="w-6 h-6 text-muted-foreground" strokeWidth={2} />
          </button>
          
          {/* Globe icon - circular with background matching interface */}
          <button className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center hover:bg-muted transition-colors">
            <Globe className="w-5 h-5 text-foreground" strokeWidth={1.5} />
          </button>
        </div>
        
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold text-foreground tracking-tight">
            Work<span className="font-normal">out</span>
          </h1>
          <span className="px-3 py-1.5 text-[11px] font-medium bg-secondary/80 rounded-full text-muted-foreground border border-border/50">
            Work avant de scroll
          </span>
        </div>
      </header>

      {/* Search Bar - right after header */}
      <section className="mb-6">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </section>

      {/* Category Carousel */}
      <section className="mb-6">
        <CategoryCarousel
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </section>

      {/* Section Tabs */}
      <SectionTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Tab Content */}
      <section>
        {renderTabContent()}
      </section>
    </div>
  );
};

export default Index;
