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
      <div className="space-y-1">
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
      className={`
        w-full flex items-center gap-4 p-3 rounded-2xl transition-all duration-200
        hover:bg-secondary/50 active:bg-secondary/70
        ${isActive ? "bg-secondary/30" : ""}
      `}
    >
      {/* App icon - styled like real app icons */}
      <div className={`
        w-14 h-14 rounded-2xl flex items-center justify-center text-xl
        ${app.bgColor} ${app.iconColor}
        shadow-lg
      `}>
        {app.icon}
      </div>

      {/* App info */}
      <div className="flex-1 text-left min-w-0">
        <h3 className="font-medium text-foreground truncate">{app.name}</h3>
        <p className="text-sm text-muted-foreground truncate">{app.description}</p>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3 flex-shrink-0">
        {isActive && (
          <div className="w-2.5 h-2.5 bg-move rounded-full" />
        )}
        <ChevronRight className="w-5 h-5 text-muted-foreground" />
      </div>
    </button>
  );
};

export default AppList;
