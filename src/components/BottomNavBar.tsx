import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, Map, BarChart3, Smartphone, User, Sparkles, Settings, HelpCircle, LogOut, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import SettingsModal from "@/components/SettingsModal";
import HelpModal from "@/components/HelpModal";

const navItems = [
  { id: "home", label: "Home", icon: Home, path: "/home" },
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
      <nav className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none">
        {/* Profile Popup */}
        {showProfilePopup && (
          <div
            ref={popupRef}
            className="pointer-events-auto absolute bottom-full right-4 mb-3 w-[260px] bg-popover rounded-2xl shadow-xl border border-border overflow-hidden"
          >
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

        {/* Floating pill nav */}
        <div className="pointer-events-auto px-4 pb-3">
          <div className="mx-auto max-w-md flex items-center justify-around h-16 px-2 rounded-full bg-card/85 backdrop-blur-xl border border-border/40 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)]">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.id}
                  onClick={() => navigate(item.path)}
                  className="relative flex items-center justify-center flex-1 h-12"
                >
                  <div
                    className={cn(
                      "absolute inset-y-1 left-1 right-1 rounded-full transition-all duration-300 ease-out",
                      isActive ? "bg-foreground/10 scale-100 opacity-100" : "scale-90 opacity-0"
                    )}
                  />
                  <div className="relative flex flex-col items-center gap-0.5">
                    <item.icon
                      className={cn(
                        "w-5 h-5 transition-colors",
                        isActive ? "text-foreground" : "text-muted-foreground/70"
                      )}
                      strokeWidth={isActive ? 2.2 : 1.6}
                    />
                    <span
                      className={cn(
                        "text-[9px] transition-colors",
                        isActive ? "text-foreground font-semibold" : "text-muted-foreground/70"
                      )}
                    >
                      {item.label}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
        <div className="h-[env(safe-area-inset-bottom,0px)]" />
      </nav>

      <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />
      <HelpModal isOpen={showHelp} onClose={() => setShowHelp(false)} />
    </>
  );
};

export default BottomNavBar;
