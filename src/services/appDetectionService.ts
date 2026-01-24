import { apps, AppData } from "@/data/apps";

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

export interface DetectedApp extends AppData {
  category: "social" | "video" | "messaging" | "games";
  isInstalled: boolean;
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

/**
 * Service de détection des applications
 * Mode simulation par défaut - prêt pour intégration Capacitor
 */
class AppDetectionService {
  private isNativeMode = false;

  /**
   * Active le mode natif (Capacitor)
   * À appeler quand le plugin est disponible
   */
  enableNativeMode() {
    this.isNativeMode = true;
  }

  /**
   * Détecte les applications installées
   * Retourne une promesse pour supporter le mode async natif
   */
  async detectInstalledApps(): Promise<DetectedApp[]> {
    if (this.isNativeMode) {
      // TODO: Intégrer capacitor-plugin-get-app-info ici
      // const { InstalledApps } = await import('capacitor-plugin-get-app-info');
      // const result = await InstalledApps.getInstalledApps();
      // return this.mapNativeAppsToDetectedApps(result);
      return this.simulateDetection();
    }

    return this.simulateDetection();
  }

  /**
   * Simulation de la détection pour le MVP
   * Ajoute un délai réaliste pour l'UX
   */
  private async simulateDetection(): Promise<DetectedApp[]> {
    // Délai de simulation pour donner l'impression d'un scan
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Filtrer les apps "installées" et ajouter les métadonnées
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
   * Vérifie si une application spécifique est installée
   */
  async isAppInstalled(appId: string): Promise<boolean> {
    if (this.isNativeMode) {
      // TODO: Vérification native
      return SIMULATED_INSTALLED_APP_IDS.includes(appId);
    }
    return SIMULATED_INSTALLED_APP_IDS.includes(appId);
  }
}

// Export singleton
export const appDetectionService = new AppDetectionService();
