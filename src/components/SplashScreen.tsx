import { useEffect, useState } from "react";
import workoutLogo from "@/assets/workout-logo.png";

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [phase, setPhase] = useState<"enter" | "hold" | "exit">("enter");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("hold"), 600);
    const t2 = setTimeout(() => setPhase("exit"), 1700);
    const t3 = setTimeout(() => onComplete(), 2150);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black overflow-hidden"
      style={{
        opacity: phase === "exit" ? 0 : 1,
        transition: "opacity 450ms ease-out",
        pointerEvents: phase === "exit" ? "none" : "auto",
      }}
    >
      {/* Subtle radial backlight */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 50%, rgba(255,255,255,0.045) 0%, rgba(0,0,0,0) 70%)",
          opacity: phase === "hold" ? 1 : 0,
          transition: "opacity 700ms ease-out",
        }}
      />

      {/* Logo with halo + breathing */}
      <div
        className="relative"
        style={{
          transform:
            phase === "enter"
              ? "scale(0.94)"
              : phase === "exit"
              ? "scale(1.04)"
              : "scale(1)",
          opacity: phase === "enter" ? 0 : phase === "exit" ? 0 : 1,
          transition:
            "transform 900ms cubic-bezier(0.22, 1, 0.36, 1), opacity 600ms ease-out",
        }}
      >
        {/* Soft pulsing halo */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
          style={{
            width: 260,
            height: 260,
            background:
              "radial-gradient(circle at center, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0) 65%)",
            animation: phase === "hold" ? "splash-pulse 2.6s ease-in-out infinite" : undefined,
          }}
        />

        <img
          src={workoutLogo}
          alt="Workout"
          className="relative w-36 h-36 object-contain"
          style={{
            mixBlendMode: "screen",
            filter:
              "drop-shadow(0 0 24px rgba(255,255,255,0.18)) drop-shadow(0 0 60px rgba(255,255,255,0.08))",
          }}
        />

        {/* Animated bottom hairline (loading hint) */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[72px] h-px overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 w-full"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.55) 50%, transparent 100%)",
              animation: "splash-shimmer 1.6s ease-in-out infinite",
            }}
          />
        </div>
      </div>


      <style>{`
        @keyframes splash-pulse {
          0%, 100% { opacity: 0.35; transform: scale(1.7); }
          50% { opacity: 0.7; transform: scale(2); }
        }
        @keyframes splash-shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
