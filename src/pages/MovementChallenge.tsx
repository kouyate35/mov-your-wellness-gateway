import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Camera, Check, Loader2 } from "lucide-react";
import PushUpSilhouette from "@/components/PushUpSilhouette";
import { getAppIcon } from "@/components/AppIcons";
import { usePushUpDetection } from "@/hooks/usePushUpDetection";
import { cn } from "@/lib/utils";

type ChallengeState = "intro" | "demo" | "countdown" | "active" | "complete";

const REQUIRED_PUSHUPS = 4;

const MovementChallenge = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const appId = searchParams.get("app") || "instagram";

  const [state, setState] = useState<ChallengeState>("intro");
  const [countdown, setCountdown] = useState(3);

  const {
    isLoading,
    isReady,
    error,
    phase,
    count,
    videoRef,
    startDetection,
  } = usePushUpDetection();

  const isComplete = count >= REQUIRED_PUSHUPS;

  // Start camera early
  useEffect(() => {
    startDetection();
  }, [startDetection]);

  // Handle intro -> demo transition
  useEffect(() => {
    if (state === "intro" && isReady) {
      const timer = setTimeout(() => {
        setState("demo");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [state, isReady]);

  // Handle demo -> countdown transition
  useEffect(() => {
    if (state === "demo") {
      const timer = setTimeout(() => {
        setState("countdown");
        setCountdown(3);
      }, 4000); // Show demo for 4 seconds
      return () => clearTimeout(timer);
    }
  }, [state]);

  // Handle countdown
  useEffect(() => {
    if (state === "countdown" && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (state === "countdown" && countdown === 0) {
      setState("active");
    }
  }, [state, countdown]);

  // Handle completion
  useEffect(() => {
    if (isComplete && state === "active") {
      setState("complete");
    }
  }, [isComplete, state]);

  // Auto-redirect when complete
  useEffect(() => {
    if (state === "complete") {
      const timer = setTimeout(() => {
        navigate("/");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [state, navigate]);

  const renderContent = () => {
    switch (state) {
      case "intro":
        return (
          <>
            <div className="text-center space-y-4 animate-fade-in">
              <h2 className="text-2xl font-bold text-foreground">
                Challenge Pompes
              </h2>
              <p className="text-muted-foreground">
                Fais {REQUIRED_PUSHUPS} pompes pour continuer
              </p>
              {isLoading && (
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Préparation...</span>
                </div>
              )}
            </div>
            <PushUpSilhouette phase="up" />
          </>
        );

      case "demo":
        return (
          <>
            <div className="text-center space-y-4 animate-fade-in">
              <h2 className="text-xl font-medium text-foreground">
                Regarde bien le mouvement
              </h2>
              <p className="text-muted-foreground text-sm">
                La silhouette te montre l'exemple
              </p>
            </div>
            <PushUpSilhouette phase="up" isDemo />
          </>
        );

      case "countdown":
        return (
          <>
            <div className="text-center space-y-4">
              <h2 className="text-xl font-medium text-foreground">
                Prépare-toi !
              </h2>
              <p className="text-muted-foreground text-sm">
                Le défi commence dans...
              </p>
            </div>
            <div className="relative flex items-center justify-center w-32 h-32">
              <span className="text-6xl font-bold text-white animate-pulse">
                {countdown}
              </span>
              <div className="absolute inset-0 border-4 border-white/30 rounded-full" />
            </div>
            <PushUpSilhouette phase="up" />
          </>
        );

      case "active":
        return (
          <>
            <div className="text-center space-y-2">
              <h2 className="text-xl font-medium text-foreground">
                C'est parti !
              </h2>
              <p className="text-muted-foreground text-sm">
                {phase === "down" ? "Maintenant remonte !" : "Descends vers le sol"}
              </p>
            </div>
            <PushUpSilhouette
              phase={phase}
              count={count}
              totalRequired={REQUIRED_PUSHUPS}
            />
            {/* Progress dots */}
            <div className="flex gap-2">
              {Array.from({ length: REQUIRED_PUSHUPS }).map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "w-3 h-3 rounded-full transition-all duration-300",
                    index < count
                      ? "bg-green-400 scale-110"
                      : "bg-muted/30"
                  )}
                />
              ))}
            </div>
          </>
        );

      case "complete":
        return (
          <>
            <div className="flex items-center justify-center gap-2 text-green-400 animate-scale-in">
              <Check className="w-8 h-8" />
              <h2 className="text-3xl font-bold">Bravo !</h2>
            </div>
            <PushUpSilhouette phase="up" isValidated />
            <p className="text-muted-foreground text-sm">
              Ouverture de l'application...
            </p>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-between py-8 px-4 relative overflow-hidden">
      {/* Hidden video element for camera feed */}
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-1 h-1 opacity-0 pointer-events-none"
        playsInline
        muted
      />

      {/* Header with camera indicator */}
      <div className="w-full flex items-center justify-center">
        <div
          className={cn(
            "flex items-center gap-2 px-3 py-1.5 rounded-full",
            isReady
              ? "bg-green-500/20 text-green-400"
              : "bg-muted/20 text-muted-foreground"
          )}
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Camera className="w-4 h-4" />
          )}
          <span className="text-xs">
            {isLoading ? "Chargement..." : isReady ? "Caméra active" : "En attente"}
          </span>
        </div>
      </div>

      {/* App being accessed */}
      <div className="flex flex-col items-center gap-2 mt-4">
        <div className="w-12 h-12 rounded-xl overflow-hidden bg-muted/20 flex items-center justify-center">
          {getAppIcon(appId, "md", true)}
        </div>
        <span className="text-xs text-muted-foreground">
          Avant d'accéder à {appId.charAt(0).toUpperCase() + appId.slice(1)}
        </span>
      </div>

      {/* Error message */}
      {error && (
        <div className="bg-destructive/20 text-destructive px-4 py-2 rounded-lg text-sm text-center">
          {error}
        </div>
      )}

      {/* Main content area */}
      <div className="flex-1 flex flex-col items-center justify-center gap-8">
        {renderContent()}
      </div>

      {/* Bottom status */}
      <div className="w-full">
        <p className="text-center text-xs text-muted-foreground">
          {state === "complete"
            ? "Redirection en cours..."
            : state === "active"
            ? "La caméra suit tes mouvements en temps réel"
            : isLoading
            ? "Initialisation de la détection..."
            : "Place-toi face à la caméra"}
        </p>
      </div>
    </div>
  );
};

export default MovementChallenge;
