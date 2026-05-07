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
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md flex flex-col items-center justify-center px-6">
      {/* Scan visual */}
      <div className="relative mb-10">
        {!scanComplete && (
          <>
            <div className="absolute inset-0 w-32 h-32 rounded-full bg-foreground/[0.04] animate-pulse-ring" />
            <div
              className="absolute inset-0 w-32 h-32 rounded-full bg-foreground/[0.04] animate-pulse-ring"
              style={{ animationDelay: "0.6s" }}
            />
          </>
        )}

        <div className="relative w-32 h-32 rounded-full bg-white/[0.025] border border-white/[0.06] flex items-center justify-center">
          {scanComplete ? (
            <div className="animate-pop-in">
              <Check className="w-11 h-11 text-foreground" strokeWidth={2} />
            </div>
          ) : (
            <svg
              className="absolute inset-0 w-full h-full animate-spin text-foreground/85"
              style={{ animationDuration: "1.6s" }}
              viewBox="0 0 100 100"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M50 6 a44 44 0 0 1 44 44" strokeLinecap="round" />
            </svg>
          )}
        </div>
      </div>

      {/* Status text */}
      <div className="text-center mb-10">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground/70 mb-2">
          {scanComplete ? "Terminé" : "Analyse"}
        </p>
        <h3 className="text-[19px] font-semibold text-foreground tracking-tight mb-1.5">
          {scanComplete ? "Détection terminée" : "Analyse en cours…"}
        </h3>
        <p className="text-[13px] text-muted-foreground">
          {scanComplete
            ? `${visibleApps.length} applications détectées`
            : "Recherche des applications de divertissement"}
        </p>
      </div>

      {/* Apps grid */}
      <div className="grid grid-cols-5 gap-3 max-w-xs mb-10">
        {SCAN_APP_IDS.map((appId, index) => {
          const app = apps.find((a) => a.id === appId);
          const isVisible = visibleApps.includes(appId);
          if (!app) return null;

          return (
            <div
              key={appId}
              className={`relative w-12 h-12 transition-all duration-300 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}
            >
              <div className={`w-full h-full ${isVisible ? "animate-pop-in" : ""}`} style={{ animationDelay: `${index * 80}ms` }}>
                {getAppIcon(appId, "sm", true)}
              </div>
              {isVisible && (
                <div
                  className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-white rounded-full flex items-center justify-center ring-[2px] ring-background animate-pop-in"
                  style={{ animationDelay: `${index * 80 + 180}ms` }}
                >
                  <Check className="w-2.5 h-2.5 text-black" strokeWidth={3.5} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Progress bar */}
      <div className="w-56 h-[3px] bg-white/[0.06] rounded-full overflow-hidden">
        <div
          className="h-full bg-foreground rounded-full transition-all duration-300 ease-out"
          style={{ width: `${(visibleApps.length / SCAN_APP_IDS.length) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default AppScanAnimation;
