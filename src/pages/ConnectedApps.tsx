import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link2, Lock, ChevronRight } from "lucide-react";
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
      {/* Header */}
      <header className="px-4 pt-6 pb-5">
        <div className="flex items-center gap-3">
          <Link2 className="w-5 h-5 text-muted-foreground" />
          <h1 className="text-xl font-semibold text-foreground">Applications connectées</h1>
        </div>
      </header>

      <div className="px-4 space-y-3">
        {connectedApps.length > 0 ? (
          connectedApps.map((app) => {
            const programId = settings[app.id]?.selectedProgramId ?? null;
            const program = findProgram(programId);
            const videoSrc = program ? programVideos[program.id] : undefined;

            return (
              <div
                key={app.id}
                className="w-full bg-secondary/40 backdrop-blur-sm rounded-3xl border border-border/30 overflow-hidden"
              >
                <div className="flex items-center gap-3 p-3">
                  {/* App icon */}
                  <div className="shrink-0">{getAppIcon(app.id, "md", true)}</div>

                  {/* App name + tagline */}
                  <div className="flex-1 text-left min-w-0">
                    <p className="text-base font-semibold text-foreground truncate">
                      {app.name}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {program ? program.categoryName : "Aucun programme"}
                    </p>
                  </div>

                  {/* Program bubble (mini) */}
                  {program ? (
                    <div className="relative flex items-center gap-2 pl-1.5 pr-2.5 py-1.5 rounded-2xl bg-background/60 border border-border/40 shrink-0">
                      {/* Mini video thumbnail */}
                      <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-black shrink-0">
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
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-primary/10" />
                        )}
                      </div>

                      {/* Program label */}
                      <div className="flex flex-col leading-tight max-w-[90px]">
                        <span className="text-[11px] font-semibold text-primary truncate">
                          {program.name}
                        </span>
                        <span className="text-[10px] text-muted-foreground truncate">
                          {program.duration}
                        </span>
                      </div>

                      {/* Lock icon */}
                      <div className="w-6 h-6 rounded-full bg-background/80 border border-border/50 flex items-center justify-center shrink-0">
                        <Lock className="w-3 h-3 text-muted-foreground" strokeWidth={2.2} />
                      </div>
                    </div>
                  ) : (
                    <div
                      role="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/app/${app.id}`);
                      }}
                      className="flex items-center gap-1 px-3 py-2 rounded-2xl bg-primary/15 border border-primary/30 shrink-0"
                    >
                      <span className="text-[11px] font-semibold text-primary">Choisir</span>
                      <ChevronRight className="w-3 h-3 text-primary" />
                    </div>
                  )}
                </div>
              </button>
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
