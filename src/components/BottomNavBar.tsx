import { useNavigate, useLocation } from "react-router-dom";
import { Compass, Map, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { id: "explore", label: "Explorer", icon: Compass, path: "/explore" },
  { id: "community", label: "Communauté", icon: Map, path: "/community" },
  { id: "stats", label: "Statistiques", icon: BarChart3, path: "/usage-stats" },
];

const BottomNavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border/20">
      <div className="flex items-center justify-around h-12 max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center gap-0.5 flex-1"
            >
              <item.icon
                className={cn(
                  "w-5 h-5",
                  isActive ? "text-foreground" : "text-muted-foreground/60"
                )}
                strokeWidth={isActive ? 2 : 1.5}
              />
              <span
                className={cn(
                  "text-[9px]",
                  isActive ? "text-foreground font-medium" : "text-muted-foreground/60"
                )}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
      {/* Safe area spacer for iOS */}
      <div className="h-[env(safe-area-inset-bottom,0px)]" />
    </nav>
  );
};

export default BottomNavBar;
