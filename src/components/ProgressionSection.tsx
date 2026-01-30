import { useState } from "react";
import { Flame, Trophy, Calendar, TrendingUp, ChevronRight } from "lucide-react";
import { categories } from "@/data/categories";

// Mock data for progression (will be replaced with real data from Supabase)
const mockProgressData = {
  currentStreak: 7,
  bestStreak: 14,
  totalSessions: 47,
  totalMinutes: 156,
  thisWeek: [
    { day: "Lun", completed: 3, date: "27 Jan" },
    { day: "Mar", completed: 2, date: "28 Jan" },
    { day: "Mer", completed: 4, date: "29 Jan" },
    { day: "Jeu", completed: 1, date: "30 Jan" },
    { day: "Ven", completed: 0, date: "31 Jan" },
    { day: "Sam", completed: 0, date: "1 Fév" },
    { day: "Dim", completed: 0, date: "2 Fév" },
  ],
  recentActivity: [
    { id: 1, programId: "squats-10", categoryId: "move", appUnlocked: "TikTok", timestamp: "Aujourd'hui, 14:32" },
    { id: 2, programId: "box-breathing", categoryId: "breath", appUnlocked: "Instagram", timestamp: "Aujourd'hui, 10:15" },
    { id: 3, programId: "pompes-10", categoryId: "move", appUnlocked: "YouTube", timestamp: "Hier, 22:45" },
    { id: 4, programId: "lateral-stretch", categoryId: "flex", appUnlocked: "TikTok", timestamp: "Hier, 18:20" },
    { id: 5, programId: "coherence", categoryId: "breath", appUnlocked: "Twitter", timestamp: "Hier, 09:00" },
  ],
  categoryBreakdown: [
    { id: "move", count: 23, percentage: 49 },
    { id: "flex", count: 8, percentage: 17 },
    { id: "breath", count: 12, percentage: 26 },
    { id: "focus", count: 4, percentage: 8 },
  ],
};

const categoryColors: Record<string, string> = {
  move: "bg-emerald-500",
  flex: "bg-amber-500",
  breath: "bg-blue-500",
  focus: "bg-violet-500",
};

const categoryTextColors: Record<string, string> = {
  move: "text-emerald-500",
  flex: "text-amber-500",
  breath: "text-blue-500",
  focus: "text-violet-500",
};

const ProgressionSection = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<"week" | "month">("week");
  const today = new Date().getDay(); // 0 = Sunday, 1 = Monday, etc.
  const adjustedToday = today === 0 ? 6 : today - 1; // Convert to Monday = 0

  const getProgramName = (programId: string) => {
    for (const cat of categories) {
      const program = cat.programs.find((p) => p.id === programId);
      if (program) return program.name;
    }
    return programId;
  };

  return (
    <div className="px-4 py-2 space-y-6">
      {/* Streak & Stats Cards */}
      <div className="grid grid-cols-2 gap-3">
        {/* Current Streak */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30">
          <div className="flex items-center gap-2 mb-2">
            <Flame className="w-5 h-5 text-orange-500" />
            <span className="text-xs text-orange-400 font-medium">Série en cours</span>
          </div>
          <p className="text-3xl font-bold text-foreground">{mockProgressData.currentStreak}</p>
          <p className="text-xs text-muted-foreground">jours consécutifs</p>
        </div>

        {/* Best Streak */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-yellow-500/20 to-amber-500/20 border border-yellow-500/30">
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <span className="text-xs text-yellow-400 font-medium">Meilleure série</span>
          </div>
          <p className="text-3xl font-bold text-foreground">{mockProgressData.bestStreak}</p>
          <p className="text-xs text-muted-foreground">jours record</p>
        </div>
      </div>

      {/* Weekly Activity */}
      <div className="p-4 rounded-2xl bg-card/50 border border-border/50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-foreground">Cette semaine</h3>
          <div className="flex gap-1">
            <button
              onClick={() => setSelectedPeriod("week")}
              className={`px-3 py-1 text-xs rounded-full transition-colors ${
                selectedPeriod === "week"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Semaine
            </button>
            <button
              onClick={() => setSelectedPeriod("month")}
              className={`px-3 py-1 text-xs rounded-full transition-colors ${
                selectedPeriod === "month"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Mois
            </button>
          </div>
        </div>

        {/* Week Grid */}
        <div className="flex items-end justify-between gap-2">
          {mockProgressData.thisWeek.map((day, index) => {
            const isToday = index === adjustedToday;
            const isFuture = index > adjustedToday;
            const maxHeight = 60;
            const height = day.completed > 0 ? Math.max(20, (day.completed / 5) * maxHeight) : 8;

            return (
              <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className={`w-full rounded-lg transition-all ${
                    isFuture
                      ? "bg-muted/30"
                      : day.completed > 0
                      ? "bg-primary"
                      : "bg-muted"
                  } ${isToday ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : ""}`}
                  style={{ height: `${height}px` }}
                />
                <span
                  className={`text-[10px] font-medium ${
                    isToday ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {day.day}
                </span>
              </div>
            );
          })}
        </div>

        {/* Stats row */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50">
          <div className="text-center">
            <p className="text-lg font-semibold text-foreground">{mockProgressData.totalSessions}</p>
            <p className="text-[10px] text-muted-foreground">sessions</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-foreground">{mockProgressData.totalMinutes}</p>
            <p className="text-[10px] text-muted-foreground">minutes</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-foreground">
              {Math.round(mockProgressData.totalMinutes / mockProgressData.totalSessions * 10) / 10}
            </p>
            <p className="text-[10px] text-muted-foreground">min/session</p>
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="p-4 rounded-2xl bg-card/50 border border-border/50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-foreground">Par catégorie</h3>
          <TrendingUp className="w-4 h-4 text-muted-foreground" />
        </div>

        <div className="space-y-3">
          {mockProgressData.categoryBreakdown.map((cat) => {
            const category = categories.find((c) => c.id === cat.id);
            return (
              <div key={cat.id} className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg ${categoryColors[cat.id]} flex items-center justify-center`}>
                  <span className="text-sm">{category?.icon}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-foreground">{category?.name}</span>
                    <span className="text-xs text-muted-foreground">{cat.count} fois</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${categoryColors[cat.id]}`}
                      style={{ width: `${cat.percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="text-sm font-medium text-foreground">Activité récente</h3>
          <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
            Tout voir
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        <div className="space-y-2">
          {mockProgressData.recentActivity.map((activity) => {
            const category = categories.find((c) => c.id === activity.categoryId);
            return (
              <div
                key={activity.id}
                className="flex items-center gap-3 p-3 rounded-xl bg-card/30 border border-border/30"
              >
                <div className={`w-10 h-10 rounded-xl ${categoryColors[activity.categoryId]} flex items-center justify-center`}>
                  <span className="text-base">{category?.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {getProgramName(activity.programId)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    → {activity.appUnlocked} débloqué
                  </p>
                </div>
                <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                  {activity.timestamp}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressionSection;
