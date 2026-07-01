import { useState, useMemo, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import CategoryCarousel from "@/components/CategoryCarousel";
import AppList from "@/components/AppList";
import SectionTabs from "@/components/SectionTabs";
import InsightsSection from "@/components/InsightsSection";
import ProgramsSection from "@/components/ProgramsSection";
import AppAccessModal from "@/components/AppAccessModal";
import AppScanAnimation from "@/components/AppScanAnimation";
import AddAppModal from "@/components/AddAppModal";
import ProgressionSection from "@/components/ProgressionSection";
import { apps } from "@/data/apps";
import { useAppSettings } from "@/hooks/useAppSettings";
import { useInstalledApps } from "@/hooks/useInstalledApps";
import { useManuallyAddedApps } from "@/hooks/useManuallyAddedApps";
import { toast } from "sonner";
import BottomNavBar from "@/components/BottomNavBar";
import TodayProgress from "@/components/TodayProgress";
import TodayHeroCard from "@/components/TodayHeroCard";


const Index = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const [showAccessModal, setShowAccessModal] = useState(false);
  const [showScanAnimation, setShowScanAnimation] = useState(false);
  const [showAddAppModal, setShowAddAppModal] = useState(false);
  
  const { selectedCategory, setSelectedCategory, settings } = useAppSettings();
  const { addedIds, addApp, getAddedApps } = useManuallyAddedApps();
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

  // First-launch flow: access modal
  useEffect(() => {
    if (hasAccessGranted || hasAccessDenied) return;
    const timer = setTimeout(() => setShowAccessModal(true), 500);
    return () => clearTimeout(timer);
  }, [hasAccessGranted, hasAccessDenied]);



  // Utiliser les apps détectées si disponibles, sinon toutes les apps
  // + fusionner les apps ajoutées manuellement (sans doublon)
  const availableApps = useMemo(() => {
    const base = hasAccessGranted && detectedApps.length > 0 ? detectedApps : apps;
    const baseIds = new Set(base.map((a) => a.id));
    const extras = getAddedApps().filter((a) => !baseIds.has(a.id));
    return [...base, ...extras];
  }, [hasAccessGranted, detectedApps, getAddedApps, addedIds]);

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
    <div className="min-h-screen pb-24">



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

      {/* Small top spacer */}
      <div className="h-4" />


      {/* Today hero — Aujourd'hui */}
      <TodayHeroCard
        hours={2}
        minutes={14}
        deltaMinutes={22}
        goalHours={3}
        kcal={124}
        blocked={18}
      />

      {/* Ton impact aujourd'hui — 3 stat bubbles */}
      <TodayProgress />

      {/* Section Tabs */}
      <SectionTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onAddApp={() => setShowAddAppModal(true)}
      />

      {/* Add App Modal */}
      <AddAppModal
        isOpen={showAddAppModal}
        onClose={() => setShowAddAppModal(false)}
        connectedAppIds={availableApps.map((a) => a.id)}
        onAddApp={(appId) => {
          const app = apps.find((a) => a.id === appId);
          addApp(appId);
          toast.success(`${app?.name ?? "Application"} ajoutée à ta liste`);
        }}
      />

      {/* Tab Content */}
      <section>
        {renderTabContent()}
      </section>

      {/* Bottom Navigation */}
      <BottomNavBar />
    </div>
  );
};

export default Index;
