import { useEffect, useState } from "react";
import { Check, X as XIcon, Search } from "lucide-react";
import { getAppIcon } from "./AppIcons";
import { AppData } from "@/data/apps";

interface AppSearchAnimationProps {
  isOpen: boolean;
  query: string;
  matchedApp: AppData | null;
  onComplete: (found: boolean) => void;
  onClose: () => void;
}

type Phase = "scanning" | "found" | "not-found";

const AppSearchAnimation = ({
  isOpen,
  query,
  matchedApp,
  onComplete,
  onClose,
}: AppSearchAnimationProps) => {
  const [phase, setPhase] = useState<Phase>("scanning");

  useEffect(() => {
    if (!isOpen) return;
    setPhase("scanning");

    const t1 = setTimeout(() => {
      const next: Phase = matchedApp ? "found" : "not-found";
      setPhase(next);
      const t2 = setTimeout(() => onComplete(!!matchedApp), 1100);
      return () => clearTimeout(t2);
    }, 1800);

    return () => clearTimeout(t1);
  }, [isOpen, matchedApp, onComplete]);

  if (!isOpen) return null;

  const displayName = matchedApp?.name ?? query.trim();

  return (
    <div className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-md flex flex-col items-center justify-center px-6 animate-in fade-in duration-200">
      {/* Close (only on not-found) */}
      {phase === "not-found" && (
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-secondary hover:bg-secondary/70 flex items-center justify-center transition-colors"
          aria-label="Fermer"
        >
          <XIcon className="w-4 h-4 text-foreground" />
        </button>
      )}

      {/* Visual */}
      <div className="relative mb-10">
        {/* Pulsing rings while scanning */}
        {phase === "scanning" && (
          <>
            <div className="absolute inset-0 w-40 h-40 rounded-full bg-foreground/5 animate-pulse-ring" />
            <div
              className="absolute inset-0 w-40 h-40 rounded-full bg-foreground/5 animate-pulse-ring"
              style={{ animationDelay: "0.6s" }}
            />
          </>
        )}

        <div
          className={`relative w-40 h-40 rounded-full border-2 flex items-center justify-center transition-colors duration-300 ${
            phase === "found"
              ? "border-foreground/40 bg-secondary"
              : phase === "not-found"
              ? "border-destructive/40 bg-secondary"
              : "border-foreground/15 bg-secondary"
          }`}
        >
          {/* Rotating arc while scanning */}
          {phase === "scanning" && (
            <svg
              className="absolute inset-0 w-full h-full animate-spin text-foreground"
              style={{ animationDuration: "1.6s" }}
              viewBox="0 0 100 100"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M50 4 a46 46 0 0 1 46 46" strokeLinecap="round" />
            </svg>
          )}

          {/* Center icon */}
          <div className="w-20 h-20 flex items-center justify-center">
            {phase === "scanning" ? (
              matchedApp ? (
                <div className="opacity-80 scale-90">
                  {getAppIcon(matchedApp.id, "lg", true)}
                </div>
              ) : (
                <Search className="w-10 h-10 text-muted-foreground" strokeWidth={1.5} />
              )
            ) : phase === "found" && matchedApp ? (
              <div className="animate-pop-in">{getAppIcon(matchedApp.id, "lg", true)}</div>
            ) : (
              <div className="w-20 h-20 rounded-2xl bg-secondary flex items-center justify-center animate-pop-in">
                <XIcon className="w-10 h-10 text-destructive" strokeWidth={2.5} />
              </div>
            )}
          </div>

          {/* Status badge */}
          {phase === "found" && (
            <div className="absolute -bottom-2 -right-2 w-9 h-9 rounded-full bg-white flex items-center justify-center ring-4 ring-background animate-pop-in">
              <Check className="w-5 h-5 text-black" strokeWidth={3} />
            </div>
          )}
        </div>
      </div>

      {/* Text */}
      <div className="text-center max-w-xs">
        <h3 className="text-xl font-semibold text-foreground tracking-tight mb-2">
          {phase === "scanning" && "Analyse en cours…"}
          {phase === "found" && "Application trouvée !"}
          {phase === "not-found" && "Application introuvable"}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {phase === "scanning" && (
            <>
              Recherche de l'application{" "}
              <span className="text-foreground font-medium">« {displayName} »</span> sur ton
              téléphone
            </>
          )}
          {phase === "found" && (
            <>
              <span className="text-foreground font-medium">{displayName}</span> a été détectée et
              ajoutée à ta liste
            </>
          )}
          {phase === "not-found" && (
            <>
              Impossible de trouver{" "}
              <span className="text-foreground font-medium">« {displayName} »</span>. Essaye de la
              télécharger depuis un store.
            </>
          )}
        </p>
      </div>

      {/* Progress bar (scanning only) */}
      {phase === "scanning" && (
        <div className="mt-10 w-56 h-1 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-foreground rounded-full"
            style={{
              animation: "scanProgress 1.8s ease-out forwards",
            }}
          />
        </div>
      )}

      {phase === "not-found" && (
        <button
          onClick={onClose}
          className="mt-10 h-11 px-6 rounded-full bg-foreground text-background text-sm font-semibold"
        >
          Retour
        </button>
      )}

      <style>{`
        @keyframes scanProgress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default AppSearchAnimation;
