import { useEffect, useState, useCallback } from "react";

interface FireParticle {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
  rotation: number;
  drift: number;
  wobbleSpeed: number;
  wobbleAmount: number;
  startY: number;
}

interface FireEmojiAnimationProps {
  isActive: boolean;
  onComplete?: () => void;
}

const PARTICLE_COUNT = 45;
const ANIMATION_DURATION = 3000;

const FireEmojiAnimation = ({ isActive, onComplete }: FireEmojiAnimationProps) => {
  const [particles, setParticles] = useState<FireParticle[]>([]);

  const generateParticles = useCallback(() => {
    return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
      id: i,
      x: 5 + Math.random() * 90,
      delay: Math.random() * 600,
      duration: 1400 + Math.random() * 800,
      size: 18 + Math.random() * 28,
      rotation: -45 + Math.random() * 90,
      drift: -30 + Math.random() * 60,
      wobbleSpeed: 2 + Math.random() * 3,
      wobbleAmount: 5 + Math.random() * 15,
      startY: -10 - Math.random() * 60,
    }));
  }, []);

  useEffect(() => {
    if (!isActive) {
      setParticles([]);
      return;
    }

    setParticles(generateParticles());

    const timer = setTimeout(() => {
      setParticles([]);
      onComplete?.();
    }, ANIMATION_DURATION);

    return () => clearTimeout(timer);
  }, [isActive, onComplete, generateParticles]);

  if (!isActive || particles.length === 0) return null;

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden">
      <style>{`
        @keyframes fireDrop {
          0% {
            transform: translateY(0) translateX(0) rotate(var(--rot)) scale(0.3);
            opacity: 0;
          }
          8% {
            opacity: 1;
            transform: translateY(8vh) translateX(calc(var(--drift) * 0.1)) rotate(var(--rot)) scale(1.1);
          }
          15% {
            transform: translateY(15vh) translateX(calc(var(--drift) * 0.2)) rotate(calc(var(--rot) + 10deg)) scale(1);
          }
          50% {
            opacity: 1;
            transform: translateY(55vh) translateX(calc(var(--drift) * 0.6)) rotate(calc(var(--rot) + 20deg)) scale(0.95);
          }
          85% {
            opacity: 0.6;
            transform: translateY(90vh) translateX(calc(var(--drift) * 0.9)) rotate(calc(var(--rot) + 35deg)) scale(0.8);
          }
          100% {
            opacity: 0;
            transform: translateY(115vh) translateX(var(--drift)) rotate(calc(var(--rot) + 45deg)) scale(0.5);
          }
        }
      `}</style>
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute will-change-transform"
          style={{
            left: `${p.x}%`,
            top: `${p.startY}px`,
            fontSize: `${p.size}px`,
            animationName: "fireDrop",
            animationDelay: `${p.delay}ms`,
            animationDuration: `${p.duration}ms`,
            animationTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            animationFillMode: "forwards",
            "--rot": `${p.rotation}deg`,
            "--drift": `${p.drift}px`,
          } as React.CSSProperties}
        >
          🔥
        </span>
      ))}
    </div>
  );
};

export default FireEmojiAnimation;
