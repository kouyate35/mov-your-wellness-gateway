import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Camera, Check, Loader2 } from "lucide-react";
import { useARPoseDetection } from "@/hooks/useARPoseDetection";
import SkeletonOverlay from "@/components/SkeletonOverlay";
import { cn } from "@/lib/utils";

// Import exercise tutorial videos - Move
import exerciseSquats from "@/assets/exercise-squats.mp4";
import exercisePushups from "@/assets/exercise-pushups.mp4";
import exercisePlank from "@/assets/exercise-plank.mp4";

// Import exercise videos - Flex
import exerciseLateralStretch from "@/assets/exercise-lateral-stretch.mp4";
import exerciseForwardFold from "@/assets/exercise-forward-fold.mp4";
import exerciseYogaArms from "@/assets/exercise-yoga-arms.mp4";

// Import exercise videos - Breath
import exerciseBoxBreathing from "@/assets/exercise-box-breathing.mp4";
import exerciseCoherence from "@/assets/exercise-coherence.mp4";
import exercisePause from "@/assets/exercise-pause.mp4";

// Map program IDs to their tutorial videos
const programTutorials: Record<string, string> = {
  // Move
  "squats-10": exerciseSquats,
  "pompes-10": exercisePushups,
  "gainage": exercisePlank,
  // Flex
  "lateral-stretch": exerciseLateralStretch,
  "forward-fold": exerciseForwardFold,
  "yoga-arms": exerciseYogaArms,
  // Breath
  "box-breathing": exerciseBoxBreathing,
  "coherence": exerciseCoherence,
  "pause": exercisePause,
};

// Program-specific configurations
const programConfig: Record<string, { required: number; instruction: string; instructionAlt: string }> = {
  "squats-10": { required: 4, instruction: "⬆️ Monte !", instructionAlt: "⬇️ Descends !" },
  "pompes-10": { required: 4, instruction: "⬆️ Remonte !", instructionAlt: "⬇️ Descends !" },
  "gainage": { required: 1, instruction: "🔒 Tiens !", instructionAlt: "🔒 Encore !" },
  "lateral-stretch": { required: 4, instruction: "⬅️ Gauche !", instructionAlt: "➡️ Droite !" },
  "forward-fold": { required: 4, instruction: "⬆️ Monte !", instructionAlt: "⬇️ Descends !" },
  "yoga-arms": { required: 4, instruction: "🙏 Étire !", instructionAlt: "🔄 Relâche !" },
  "box-breathing": { required: 4, instruction: "💨 Inspire !", instructionAlt: "😮‍💨 Expire !" },
  "coherence": { required: 4, instruction: "💨 Inspire !", instructionAlt: "😮‍💨 Expire !" },
  "pause": { required: 1, instruction: "🧘 Respire...", instructionAlt: "🧘 Calme..." },
};

const MovementChallenge = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const appId = searchParams.get("app") || "instagram";
  const programId = searchParams.get("program") || "pompes-10";
  const [isComplete, setIsComplete] = useState(false);

  // Get the tutorial video for the selected program
  const tutorialVideo = programTutorials[programId] || exercisePushups;
  const config = programConfig[programId] || { required: 4, instruction: "⬆️ Remonte !", instructionAlt: "⬇️ Descends !" };

  const {
    isLoading,
    isReady,
    error,
    phase,
    count,
    keypoints,
    videoRef,
    videoWidth,
    videoHeight,
    startDetection,
  } = useARPoseDetection();

  // Start camera and detection immediately when component mounts
  useEffect(() => {
    const initCamera = async () => {
      try {
        await startDetection();
        console.log("Camera and detection started for program:", programId);
      } catch (err) {
        console.error("Failed to start camera:", err);
      }
    };
    
    initCamera();
  }, [startDetection, programId]);

  // Handle completion
  useEffect(() => {
    if (count >= config.required && !isComplete) {
      setIsComplete(true);
    }
  }, [count, isComplete, config.required]);

  // Auto-redirect when complete
  useEffect(() => {
    if (isComplete) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isComplete, navigate]);

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      {/* Full-screen camera feed */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ transform: "scaleX(-1)" }} // Mirror front camera
        playsInline
        muted
        autoPlay
      />

      {/* Skeleton overlay drawn on top of video */}
      {isReady && keypoints.length > 0 && (
        <SkeletonOverlay
          keypoints={keypoints}
          videoWidth={videoWidth}
          videoHeight={videoHeight}
        />
      )}

      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center gap-4 z-20">
          <Loader2 className="w-12 h-12 text-white animate-spin" />
          <p className="text-white text-lg">Initialisation de la caméra...</p>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center gap-4 z-20 p-6">
          <Camera className="w-16 h-16 text-red-400" />
          <p className="text-white text-lg text-center">{error}</p>
          <button
            onClick={() => startDetection()}
            className="px-6 py-3 bg-white text-black rounded-full font-medium"
          >
            Réessayer
          </button>
        </div>
      )}

      {/* Completion overlay */}
      {isComplete && (
        <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center gap-4 z-30 animate-fade-in">
          <div className="flex items-center gap-3 text-green-400">
            <Check className="w-12 h-12" />
            <span className="text-4xl font-bold">Bravo !</span>
          </div>
          <p className="text-white/70">Ouverture de l'application...</p>
        </div>
      )}

      {/* HUD Overlay - Top area */}
      <div className="absolute top-0 left-0 right-0 z-10 p-4 pointer-events-none">
        <div className="flex justify-between items-start">
          {/* Left side - Camera status and app info */}
          <div className="flex flex-col gap-2">
            {/* Camera status */}
            <div
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm w-fit",
                isReady
                  ? "bg-green-500/30 text-green-300"
                  : "bg-white/20 text-white/70"
              )}
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Camera className="w-4 h-4" />
              )}
              <span className="text-sm font-medium">
                {isLoading ? "Chargement..." : isReady ? "Caméra active" : "En attente"}
              </span>
            </div>

            {/* App info */}
            <div className="bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full w-fit">
              <span className="text-white/80 text-sm">
                Avant d'accéder à{" "}
                <span className="font-semibold text-white">
                  {appId.charAt(0).toUpperCase() + appId.slice(1)}
                </span>
              </span>
            </div>
          </div>

          {/* Right side - Tutorial video */}
          <div className="w-24 h-24 rounded-xl overflow-hidden border-2 border-white/30 bg-black/60 backdrop-blur-sm shadow-lg">
            <video 
              src={tutorialVideo} 
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Counter and progress - Bottom area */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-6 pointer-events-none">
        {/* Push-up counter */}
        <div className="flex flex-col items-center gap-4">
          {/* Phase instruction */}
          <div className="bg-black/50 backdrop-blur-sm px-6 py-2 rounded-full">
            <p className="text-white font-medium">
              {phase === "down" ? config.instruction : config.instructionAlt}
            </p>
          </div>

          {/* Progress dots */}
          <div className="flex gap-3">
            {Array.from({ length: config.required }).map((_, index) => (
              <div
                key={index}
                className={cn(
                  "w-4 h-4 rounded-full transition-all duration-300",
                  index < count
                    ? "bg-green-400 scale-125 shadow-lg shadow-green-400/50"
                    : "bg-white/30"
                )}
              />
            ))}
          </div>

          {/* Instructions */}
          <p className="text-white/50 text-xs text-center max-w-xs">
            Fais {config.required} répétitions face à la caméra pour débloquer l'app
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovementChallenge;
