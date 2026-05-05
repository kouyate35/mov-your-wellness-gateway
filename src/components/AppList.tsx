import { ChevronRight, Check } from "lucide-react";
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
    <div className="px-3">
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
  const iconComponent = appIconComponents[app.id];

  return (
    <button
      onClick={onClick}
      className={`
        group w-full flex items-center gap-3.5 px-3 py-3 rounded-2xl transition-all duration-200
        hover:bg-white/[0.03] active:bg-white/[0.05]
      `}
    >
      {/* App icon container with connection badge */}
      <div className="relative">
        <div className={`
          w-11 h-11 rounded-[14px] flex items-center justify-center
          ${app.bgColor} ${app.iconColor}
          shadow-[0_2px_6px_rgba(0,0,0,0.25)]
        `}>
          {iconComponent || <span className="text-lg">{app.icon}</span>}
        </div>

        {/* Connection badge - ChatGPT style */}
        {isActive && (
          <div className="absolute -bottom-0.5 -left-0.5 w-[18px] h-[18px] bg-background rounded-full flex items-center justify-center">
            <div className="w-[14px] h-[14px] bg-white rounded-full flex items-center justify-center">
              <Check className="w-2 h-2 text-gray-900" strokeWidth={3.5} />
            </div>
          </div>
        )}
      </div>

      {/* App info */}
      <div className="flex-1 text-left min-w-0">
        <h3 className="font-semibold text-[15px] text-foreground truncate leading-tight">{app.name}</h3>
        <p className="text-[12px] text-muted-foreground/70 truncate mt-0.5">{app.description}</p>
      </div>

      {/* Right side - just chevron */}
      <ChevronRight className="w-4 h-4 text-muted-foreground/40 flex-shrink-0 group-hover:text-muted-foreground/70 group-hover:translate-x-0.5 transition-all" />
    </button>
  );
};

export default AppList;
