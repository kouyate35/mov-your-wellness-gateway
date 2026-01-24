import { apps, AppData } from "@/data/apps";
import { Capacitor } from "@capacitor/core";

// Liste des IDs d'applications simulées comme "installées"
const SIMULATED_INSTALLED_APP_IDS = [
  "tiktok",
  "instagram",
  "youtube",
  "twitter",
  "snapchat",
  "whatsapp",
  "netflix",
  "twitch",
  "discord",
];

// Package names des apps de divertissement pour Android
const PACKAGE_NAME_TO_APP_ID: Record<string, string> = {
  "com.zhiliaoapp.musically": "tiktok",
  "com.ss.android.ugc.trill": "tiktok",
  "com.instagram.android": "instagram",
  "com.google.android.youtube": "youtube",
  "com.twitter.android": "twitter",
  "com.snapchat.android": "snapchat",
  "com.facebook.katana": "facebook",
  "com.whatsapp": "whatsapp",
  "com.netflix.mediaclient": "netflix",
  "com.reddit.frontpage": "reddit",
  "tv.twitch.android.app": "twitch",
  "com.discord": "discord",
};

export interface DetectedApp extends AppData {
  category: "social" | "video" | "messaging" | "games";
  isInstalled: boolean;
  packageName?: string;
}

// Mapping des catégories par app ID
const APP_CATEGORIES: Record<string, DetectedApp["category"]> = {
  tiktok: "social",
  instagram: "social",
  twitter: "social",
  snapchat: "social",
  reddit: "social",
  discord: "social",
  youtube: "video",
  twitch: "video",
  netflix: "video",
  whatsapp: "messaging",
  facebook: "messaging",
};

// Interface pour le plugin natif custom (à créer dans Android)
interface InstalledAppsPlugin {
  getInstalledApps(): Promise<{ apps: { packageName: string; appName: string }[] }>;
}

/**
 * Service de détection des applications
 * Supporte le mode simulation (web) et le mode natif (Android via Capacitor)
 */
class AppDetectionService {
  private nativePlugin: InstalledAppsPlugin | null = null;

  constructor() {
    this.initNativePlugin();
  }

  /**
   * Initialise le plugin natif si disponible
   */
  private async initNativePlugin() {
    if (Capacitor.isNativePlatform() && Capacitor.getPlatform() === "android") {
      try {
        // Le plugin sera enregistré sous le nom "InstalledApps"
        const { registerPlugin } = await import("@capacitor/core");
        this.nativePlugin = registerPlugin<InstalledAppsPlugin>("InstalledApps");
        console.log("Plugin InstalledApps initialisé");
      } catch (error) {
        console.warn("Plugin InstalledApps non disponible, mode simulation activé");
        this.nativePlugin = null;
      }
    }
  }

  /**
   * Détecte les applications installées
   * Utilise le plugin natif sur Android, simulation sur web
   */
  async detectInstalledApps(): Promise<DetectedApp[]> {
    // Sur Android avec plugin natif
    if (Capacitor.isNativePlatform() && Capacitor.getPlatform() === "android" && this.nativePlugin) {
      try {
        return await this.detectNativeApps();
      } catch (error) {
        console.error("Erreur détection native, fallback simulation:", error);
        return this.simulateDetection();
      }
    }

    // Mode simulation (web ou iOS sans plugin)
    return this.simulateDetection();
  }

  /**
   * Détection native via le plugin Android
   */
  private async detectNativeApps(): Promise<DetectedApp[]> {
    if (!this.nativePlugin) {
      throw new Error("Plugin natif non disponible");
    }

    const result = await this.nativePlugin.getInstalledApps();
    const detectedApps: DetectedApp[] = [];

    for (const installedApp of result.apps) {
      const appId = PACKAGE_NAME_TO_APP_ID[installedApp.packageName];
      
      if (appId) {
        const appData = apps.find((a) => a.id === appId);
        if (appData) {
          detectedApps.push({
            ...appData,
            category: APP_CATEGORIES[appId] || "social",
            isInstalled: true,
            packageName: installedApp.packageName,
          });
        }
      }
    }

    return detectedApps;
  }

  /**
   * Simulation de la détection pour le MVP / mode web
   */
  private async simulateDetection(): Promise<DetectedApp[]> {
    // Délai de simulation pour donner l'impression d'un scan
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const detectedApps: DetectedApp[] = apps
      .filter((app) => SIMULATED_INSTALLED_APP_IDS.includes(app.id))
      .map((app) => ({
        ...app,
        category: APP_CATEGORIES[app.id] || "social",
        isInstalled: true,
      }));

    return detectedApps;
  }

  /**
   * Vérifie si on est en mode natif Android
   */
  isNativeAndroid(): boolean {
    return Capacitor.isNativePlatform() && Capacitor.getPlatform() === "android";
  }
}

export const appDetectionService = new AppDetectionService();
