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

// Keypoint style skeleton - joints as circles connected by lines
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

  const jointColor = isValidated ? "#4ade80" : "#ffffff";
  const lineColor = isValidated ? "#4ade80" : "#ffffff";
  const glowColor = isValidated ? "rgba(74,222,128,0.8)" : "rgba(255,255,255,0.6)";

  // Keypoints for UP position (plank)
  const upKeypoints = {
    head: { x: 50, y: 55 },
    neck: { x: 70, y: 55 },
    leftShoulder: { x: 85, y: 50 },
    rightShoulder: { x: 85, y: 60 },
    leftElbow: { x: 85, y: 85 },
    rightElbow: { x: 85, y: 85 },
    leftWrist: { x: 85, y: 115 },
    rightWrist: { x: 85, y: 115 },
    spine: { x: 140, y: 55 },
    hip: { x: 195, y: 55 },
    leftKnee: { x: 235, y: 60 },
    rightKnee: { x: 235, y: 60 },
    leftAnkle: { x: 275, y: 65 },
    rightAnkle: { x: 275, y: 65 },
  };

  // Keypoints for DOWN position (push-up low)
  const downKeypoints = {
    head: { x: 45, y: 100 },
    neck: { x: 65, y: 95 },
    leftShoulder: { x: 80, y: 90 },
    rightShoulder: { x: 80, y: 100 },
    leftElbow: { x: 65, y: 105 },
    rightElbow: { x: 65, y: 110 },
    leftWrist: { x: 80, y: 120 },
    rightWrist: { x: 80, y: 120 },
    spine: { x: 140, y: 82 },
    hip: { x: 200, y: 75 },
    leftKnee: { x: 240, y: 78 },
    rightKnee: { x: 240, y: 78 },
    leftAnkle: { x: 275, y: 82 },
    rightAnkle: { x: 275, y: 82 },
  };

  const kp = isDown ? downKeypoints : upKeypoints;

  // Define skeleton connections
  const connections = [
    // Head to neck
    ["head", "neck"],
    // Neck to shoulders (spine view)
    ["neck", "leftShoulder"],
    ["neck", "rightShoulder"],
    // Arms
    ["leftShoulder", "leftElbow"],
    ["leftElbow", "leftWrist"],
    ["rightShoulder", "rightElbow"],
    ["rightElbow", "rightWrist"],
    // Spine
    ["neck", "spine"],
    ["spine", "hip"],
    // Legs
    ["hip", "leftKnee"],
    ["leftKnee", "leftAnkle"],
    ["hip", "rightKnee"],
    ["rightKnee", "rightAnkle"],
  ];

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

      {/* Skeleton keypoint SVG - side view */}
      <svg
        viewBox="0 0 320 150"
        className="w-full h-full relative z-10"
        style={{ 
          filter: isValidated 
            ? "drop-shadow(0 0 30px rgba(74,222,128,0.5))" 
            : "drop-shadow(0 0 10px rgba(255,255,255,0.3))"
        }}
      >
        {/* Ground line */}
        <line
          x1="20"
          y1="130"
          x2="300"
          y2="130"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="2"
          strokeDasharray="5,5"
        />

        {/* Skeleton lines (connections between joints) */}
        <g className="transition-all duration-500 ease-out">
          {connections.map(([from, to], index) => {
            const fromPoint = kp[from as keyof typeof kp];
            const toPoint = kp[to as keyof typeof kp];
            return (
              <line
                key={index}
                x1={fromPoint.x}
                y1={fromPoint.y}
                x2={toPoint.x}
                y2={toPoint.y}
                stroke={lineColor}
                strokeWidth="3"
                strokeLinecap="round"
                opacity={isDown ? 1 : 0.8}
                style={{
                  filter: `drop-shadow(0 0 6px ${glowColor})`,
                  transition: "all 0.5s ease-out"
                }}
              />
            );
          })}
        </g>

        {/* Joint circles (keypoints) */}
        <g className="transition-all duration-500 ease-out">
          {Object.entries(kp).map(([name, point]) => (
            <circle
              key={name}
              cx={point.x}
              cy={point.y}
              r={name === "head" ? 12 : 6}
              fill={jointColor}
              opacity={isDown ? 1 : 0.9}
              style={{
                filter: `drop-shadow(0 0 8px ${glowColor})`,
                transition: "all 0.5s ease-out"
              }}
            />
          ))}
        </g>
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
