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

// Programs that require holding a static posture (no rep counting, no progress bar)
const staticPosturePrograms = new Set(["pause", "box-breathing", "coherence", "gainage"]);

// Posture hint per static program
const posturePrograms: Record<string, { title: string; hint: string }> = {
  "pause": { title: "Assise — lotus", hint: "Place-toi dans le repère, respire lentement." },
  "box-breathing": { title: "Assise droite", hint: "4s inspire · 4s tiens · 4s expire · 4s tiens." },
  "coherence": { title: "Debout détendu", hint: "5s inspire · 5s expire pendant 1 minute." },
  "gainage": { title: "Planche", hint: "Maintiens la position, gainage actif." },
};

const MovementChallenge = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const appId = searchParams.get("app") || "instagram";
  const programId = searchParams.get("program") || "pompes-10";
  const [isComplete, setIsComplete] = useState(false);
  const isStaticPosture = staticPosturePrograms.has(programId);
  const posture = posturePrograms[programId];

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

  // Handle completion (rep-based programs)
  useEffect(() => {
    if (!isStaticPosture && count >= config.required && !isComplete) {
      setIsComplete(true);
    }
  }, [count, isComplete, config.required, isStaticPosture]);

  // Static posture: auto-complete after a hold timer (visualised by progress ring elsewhere)
  const [holdSeconds, setHoldSeconds] = useState(0);
  const HOLD_TARGET = 20;
  useEffect(() => {
    if (!isStaticPosture || !isReady) return;
    const interval = setInterval(() => {
      setHoldSeconds((s) => {
        const next = s + 1;
        if (next >= HOLD_TARGET) setIsComplete(true);
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isStaticPosture, isReady]);

  // Auto-redirect to completion screen when complete
  useEffect(() => {
    if (isComplete) {
      const timer = setTimeout(() => {
        navigate(`/challenge-complete?app=${appId}&minutes=15`);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [isComplete, navigate, appId]);

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

      {/* Subtle top + bottom gradient for HUD legibility */}
      <div className="absolute top-0 left-0 right-0 h-44 bg-gradient-to-b from-black/70 via-black/30 to-transparent z-[5] pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-[5] pointer-events-none" />

      {/* HUD — Top */}
      <div className="absolute top-0 left-0 right-0 z-10 px-4 pt-[max(env(safe-area-inset-top),16px)] pb-3 pointer-events-none">
        <div className="flex justify-between items-start gap-3">
          {/* Left — App context */}
          <div className="flex flex-col gap-2 min-w-0">
            {/* Eyebrow */}
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55">
              Avant d'accéder à
            </p>
            <h2 className="text-white text-[22px] font-semibold tracking-tight leading-none truncate">
              {appId.charAt(0).toUpperCase() + appId.slice(1)}
            </h2>
            {/* Camera status pill */}
            <div
              className={cn(
                "mt-1 flex items-center gap-1.5 px-2.5 py-1 rounded-full backdrop-blur-md border w-fit",
                isReady
                  ? "bg-emerald-500/15 border-emerald-400/30 text-emerald-300"
                  : "bg-white/10 border-white/15 text-white/70"
              )}
            >
              <span className={cn("w-1.5 h-1.5 rounded-full", isReady ? "bg-emerald-400 animate-pulse" : "bg-white/60")} />
              <span className="text-[10.5px] font-medium tracking-wide">
                {isLoading ? "Initialisation" : isReady ? "Caméra active" : "En attente"}
              </span>
            </div>
          </div>

          {/* Right — Tutorial PiP */}
          <div className="relative shrink-0">
            <div className="w-[88px] h-[120px] rounded-2xl overflow-hidden border border-white/20 bg-black/60 backdrop-blur-sm shadow-[0_8px_24px_rgba(0,0,0,0.5)] relative">
              <video
                src={tutorialVideo}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
              {/* Bottom label inside the video frame */}
              <div className="absolute bottom-0 left-0 right-0 px-1.5 py-1 bg-gradient-to-t from-black/85 to-transparent">
                <p className="text-white text-[8.5px] font-semibold uppercase tracking-[0.18em] text-center">
                  Modèle
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* HUD — Bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-10 px-6 pb-[max(env(safe-area-inset-bottom),28px)] pointer-events-none">
        <div className="flex flex-col items-center gap-5">
          {/* Instruction */}
          <div className="px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/15">
            <p className="text-white text-[15px] font-semibold tracking-tight">
              {phase === "down" ? config.instruction : config.instructionAlt}
            </p>
          </div>

          {/* Progress segmented bar */}
          <div className="w-full max-w-[240px]">
            <div className="flex items-center gap-1.5">
              {Array.from({ length: config.required }).map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex-1 h-[3px] rounded-full transition-all duration-300",
                    index < count ? "bg-white" : "bg-white/20"
                  )}
                />
              ))}
            </div>
            <div className="flex items-baseline justify-between mt-2.5">
              <p className="text-white/55 text-[10.5px] font-medium uppercase tracking-[0.18em]">
                Progression
              </p>
              <p className="text-white text-[12px] font-semibold tabular-nums">
                {count}<span className="text-white/40"> / {config.required}</span>
              </p>
            </div>
          </div>

          {/* Hint */}
          <p className="text-white/45 text-[11px] text-center max-w-[260px] leading-relaxed">
            Place-toi face à la caméra et complète les répétitions pour débloquer l'app.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovementChallenge;
