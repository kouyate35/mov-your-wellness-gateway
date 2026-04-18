import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link2 } from "lucide-react";
import { apps } from "@/data/apps";
import { useAppSettings } from "@/hooks/useAppSettings";
import { getAppIcon } from "@/components/AppIcons";
import BottomNavBar from "@/components/BottomNavBar";
import DisconnectAppModal from "@/components/DisconnectAppModal";
import { Switch } from "@/components/ui/switch";

const ConnectedApps = () => {
  const navigate = useNavigate();
  const { settings, toggleApp } = useAppSettings();
  const connectedApps = apps.filter(app => settings[app.id]?.isActive);
  const [pendingDisconnect, setPendingDisconnect] = useState<{ id: string; name: string } | null>(null);

  const handleToggle = (appId: string, appName: string) => {
    if (settings[appId]?.isActive) {
      setPendingDisconnect({ id: appId, name: appName });
    } else {
      toggleApp(appId);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="px-4 pt-6 pb-5">
        <div className="flex items-center gap-3">
          <Link2 className="w-5 h-5 text-muted-foreground" />
          <h1 className="text-xl font-semibold text-foreground">Applications connectées</h1>
        </div>
      </header>

      <div className="px-4 space-y-3">
        {connectedApps.length > 0 ? (
          connectedApps.map((app) => (
            <div
              key={app.id}
              className="bg-secondary/40 backdrop-blur-sm rounded-3xl border border-border/30 overflow-hidden"
            >
              <div className="flex items-center gap-4 p-4">
                {/* App icon (square rounded, like clock app) */}
                <button
                  onClick={() => navigate(`/app/${app.id}`)}
                  className="shrink-0"
                >
                  {getAppIcon(app.id, "md", true)}
                </button>

                {/* App name */}
                <button
                  onClick={() => navigate(`/app/${app.id}`)}
                  className="flex-1 text-left min-w-0"
                >
                  <p className="text-2xl font-light text-foreground truncate tracking-tight">
                    {app.name}
                  </p>
                </button>

                {/* Toggle */}
                <Switch
                  checked={settings[app.id]?.isActive ?? false}
                  onCheckedChange={() => handleToggle(app.id, app.name)}
                />
              </div>
            </div>
          ))
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
