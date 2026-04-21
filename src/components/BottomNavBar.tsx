import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, Map, BarChart3, Smartphone, User, Sparkles, Settings, HelpCircle, LogOut, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import SettingsModal from "@/components/SettingsModal";
import HelpModal from "@/components/HelpModal";

const navItems = [
  { id: "home", label: "Home", icon: Home, path: "/explore" },
  { id: "apps", label: "Apps", icon: Smartphone, path: "/connected-apps" },
  { id: "community", label: "Communauté", icon: Map, path: "/community" },
  { id: "stats", label: "Statistiques", icon: BarChart3, path: "/usage-stats" },
];

const BottomNavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [userId] = useState(() => Math.random().toString().slice(2, 12));
  const popupRef = useRef<HTMLDivElement>(null);

  const user = { name: "Jojo", plan: "Free" };
  const userInitial = user.name.charAt(0).toUpperCase();

  // Close popup on outside click
  useEffect(() => {
    if (!showProfilePopup) return;
    const handler = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setShowProfilePopup(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showProfilePopup]);

  const profileMenuItems = [
    { icon: Sparkles, label: "Passer au forfait supérieur", action: () => { navigate("/subscription"); setShowProfilePopup(false); } },
    { icon: Settings, label: "Paramètres", action: () => { setShowSettings(true); setShowProfilePopup(false); } },
    { icon: HelpCircle, label: "Aide", hasChevron: true, action: () => { setShowHelp(true); setShowProfilePopup(false); } },
    { icon: LogOut, label: "Se déconnecter", action: async () => { await supabase.auth.signOut(); toast.success("Déconnexion réussie"); navigate("/"); setShowProfilePopup(false); } },
  ];

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border/20">
        {/* Profile Popup */}
        {showProfilePopup && (
          <div
            ref={popupRef}
            className="absolute bottom-full right-2 mb-2 w-[260px] bg-popover rounded-2xl shadow-xl border border-border overflow-hidden"
          >
            {/* Profile Header */}
            <div className="p-4 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-info flex items-center justify-center">
                  <span className="text-info-foreground font-semibold text-sm">{userInitial}</span>
                </div>
                <div>
                  <p className="text-foreground text-sm font-medium">{user.name}</p>
                  <p className="text-muted-foreground text-xs">@u{userId}</p>
                </div>
              </div>
            </div>

            <div className="h-px bg-border mx-4" />

            <div className="p-2">
              {profileMenuItems.map((item, index) => (
                <div key={index}>
                  <button
                    onClick={item.action}
                    className="w-full flex items-center justify-between px-3 py-3 text-foreground hover:bg-muted rounded-lg transition-colors text-left"
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="w-5 h-5 text-muted-foreground" />
                      <span className="text-sm">{item.label}</span>
                    </div>
                    {item.hasChevron && <ChevronRight className="w-4 h-4 text-muted-foreground" />}
                  </button>
                  {index === 1 && <div className="h-px bg-border my-1 mx-3" />}
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-border p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-info flex items-center justify-center">
                  <span className="text-info-foreground font-semibold text-xs">{userInitial}</span>
                </div>
                <div>
                  <p className="text-foreground text-xs font-medium">{user.name}</p>
                  <p className="text-muted-foreground text-[10px]">{user.plan}</p>
                </div>
              </div>
              <button
                onClick={() => { navigate("/subscription"); setShowProfilePopup(false); }}
                className="px-2.5 py-1 bg-secondary rounded-full text-foreground text-[10px] font-medium hover:bg-secondary/80 transition-colors"
              >
                Mettre à niveau
              </button>
            </div>
          </div>
        )}

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
        <div className="h-[env(safe-area-inset-bottom,0px)]" />
      </nav>

      <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />
      <HelpModal isOpen={showHelp} onClose={() => setShowHelp(false)} />
    </>
  );
};

export default BottomNavBar;
