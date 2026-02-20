import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X, Sparkles, Search, LayoutGrid, Link2, Settings, HelpCircle, LogOut, ChevronRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import movIcon from "@/assets/mov-icon.png";
import { apps } from "@/data/apps";
import { getAppIcon } from "@/components/AppIcons";
import { useAppSettings } from "@/hooks/useAppSettings";
import SettingsModal from "@/components/SettingsModal";

interface UserData {
  name: string;
  plan: "Free" | "Pro";
}

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideMenu = ({ isOpen, onClose }: SideMenuProps) => {
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [userId] = useState(() => Math.random().toString().slice(2, 12));
  const footerRef = useRef<HTMLDivElement>(null);
  const [popupBottom, setPopupBottom] = useState(80);
  const { settings } = useAppSettings();
  
  // Mock user data - in production this would come from auth context
  const user: UserData = {
    name: "Jojo",
    plan: "Free"
  };

  const userInitial = user.name.charAt(0).toUpperCase();

  // Get connected apps
  const connectedApps = apps.filter(app => settings[app.id]?.isActive);

  // Calculate popup position based on footer position
  useEffect(() => {
    if (footerRef.current && showProfileMenu) {
      const footerRect = footerRef.current.getBoundingClientRect();
      setPopupBottom(window.innerHeight - footerRect.top + 8);
    }
  }, [showProfileMenu]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
      setShowProfileMenu(false);
    }
  };

  const handleCloseProfileMenu = () => {
    setShowProfileMenu(false);
  };

  const menuItems = [
    { icon: Sparkles, label: "Nouveau moment", action: () => {} },
    { icon: Search, label: "Explorer", action: () => { navigate("/explore"); onClose(); } },
  ];

  const profileMenuItems = [
    { icon: Sparkles, label: "Passer au forfait supérieur", action: () => { navigate("/subscription"); onClose(); handleCloseProfileMenu(); } },
    { icon: Settings, label: "Paramètres", action: () => { setShowSettings(true); handleCloseProfileMenu(); } },
    { icon: HelpCircle, label: "Aide", hasChevron: true, action: () => {} },
    { icon: LogOut, label: "Se déconnecter", action: async () => { await supabase.auth.signOut(); toast.success("Déconnexion réussie"); navigate("/"); onClose(); } },
  ];

  return (
    <>
      {/* Backdrop - prevent any touch/scroll events from reaching behind */}
      <div
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={handleBackdropClick}
        style={{ touchAction: 'none', overscrollBehavior: 'none' }}
      >
        {/* Side Menu Panel - 65% width like ChatGPT, solid background */}
        <div
          className={`fixed left-0 top-0 h-full w-[65%] max-w-[280px] bg-background flex flex-col transition-transform duration-300 ease-out ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
          style={{ overscrollBehavior: 'contain' }}
        >
          {/* Header with separator */}
          <div className="flex items-center justify-between p-4 pt-5 border-b border-border">
            <img 
              src={movIcon} 
              alt="Workout" 
              className="w-8 h-8 rounded-lg"
            />
            <button 
              onClick={onClose}
              className="p-1 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Main Menu Items - scrollable content */}
          <nav className="flex-1 px-3 py-4 overflow-y-auto overflow-x-hidden">
            {/* Primary Actions */}
            <div className="space-y-1 mb-6">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={item.action}
                  className="w-full flex items-center gap-3 px-3 py-3 text-foreground hover:bg-muted rounded-lg transition-colors text-left"
                >
                  <item.icon className="w-5 h-5 text-muted-foreground" />
                  <span className="text-[15px]">{item.label}</span>
                </button>
              ))}
            </div>

            {/* Separator */}
            <div className="h-px bg-border mb-6" />

            {/* Secondary Items */}
            <div className="space-y-1">
              <button
                onClick={() => {}}
                className="w-full flex items-center gap-3 px-3 py-3 text-foreground hover:bg-muted rounded-lg transition-colors text-left"
              >
                <LayoutGrid className="w-5 h-5 text-muted-foreground" />
                <span className="text-[15px]">Programmes</span>
              </button>
              
              <button
                onClick={() => {}}
                className="w-full flex items-center gap-3 px-3 py-3 text-foreground hover:bg-muted rounded-lg transition-colors text-left"
              >
                <Link2 className="w-5 h-5 text-muted-foreground" />
                <span className="text-[15px]">Applications connectées</span>
              </button>

              {/* Connected Apps List with connection badge */}
              {connectedApps.length > 0 && (
                <div className="mt-2 space-y-1 pl-2">
                  {connectedApps.map((app) => (
                    <button
                      key={app.id}
                      onClick={() => {}}
                      className="w-full flex items-center gap-3 px-2 py-2 text-foreground hover:bg-muted rounded-lg transition-colors text-left"
                    >
                      <div className="relative w-8 h-8 shrink-0">
                        {getAppIcon(app.id, "sm", true)}
                        {/* Connection badge - white circle with checkmark */}
                        <div className="absolute -bottom-0.5 -left-0.5 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-sm">
                          <svg className="w-2.5 h-2.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{app.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{app.description}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Footer - User Section */}
          <div ref={footerRef} className="p-4 border-t border-border bg-background">
            <div className="flex items-center justify-between">
              {/* User Avatar & Info */}
              <button 
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-3 hover:opacity-80 transition-opacity"
              >
                <div className="w-9 h-9 rounded-full bg-info flex items-center justify-center">
                  <span className="text-info-foreground font-semibold text-sm">
                    {userInitial}
                  </span>
                </div>
                <div className="text-left">
                  <p className="text-foreground text-sm font-medium">{user.name}</p>
                  <p className="text-muted-foreground text-xs">{user.plan}</p>
                </div>
              </button>

              {/* Upgrade Button */}
              <button
                onClick={() => { navigate("/subscription"); onClose(); }}
                className="px-3 py-1.5 bg-secondary rounded-full text-foreground text-xs font-medium hover:bg-secondary/80 transition-colors"
              >
                Mettre à niveau
              </button>
            </div>
          </div>

          {/* Profile Menu Popup - positioned above the avatar */}
          {showProfileMenu && (
            <div
              className="absolute left-3 right-3 bg-popover rounded-2xl shadow-xl border border-border overflow-hidden"
              style={{ bottom: `${popupBottom}px` }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Profile Header */}
              <div className="p-4 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-info flex items-center justify-center">
                    <span className="text-info-foreground font-semibold text-sm">
                      {userInitial}
                    </span>
                  </div>
                  <div>
                    <p className="text-foreground text-sm font-medium">{user.name}</p>
                    <p className="text-muted-foreground text-xs">@u{userId}</p>
                  </div>
                </div>
              </div>

              {/* Separator */}
              <div className="h-px bg-border mx-4" />

              {/* Profile Menu Items */}
              <div className="p-2">
                {profileMenuItems.map((item, index) => (
                  <div key={index}>
                    <button
                      onClick={() => {
                        item.action();
                        handleCloseProfileMenu();
                      }}
                      className="w-full flex items-center justify-between px-3 py-3 text-foreground hover:bg-muted rounded-lg transition-colors text-left"
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="w-5 h-5 text-muted-foreground" />
                        <span className="text-sm">{item.label}</span>
                      </div>
                      {item.hasChevron && (
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      )}
                    </button>
                    {index === 1 && <div className="h-px bg-border my-1 mx-3" />}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />
    </>
  );
};

export default SideMenu;
