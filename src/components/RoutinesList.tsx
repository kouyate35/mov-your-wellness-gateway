import { useNavigate } from "react-router-dom";
import { ChevronRight, Check } from "lucide-react";
import { AppData } from "@/data/apps";
import { Progress } from "@/components/ui/progress";

interface RoutinesListProps {
  apps: AppData[];
}

// Simulated usage data in minutes (will be replaced by real Android data)
const mockUsageData: Record<string, number> = {
  tiktok: 319,     // 5h 19min
  instagram: 122,  // 2h 02min
  youtube: 180,    // 3h 00min
  twitter: 45,     // 0h 45min
  snapchat: 67,    // 1h 07min
  facebook: 38,    // 0h 38min
  whatsapp: 156,   // 2h 36min
  netflix: 240,    // 4h 00min
  reddit: 89,      // 1h 29min
  twitch: 210,     // 3h 30min
  discord: 95,     // 1h 35min
};

const formatUsageTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) return `${mins}min`;
  return `${hours}h ${mins.toString().padStart(2, '0')}min`;
};

const RoutinesList = ({ apps }: RoutinesListProps) => {
  const navigate = useNavigate();
  const maxMinutes = 360; // 6 hours max for progress bar

  if (apps.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <span className="text-2xl">📱</span>
        </div>
        <h3 className="text-lg font-medium text-foreground mb-2">
          Aucune app connectée
        </h3>
        <p className="text-sm text-muted-foreground max-w-xs">
          Connecte des applications depuis l'onglet "Applis" pour voir tes routines ici.
        </p>
      </div>
    );
  }

  return (
    <div className="px-4 py-2 space-y-3">
      {apps.map((app) => {
        const usageMinutes = mockUsageData[app.id] || 0;
        const percentage = Math.min((usageMinutes / maxMinutes) * 100, 100);

        return (
          <button
            key={app.id}
            onClick={() => navigate(`/routine/${app.id}`)}
            className="w-full flex items-center gap-4 p-3 rounded-2xl bg-card/50 border border-border/50 hover:bg-card transition-colors group"
          >
            {/* App Icon with check badge */}
            <div className="relative flex-shrink-0">
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${app.bgColor} ${app.iconColor}`}
              >
                {app.icon}
              </div>
              {/* Check badge */}
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white flex items-center justify-center shadow-sm">
                <Check className="w-3 h-3 text-black" strokeWidth={3} />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 text-left">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-medium text-foreground truncate">
                  {app.name}
                </span>
                <span className="text-xs text-muted-foreground ml-2 flex-shrink-0">
                  {formatUsageTime(usageMinutes)}
                </span>
              </div>
              
              {/* Progress bar */}
              <Progress 
                value={percentage} 
                className="h-1.5 bg-muted"
              />
            </div>

            {/* Chevron */}
            <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0" />
          </button>
        );
      })}
    </div>
  );
};

export default RoutinesList;
