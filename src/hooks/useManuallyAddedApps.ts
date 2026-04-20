import { useState, useEffect, useCallback } from "react";
import { apps as ALL_APPS, AppData } from "@/data/apps";

const STORAGE_KEY = "mov-manually-added-apps";

export const useManuallyAddedApps = () => {
  const [addedIds, setAddedIds] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as string[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(addedIds));
  }, [addedIds]);

  const addApp = useCallback((appId: string) => {
    setAddedIds((prev) => (prev.includes(appId) ? prev : [...prev, appId]));
  }, []);

  const removeApp = useCallback((appId: string) => {
    setAddedIds((prev) => prev.filter((id) => id !== appId));
  }, []);

  const getAddedApps = useCallback((): AppData[] => {
    return addedIds
      .map((id) => ALL_APPS.find((a) => a.id === id))
      .filter((a): a is AppData => Boolean(a));
  }, [addedIds]);

  return { addedIds, addApp, removeApp, getAddedApps };
};
