import { useState } from "react";
import { categories } from "@/data/categories";
import { apps } from "@/data/apps";
import { getAppIcon } from "@/components/AppIcons";
import { Check } from "lucide-react";

// Video mapping for activities
const videoMap: Record<string, string> = {
  "squats-10": "/src/assets/exercise-squats.mp4",
  "pompes-10": "/src/assets/exercise-pushups.mp4",
  "gainage": "/src/assets/exercise-plank.mp4",
  "lateral-stretch": "/src/assets/exercise-lateral-stretch.mp4",
  "forward-fold": "/src/assets/exercise-forward-fold.mp4",
  "yoga-arms": "/src/assets/exercise-yoga-arms.mp4",
  "box-breathing": "/src/assets/exercise-box-breathing.mp4",
  "coherence": "/src/assets/exercise-coherence.mp4",
  "pause": "/src/assets/exercise-pause.mp4",
};

// Mock connected apps - will be replaced with real data
const mockConnectedApps = ["tiktok", "instagram", "snapchat", "discord"];

// Mock data - will be replaced with Supabase data
const mockData = {
  streak: 7,
  weekDays: [
    { day: "Lun", completed: true },
    { day: "Mar", completed: true },
    { day: "Mer", completed: true },
    { day: "Jeu", completed: true },
    { day: "Ven", completed: false },
    { day: "Sam", completed: false },
    { day: "Dim", completed: false },
  ],
  // Activities per app
  activitiesByApp: {
    tiktok: {
      latestActivity: {
        id: 1,
        programId: "squats-10",
        appUnlocked: "TikTok",
        timestamp: "Aujourd'hui, 14:32",
      },
      previousActivities: [
        { id: 2, programId: "lateral-stretch", appUnlocked: "TikTok", timestamp: "Hier, 18:20" },
        { id: 3, programId: "pompes-10", appUnlocked: "TikTok", timestamp: "Avant-hier, 11:00" },
      ],
    },
    instagram: {
      latestActivity: {
        id: 4,
        programId: "box-breathing",
        appUnlocked: "Instagram",
        timestamp: "Aujourd'hui, 10:15",
      },
      previousActivities: [
        { id: 5, programId: "coherence", appUnlocked: "Instagram", timestamp: "Hier, 09:00" },
        { id: 6, programId: "yoga-arms", appUnlocked: "Instagram", timestamp: "Lun, 20:30" },
      ],
    },
    snapchat: {
      latestActivity: {
        id: 7,
        programId: "pompes-10",
        appUnlocked: "Snapchat",
        timestamp: "Hier, 22:45",
      },
      previousActivities: [
        { id: 8, programId: "gainage", appUnlocked: "Snapchat", timestamp: "Dim, 15:00" },
      ],
    },
    discord: {
      latestActivity: {
        id: 9,
        programId: "forward-fold",
        appUnlocked: "Discord",
        timestamp: "Mar, 19:20",
      },
      previousActivities: [
        { id: 10, programId: "pause", appUnlocked: "Discord", timestamp: "Lun, 14:00" },
      ],
    },
  } as Record<string, {
    latestActivity: { id: number; programId: string; appUnlocked: string; timestamp: string };
    previousActivities: { id: number; programId: string; appUnlocked: string; timestamp: string }[];
  }>,
  totalSessions: 47,
  totalMinutes: 156,
};

const getProgramName = (programId: string): string => {
  for (const cat of categories) {
    const program = cat.programs.find((p) => p.id === programId);
    if (program) return program.name;
  }
  return programId;
};

const getVideoForProgram = (programId: string): string => {
  return videoMap[programId] || videoMap["squats-10"];
};

// Connected apps selector with badges
const ConnectedAppsSelector = ({ 
  connectedApps, 
  selectedApp, 
  onSelectApp 
}: { 
  connectedApps: string[]; 
  selectedApp: string; 
  onSelectApp: (appId: string) => void;
}) => {
  return (
    <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
      {connectedApps.map((appId) => {
        const app = apps.find(a => a.id === appId);
        if (!app) return null;
        
        const isSelected = selectedApp === appId;
        
        return (
          <button
            key={appId}
            onClick={() => onSelectApp(appId)}
            className={`relative shrink-0 transition-all duration-200 ${
              isSelected ? "scale-105" : "opacity-70 hover:opacity-100"
            }`}
          >
            {/* App icon */}
            {getAppIcon(appId, "md", true)}
            
            {/* Connection badge - white circle with checkmark */}
            <div className="absolute -bottom-1 -left-1 w-5 h-5 bg-foreground rounded-full flex items-center justify-center shadow-lg">
              <Check className="w-3 h-3 text-background" strokeWidth={3} />
            </div>
            
            {/* Selection indicator ring */}
            {isSelected && (
              <div className="absolute inset-0 rounded-2xl ring-2 ring-foreground ring-offset-2 ring-offset-background" />
            )}
          </button>
        );
      })}
    </div>
  );
};

// Week indicator with simple circles
const WeekIndicator = ({ days, streak }: { days: typeof mockData.weekDays; streak: number }) => {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">Cette semaine</p>
      
      <div className="flex items-center justify-between">
        {days.map((day, index) => (
          <div key={index} className="flex flex-col items-center gap-2">
            <div
              className={`w-3 h-3 rounded-full transition-colors ${
                day.completed ? "bg-foreground" : "bg-muted"
              }`}
            />
            <span className="text-[10px] text-muted-foreground">{day.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Type for activity
type Activity = {
  id: number;
  programId: string;
  appUnlocked: string;
  timestamp: string;
};

// Hero card with video background
const HeroActivityCard = ({ activity }: { activity: Activity }) => {
  const programName = getProgramName(activity.programId);
  const videoSrc = getVideoForProgram(activity.programId);

  return (
    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
      {/* Video background */}
      <video
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
      
      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-between p-5">
        <p className="text-xs text-white/60">{activity.timestamp}</p>
        
        <div className="space-y-1">
          <p className="text-lg font-medium text-white">{programName}</p>
          <p className="text-sm text-white/70">{activity.appUnlocked} débloqué</p>
        </div>
      </div>
    </div>
  );
};

// Small activity card
const ActivityCard = ({ activity }: { activity: Activity }) => {
  const programName = getProgramName(activity.programId);

  return (
    <div className="p-4 rounded-2xl bg-secondary">
      <p className="text-[10px] text-muted-foreground mb-2">{activity.timestamp}</p>
      <p className="text-sm font-medium text-foreground">{programName}</p>
    </div>
  );
};

// Footer stats
const FooterStats = ({ sessions, minutes }: { sessions: number; minutes: number }) => {
  return (
    <p className="text-sm text-muted-foreground text-center">
      {sessions} sessions · {Math.floor(minutes / 60)}h {minutes % 60}min
    </p>
  );
};

const ProgressionSection = () => {
  const [selectedApp, setSelectedApp] = useState(mockConnectedApps[0]);
  
  // Get current app data
  const currentAppData = mockData.activitiesByApp[selectedApp];
  
  return (
    <div className="px-4 py-6 space-y-6 animate-fade-in">
      {/* Week indicator */}
      <WeekIndicator days={mockData.weekDays} streak={mockData.streak} />
      
      {/* Connected apps selector */}
      <ConnectedAppsSelector 
        connectedApps={mockConnectedApps}
        selectedApp={selectedApp}
        onSelectApp={setSelectedApp}
      />
      
      {/* Streak text */}
      <p className="text-sm text-foreground">
        {mockData.streak} jours consécutifs
      </p>
      
      {/* Hero card - latest activity for selected app */}
      {currentAppData && (
        <HeroActivityCard activity={currentAppData.latestActivity} />
      )}
      
      {/* Previous activities grid for selected app */}
      {currentAppData && currentAppData.previousActivities.length > 0 && (
        <div className="grid grid-cols-2 gap-3">
          {currentAppData.previousActivities.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
      )}
      
      {/* Footer stats */}
      <FooterStats sessions={mockData.totalSessions} minutes={mockData.totalMinutes} />
    </div>
  );
};

export default ProgressionSection;
