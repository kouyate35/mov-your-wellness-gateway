import { ChevronRight } from "lucide-react";
import { AppData } from "@/data/apps";
import { useNavigate } from "react-router-dom";

interface AppListProps {
  apps: AppData[];
  activeApps: Record<string, boolean>;
}

const AppList = ({ apps, activeApps }: AppListProps) => {
  const navigate = useNavigate();

  return (
    <div className="px-4">
      <h2 className="text-lg font-semibold text-foreground mb-4">Applications</h2>
      <div className="space-y-2">
        {apps.map((app) => (
          <AppListItem
            key={app.id}
            app={app}
            isActive={activeApps[app.id] || false}
            onClick={() => navigate(`/app/${app.id}`)}
          />
        ))}
      </div>
    </div>
  );
};

interface AppListItemProps {
  app: AppData;
  isActive: boolean;
  onClick: () => void;
}

const AppListItem = ({ app, isActive, onClick }: AppListItemProps) => {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-4 p-4 bg-card hover:bg-accent rounded-xl transition-colors"
    >
      <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-2xl">
        {app.icon}
      </div>
      <div className="flex-1 text-left">
        <h3 className="font-medium text-foreground">{app.name}</h3>
        <p className="text-sm text-muted-foreground">{app.description}</p>
      </div>
      <div className="flex items-center gap-3">
        {isActive && (
          <div className="w-2 h-2 bg-move rounded-full" />
        )}
        <ChevronRight className="w-5 h-5 text-muted-foreground" />
      </div>
    </button>
  );
};

export default AppList;
