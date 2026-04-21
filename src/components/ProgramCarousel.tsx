import { Category } from "@/data/categories";
import { useRef, useState } from "react";
import { Check, Play, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import BouncingLoader from "./BouncingLoader";
import BalanceLoader from "./BalanceLoader";
import VortexLoader from "./VortexLoader";
import OrbitalLoader from "./OrbitalLoader";
import StepBounceLoader from "./StepBounceLoader";
import HamsterLoader from "./HamsterLoader";
import BlackHoleLoader from "./BlackHoleLoader";
import RocketManLoader from "./RocketManLoader";
import RippleLoader from "./RippleLoader";
import PauseCountdown from "./PauseCountdown";
import CompletionCelebration from "./CompletionCelebration";

const parseDurationToSeconds = (duration: string): number => {
  const minMatch = duration.match(/(\d+)\s*min/);
  const secMatch = duration.match(/(\d+)\s*sec/);
  let total = 0;
  if (minMatch) total += parseInt(minMatch[1]) * 60;
  if (secMatch) total += parseInt(secMatch[1]);
  return total || 300;
};

// Import exercise videos - Move
import exerciseSquats from "@/assets/exercise-squats.mp4";
import exercisePushups from "@/assets/exercise-pushups.mp4";
import exercisePlank from "@/assets/exercise-plank.mp4";

// Import exercise videos - Flex (new category)
import exerciseLateralStretch from "@/assets/exercise-lateral-stretch.mp4";
import exerciseForwardFold from "@/assets/exercise-forward-fold.mp4";
import exerciseYogaArms from "@/assets/exercise-yoga-arms.mp4";

// Import exercise videos - Breath
import exerciseBoxBreathing from "@/assets/exercise-box-breathing.mp4";
import exerciseCoherence from "@/assets/exercise-coherence.mp4";
import exercisePause from "@/assets/exercise-pause.mp4";

interface ProgramCarouselProps {
  category: Category;
  selectedProgramId: string | null;
  onSelectProgram: (programId: string) => void;
}

// Map program IDs to their video assets
const programVideos: Record<string, string> = {
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

// Fallback gradients for Focus and Pause categories (no videos)
const programGradients = [
  "from-purple-400 via-violet-500 to-indigo-600",
  "from-indigo-400 via-purple-500 to-pink-500",
  "from-violet-400 via-fuchsia-500 to-purple-600",
];

const pauseGradients = [
  "from-slate-700 via-gray-800 to-slate-900",
  "from-gray-700 via-slate-800 to-gray-900",
  "from-zinc-700 via-neutral-800 to-zinc-900",
];

const ProgramCarousel = ({ category, selectedProgramId, onSelectProgram }: ProgramCarouselProps) => {
  const [fullscreenLoader, setFullscreenLoader] = useState<string | null>(null);
  const [fullscreenVideo, setFullscreenVideo] = useState<{ src: string; name: string; duration: string } | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [completedProgram, setCompletedProgram] = useState<{ name: string; duration: string } | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  // Check if category has videos (move, flex and breath)
  const hasVideos = category.id === "move" || category.id === "flex" || category.id === "breath";
  const isPause = category.id === "pause";

  // Get programs for the carousel (4 for pause, 3 for others)
  const displayPrograms = category.programs.slice(0, isPause ? 9 : 3);

  const handleStartProgram = () => {
    if (selectedProgramId) {
      navigate(`/challenge?program=${selectedProgramId}`);
    }
  };

  return (
    <>
    {/* Fullscreen bouncing loader overlay */}
    {fullscreenLoader && (
      <div 
        className="fixed inset-0 z-50 bg-[#1a1a1a] flex items-center justify-center cursor-pointer"
        onClick={() => setFullscreenLoader(null)}
      >
        {(() => {
          const program = category.programs.find(p => p.id === fullscreenLoader);
          const duration = program ? parseDurationToSeconds(program.duration) : 300;
          return (
            <PauseCountdown 
              durationSeconds={duration} 
              onComplete={() => {
                setCompletedProgram({
                  name: program?.name || "Pause",
                  duration: program?.duration || "5 min",
                });
                setFullscreenLoader(null);
                setShowCelebration(true);
              }} 
            />
          );
        })()}
        {fullscreenLoader === "bouncing-loader" && <BouncingLoader />}
        {fullscreenLoader === "breath-pause" && <BalanceLoader />}
        {fullscreenLoader === "screen-fade" && <VortexLoader />}
        {fullscreenLoader === "orbital-spin" && <OrbitalLoader />}
        {fullscreenLoader === "step-bounce" && <StepBounceLoader />}
        {fullscreenLoader === "hamster-wheel" && <HamsterLoader />}
        {fullscreenLoader === "black-hole" && <BlackHoleLoader />}
        {fullscreenLoader === "rocket-man" && <RocketManLoader />}
        {fullscreenLoader === "ripple-wave" && <RippleLoader />}
      </div>
    )}
    {/* Celebration overlay */}
    <AnimatePresence>
      {showCelebration && completedProgram && (
        <CompletionCelebration
          programName={completedProgram.name}
          duration={completedProgram.duration}
          onClose={() => {
            setShowCelebration(false);
            setCompletedProgram(null);
          }}
        />
      )}
    </AnimatePresence>
    {/* Long-press preview — floating bubble, video only, no HUD */}
    {fullscreenVideo && (
      <div
        className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-md flex items-center justify-center animate-fade-in p-6"
        onClick={() => setFullscreenVideo(null)}
        onContextMenu={(e) => e.preventDefault()}
      >
        <div
          className="relative w-[85%] max-w-sm rounded-[2rem] overflow-hidden shadow-2xl bg-black"
          style={{ aspectRatio: "3/4" }}
          onClick={(e) => e.stopPropagation()}
        >
          <video
            src={fullscreenVideo.src}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>
    )}
    <div className={fullscreenLoader || showCelebration || fullscreenVideo ? "hidden" : "w-full"}>
      {/* Title with Play button */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-normal text-foreground">
            Choisissez votre programme
          </h3>
          
          {/* Play button - only visible when a program is selected */}
          {selectedProgramId && (
            <button
              onClick={handleStartProgram}
              className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-full font-medium text-sm hover:bg-white/90 transition-all animate-fade-in"
            >
              <Play className="w-4 h-4 fill-current" />
              Commencer
            </button>
          )}
        </div>
        <div className="h-px bg-border" />
      </div>
      
      {/* Horizontal scroll container */}
      <div 
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2 -mx-4 px-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {displayPrograms.map((program, index) => {
          const videoSrc = programVideos[program.id];
          const hasVideo = hasVideos && videoSrc;
          const isBouncingProgram = isPause && program.id === "bouncing-loader";
          const isBalanceProgram = isPause && program.id === "breath-pause";
          const isVortexProgram = isPause && program.id === "screen-fade";
          const isOrbitalProgram = isPause && program.id === "orbital-spin";
          const isStepBounceProgram = isPause && program.id === "step-bounce";
          const isHamsterProgram = isPause && program.id === "hamster-wheel";
          const isBlackHoleProgram = isPause && program.id === "black-hole";
          const isRocketManProgram = isPause && program.id === "rocket-man";
          const isRippleProgram = isPause && program.id === "ripple-wave";
          
          // Long-press handler refs
          const pressTimer = { current: null as ReturnType<typeof setTimeout> | null };
          const longPressed = { current: false };

          const triggerSelectOrLoader = () => {
            onSelectProgram(program.id);
            if (isBouncingProgram) setFullscreenLoader("bouncing-loader");
            else if (isBalanceProgram) setFullscreenLoader("breath-pause");
            else if (isVortexProgram) setFullscreenLoader("screen-fade");
            else if (isOrbitalProgram) setFullscreenLoader("orbital-spin");
            else if (isStepBounceProgram) setFullscreenLoader("step-bounce");
            else if (isHamsterProgram) setFullscreenLoader("hamster-wheel");
            else if (isBlackHoleProgram) setFullscreenLoader("black-hole");
            else if (isRocketManProgram) setFullscreenLoader("rocket-man");
            else if (isRippleProgram) setFullscreenLoader("ripple-wave");
          };

          const startPress = () => {
            longPressed.current = false;
            if (!hasVideo) return;
            pressTimer.current = setTimeout(() => {
              longPressed.current = true;
              setFullscreenVideo({ src: videoSrc!, name: program.name, duration: program.duration });
            }, 500);
          };
          const cancelPress = () => {
            if (pressTimer.current) clearTimeout(pressTimer.current);
            pressTimer.current = null;
          };

          return (
            <button
              key={program.id}
              onClick={() => {
                if (longPressed.current) return;
                triggerSelectOrLoader();
              }}
              onPointerDown={startPress}
              onPointerUp={cancelPress}
              onPointerLeave={cancelPress}
              onPointerCancel={cancelPress}
              onContextMenu={(e) => e.preventDefault()}
              className={`
                relative flex-shrink-0 w-[70%] snap-start rounded-3xl overflow-hidden
                transition-all duration-300
                ${selectedProgramId === program.id ? 'ring-2 ring-white ring-offset-2 ring-offset-background' : ''}
              `}
              style={{ aspectRatio: '3/4' }}
            >
              {/* Video background or gradient fallback */}
              {hasVideo ? (
                <video
                  src={videoSrc}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : isBouncingProgram ? (
                <div className="absolute inset-0 bg-[#1a1a1a] flex items-center justify-center">
                  <BouncingLoader />
                </div>
              ) : isBalanceProgram ? (
                <div className="absolute inset-0 bg-[#1a1a1a] flex items-center justify-center">
                  <BalanceLoader />
                </div>
              ) : isVortexProgram ? (
                <div className="absolute inset-0 bg-[#1a1a1a] flex items-center justify-center">
                  <VortexLoader />
                </div>
              ) : isOrbitalProgram ? (
                <div className="absolute inset-0 bg-[#1a1a1a] flex items-center justify-center">
                  <OrbitalLoader />
                </div>
              ) : isStepBounceProgram ? (
                <div className="absolute inset-0 bg-[#1a1a1a] flex items-center justify-center">
                  <StepBounceLoader />
                </div>
              ) : isHamsterProgram ? (
                <div className="absolute inset-0 bg-[#1a1a1a] flex items-center justify-center">
                  <HamsterLoader />
                </div>
              ) : isBlackHoleProgram ? (
                <div className="absolute inset-0 bg-[#1a1a1a] flex items-center justify-center">
                  <BlackHoleLoader />
                </div>
              ) : isRocketManProgram ? (
                <div className="absolute inset-0 bg-[#1a1a1a] flex items-center justify-center">
                  <RocketManLoader />
                </div>
              ) : isRippleProgram ? (
                <div className="absolute inset-0 bg-[#1a1a1a] flex items-center justify-center overflow-hidden">
                  <RippleLoader />
                </div>
              ) : isPause ? (
                <div className={`absolute inset-0 bg-gradient-to-b ${pauseGradients[index % pauseGradients.length]}`} />
              ) : (
                <div className={`absolute inset-0 bg-gradient-to-b ${programGradients[index % programGradients.length]}`} />
              )}
              
              {/* Dark overlay for better text readability on videos */}
              {hasVideo && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />
              )}
              
              {/* Content overlay */}
              <div className="relative h-full flex flex-col p-5">
                {/* Glassmorphism badge - top left - exercise name */}
                <div>
                  <span className="inline-block px-4 py-2 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 text-white text-sm font-semibold shadow-lg">
                    {program.name}
                  </span>
                </div>
                
                {/* Selection indicator - top right - clean white circle with check */}
                <div className="absolute top-4 right-4">
                  <div className={`
                    w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all
                    ${selectedProgramId === program.id 
                      ? 'bg-white border-white' 
                      : 'bg-white/20 backdrop-blur-sm border-white/40'
                    }
                  `}>
                    {selectedProgramId === program.id && (
                      <Check className="w-4 h-4 text-gray-800" strokeWidth={3} />
                    )}
                  </div>
                </div>
                
                {/* Duration badge - bottom left */}
                <div className="mt-auto">
                  <span className="inline-block px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-sm text-white/90 text-xs font-medium">
                    {program.duration}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
    </>
  );
};

export default ProgramCarousel;
