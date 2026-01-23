import { ChevronRight } from "lucide-react";
import { AppData } from "@/data/apps";
import { useNavigate } from "react-router-dom";
import { appIconComponents } from "./AppIcons";

interface AppListProps {
  apps: AppData[];
  activeApps: Record<string, boolean>;
}

const AppList = ({ apps, activeApps }: AppListProps) => {
  const navigate = useNavigate();

  return (
    <div className="px-5">
      <div className="space-y-0.5">
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
  const iconComponent = appIconComponents[app.id];

  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center gap-3 p-2.5 rounded-xl transition-all duration-200
        hover:bg-secondary/50 active:bg-secondary/70
        ${isActive ? "bg-secondary/30" : ""}
      `}
    >
      {/* App icon - circular squircle style */}
      <div className={`
        w-11 h-11 rounded-xl flex items-center justify-center
        ${app.bgColor} ${app.iconColor}
      `}>
        {iconComponent || <span className="text-lg">{app.icon}</span>}
      </div>

      {/* App info */}
      <div className="flex-1 text-left min-w-0">
        <h3 className="font-medium text-sm text-foreground truncate">{app.name}</h3>
        <p className="text-xs text-muted-foreground truncate">{app.description}</p>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {isActive && (
          <div className="w-2 h-2 bg-move rounded-full" />
        )}
        <ChevronRight className="w-4 h-4 text-muted-foreground" />
      </div>
    </button>
  );
};

export default AppList;
