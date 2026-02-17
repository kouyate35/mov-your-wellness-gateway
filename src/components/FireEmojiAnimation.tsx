import { useEffect, useState } from "react";

interface FireParticle {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
  rotation: number;
}

interface FireEmojiAnimationProps {
  isActive: boolean;
  onComplete?: () => void;
}

const FireEmojiAnimation = ({ isActive, onComplete }: FireEmojiAnimationProps) => {
  const [particles, setParticles] = useState<FireParticle[]>([]);

  useEffect(() => {
    if (!isActive) {
      setParticles([]);
      return;
    }

    // Generate 25 fire emojis
    const newParticles: FireParticle[] = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 800,
      duration: 1200 + Math.random() * 1000,
      size: 20 + Math.random() * 24,
      rotation: -30 + Math.random() * 60,
    }));

    setParticles(newParticles);

    const timer = setTimeout(() => {
      setParticles([]);
      onComplete?.();
    }, 2500);

    return () => clearTimeout(timer);
  }, [isActive, onComplete]);

  if (!isActive || particles.length === 0) return null;

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute animate-fire-fall"
          style={{
            left: `${p.x}%`,
            top: `-40px`,
            fontSize: `${p.size}px`,
            animationDelay: `${p.delay}ms`,
            animationDuration: `${p.duration}ms`,
            transform: `rotate(${p.rotation}deg)`,
          }}
        >
          🔥
        </span>
      ))}
    </div>
  );
};

export default FireEmojiAnimation;
