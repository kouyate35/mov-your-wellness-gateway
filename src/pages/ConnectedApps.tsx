import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Lock, ChevronRight } from "lucide-react";
import { apps } from "@/data/apps";
import { useAppSettings } from "@/hooks/useAppSettings";
import { getAppIcon } from "@/components/AppIcons";
import { categories } from "@/data/categories";
import BottomNavBar from "@/components/BottomNavBar";
import DisconnectAppModal from "@/components/DisconnectAppModal";

// Import exercise videos for miniatures
import exerciseSquats from "@/assets/exercise-squats.mp4";
import exercisePushups from "@/assets/exercise-pushups.mp4";
import exercisePlank from "@/assets/exercise-plank.mp4";
import exerciseLateralStretch from "@/assets/exercise-lateral-stretch.mp4";
import exerciseForwardFold from "@/assets/exercise-forward-fold.mp4";
import exerciseYogaArms from "@/assets/exercise-yoga-arms.mp4";
import exerciseBoxBreathing from "@/assets/exercise-box-breathing.mp4";
import exerciseCoherence from "@/assets/exercise-coherence.mp4";
import exercisePause from "@/assets/exercise-pause.mp4";

const programVideos: Record<string, string> = {
  "squats-10": exerciseSquats,
  "pompes-10": exercisePushups,
  "gainage": exercisePlank,
  "lateral-stretch": exerciseLateralStretch,
  "forward-fold": exerciseForwardFold,
  "yoga-arms": exerciseYogaArms,
  "box-breathing": exerciseBoxBreathing,
  "coherence": exerciseCoherence,
  "pause": exercisePause,
};

// Helper to find program info from program id
const findProgram = (programId: string | null) => {
  if (!programId) return null;
  for (const cat of categories) {
    const p = cat.programs.find((pr) => pr.id === programId);
    if (p) return { ...p, categoryName: cat.name };
  }
  return null;
};

const ConnectedApps = () => {
  const navigate = useNavigate();
  const { settings, toggleApp } = useAppSettings();
  const connectedApps = apps.filter((app) => settings[app.id]?.isActive);
  const [pendingDisconnect, setPendingDisconnect] = useState<{ id: string; name: string } | null>(null);

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header — minimal, premium */}
      <header className="px-5 pt-7 pb-6">
        <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/70 mb-1.5">
          Connexions
        </p>
        <h1 className="text-[22px] font-semibold text-foreground tracking-tight">
          Applications
        </h1>
      </header>

      <div className="px-4 space-y-2">
        {connectedApps.length > 0 ? (
          connectedApps.map((app) => {
            const programId = settings[app.id]?.selectedProgramId ?? null;
            const program = findProgram(programId);
            const videoSrc = program ? programVideos[program.id] : undefined;

            return (
              <div
                key={app.id}
                className="w-full bg-white/[0.025] hover:bg-white/[0.04] transition-colors rounded-2xl border border-white/[0.06] overflow-hidden"
              >
                <div className="flex items-center gap-3 p-3">
                  {/* App icon */}
                  <div className="shrink-0">{getAppIcon(app.id, "md", true)}</div>

                  {/* App name + category */}
                  <div className="flex-1 text-left min-w-0">
                    <p className="text-[15px] font-semibold text-foreground truncate leading-tight">
                      {app.name}
                    </p>
                    <p className="text-[10.5px] uppercase tracking-[0.12em] text-muted-foreground/70 mt-1 truncate font-medium">
                      {program ? program.categoryName : "Aucun programme"}
                    </p>
                  </div>

                  {/* Program bubble (mini) */}
                  {program ? (
                    <div className="relative flex items-center gap-2 pl-1 pr-2 py-1 rounded-2xl bg-white/[0.04] border border-white/[0.06] shrink-0">
                      <div className="relative w-9 h-9 rounded-xl overflow-hidden bg-black shrink-0">
                        {videoSrc ? (
                          <video
                            src={videoSrc}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-foreground/20 to-foreground/5" />
                        )}
                      </div>

                      <div className="flex flex-col leading-tight max-w-[88px]">
                        <span className="text-[11px] font-semibold text-foreground truncate">
                          {program.name}
                        </span>
                        <span className="text-[10px] text-muted-foreground/80 truncate">
                          {program.duration}
                        </span>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setPendingDisconnect({ id: app.id, name: app.name });
                        }}
                        className="w-7 h-7 rounded-full bg-background/80 border border-white/[0.06] flex items-center justify-center shrink-0 active:scale-90 transition-transform"
                        aria-label={`Déconnecter ${app.name}`}
                      >
                        <Lock className="w-3 h-3 text-muted-foreground/80" strokeWidth={2} />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/app/${app.id}`);
                      }}
                      className="flex items-center gap-1 px-3.5 py-2 rounded-full bg-foreground text-background shrink-0 active:scale-95 transition-transform"
                    >
                      <span className="text-[11px] font-semibold">Choisir</span>
                      <ChevronRight className="w-3 h-3" strokeWidth={2.5} />
                    </button>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-sm text-muted-foreground px-2 py-8 text-center">
            Aucune application connectée
          </p>
        )}
      </div>

      <DisconnectAppModal
        isOpen={!!pendingDisconnect}
        appId={pendingDisconnect?.id}
        appName={pendingDisconnect?.name ?? ""}
        onClose={() => setPendingDisconnect(null)}
        onConfirm={() => {
          if (pendingDisconnect) {
            toggleApp(pendingDisconnect.id);
            setPendingDisconnect(null);
          }
        }}
      />

      <BottomNavBar />
    </div>
  );
};

export default ConnectedApps;
