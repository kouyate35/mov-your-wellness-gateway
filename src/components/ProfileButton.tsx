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
          className="absolute top-full right-0 mt-2 w-[268px] bg-popover/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/[0.06] overflow-hidden z-50 animate-fade-in"
        >
          <div className="px-4 pt-4 pb-3.5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-info to-info/70 flex items-center justify-center shadow-sm">
                <span className="text-info-foreground font-semibold text-[14px]">{userInitial}</span>
              </div>
              <div className="min-w-0">
                <p className="text-foreground text-[13.5px] font-semibold leading-tight truncate">{user.name}</p>
                <p className="text-muted-foreground text-[11px] mt-0.5 truncate">@u{userId}</p>
              </div>
            </div>
          </div>

          <div className="h-px bg-white/[0.05]" />

          <div className="py-1.5">
            {items.slice(0, 2).map((item, index) => (
              <button
                key={index}
                onClick={item.action}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-foreground hover:bg-white/[0.03] transition-colors text-left"
              >
                <item.icon className="w-[18px] h-[18px] text-muted-foreground/80" strokeWidth={1.7} />
                <span className="text-[13px] flex-1">{item.label}</span>
              </button>
            ))}
          </div>

          <div className="h-px bg-white/[0.05]" />

          <div className="py-1.5">
            {items.slice(2).map((item, index) => (
              <button
                key={index}
                onClick={item.action}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-foreground hover:bg-white/[0.03] transition-colors text-left"
              >
                <item.icon className="w-[18px] h-[18px] text-muted-foreground/80" strokeWidth={1.7} />
                <span className="text-[13px] flex-1">{item.label}</span>
                {item.hasChevron && <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/50" />}
              </button>
            ))}
          </div>

          <div className="border-t border-white/[0.05] px-3 py-2.5 flex items-center justify-between bg-white/[0.015]">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-info to-info/70 flex items-center justify-center">
                <span className="text-info-foreground font-semibold text-[11px]">{userInitial}</span>
              </div>
              <div className="min-w-0">
                <p className="text-foreground text-[11.5px] font-semibold leading-tight truncate">{user.name}</p>
                <p className="text-muted-foreground text-[10px] mt-0.5">{user.plan}</p>
              </div>
            </div>
            <button
              onClick={() => { navigate("/subscription"); setOpen(false); }}
              className="px-3 py-1.5 bg-foreground text-background rounded-full text-[10.5px] font-semibold hover:opacity-90 transition-opacity shrink-0"
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
