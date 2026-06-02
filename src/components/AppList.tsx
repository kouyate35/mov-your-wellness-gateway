import { Check, Lock, Play } from "lucide-react";
import { AppData } from "@/data/apps";
import { useNavigate } from "react-router-dom";
import { appIconComponents } from "./AppIcons";

interface AppListProps {
  apps: AppData[];
  activeApps: Record<string, boolean>;
}

// Mock per-app saved minutes — replace with real data later
const savedMinutesByApp: Record<string, number> = {
  tiktok: 12,
  instagram: 8,
  youtube: 22,
  twitter: 8,
  snapchat: 14,
  discord: 6,
};

const AppList = ({ apps, activeApps }: AppListProps) => {
  const navigate = useNavigate();

  return (
    <div className="-mx-1">
      <div
        className="flex items-stretch gap-2.5 overflow-x-auto scrollbar-hide px-5 pb-2"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {apps.map((app) => (
          <AppCard
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

interface AppCardProps {
  app: AppData;
  isActive: boolean;
  onClick: () => void;
}

const AppCard = ({ app, isActive, onClick }: AppCardProps) => {
  const iconComponent = appIconComponents[app.id];
  const minutes = savedMinutesByApp[app.id] ?? 0;

  return (
    <button
      onClick={onClick}
      style={{ scrollSnapAlign: "start" }}
      className={`
        group relative shrink-0 w-[120px] rounded-[22px] p-3.5 pt-3
        flex flex-col items-center text-center
        transition-all duration-200 active:scale-[0.98]
        ${
          isActive
            ? "bg-white/[0.05] border border-white/25 shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_8px_24px_-12px_rgba(255,255,255,0.18)]"
            : "bg-white/[0.025] border border-white/[0.05] hover:bg-white/[0.04]"
        }
      `}
    >
      {/* Lock / Check badge top-left */}
      <span
        className={`
          absolute top-2.5 left-2.5 w-[18px] h-[18px] rounded-full
          flex items-center justify-center
          ${
            isActive
              ? "bg-white text-black"
              : "bg-white/[0.06] border border-white/[0.08] text-muted-foreground/70"
          }
        `}
      >
        {isActive ? (
          <Check className="w-2.5 h-2.5" strokeWidth={3.5} />
        ) : (
          <Lock className="w-2.5 h-2.5" strokeWidth={2.2} />
        )}
      </span>

      {/* Icon */}
      <div
        className={`
          mt-2 w-[58px] h-[58px] rounded-[18px]
          ${app.bgColor} ${app.iconColor}
          flex items-center justify-center
          shadow-[0_4px_10px_rgba(0,0,0,0.35)]
        `}
      >
        {iconComponent || <span className="text-2xl">{app.icon}</span>}
      </div>

      {/* Name */}
      <h3 className="mt-3 text-[14px] font-semibold text-foreground leading-none">
        {app.name}
      </h3>

      {/* Status pill */}
      <span
        className={`
          mt-2.5 inline-flex items-center gap-1 px-2.5 py-1 rounded-full
          text-[10.5px] font-semibold
          ${
            isActive
              ? "bg-white text-black"
              : "bg-white/[0.04] border border-white/[0.06] text-muted-foreground/80"
          }
        `}
      >
        {isActive ? (
          <>
            <Play className="w-2.5 h-2.5 fill-current" strokeWidth={0} />
            Prêt
          </>
        ) : (
          <>
            <Lock className="w-2.5 h-2.5" strokeWidth={2.4} />
            Verrouillé
          </>
        )}
      </span>

      {/* Saved time */}
      <p className="mt-2.5 text-[10.5px] text-muted-foreground/60 leading-none">
        {minutes} min économisées
      </p>
    </button>
  );
};

export default AppList;
