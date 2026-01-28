import { apps, AppData } from "@/data/apps";
import { Capacitor } from "@capacitor/core";
import type { CapacitorUsageStatsManagerPlugin, PackageInfo } from "@capgo/capacitor-android-usagestatsmanager";

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
  "com.spotify.music": "spotify",
  "com.pinterest": "pinterest",
  "com.linkedin.android": "linkedin",
  "com.tumblr": "tumblr",
  "com.amazon.avod.thirdpartyclient": "primevideo",
  "com.disney.disneyplus": "disneyplus",
  "com.hbo.hbonow": "hbomax",
  "org.telegram.messenger": "telegram",
  "com.viber.voip": "viber",
  "com.facebook.orca": "messenger",
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
  pinterest: "social",
  linkedin: "social",
  tumblr: "social",
  youtube: "video",
  twitch: "video",
  netflix: "video",
  spotify: "video",
  primevideo: "video",
  disneyplus: "video",
  hbomax: "video",
  whatsapp: "messaging",
  facebook: "messaging",
  telegram: "messaging",
  viber: "messaging",
  messenger: "messaging",
};

// Liste des IDs d'applications simulées comme "installées" (fallback web)
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

/**
 * Service de détection des applications
 * Utilise @capgo/capacitor-android-usagestatsmanager sur Android
 * Fallback simulation sur web/iOS
 */
class AppDetectionService {
  private usageStatsManager: CapacitorUsageStatsManagerPlugin | null = null;
  private isInitialized = false;

  /**
   * Initialise le plugin Usage Stats Manager
   */
  async initialize(): Promise<boolean> {
    if (this.isInitialized) return true;

    if (Capacitor.isNativePlatform() && Capacitor.getPlatform() === "android") {
      try {
        const module = await import("@capgo/capacitor-android-usagestatsmanager");
        this.usageStatsManager = module.CapacitorUsageStatsManager;
        this.isInitialized = true;
        console.log("CapacitorUsageStatsManager initialisé avec succès");
        return true;
      } catch (error) {
        console.warn("CapacitorUsageStatsManager non disponible:", error);
        return false;
      }
    }
    return false;
  }

  /**
   * Vérifie si la permission Usage Stats est accordée
   */
  async checkPermission(): Promise<boolean> {
    if (!this.usageStatsManager) {
      await this.initialize();
    }

    if (!this.usageStatsManager) {
      return false;
    }

    try {
      const result = await this.usageStatsManager.isUsageStatsPermissionGranted();
      return result.granted;
    } catch (error) {
      console.error("Erreur vérification permission:", error);
      return false;
    }
  }

  /**
   * Ouvre les paramètres pour accorder la permission Usage Stats
   */
  async requestPermission(): Promise<void> {
    if (!this.usageStatsManager) {
      await this.initialize();
    }

    if (!this.usageStatsManager) {
      console.warn("Plugin non disponible - simulation mode");
      return;
    }

    try {
      await this.usageStatsManager.openUsageStatsSettings();
    } catch (error) {
      console.error("Erreur ouverture paramètres:", error);
    }
  }

  /**
   * Détecte les applications installées
   * Utilise le vrai plugin sur Android, simulation sur web
   */
  async detectInstalledApps(): Promise<DetectedApp[]> {
    // Sur Android natif
    if (Capacitor.isNativePlatform() && Capacitor.getPlatform() === "android") {
      await this.initialize();

      if (this.usageStatsManager) {
        try {
          // Vérifier la permission
          const hasPermission = await this.checkPermission();
          
          if (!hasPermission) {
            console.log("Permission Usage Stats non accordée - demande à l'utilisateur");
            // On retourne la simulation en attendant que l'utilisateur accorde la permission
            return this.simulateDetection();
          }

          return await this.detectRealApps();
        } catch (error) {
          console.error("Erreur détection réelle, fallback simulation:", error);
          return this.simulateDetection();
        }
      }
    }

    // Mode simulation (web ou iOS)
    return this.simulateDetection();
  }

  /**
   * Détection réelle via CapacitorUsageStatsManager
   */
  private async detectRealApps(): Promise<DetectedApp[]> {
    if (!this.usageStatsManager) {
      throw new Error("Plugin non initialisé");
    }

    try {
      // Récupérer tous les packages installés
      const packagesResult = await this.usageStatsManager.queryAllPackages();
      const installedPackages: PackageInfo[] = packagesResult.packages || [];

      console.log(`${installedPackages.length} packages détectés sur l'appareil`);

      const detectedApps: DetectedApp[] = [];

      for (const pkg of installedPackages) {
        const packageName = pkg.packageName;
        const appId = PACKAGE_NAME_TO_APP_ID[packageName];

        if (appId) {
          const appData = apps.find((a) => a.id === appId);
          
          if (appData) {
            detectedApps.push({
              ...appData,
              category: APP_CATEGORIES[appId] || "social",
              isInstalled: true,
              packageName: packageName,
            });
            console.log(`App détectée: ${appData.name} (${packageName})`);
          }
        }
      }

      console.log(`${detectedApps.length} apps de divertissement trouvées`);
      return detectedApps;
    } catch (error) {
      console.error("Erreur queryAllPackages:", error);
      throw error;
    }
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

  /**
   * Récupère les statistiques d'utilisation des apps
   */
  async getUsageStats(daysBack: number = 7): Promise<Record<string, any>> {
    if (!this.usageStatsManager) {
      await this.initialize();
    }

    if (!this.usageStatsManager) {
      return {};
    }

    try {
      const endTime = Date.now();
      const beginTime = endTime - (daysBack * 24 * 60 * 60 * 1000);

      const result = await this.usageStatsManager.queryAndAggregateUsageStats({
        beginTime,
        endTime,
      });

      return result;
    } catch (error) {
      console.error("Erreur récupération stats:", error);
      return {};
    }
  }
}

export const appDetectionService = new AppDetectionService();
