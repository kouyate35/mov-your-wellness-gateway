import { TrendingUp, ArrowUp } from "lucide-react";
import { apps } from "@/data/apps";

// Mock data for insights
const mockInsights = {
  timeSaved: {
    minutes: 154,
    percentChange: 45,
  },
  weeklyActivity: [3, 5, 4, 6, 2, 0, 0],
  topApps: [
    { id: "tiktok", sessions: 32 },
    { id: "instagram", sessions: 21 },
    { id: "snapchat", sessions: 12 },
  ],
  wellnessStats: {
    totalSquats: 147,
    breathMinutes: 23,
    stretchMinutes: 18,
    focusSessions: 9,
  },
  bestHour: "14h-16h",
};

// Format minutes to hours and minutes
const formatTime = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return hours > 0 ? `${hours}h ${mins}min` : `${mins}min`;
};

// Time Saved Hero Component
const TimeSavedHero = () => {
  const { minutes, percentChange } = mockInsights.timeSaved;

  return (
    <div className="px-4 py-6">
      <p className="text-sm text-muted-foreground mb-1">Temps économisé</p>
      <div className="flex items-baseline gap-3">
        <span className="text-5xl font-light text-foreground tracking-tight">
          {formatTime(minutes)}
        </span>
      </div>
      <p className="text-sm text-muted-foreground mt-2">cette semaine</p>
      <div className="flex items-center gap-1 mt-3">
        <ArrowUp className="w-4 h-4 text-foreground" />
        <span className="text-sm text-foreground font-medium">
          {percentChange}%
        </span>
        <span className="text-sm text-muted-foreground ml-1">
          vs la semaine dernière
        </span>
      </div>
    </div>
  );
};

// Weekly Activity Chart
const WeeklyActivityChart = () => {
  const days = ["L", "M", "M", "J", "V", "S", "D"];
  const { weeklyActivity } = mockInsights;
  const maxValue = Math.max(...weeklyActivity, 1);

  return (
    <div className="px-4 py-6">
      <p className="text-sm text-muted-foreground mb-4">Activité cette semaine</p>
      <div className="flex items-end justify-between h-28 px-2">
        {weeklyActivity.map((value, i) => (
          <div key={i} className="flex flex-col items-center gap-2 flex-1">
            <div className="w-full flex justify-center">
              <div
                className="w-6 rounded-t-sm transition-all bg-foreground/20"
                style={{
                  height: value > 0 ? `${(value / maxValue) * 80}px` : "4px",
                  opacity: value > 0 ? 0.3 + (value / maxValue) * 0.7 : 0.1,
                }}
              />
            </div>
            <span className="text-[10px] text-muted-foreground uppercase">
              {days[i]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Top Challenged Apps
const TopChallengedApps = () => {
  const { topApps } = mockInsights;
  const maxSessions = Math.max(...topApps.map((a) => a.sessions));

  return (
    <div className="px-4 py-6">
      <p className="text-sm text-muted-foreground mb-4">Apps les plus défiées</p>
      <div className="space-y-4">
        {topApps.map((appData) => {
          const app = apps.find((a) => a.id === appData.id);
          if (!app) return null;

          const progressPercent = (appData.sessions / maxSessions) * 100;

          return (
            <div key={appData.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg overflow-hidden bg-secondary flex items-center justify-center">
                    <img
                      src={app.icon}
                      alt={app.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-sm text-foreground">{app.name}</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {appData.sessions} sessions
                </span>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-foreground/40 rounded-full transition-all"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Wellness Impact Grid
const WellnessImpactGrid = () => {
  const { wellnessStats } = mockInsights;

  const stats = [
    { value: wellnessStats.totalSquats, label: "Squats effectués" },
    { value: wellnessStats.breathMinutes, label: "Minutes respiration" },
    { value: wellnessStats.stretchMinutes, label: "Minutes étirement" },
    { value: wellnessStats.focusSessions, label: "Sessions focus" },
  ];

  return (
    <div className="px-4 py-6">
      <p className="text-sm text-muted-foreground mb-4">Impact bien-être</p>
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-secondary/50 rounded-xl p-4 border border-border/30"
          >
            <span className="text-3xl font-light text-foreground">
              {stat.value}
            </span>
            <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Best Moment Insight
const BestMomentInsight = () => {
  const { bestHour } = mockInsights;

  return (
    <div className="px-4 py-6">
      <div className="bg-secondary/30 rounded-xl p-4 border border-border/30">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="w-4 h-4 text-muted-foreground" />
          <span className="text-xs text-muted-foreground uppercase tracking-wide">
            Insight
          </span>
        </div>
        <p className="text-sm text-foreground">
          Tu es le plus actif entre{" "}
          <span className="font-medium">{bestHour}</span>
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          C'est ton créneau optimal pour les défis
        </p>
      </div>
    </div>
  );
};

const InsightsSection = () => {
  return (
    <div className="py-2 animate-fade-in divide-y divide-border/30">
      <TimeSavedHero />
      <WeeklyActivityChart />
      <TopChallengedApps />
      <WellnessImpactGrid />
      <BestMomentInsight />
    </div>
  );
};

export default InsightsSection;
