import { useEffect, useState } from "react";

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [phase, setPhase] = useState<"enter" | "hold" | "exit">("enter");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("hold"), 600);
    const t2 = setTimeout(() => setPhase("exit"), 1400);
    const t3 = setTimeout(() => onComplete(), 1800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
      style={{
        opacity: phase === "exit" ? 0 : 1,
        transition: "opacity 400ms ease-out",
        pointerEvents: phase === "exit" ? "none" : "auto",
      }}
    >
      {/* Subtle radial glow — TikTok style */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, hsl(30 100% 50% / 0.15) 0%, transparent 60%)",
          opacity: phase === "hold" ? 1 : 0,
          transition: "opacity 600ms ease-out",
        }}
      />

      {/* Logo */}
      <div
        className="relative flex items-center justify-center"
        style={{
          transform:
            phase === "enter"
              ? "scale(0.7)"
              : phase === "exit"
              ? "scale(1.15)"
              : "scale(1)",
          opacity: phase === "exit" ? 0 : 1,
          transition:
            "transform 600ms cubic-bezier(0.22, 1, 0.36, 1), opacity 400ms ease-out",
        }}
      >
        <div className="relative w-28 h-28 rounded-[28px] bg-gradient-to-br from-[hsl(30_100%_55%)] to-[hsl(30_100%_45%)] flex items-center justify-center shadow-2xl">
          <span className="text-white text-5xl font-bold tracking-tight" style={{ fontFamily: "'SF Pro Display', system-ui, sans-serif" }}>
            W
          </span>
          {/* Glossy highlight */}
          <div
            className="absolute inset-0 rounded-[28px] pointer-events-none"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 50%)",
            }}
          />
        </div>
      </div>

      {/* Wordmark */}
      <div
        className="absolute bottom-24 left-0 right-0 text-center"
        style={{
          opacity: phase === "hold" ? 1 : 0,
          transform: phase === "hold" ? "translateY(0)" : "translateY(8px)",
          transition: "opacity 500ms ease-out 200ms, transform 500ms ease-out 200ms",
        }}
      >
        <p className="text-white/90 text-sm font-medium tracking-[0.3em] uppercase">
          Workout
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;
