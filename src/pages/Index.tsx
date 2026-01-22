import { useState, useMemo } from "react";
import CategoryCarousel from "@/components/CategoryCarousel";
import SearchBar from "@/components/SearchBar";
import AppList from "@/components/AppList";
import SectionTabs from "@/components/SectionTabs";
import EmptySection from "@/components/EmptySection";
import { apps } from "@/data/apps";
import { useAppSettings } from "@/hooks/useAppSettings";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const { selectedCategory, setSelectedCategory, settings } = useAppSettings();

  const filteredApps = useMemo(() => {
    if (!searchQuery.trim()) return apps;
    const query = searchQuery.toLowerCase();
    return apps.filter(
      (app) =>
        app.name.toLowerCase().includes(query) ||
        app.description.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const activeApps = useMemo(() => {
    return Object.fromEntries(
      Object.entries(settings).map(([appId, setting]) => [appId, setting.isActive])
    );
  }, [settings]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return <AppList apps={filteredApps} activeApps={activeApps} />;
      case 1:
        return <EmptySection title="Routines" />;
      case 2:
        return <EmptySection title="Programmes" />;
      case 3:
        return <EmptySection title="Insights" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <header className="pt-12 pb-4 px-4">
        <div className="flex items-center gap-3 mb-1">
          <h1 className="text-3xl font-semibold text-foreground tracking-tight">
            M<span className="font-normal">ov</span>
          </h1>
          <span className="px-2.5 py-1 text-[10px] font-medium bg-secondary rounded-full text-muted-foreground uppercase tracking-wider">
            Bêta
          </span>
        </div>
        <p className="text-muted-foreground text-sm">
          Bouger avant de scroller
        </p>
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
