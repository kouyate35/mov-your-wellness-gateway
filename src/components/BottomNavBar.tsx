import { useNavigate, useLocation } from "react-router-dom";
import { Compass, Map, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { id: "explore", label: "Explorer", icon: Compass, path: "/explore" },
  { id: "community", label: "Communauté", icon: Map, path: "/community", isCenter: true },
  { id: "stats", label: "Statistiques", icon: BarChart3, path: "/usage-stats" },
];

const BottomNavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50">
      {/* Gradient fade */}
      <div className="absolute inset-x-0 -top-6 h-6 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      
      <div className="bg-background/90 backdrop-blur-xl border-t border-border/30">
        <div className="flex items-center justify-around px-4 pb-6 pt-2 max-w-md mx-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || 
              (item.path === "/community" && location.pathname === "/home" && false);
            
            if (item.isCenter) {
              return (
                <button
                  key={item.id}
                  onClick={() => navigate(item.path)}
                  className="relative -mt-5 flex flex-col items-center gap-0.5"
                >
                  <div className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-lg",
                    isActive
                      ? "bg-foreground shadow-foreground/20"
                      : "bg-muted/80 border border-border/50"
                  )}>
                    <item.icon className={cn(
                      "w-6 h-6 transition-colors",
                      isActive ? "text-background" : "text-muted-foreground"
                    )} strokeWidth={1.5} />
                  </div>
                  <span className={cn(
                    "text-[10px] mt-0.5 transition-colors",
                    isActive ? "text-foreground font-medium" : "text-muted-foreground"
                  )}>
                    {item.label}
                  </span>
                </button>
              );
            }

            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className="flex flex-col items-center gap-1 py-1 px-3"
              >
                <item.icon className={cn(
                  "w-[22px] h-[22px] transition-colors",
                  isActive ? "text-foreground" : "text-muted-foreground"
                )} strokeWidth={1.5} />
                <span className={cn(
                  "text-[10px] transition-colors",
                  isActive ? "text-foreground font-medium" : "text-muted-foreground"
                )}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default BottomNavBar;
