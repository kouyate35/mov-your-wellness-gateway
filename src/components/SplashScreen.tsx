import { useEffect, useState } from "react";
import workoutLogo from "@/assets/workout-logo.png";

interface SplashScreenProps {
  onComplete: () => void;
}

/**
 * Sequence:
 *  0    – icon enters (black bg, white rounded card containing black rounded inner + logo)
 *  500  – hold
 *  1400 – background flashes to WHITE, "WORKOUT" letters spring in (black, heavy)
 *  2500 – exit fade
 */
const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [phase, setPhase] = useState<"enter" | "hold" | "reveal" | "exit">("enter");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("hold"), 500);
    const t2 = setTimeout(() => setPhase("reveal"), 1400);
    const t3 = setTimeout(() => setPhase("exit"), 2500);
    const t4 = setTimeout(() => onComplete(), 2900);
    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  }, [onComplete]);

  const isReveal = phase === "reveal" || phase === "exit";
  const letters = "WORKOUT".split("");

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
      style={{
        backgroundColor: isReveal ? "#ffffff" : "#000000",
        transition: "background-color 450ms cubic-bezier(0.65,0,0.35,1)",
        opacity: phase === "exit" ? 0 : 1,
        pointerEvents: phase === "exit" ? "none" : "auto",
      }}
    >
      {/* Icon card — visible during enter/hold, fades on reveal */}
      <div
        className="absolute"
        style={{
          opacity: isReveal ? 0 : 1,
          transform:
            phase === "enter"
              ? "scale(0.82)"
              : isReveal
              ? "scale(0.6)"
              : "scale(1)",
          transition:
            "transform 700ms cubic-bezier(0.22, 1, 0.36, 1), opacity 300ms ease-out",
        }}
      >
        {/* Outer white rounded card */}
        <div
          className="p-3 bg-white"
          style={{
            borderRadius: "38px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
          }}
        >
          {/* Inner black rounded panel */}
          <div
            className="flex items-center justify-center bg-black"
            style={{
              width: 148,
              height: 148,
              borderRadius: "28px",
            }}
          >
            <img
              src={workoutLogo}
              alt="Workout"
              className="w-20 h-20 object-contain"
              style={{ filter: "brightness(0) invert(1)" }}
            />
          </div>
        </div>
      </div>

      {/* WORKOUT reveal — heavy black type springing in */}
      <div
        className="absolute inset-0 flex items-center justify-center px-6"
        style={{
          opacity: isReveal ? 1 : 0,
          transition: "opacity 250ms ease-out",
        }}
      >
        <h1
          className="font-black leading-none select-none"
          style={{
            fontFamily: '"Archivo Black", "Anton", system-ui, sans-serif',
            fontSize: "clamp(48px, 15vw, 110px)",
            color: "#000",
            letterSpacing: "-0.02em",
            display: "flex",
          }}
        >
          {letters.map((l, i) => (
            <span
              key={i}
              style={{
                display: "inline-block",
                transform: isReveal ? "translateY(0) scale(1)" : "translateY(120%) scale(0.6)",
                opacity: isReveal ? 1 : 0,
                transition: `transform 620ms cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 55}ms, opacity 420ms ease-out ${i * 55}ms`,
              }}
            >
              {l}
            </span>
          ))}
        </h1>
      </div>
    </div>
  );
};

export default SplashScreen;
