import { useEffect, useState } from "react";
import { appIconComponents, getAppIcon } from "./AppIcons";
import { apps } from "@/data/apps";
import { Check } from "lucide-react";

interface AppScanAnimationProps {
  isScanning: boolean;
  onComplete: () => void;
}

// Apps à afficher pendant le scan (ordre d'apparition)
const SCAN_APP_IDS = [
  "tiktok",
  "instagram",
  "youtube",
  "snapchat",
  "whatsapp",
  "twitter",
  "netflix",
  "twitch",
  "discord",
];

const AppScanAnimation = ({ isScanning, onComplete }: AppScanAnimationProps) => {
  const [visibleApps, setVisibleApps] = useState<string[]>([]);
  const [scanComplete, setScanComplete] = useState(false);

  useEffect(() => {
    if (!isScanning) {
      setVisibleApps([]);
      setScanComplete(false);
      return;
    }

    // Afficher les apps une par une avec un délai
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      if (currentIndex < SCAN_APP_IDS.length) {
        setVisibleApps((prev) => [...prev, SCAN_APP_IDS[currentIndex]]);
        currentIndex++;
      } else {
        clearInterval(intervalId);
        // Marquer le scan comme terminé
        setTimeout(() => {
          setScanComplete(true);
          setTimeout(onComplete, 500);
        }, 300);
      }
    }, 150);

    return () => clearInterval(intervalId);
  }, [isScanning, onComplete]);

  if (!isScanning && visibleApps.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex flex-col items-center justify-center">
      {/* Cercle de scan animé */}
      <div className="relative mb-8">
        {/* Cercles pulsants */}
        <div className="absolute inset-0 w-32 h-32 rounded-full bg-primary/20 animate-pulse-ring" />
        <div 
          className="absolute inset-0 w-32 h-32 rounded-full bg-primary/10 animate-pulse-ring" 
          style={{ animationDelay: "0.5s" }} 
        />
        
        {/* Cercle central avec icône */}
        <div className="relative w-32 h-32 rounded-full bg-secondary border-2 border-primary/30 flex items-center justify-center">
          {scanComplete ? (
            <div className="animate-pop-in">
              <Check className="w-12 h-12 text-primary" strokeWidth={2.5} />
            </div>
          ) : (
            <svg 
              className="w-12 h-12 text-primary animate-spin" 
              style={{ animationDuration: "3s" }}
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5"
            >
              <circle cx="12" cy="12" r="10" strokeOpacity="0.2" />
              <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" />
            </svg>
          )}
        </div>
      </div>

      {/* Texte de statut */}
      <div className="text-center mb-8">
        <h3 className="text-lg font-semibold text-foreground mb-1">
          {scanComplete ? "Détection terminée !" : "Analyse en cours..."}
        </h3>
        <p className="text-sm text-muted-foreground">
          {scanComplete 
            ? `${visibleApps.length} applications détectées`
            : "Recherche des applications de divertissement"
          }
        </p>
      </div>

      {/* Grille d'apps détectées */}
      <div className="grid grid-cols-5 gap-3 max-w-xs">
        {SCAN_APP_IDS.map((appId, index) => {
          const app = apps.find((a) => a.id === appId);
          const isVisible = visibleApps.includes(appId);
          
          if (!app) return null;

          return (
            <div
              key={appId}
              className={`
                relative w-12 h-12 rounded-xl flex items-center justify-center
                transition-all duration-300
                ${isVisible ? "opacity-100" : "opacity-0"}
                ${app.bgColor}
              `}
              style={{
                animationDelay: `${index * 100}ms`,
                transform: isVisible ? "scale(1)" : "scale(0)",
              }}
            >
              <div className={`w-full h-full rounded-xl flex items-center justify-center ${isVisible ? "animate-pop-in" : ""}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {getAppIcon(appId, "sm", true)}
              </div>
              
              {/* Badge de check quand détecté */}
              {isVisible && (
                <div 
                  className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center animate-pop-in"
                  style={{ animationDelay: `${index * 100 + 200}ms` }}
                >
                  <Check className="w-3 h-3 text-primary-foreground" strokeWidth={3} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Barre de progression */}
      <div className="mt-8 w-64 h-1.5 bg-secondary rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary rounded-full transition-all duration-300 ease-out"
          style={{ 
            width: `${(visibleApps.length / SCAN_APP_IDS.length) * 100}%` 
          }}
        />
      </div>
    </div>
  );
};

export default AppScanAnimation;
