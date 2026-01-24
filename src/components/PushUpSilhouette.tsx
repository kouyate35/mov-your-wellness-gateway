import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export type PushUpPhase = "up" | "down" | "transitioning";

interface PushUpSilhouetteProps {
  phase: PushUpPhase;
  isDemo?: boolean;
  isValidated?: boolean;
  count?: number;
  totalRequired?: number;
}

const PushUpSilhouette = ({ 
  phase, 
  isDemo = false, 
  isValidated = false,
  count = 0,
  totalRequired = 4
}: PushUpSilhouetteProps) => {
  const [demoPhase, setDemoPhase] = useState<PushUpPhase>("up");

  // Animate demo sequence
  useEffect(() => {
    if (!isDemo) return;

    const sequence = ["up", "down", "up"] as PushUpPhase[];
    let currentIndex = 0;

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % sequence.length;
      setDemoPhase(sequence[currentIndex]);
    }, 800);

    return () => clearInterval(interval);
  }, [isDemo]);

  const currentPhase = isDemo ? demoPhase : phase;
  const isDown = currentPhase === "down";

  const getBodyClass = () => {
    if (isValidated) return "fill-green-400 drop-shadow-[0_0_20px_rgba(74,222,128,0.8)]";
    if (isDown) return "fill-white drop-shadow-[0_0_15px_rgba(255,255,255,0.6)]";
    return "fill-white/60";
  };

  return (
    <div className="relative w-72 h-56 flex items-center justify-center">
      {/* Pulsing rings behind silhouette */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={cn(
          "absolute w-40 h-40 rounded-full border opacity-20 transition-all duration-1000",
          isValidated ? "border-green-400" : "border-white",
          "animate-pulse-ring"
        )} />
        <div className={cn(
          "absolute w-56 h-56 rounded-full border opacity-10 transition-all duration-1000",
          isValidated ? "border-green-400" : "border-white",
          "animate-pulse-ring [animation-delay:0.5s]"
        )} />
      </div>

      {/* Count display */}
      {!isDemo && count > 0 && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
          <div className={cn(
            "text-4xl font-bold transition-all duration-300",
            isValidated ? "text-green-400" : "text-white"
          )}>
            {count}/{totalRequired}
          </div>
        </div>
      )}

      {/* Push-up silhouette SVG - side view */}
      <svg
        viewBox="0 0 300 150"
        className="w-full h-full relative z-10"
        style={{ filter: isValidated ? "drop-shadow(0 0 30px rgba(74,222,128,0.5))" : undefined }}
      >
        {/* Ground line */}
        <line
          x1="20"
          y1="135"
          x2="280"
          y2="135"
          className="stroke-white/20"
          strokeWidth="2"
          strokeDasharray="5,5"
        />

        {/* Position UP (planche haute) */}
        {!isDown && (
          <g className={cn("transition-all duration-500", getBodyClass())}>
            {/* Head */}
            <ellipse cx="60" cy="50" rx="18" ry="20" />
            
            {/* Torso (horizontal) */}
            <rect x="75" y="45" width="120" height="30" rx="10" />
            
            {/* Left arm (straight down) */}
            <rect x="80" y="70" width="12" height="55" rx="5" />
            <ellipse cx="86" cy="125" rx="8" ry="6" /> {/* Hand */}
            
            {/* Right arm (straight down) */}
            <rect x="170" y="70" width="12" height="55" rx="5" />
            <ellipse cx="176" cy="125" rx="8" ry="6" /> {/* Hand */}
            
            {/* Hips */}
            <ellipse cx="195" cy="60" rx="20" ry="18" />
            
            {/* Legs */}
            <rect x="200" y="55" width="80" height="16" rx="6" />
            
            {/* Feet */}
            <ellipse cx="275" cy="75" rx="8" ry="12" />
          </g>
        )}

        {/* Position DOWN (pompe basse) */}
        {isDown && (
          <g className={cn("transition-all duration-500", getBodyClass())}>
            {/* Head (lower position) */}
            <ellipse cx="55" cy="95" rx="18" ry="20" />
            
            {/* Torso (angled down) */}
            <path
              d="M70 100 Q90 95 190 80 Q200 78 210 82 L210 100 Q200 105 190 108 Q90 120 70 125 Z"
            />
            
            {/* Left arm (bent) */}
            <path d="M75 108 Q70 95 75 85 Q80 90 85 100 Q88 115 82 120 Z" />
            <ellipse cx="78" cy="125" rx="8" ry="5" /> {/* Hand */}
            
            {/* Right arm (bent) */}
            <path d="M175 95 Q170 82 175 72 Q180 77 185 87 Q188 102 182 107 Z" />
            <ellipse cx="178" cy="125" rx="8" ry="5" /> {/* Hand */}
            
            {/* Hips */}
            <ellipse cx="205" cy="85" rx="20" ry="18" />
            
            {/* Legs (slightly angled) */}
            <rect x="210" y="78" width="70" height="16" rx="6" transform="rotate(-5 210 86)" />
            
            {/* Feet */}
            <ellipse cx="275" cy="85" rx="8" ry="12" />
          </g>
        )}
      </svg>

      {/* Demo indicator */}
      {isDemo && (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-white/10 px-3 py-1 rounded-full">
          <span className="text-xs text-white/70">Démonstration</span>
        </div>
      )}

      {/* Glow effect when validated */}
      {isValidated && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-40 h-40 bg-green-400/20 rounded-full blur-3xl animate-pulse" />
        </div>
      )}
    </div>
  );
};

export default PushUpSilhouette;
