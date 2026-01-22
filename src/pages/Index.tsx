import { useState, useMemo } from "react";
import CategoryCarousel from "@/components/CategoryCarousel";
import SearchBar from "@/components/SearchBar";
import AppList from "@/components/AppList";
import { apps } from "@/data/apps";
import { useAppSettings } from "@/hooks/useAppSettings";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
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

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <header className="pt-10 pb-5 px-4">
        <h1 className="text-4xl font-bold text-foreground tracking-tight">MOV</h1>
        <p className="text-muted-foreground text-sm mt-0.5">
          Bouge avant de scroller
        </p>
      </header>

      {/* Category Carousel */}
      <section className="mb-6">
        <CategoryCarousel
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </section>

      {/* Search Bar */}
      <section className="mb-4">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </section>

      {/* App List */}
      <section>
        <AppList apps={filteredApps} activeApps={activeApps} />
      </section>
    </div>
  );
};

export default Index;
