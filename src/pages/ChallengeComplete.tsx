import { useEffect, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Check } from "lucide-react";

const ChallengeComplete = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const appId = params.get("app") || "instagram";
  const minutes = params.get("minutes") || "15";
  const appName = appId.charAt(0).toUpperCase() + appId.slice(1);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // Confetti-like floating dots (deterministic per render)
  const particles = useMemo(
    () =>
      Array.from({ length: 18 }).map((_, i) => ({
        left: Math.random() * 100,
        delay: Math.random() * 1.2,
        duration: 2.4 + Math.random() * 1.8,
        size: 3 + Math.random() * 4,
        opacity: 0.35 + Math.random() * 0.45,
      })),
    []
  );

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-between px-6 py-10 overflow-hidden"
      style={{
        background:
          "radial-gradient(130% 80% at 50% 25%, hsl(150, 45%, 14%) 0%, hsl(0, 0%, 6%) 55%, hsl(0, 0%, 3%) 100%)",
      }}
    >
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-emerald-300"
            style={{
              left: `${p.left}%`,
              bottom: "-10%",
              width: p.size,
              height: p.size,
              opacity: p.opacity,
              animation: `cc-float ${p.duration}s ease-out ${p.delay}s infinite`,
              filter: "blur(0.3px)",
            }}
          />
        ))}
      </div>

      <div />

      {/* Center */}
      <div className="flex flex-col items-center text-center relative z-10">
        {/* Success badge */}
        <div className="relative mb-9">
          {/* outer expanding ring */}
          <span
            className="absolute inset-0 rounded-full border border-emerald-300/40"
            style={{ animation: "cc-ring 2.6s ease-out infinite" }}
          />
          <span
            className="absolute inset-0 rounded-full border border-emerald-300/30"
            style={{ animation: "cc-ring 2.6s ease-out 0.9s infinite" }}
          />
          {/* glow */}
          <div
            className="absolute -inset-6 rounded-full blur-2xl opacity-50"
            style={{ background: "hsl(150, 60%, 45%)" }}
          />
          {/* Badge */}
          <div
            className="relative w-24 h-24 rounded-full flex items-center justify-center shadow-[0_20px_60px_-15px_rgba(16,185,129,0.5)]"
            style={{
              background:
                "linear-gradient(135deg, hsl(150, 60%, 65%) 0%, hsl(160, 55%, 45%) 100%)",
            }}
          >
            <Check className="w-11 h-11 text-black" strokeWidth={3} />
          </div>
        </div>

        {/* Eyebrow */}
        <div className="mb-4">
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-emerald-300/80">
            Défi réussi
          </span>
        </div>

        {/* Title */}
        <h1 className="text-white text-[34px] font-semibold tracking-tight leading-[1.1]">
          {appName}
        </h1>
        <h1 className="text-[34px] font-semibold tracking-tight leading-[1.1] bg-gradient-to-r from-emerald-300 to-emerald-100 bg-clip-text text-transparent">
          débloqué
        </h1>

        {/* Reward chip */}
        <div className="mt-7 flex items-baseline gap-2 px-5 py-3 rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-md">
          <span className="text-white text-[28px] font-semibold tabular-nums leading-none">
            {minutes}
          </span>
          <span className="text-white/60 text-[12px] font-medium uppercase tracking-[0.16em]">
            min d'accès
          </span>
        </div>

        <p className="text-white/45 text-[12.5px] mt-5 max-w-[260px] leading-relaxed">
          Profites-en, on se retrouve à la fin du timer.
        </p>
      </div>

      {/* Bottom button */}
      <button
        onClick={() => navigate("/home")}
        className="relative z-10 w-full max-w-sm py-4 rounded-full bg-white text-black text-[15px] font-semibold active:scale-[0.98] transition-transform shadow-2xl"
      >
        Ouvrir {appName}
      </button>

      <style>{`
        @keyframes cc-ring {
          0% { transform: scale(1); opacity: 0.7; }
          100% { transform: scale(1.9); opacity: 0; }
        }
        @keyframes cc-float {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          15% { opacity: 1; }
          100% { transform: translateY(-110vh) translateX(20px); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default ChallengeComplete;
