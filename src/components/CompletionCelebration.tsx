import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
  duration: number;
  angle: number;
  distance: number;
}

const COLORS = [
  "#FFD700", "#FFA500", "#FF6B35", "#FFFFFF",
  "#E8D5B7", "#C9A96E", "#F5E6CC", "#FFE4B5",
];

const generateParticles = (count: number): Particle[] =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    x: 50 + (Math.random() - 0.5) * 10,
    y: 50 + (Math.random() - 0.5) * 10,
    size: Math.random() * 8 + 3,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    delay: Math.random() * 0.6,
    duration: 1.2 + Math.random() * 1,
    angle: (360 / count) * i + (Math.random() - 0.5) * 30,
    distance: 120 + Math.random() * 180,
  }));

interface CompletionCelebrationProps {
  onClose?: () => void;
  programName?: string;
  duration?: string;
}

const CompletionCelebration = ({ onClose, programName = "Pause", duration = "7 min" }: CompletionCelebrationProps) => {
  const [phase, setPhase] = useState<"burst" | "content" | "idle">("burst");
  const [particles] = useState(() => generateParticles(60));
  const [ringParticles] = useState(() => generateParticles(24));

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("content"), 800);
    return () => clearTimeout(t1);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(145deg, #0a0a0a 0%, #1a1a1a 50%, #0d0d0d 100%)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      onClick={onClose}
    >
      {/* Radial glow behind everything */}
      <motion.div
        className="absolute"
        style={{
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,215,0,0.12) 0%, rgba(255,165,0,0.05) 40%, transparent 70%)",
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.5, 1.2], opacity: [0, 0.8, 0.5] }}
        transition={{ duration: 1.8, ease: "easeOut" }}
      />

      {/* Burst particles */}
      {particles.map((p) => {
        const rad = (p.angle * Math.PI) / 180;
        const tx = Math.cos(rad) * p.distance;
        const ty = Math.sin(rad) * p.distance;
        return (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              left: "50%",
              top: "50%",
              marginLeft: -p.size / 2,
              marginTop: -p.size / 2,
              boxShadow: `0 0 ${p.size * 2}px ${p.color}66`,
            }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{
              x: tx,
              y: ty,
              opacity: [1, 1, 0],
              scale: [1, 1.2, 0.3],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              ease: "easeOut",
            }}
          />
        );
      })}

      {/* Expanding golden ring */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 100,
          height: 100,
          border: "2px solid rgba(255, 215, 0, 0.6)",
          left: "50%",
          top: "50%",
          marginLeft: -50,
          marginTop: -50,
        }}
        initial={{ scale: 0, opacity: 1 }}
        animate={{ scale: [0, 4, 6], opacity: [1, 0.5, 0] }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
      />
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 80,
          height: 80,
          border: "1px solid rgba(255, 215, 0, 0.3)",
          left: "50%",
          top: "50%",
          marginLeft: -40,
          marginTop: -40,
        }}
        initial={{ scale: 0, opacity: 1 }}
        animate={{ scale: [0, 5, 7], opacity: [1, 0.3, 0] }}
        transition={{ duration: 1.8, ease: "easeOut", delay: 0.4 }}
      />

      {/* Central checkmark circle */}
      <motion.div
        className="relative z-10 flex items-center justify-center"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.3 }}
      >
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FF8C00 100%)",
            boxShadow: "0 0 40px rgba(255, 215, 0, 0.4), 0 0 80px rgba(255, 165, 0, 0.2)",
          }}
        >
          <motion.svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
          >
            <motion.path
              d="M12 25L20 33L36 15"
              stroke="#0a0a0a"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
            />
          </motion.svg>
        </div>
      </motion.div>

      {/* Text content */}
      <AnimatePresence>
        {phase === "content" && (
          <motion.div
            className="relative z-10 flex flex-col items-center mt-8 px-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <motion.h1
              className="text-3xl font-bold tracking-tight text-center"
              style={{ color: "#FFD700" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
            >
              Félicitations !
            </motion.h1>

            <motion.p
              className="text-white/70 text-base text-center mt-3 max-w-xs leading-relaxed"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
            >
              Tu as complété <span className="text-white font-semibold">{duration}</span> de pause.
              <br />
              Ton corps et ton esprit te remercient.
            </motion.p>

            {/* Stats row */}
            <motion.div
              className="flex gap-8 mt-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.55, duration: 0.5 }}
            >
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-white">{duration}</span>
                <span className="text-xs text-white/40 mt-1 uppercase tracking-wider">Durée</span>
              </div>
              <div className="w-px bg-white/10" />
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-white">🔥</span>
                <span className="text-xs text-white/40 mt-1 uppercase tracking-wider">Streak</span>
              </div>
              <div className="w-px bg-white/10" />
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold" style={{ color: "#FFD700" }}>+10</span>
                <span className="text-xs text-white/40 mt-1 uppercase tracking-wider">Points</span>
              </div>
            </motion.div>

            {/* CTA button */}
            <motion.button
              className="mt-10 px-8 py-3.5 rounded-full text-sm font-semibold tracking-wide"
              style={{
                background: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",
                color: "#0a0a0a",
                boxShadow: "0 4px 20px rgba(255, 215, 0, 0.3)",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.5 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                onClose?.();
              }}
            >
              Continuer
            </motion.button>

            {/* Subtle program name */}
            <motion.p
              className="text-white/20 text-xs mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              {programName}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating ambient particles (continuous) */}
      {ringParticles.map((p) => (
        <motion.div
          key={`ambient-${p.id}`}
          className="absolute rounded-full"
          style={{
            width: p.size * 0.5,
            height: p.size * 0.5,
            backgroundColor: p.color,
            opacity: 0.3,
            left: `${p.x}%`,
            top: `${p.y}%`,
          }}
          animate={{
            y: [0, -30, 0, 20, 0],
            x: [0, 15, -10, 5, 0],
            opacity: [0.1, 0.4, 0.2, 0.35, 0.1],
          }}
          transition={{
            duration: 4 + p.delay * 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay * 2,
          }}
        />
      ))}
    </motion.div>
  );
};

export default CompletionCelebration;
