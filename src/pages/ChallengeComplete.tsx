import { useEffect, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Check } from "lucide-react";
import { apps } from "@/data/apps";

const ChallengeComplete = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const appId = params.get("app") || "instagram";
  const minutes = params.get("minutes") || "15";
  const appName = apps.find((app) => app.id === appId)?.name || appId.charAt(0).toUpperCase() + appId.slice(1);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const particles = useMemo(
    () =>
      Array.from({ length: 14 }).map((_, i) => ({
        left: (i * 31 + 12) % 100,
        top: (i * 47 + 9) % 100,
        delay: (i % 5) * 0.28,
        duration: 4.2 + (i % 4) * 0.55,
        size: 3 + (i % 3) * 1.5,
        opacity: 0.18 + (i % 4) * 0.08,
      })),
    []
  );

  return (
    <main className="fixed inset-0 isolate flex flex-col items-center justify-between overflow-hidden bg-background px-6 pb-8 pt-10 text-foreground">
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_50%_18%,hsl(var(--success-muted)/0.32)_0%,hsl(var(--background))_46%,hsl(0_0%_2%)_100%)]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-[54vh] bg-[linear-gradient(180deg,hsl(var(--success)/0.10),transparent_74%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_38%,transparent_0%,transparent_34%,hsl(0_0%_0%/0.38)_74%)]" />

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-success"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: p.size,
              height: p.size,
              opacity: p.opacity,
              animation: `cc-drift ${p.duration}s ease-in-out ${p.delay}s infinite alternate`,
              boxShadow: "0 0 20px hsl(var(--success) / 0.5)",
            }}
          />
        ))}
      </div>

      <div className="h-2" />

      <section className="relative z-10 flex w-full max-w-[340px] flex-1 flex-col items-center justify-center text-center">
        <div className="relative mb-7 flex h-44 w-44 items-center justify-center">
          <span className="absolute h-32 w-32 rounded-full border border-success/10" />
          <span className="absolute h-44 w-44 rounded-full border border-success/10" style={{ animation: "cc-breathe 3.4s ease-in-out infinite" }} />
          <span className="absolute h-56 w-56 rounded-full border border-success/5" style={{ animation: "cc-breathe 3.4s ease-in-out 0.7s infinite" }} />
          <div className="absolute h-32 w-32 rounded-full bg-success/25 blur-3xl" />
          <div className="relative flex h-[104px] w-[104px] items-center justify-center rounded-full bg-[linear-gradient(145deg,hsl(var(--success)),hsl(164_64%_48%))] shadow-[0_0_70px_hsl(var(--success)/0.34)]">
            <Check className="h-12 w-12 text-success-foreground" strokeWidth={3.4} />
          </div>
        </div>

        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-success/18 bg-success/8 px-5 py-2.5 shadow-[inset_0_1px_0_hsl(var(--foreground)/0.06)] backdrop-blur-xl">
          <span className="h-1.5 w-1.5 rounded-full bg-success shadow-[0_0_14px_hsl(var(--success)/0.8)]" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-success">Défi réussi</span>
        </div>

        <h1 className="text-[43px] font-semibold leading-[0.98] tracking-normal text-foreground">
          <span className="block">{appName}</span>
          <span className="block text-success">débloqué</span>
        </h1>

        <div className="mt-9 flex min-w-[184px] items-center justify-center gap-4 rounded-[1.35rem] border border-foreground/10 bg-foreground/[0.045] px-7 py-4 shadow-[inset_0_1px_0_hsl(var(--foreground)/0.07)] backdrop-blur-2xl">
          <span className="text-[38px] font-semibold leading-none tabular-nums text-foreground">
            {minutes}
          </span>
          <span className="text-left text-[12px] font-semibold uppercase leading-tight tracking-[0.22em] text-muted-foreground">
            min
            <br />
            d'accès
          </span>
        </div>

        <p className="mt-8 max-w-[300px] text-[15px] leading-relaxed text-muted-foreground">
          Profites-en, on se retrouve à la fin du timer.
        </p>
      </section>

      <button
        onClick={() => navigate("/home")}
        className="relative z-10 mb-[max(env(safe-area-inset-bottom),0px)] w-full max-w-[356px] rounded-full bg-primary px-6 py-[18px] text-[16px] font-semibold text-primary-foreground shadow-[0_18px_48px_hsl(0_0%_0%/0.35)] transition-transform active:scale-[0.985]"
      >
        Ouvrir {appName}
      </button>

      <style>{`
        @keyframes cc-breathe {
          0%, 100% { transform: scale(0.92); opacity: 0.32; }
          50% { transform: scale(1.04); opacity: 0.7; }
        }
        @keyframes cc-drift {
          0% { transform: translate3d(-8px, 10px, 0) scale(0.86); }
          100% { transform: translate3d(10px, -18px, 0) scale(1.12); }
        }
      `}</style>
    </main>
  );
};

export default ChallengeComplete;
