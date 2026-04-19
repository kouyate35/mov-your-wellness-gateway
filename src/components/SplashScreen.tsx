import { useEffect, useState } from "react";
import workoutLogo from "@/assets/workout-logo.png";

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [phase, setPhase] = useState<"enter" | "hold" | "exit">("enter");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("hold"), 500);
    const t2 = setTimeout(() => setPhase("exit"), 1300);
    const t3 = setTimeout(() => onComplete(), 1700);
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
      <img
        src={workoutLogo}
        alt="Workout"
        className="w-32 h-32 object-contain"
        style={{
          transform:
            phase === "enter"
              ? "scale(0.85)"
              : phase === "exit"
              ? "scale(1.08)"
              : "scale(1)",
          opacity: phase === "enter" ? 0 : phase === "exit" ? 0 : 1,
          transition:
            "transform 700ms cubic-bezier(0.22, 1, 0.36, 1), opacity 500ms ease-out",
        }}
      />
    </div>
  );
};

export default SplashScreen;
