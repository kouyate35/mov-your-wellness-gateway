import { useNavigate } from "react-router-dom";
import { ArrowLeft, LayoutGrid, Link2 } from "lucide-react";
import { apps } from "@/data/apps";
import { useAppSettings } from "@/hooks/useAppSettings";
import { getAppIcon } from "@/components/AppIcons";
import BottomNavBar from "@/components/BottomNavBar";

const ConnectedApps = () => {
  const navigate = useNavigate();
  const { settings } = useAppSettings();
  const connectedApps = apps.filter(app => settings[app.id]?.isActive);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="flex items-center gap-3 px-4 pt-4 pb-3">
        <button onClick={() => navigate(-1)} className="p-1">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="text-lg font-semibold text-foreground">Mes applications</h1>
      </header>

      <div className="px-4 space-y-6 mt-2">
        {/* Programmes */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <LayoutGrid className="w-5 h-5 text-muted-foreground" />
            <span className="text-[15px] font-medium text-foreground">Programmes</span>
          </div>
        </section>

        {/* Séparateur */}
        <div className="h-px bg-border" />

        {/* Applications connectées */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <Link2 className="w-5 h-5 text-muted-foreground" />
            <span className="text-[15px] font-medium text-foreground">Applications connectées</span>
          </div>

          {connectedApps.length > 0 ? (
            <div className="space-y-1">
              {connectedApps.map((app) => (
                <button
                  key={app.id}
                  onClick={() => navigate(`/app/${app.id}`)}
                  className="w-full flex items-center gap-3 px-2 py-3 text-foreground hover:bg-muted/50 rounded-xl transition-colors text-left"
                >
                  <div className="relative w-10 h-10 shrink-0">
                    {getAppIcon(app.id, "sm", true)}
                    {/* Badge de connexion */}
                    <div className="absolute -bottom-0.5 -left-0.5 w-4.5 h-4.5 bg-white rounded-full flex items-center justify-center shadow-sm">
                      <svg className="w-2.5 h-2.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{app.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{app.description}</p>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground px-2">Aucune application connectée</p>
          )}
        </section>
      </div>

      <BottomNavBar />
    </div>
  );
};

export default ConnectedApps;
