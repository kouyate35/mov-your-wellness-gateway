import { useState, useEffect, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Camera, Check, Loader2 } from "lucide-react";
import MovementSilhouette from "@/components/MovementSilhouette";
import { getAppIcon } from "@/components/AppIcons";
import { usePoseDetection, BodyZone } from "@/hooks/usePoseDetection";
import { cn } from "@/lib/utils";

interface MovementTask {
  id: string;
  instruction: string;
  zone: BodyZone;
  duration: number; // ms to hold
}

const MOVEMENT_TASKS: MovementTask[] = [
  { id: "right-arm", instruction: "Lève ton bras droit", zone: "right-arm", duration: 2000 },
  { id: "left-arm", instruction: "Lève ton bras gauche", zone: "left-arm", duration: 2000 },
  { id: "torso", instruction: "Écarte les bras", zone: "torso", duration: 2500 },
];

const MovementChallenge = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const appId = searchParams.get("app") || "instagram";
  
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [holdProgress, setHoldProgress] = useState(0);
  const [isValidated, setIsValidated] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [holdStartTime, setHoldStartTime] = useState<number | null>(null);

  const { 
    isLoading, 
    isReady, 
    error, 
    activeZone, 
    videoRef, 
    startDetection 
  } = usePoseDetection();

  const currentTask = MOVEMENT_TASKS[currentTaskIndex];

  // Start camera when component mounts
  useEffect(() => {
    startDetection();
  }, [startDetection]);

  // Track if correct zone is active
  const isCorrectZone = activeZone === currentTask.zone;

  // Handle hold progress based on real pose detection
  useEffect(() => {
    if (isValidated || isComplete || !isReady) return;

    if (isCorrectZone) {
      // Start holding
      if (holdStartTime === null) {
        setHoldStartTime(Date.now());
      }
    } else {
      // Reset if wrong position
      setHoldStartTime(null);
      setHoldProgress(0);
    }
  }, [isCorrectZone, isValidated, isComplete, isReady, holdStartTime]);

  // Progress update loop
  useEffect(() => {
    if (holdStartTime === null || isValidated) return;

    const interval = setInterval(() => {
      const elapsed = Date.now() - holdStartTime;
      const progress = Math.min((elapsed / currentTask.duration) * 100, 100);
      setHoldProgress(progress);

      if (progress >= 100) {
        clearInterval(interval);
        setIsValidated(true);
        
        // Move to next task or complete
        setTimeout(() => {
          if (currentTaskIndex < MOVEMENT_TASKS.length - 1) {
            setCurrentTaskIndex(prev => prev + 1);
            setIsValidated(false);
            setHoldStartTime(null);
            setHoldProgress(0);
          } else {
            setIsComplete(true);
          }
        }, 800);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [holdStartTime, isValidated, currentTask.duration, currentTaskIndex]);

  // Auto-redirect when complete
  useEffect(() => {
    if (isComplete) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isComplete, navigate]);

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
        <div className={cn(
          "flex items-center gap-2 px-3 py-1.5 rounded-full",
          isReady ? "bg-green-500/20 text-green-400" : "bg-muted/20 text-muted-foreground"
        )}>
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

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center gap-8">
        {/* Silhouette with active zone highlight */}
        <MovementSilhouette 
          activeZone={activeZone} 
          isValidated={isValidated || isComplete}
        />

        {/* Instructions */}
        <div className="text-center space-y-2">
          {isComplete ? (
            <>
              <div className="flex items-center justify-center gap-2 text-green-400">
                <Check className="w-6 h-6" />
                <h2 className="text-2xl font-medium">Bien joué !</h2>
              </div>
              <p className="text-muted-foreground text-sm">
                Ouverture de l'application...
              </p>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-medium text-foreground">
                Bouge pour continuer
              </h2>
              <p className="text-muted-foreground">
                {currentTask.instruction}
              </p>
              {isReady && (
                <p className="text-xs text-muted-foreground/60 mt-2">
                  {isCorrectZone ? "Maintiens la position..." : "Position-toi face à la caméra"}
                </p>
              )}
            </>
          )}
        </div>

        {/* Progress indicator */}
        {!isComplete && (
          <div className="w-48 h-1.5 bg-muted/30 rounded-full overflow-hidden">
            <div 
              className={cn(
                "h-full transition-all duration-100 rounded-full",
                isValidated ? "bg-green-400" : isCorrectZone ? "bg-white" : "bg-muted/50"
              )}
              style={{ width: `${holdProgress}%` }}
            />
          </div>
        )}

        {/* Task progress dots */}
        <div className="flex gap-2">
          {MOVEMENT_TASKS.map((task, index) => (
            <div
              key={task.id}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                index < currentTaskIndex || isComplete
                  ? "bg-green-400"
                  : index === currentTaskIndex
                  ? "bg-white"
                  : "bg-muted/30"
              )}
            />
          ))}
        </div>
      </div>

      {/* Bottom hint */}
      <div className="w-full">
        <p className="text-center text-xs text-muted-foreground">
          {isComplete 
            ? "Redirection en cours..."
            : isLoading 
            ? "Initialisation de la détection..."
            : "La caméra détecte tes mouvements en temps réel"
          }
        </p>
      </div>
    </div>
  );
};

export default MovementChallenge;
