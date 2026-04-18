import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Lock } from "lucide-react";

const GREEN = "hsl(150, 55%, 60%)";

const ChallengeComplete = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const appId = params.get("app") || "instagram";
  const minutes = params.get("minutes") || "15";

  // Pretty app name
  const appName = appId.charAt(0).toUpperCase() + appId.slice(1);

  // Auto-haptic / scroll lock
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-between px-6 py-10"
      style={{
        background: "radial-gradient(120% 80% at 50% 30%, hsl(155, 35%, 12%) 0%, hsl(0, 0%, 7%) 60%, hsl(0, 0%, 4%) 100%)",
      }}
    >
      {/* Spacer */}
      <div />

      {/* Center content */}
      <div className="flex flex-col items-center text-center animate-fade-in">
        {/* Lock icon */}
        <div className="relative mb-8">
          <div
            className="absolute inset-0 rounded-full blur-2xl opacity-40 animate-pulse"
            style={{ background: GREEN }}
          />
          <div className="relative w-20 h-20 rounded-full bg-foreground flex items-center justify-center shadow-2xl">
            <Lock className="w-8 h-8 text-background" strokeWidth={2.5} />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-foreground text-[30px] font-bold tracking-tight leading-tight">
          {appName}
        </h1>
        <h1
          className="text-[30px] font-bold tracking-tight leading-tight"
          style={{ color: GREEN }}
        >
          débloqué !
        </h1>

        {/* Subtext */}
        <p className="text-muted-foreground text-[15px] mt-5 leading-relaxed max-w-[280px]">
          Bravo, défi terminé.<br />
          Vous avez gagné <span className="text-foreground font-semibold">{minutes} minutes</span> d'accès.
        </p>
      </div>

      {/* Bottom button */}
      <button
        onClick={() => navigate("/home")}
        className="w-full max-w-sm py-4 rounded-full bg-foreground text-background text-[15px] font-semibold active:scale-[0.98] transition-transform shadow-xl"
      >
        Retour
      </button>
    </div>
  );
};

export default ChallengeComplete;
