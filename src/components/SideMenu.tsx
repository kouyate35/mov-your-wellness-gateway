import { useState } from "react";
import { X, Sparkles, Search, LayoutGrid, Link2, Settings, HelpCircle, LogOut, ChevronRight } from "lucide-react";
import movIcon from "@/assets/mov-icon.png";

interface UserData {
  name: string;
  plan: "Free" | "Pro";
}

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideMenu = ({ isOpen, onClose }: SideMenuProps) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  // Mock user data - in production this would come from auth context
  const user: UserData = {
    name: "Jojo",
    plan: "Free"
  };

  const userInitial = user.name.charAt(0).toUpperCase();

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
      setShowProfileMenu(false);
    }
  };

  const menuItems = [
    { icon: Sparkles, label: "Nouveau moment", action: () => {} },
    { icon: Search, label: "Explorer", action: () => {} },
  ];

  const secondaryItems = [
    { icon: LayoutGrid, label: "Programmes", action: () => {} },
    { icon: Link2, label: "Applications connectées", action: () => {} },
  ];

  const profileMenuItems = [
    { icon: Sparkles, label: "Passer au forfait supérieur", action: () => {} },
    { icon: Settings, label: "Paramètres", action: () => {} },
    { icon: HelpCircle, label: "Aide", hasChevron: true, action: () => {} },
    { icon: LogOut, label: "Se déconnecter", action: () => {} },
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/60 z-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={handleBackdropClick}
      >
        {/* Side Menu Panel */}
        <div
          className={`fixed left-0 top-0 h-full w-[85%] max-w-[320px] bg-sidebar-background flex flex-col transition-transform duration-300 ease-out ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 pt-5">
            <img 
              src={movIcon} 
              alt="Mov" 
              className="w-8 h-8 rounded-lg"
            />
            <button 
              onClick={onClose}
              className="p-1 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Main Menu Items */}
          <nav className="flex-1 px-3 py-4 overflow-y-auto">
            {/* Primary Actions */}
            <div className="space-y-1 mb-6">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={item.action}
                  className="w-full flex items-center gap-3 px-3 py-3 text-foreground hover:bg-sidebar-accent rounded-lg transition-colors text-left"
                >
                  <item.icon className="w-5 h-5 text-muted-foreground" />
                  <span className="text-[15px]">{item.label}</span>
                </button>
              ))}
            </div>

            {/* Separator */}
            <div className="h-px bg-sidebar-border mb-6" />

            {/* Secondary Items */}
            <div className="space-y-1">
              {secondaryItems.map((item, index) => (
                <button
                  key={index}
                  onClick={item.action}
                  className="w-full flex items-center gap-3 px-3 py-3 text-foreground hover:bg-sidebar-accent rounded-lg transition-colors text-left"
                >
                  <item.icon className="w-5 h-5 text-muted-foreground" />
                  <span className="text-[15px]">{item.label}</span>
                </button>
              ))}
            </div>
          </nav>

          {/* Footer - User Section */}
          <div className="p-4 border-t border-sidebar-border">
            <div className="flex items-center justify-between">
              {/* User Avatar & Info */}
              <button 
                onClick={() => setShowProfileMenu(true)}
                className="flex items-center gap-3 hover:opacity-80 transition-opacity"
              >
                <div className="w-10 h-10 rounded-full bg-info flex items-center justify-center">
                  <span className="text-info-foreground font-semibold text-base">
                    {userInitial}
                  </span>
                </div>
                <div className="text-left">
                  <p className="text-foreground text-[15px] font-medium">{user.name}</p>
                  <p className="text-muted-foreground text-sm">{user.plan}</p>
                </div>
              </button>

              {/* Upgrade Button */}
              <button className="px-4 py-2 bg-secondary rounded-full text-foreground text-sm font-medium hover:bg-secondary/80 transition-colors">
                Mettre à niveau
              </button>
            </div>
          </div>
        </div>

        {/* Profile Menu Popup */}
        {showProfileMenu && (
          <div
            className={`fixed left-0 bottom-0 w-[85%] max-w-[320px] bg-popover rounded-t-2xl transition-transform duration-300 ease-out ${
              showProfileMenu ? "translate-y-0" : "translate-y-full"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Profile Header */}
            <div className="p-4 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-info flex items-center justify-center">
                  <span className="text-info-foreground font-semibold text-sm">
                    {userInitial}
                  </span>
                </div>
                <div>
                  <p className="text-foreground text-[15px] font-medium">{user.name}</p>
                  <p className="text-muted-foreground text-sm">@u{Math.random().toString().slice(2, 12)}</p>
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
                    onClick={item.action}
                    className="w-full flex items-center justify-between px-3 py-3.5 text-foreground hover:bg-accent rounded-lg transition-colors text-left"
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="w-5 h-5 text-muted-foreground" />
                      <span className="text-[15px]">{item.label}</span>
                    </div>
                    {item.hasChevron && (
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    )}
                  </button>
                  {index === 1 && <div className="h-px bg-border my-1" />}
                </div>
              ))}
            </div>

            {/* Bottom Footer in Popup */}
            <div className="p-4 pt-2 border-t border-border">
              <div className="flex items-center justify-between">
                <button 
                  onClick={() => setShowProfileMenu(false)}
                  className="flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-full bg-info flex items-center justify-center">
                    <span className="text-info-foreground font-semibold text-base">
                      {userInitial}
                    </span>
                  </div>
                  <div className="text-left">
                    <p className="text-foreground text-[15px] font-medium">{user.name}</p>
                    <p className="text-muted-foreground text-sm">{user.plan}</p>
                  </div>
                </button>
                <button className="px-4 py-2 bg-secondary rounded-full text-foreground text-sm font-medium hover:bg-secondary/80 transition-colors">
                  Mettre à niveau
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SideMenu;
