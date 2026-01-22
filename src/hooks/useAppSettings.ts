import { useState, useEffect } from "react";

export interface AppSetting {
  appId: string;
  isActive: boolean;
  selectedProgramId: string | null;
  categoryId: "move" | "breath" | "focus";
}

const STORAGE_KEY = "mov-app-settings";

export const useAppSettings = () => {
  const [settings, setSettings] = useState<Record<string, AppSetting>>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  });

  const [selectedCategory, setSelectedCategory] = useState<"move" | "breath" | "focus">(() => {
    const stored = localStorage.getItem("mov-selected-category");
    return (stored as "move" | "breath" | "focus") || "move";
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem("mov-selected-category", selectedCategory);
  }, [selectedCategory]);

  const getAppSetting = (appId: string): AppSetting => {
    return settings[appId] || {
      appId,
      isActive: false,
      selectedProgramId: null,
      categoryId: selectedCategory,
    };
  };

  const updateAppSetting = (appId: string, updates: Partial<AppSetting>) => {
    setSettings((prev) => ({
      ...prev,
      [appId]: {
        ...getAppSetting(appId),
        ...updates,
      },
    }));
  };

  const toggleApp = (appId: string) => {
    const current = getAppSetting(appId);
    updateAppSetting(appId, { isActive: !current.isActive });
  };

  const setProgram = (appId: string, programId: string) => {
    updateAppSetting(appId, { selectedProgramId: programId });
  };

  return {
    settings,
    selectedCategory,
    setSelectedCategory,
    getAppSetting,
    updateAppSetting,
    toggleApp,
    setProgram,
  };
};
