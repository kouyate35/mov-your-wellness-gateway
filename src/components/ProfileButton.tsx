import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Sparkles, Settings, HelpCircle, LogOut, ChevronRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import SettingsModal from "@/components/SettingsModal";
import HelpModal from "@/components/HelpModal";

const ProfileButton = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [userId] = useState(() => Math.random().toString().slice(2, 12));
  const popupRef = useRef<HTMLDivElement>(null);

  const user = { name: "Jojo", plan: "Free" };
  const userInitial = user.name.charAt(0).toUpperCase();

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const items = [
    { icon: Sparkles, label: "Passer au forfait supérieur", action: () => { navigate("/subscription"); setOpen(false); } },
    { icon: Settings, label: "Paramètres", action: () => { setShowSettings(true); setOpen(false); } },
    { icon: HelpCircle, label: "Aide", hasChevron: true, action: () => { setShowHelp(true); setOpen(false); } },
    { icon: LogOut, label: "Se déconnecter", action: async () => { await supabase.auth.signOut(); toast.success("Déconnexion réussie"); navigate("/"); setOpen(false); } },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-9 h-9 rounded-full bg-secondary/60 flex items-center justify-center active:scale-95 transition-transform"
        aria-label="Profil"
      >
        <User className="w-5 h-5 text-foreground" strokeWidth={1.8} />
      </button>

      {open && (
        <div
          ref={popupRef}
          className="absolute top-full right-0 mt-2 w-[260px] bg-popover rounded-2xl shadow-xl border border-border overflow-hidden z-50 animate-fade-in"
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
            {items.map((item, index) => (
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
              onClick={() => { navigate("/subscription"); setOpen(false); }}
              className="px-2.5 py-1 bg-secondary rounded-full text-foreground text-[10px] font-medium hover:bg-secondary/80 transition-colors"
            >
              Mettre à niveau
            </button>
          </div>
        </div>
      )}

      <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />
      <HelpModal isOpen={showHelp} onClose={() => setShowHelp(false)} />
    </div>
  );
};

export default ProfileButton;
