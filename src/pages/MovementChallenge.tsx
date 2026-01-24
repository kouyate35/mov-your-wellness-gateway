import { useState, useEffect, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Camera, Check, X } from "lucide-react";
import MovementSilhouette from "@/components/MovementSilhouette";
import { getAppIcon } from "@/components/AppIcons";
import { cn } from "@/lib/utils";

type MovementZone = "left-arm" | "right-arm" | "left-leg" | "right-leg" | "torso" | null;

interface MovementTask {
  id: string;
  instruction: string;
  zone: MovementZone;
  duration: number; // ms to hold
}

const MOVEMENT_TASKS: MovementTask[] = [
  { id: "right-arm", instruction: "Lève ton bras droit", zone: "right-arm", duration: 2000 },
  { id: "left-arm", instruction: "Lève ton bras gauche", zone: "left-arm", duration: 2000 },
  { id: "torso", instruction: "Étire ton dos", zone: "torso", duration: 2500 },
];

const MovementChallenge = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const appId = searchParams.get("app") || "instagram";
  
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [activeZone, setActiveZone] = useState<MovementZone>(null);
  const [isHolding, setIsHolding] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);
  const [isValidated, setIsValidated] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const currentTask = MOVEMENT_TASKS[currentTaskIndex];

  // Simulate movement detection (will be replaced by real camera detection)
  const simulateMovement = useCallback(() => {
    if (isValidated || isComplete) return;
    
    setActiveZone(currentTask.zone);
    setIsHolding(true);
  }, [currentTask, isValidated, isComplete]);

  const stopMovement = useCallback(() => {
    if (isValidated) return;
    setActiveZone(null);
    setIsHolding(false);
    setHoldProgress(0);
  }, [isValidated]);

  // Handle hold progress
  useEffect(() => {
    if (!isHolding || isValidated) return;

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
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
            setActiveZone(null);
            setIsHolding(false);
            setHoldProgress(0);
          } else {
            setIsComplete(true);
          }
        }, 800);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [isHolding, isValidated, currentTask.duration, currentTaskIndex]);

  // Auto-redirect when complete
  useEffect(() => {
    if (isComplete) {
      const timer = setTimeout(() => {
        // In real implementation, this would open the actual app
        // For now, redirect back to home
        navigate("/");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isComplete, navigate]);

  const handleSkip = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-between py-8 px-4">
      {/* Header with camera indicator and skip */}
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Camera className="w-4 h-4" />
          <span className="text-xs">Caméra active</span>
        </div>
        <button
          onClick={handleSkip}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
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

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center gap-8">
        {/* Silhouette */}
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
            </>
          )}
        </div>

        {/* Progress indicator */}
        {!isComplete && (
          <div className="w-48 h-1 bg-muted/30 rounded-full overflow-hidden">
            <div 
              className={cn(
                "h-full transition-all duration-100 rounded-full",
                isValidated ? "bg-green-400" : "bg-white"
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

      {/* Interaction area - tap to simulate movement */}
      <div className="w-full space-y-4">
        <p className="text-center text-xs text-muted-foreground">
          {isComplete 
            ? "Redirection en cours..."
            : "Maintiens appuyé pour simuler le mouvement"
          }
        </p>
        
        {!isComplete && (
          <button
            onMouseDown={simulateMovement}
            onMouseUp={stopMovement}
            onMouseLeave={stopMovement}
            onTouchStart={simulateMovement}
            onTouchEnd={stopMovement}
            className={cn(
              "w-full py-4 rounded-2xl border transition-all duration-200",
              isHolding 
                ? "bg-white/10 border-white/30 scale-[0.98]" 
                : "bg-muted/10 border-muted/20 hover:bg-muted/20"
            )}
          >
            <span className="text-foreground font-medium">
              {isHolding ? "Continue..." : "Appuie et maintiens"}
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

export default MovementChallenge;
