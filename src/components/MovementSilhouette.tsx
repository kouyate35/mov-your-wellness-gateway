import { cn } from "@/lib/utils";

interface MovementSilhouetteProps {
  activeZone?: "left-arm" | "right-arm" | "left-leg" | "right-leg" | "torso" | null;
  isValidated?: boolean;
}

const MovementSilhouette = ({ activeZone, isValidated }: MovementSilhouetteProps) => {
  const getZoneClass = (zone: string) => {
    if (isValidated) return "fill-green-400 drop-shadow-[0_0_20px_rgba(74,222,128,0.8)]";
    if (activeZone === zone) return "fill-white drop-shadow-[0_0_15px_rgba(255,255,255,0.6)]";
    return "fill-white/30";
  };

  return (
    <div className="relative w-64 h-80 flex items-center justify-center">
      {/* Pulsing rings behind silhouette */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={cn(
          "absolute w-48 h-48 rounded-full border opacity-20 transition-all duration-1000",
          isValidated ? "border-green-400" : "border-white",
          "animate-pulse-ring"
        )} />
        <div className={cn(
          "absolute w-64 h-64 rounded-full border opacity-10 transition-all duration-1000",
          isValidated ? "border-green-400" : "border-white",
          "animate-pulse-ring [animation-delay:0.5s]"
        )} />
      </div>

      {/* Abstract human silhouette SVG */}
      <svg
        viewBox="0 0 200 300"
        className="w-full h-full relative z-10"
        style={{ filter: isValidated ? "drop-shadow(0 0 30px rgba(74,222,128,0.5))" : undefined }}
      >
        {/* Head */}
        <ellipse
          cx="100"
          cy="35"
          rx="28"
          ry="32"
          className={cn(
            "transition-all duration-500",
            getZoneClass("head")
          )}
        />

        {/* Neck */}
        <rect
          x="90"
          y="65"
          width="20"
          height="15"
          rx="5"
          className={cn(
            "transition-all duration-500",
            getZoneClass("torso")
          )}
        />

        {/* Torso */}
        <path
          d="M60 80 Q50 85 45 140 Q45 170 70 175 L130 175 Q155 170 155 140 Q150 85 140 80 Q120 75 100 75 Q80 75 60 80"
          className={cn(
            "transition-all duration-500",
            getZoneClass("torso")
          )}
        />

        {/* Left Arm */}
        <path
          d="M45 90 Q20 100 15 140 Q12 160 20 175 Q25 180 30 178 Q40 170 42 150 Q45 120 50 100"
          className={cn(
            "transition-all duration-500",
            getZoneClass("left-arm")
          )}
        />

        {/* Right Arm */}
        <path
          d="M155 90 Q180 100 185 140 Q188 160 180 175 Q175 180 170 178 Q160 170 158 150 Q155 120 150 100"
          className={cn(
            "transition-all duration-500",
            getZoneClass("right-arm")
          )}
        />

        {/* Left Leg */}
        <path
          d="M70 175 Q65 180 60 220 Q55 260 58 290 Q60 298 70 298 Q80 298 82 290 Q85 260 88 220 Q90 190 85 175"
          className={cn(
            "transition-all duration-500",
            getZoneClass("left-leg")
          )}
        />

        {/* Right Leg */}
        <path
          d="M130 175 Q135 180 140 220 Q145 260 142 290 Q140 298 130 298 Q120 298 118 290 Q115 260 112 220 Q110 190 115 175"
          className={cn(
            "transition-all duration-500",
            getZoneClass("right-leg")
          )}
        />
      </svg>

      {/* Glow effect when validated */}
      {isValidated && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-40 h-40 bg-green-400/20 rounded-full blur-3xl animate-pulse" />
        </div>
      )}
    </div>
  );
};

export default MovementSilhouette;
