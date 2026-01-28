import { useState, useEffect, useCallback } from "react";
import { appDetectionService, DetectedApp } from "@/services/appDetectionService";

// Clés localStorage
const ACCESS_GRANTED_KEY = "mov-app-access-granted";
const DETECTED_APPS_KEY = "mov-detected-apps";
const ACCESS_DENIED_KEY = "mov-app-access-denied";

interface UseInstalledAppsReturn {
  // États
  hasAccessGranted: boolean;
  hasAccessDenied: boolean;
  detectedApps: DetectedApp[];
  isDetecting: boolean;
  needsPermission: boolean;
  
  // Actions
  grantAccess: () => Promise<void>;
  denyAccess: () => void;
  resetAccess: () => void;
  openPermissionSettings: () => Promise<void>;
}

export const useInstalledApps = (): UseInstalledAppsReturn => {
  const [hasAccessGranted, setHasAccessGranted] = useState<boolean>(false);
  const [hasAccessDenied, setHasAccessDenied] = useState<boolean>(false);
  const [detectedApps, setDetectedApps] = useState<DetectedApp[]>([]);
  const [isDetecting, setIsDetecting] = useState(false);
  const [needsPermission, setNeedsPermission] = useState(false);

  // Charger les apps détectées au démarrage si accès déjà accordé
  useEffect(() => {
    if (hasAccessGranted && detectedApps.length === 0) {
      detectApps();
    }
  }, [hasAccessGranted]);

  const detectApps = async () => {
    setIsDetecting(true);
    try {
      const apps = await appDetectionService.detectInstalledApps();
      setDetectedApps(apps);
      localStorage.setItem(DETECTED_APPS_KEY, JSON.stringify(apps));
    } catch (error) {
      console.error("Erreur lors de la détection des apps:", error);
    } finally {
      setIsDetecting(false);
    }
  };

  const grantAccess = useCallback(async () => {
    setIsDetecting(true);
    setNeedsPermission(false);
    
    try {
      // Sur Android, initialiser et vérifier la permission
      if (appDetectionService.isNativeAndroid()) {
        await appDetectionService.initialize();
        const hasPermission = await appDetectionService.checkPermission();
        
        if (!hasPermission) {
          // Ouvrir les paramètres pour accorder la permission
          setNeedsPermission(true);
          await appDetectionService.requestPermission();
          setIsDetecting(false);
          return;
        }
      }
      
      // Marquer l'accès comme accordé
      localStorage.setItem(ACCESS_GRANTED_KEY, "true");
      localStorage.removeItem(ACCESS_DENIED_KEY);
      setHasAccessGranted(true);
      setHasAccessDenied(false);
      
      // Détecter les applications
      const apps = await appDetectionService.detectInstalledApps();
      setDetectedApps(apps);
      localStorage.setItem(DETECTED_APPS_KEY, JSON.stringify(apps));
    } catch (error) {
      console.error("Erreur lors de l'accès aux apps:", error);
    } finally {
      setIsDetecting(false);
    }
  }, []);

  const openPermissionSettings = useCallback(async () => {
    try {
      await appDetectionService.requestPermission();
    } catch (error) {
      console.error("Erreur ouverture paramètres:", error);
    }
  }, []);

  const denyAccess = useCallback(() => {
    localStorage.setItem(ACCESS_DENIED_KEY, "true");
    setHasAccessDenied(true);
  }, []);

  const resetAccess = useCallback(() => {
    localStorage.removeItem(ACCESS_GRANTED_KEY);
    localStorage.removeItem(ACCESS_DENIED_KEY);
    localStorage.removeItem(DETECTED_APPS_KEY);
    setHasAccessGranted(false);
    setHasAccessDenied(false);
    setDetectedApps([]);
    setNeedsPermission(false);
  }, []);

  return {
    hasAccessGranted,
    hasAccessDenied,
    detectedApps,
    isDetecting,
    needsPermission,
    grantAccess,
    denyAccess,
    resetAccess,
    openPermissionSettings,
  };
};
