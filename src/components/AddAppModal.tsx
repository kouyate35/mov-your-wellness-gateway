import { useState, useMemo, useEffect, useRef } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Search, X, ChevronRight } from "lucide-react";
import { apps, AppData } from "@/data/apps";
import { getAppIcon } from "./AppIcons";
import AppSearchAnimation from "./AppSearchAnimation";

interface AddAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  connectedAppIds: string[];
  onAddApp: (appId: string) => void;
}

const AddAppModal = ({ isOpen, onClose, connectedAppIds, onAddApp }: AddAppModalProps) => {
  const [query, setQuery] = useState("");
  const [scanOpen, setScanOpen] = useState(false);
  const [matchedApp, setMatchedApp] = useState<AppData | null>(null);
  const [scanQuery, setScanQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setScanOpen(false);
      setMatchedApp(null);
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen]);

  const liveMatch = useMemo<AppData | null>(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;
    return (
      apps.find((a) => a.name.toLowerCase() === q) ||
      apps.find((a) => a.name.toLowerCase().startsWith(q)) ||
      apps.find((a) => a.name.toLowerCase().includes(q)) ||
      null
    );
  }, [query]);

  const handleSearch = (preset?: AppData) => {
    const target = preset ?? liveMatch;
    const q = preset ? preset.name : query.trim();
    if (!q) return;
    setMatchedApp(target);
    setScanQuery(q);
    setScanOpen(true);
  };

  const handleScanComplete = (found: boolean) => {
    setScanOpen(false);
    if (found && matchedApp) {
      onAddApp(matchedApp.id);
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  const openStore = (store: "play" | "app") => {
    const q = encodeURIComponent(query.trim() || "apps");
    const url =
      store === "play"
        ? `https://play.google.com/store/search?q=${q}&c=apps`
        : `https://apps.apple.com/search?term=${q}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // Suggested apps: prioritize not-yet-connected, fall back to all apps
  const suggestedApps = useMemo(() => {
    const notConnected = apps.filter((a) => !connectedAppIds.includes(a.id));
    const list = notConnected.length > 0 ? notConnected : apps;
    return list.slice(0, 10);
  }, [connectedAppIds]);

  return (
    <>
      <Dialog open={isOpen && !scanOpen} onOpenChange={(o) => !o && onClose()}>
        <DialogContent
          className="w-[calc(100vw-32px)] max-w-[calc(100vw-32px)] sm:max-w-md min-w-0 bg-card border-border rounded-3xl p-0 gap-0 overflow-hidden"
          hideCloseButton
        >
          {/* Header — minimal "Envoi en tant que" style */}
          <div className="px-5 pt-5 pb-4 flex items-center justify-between min-w-0">
            <div className="flex flex-col min-w-0 pr-3">
              <span className="text-[11px] uppercase tracking-wider text-muted-foreground/70 font-medium">
                Ajouter
              </span>
              <h2 className="text-base font-semibold text-foreground leading-tight truncate">
                Nouvelle application
              </h2>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-secondary/70 hover:bg-secondary flex items-center justify-center transition-colors shrink-0"
              aria-label="Fermer"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>

          {/* Search bubble (équivalent "Inviter d'autres personnes") */}
          <div className="px-5 min-w-0">
            <div className="relative bg-secondary/50 rounded-2xl border border-border/40 p-3 flex items-center gap-2.5 min-w-0 overflow-hidden">
              <div className="w-9 h-9 rounded-full bg-background/60 flex items-center justify-center shrink-0">
                <Search className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Nom de l'application"
                  className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none truncate"
                />
                <p className="text-[11px] text-muted-foreground/70 mt-0.5 truncate">
                  Recherche dans le catalogue
                </p>
              </div>
              <button
                onClick={() => handleSearch()}
                disabled={!query.trim()}
                className="h-8 px-3 rounded-full bg-foreground text-background text-[11px] font-semibold disabled:opacity-30 disabled:cursor-not-allowed transition-opacity shrink-0"
              >
                Rechercher
              </button>
            </div>
          </div>

          {/* Suggested apps row — horizontal scroll, squircle icons */}
          {suggestedApps.length > 0 && (
            <div className="mt-5">
              <div
                className="flex gap-4 overflow-x-auto px-5 pb-3 scrollbar-hide"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {suggestedApps.map((app) => (
                  <button
                    key={app.id}
                    onClick={() => handleSearch(app)}
                    className="flex flex-col items-center gap-1.5 shrink-0 active:scale-95 transition-transform w-14"
                  >
                    {getAppIcon(app.id, "md")}
                    <span className="text-[10px] text-foreground/90 font-medium truncate w-full text-center leading-tight">
                      {app.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Divider */}
          <div className="mx-5 mt-3 h-px bg-border/40" />

          {/* Store rows — Play Store & App Store */}
          <div className="px-2 py-3 pb-5">
            <button
              onClick={() => openStore("play")}
              className="w-full flex items-center gap-4 px-3 py-3 rounded-2xl hover:bg-secondary/40 transition-colors"
            >
              <div className="w-11 h-11 rounded-full bg-secondary/70 flex items-center justify-center shrink-0">
                <svg viewBox="0 0 512 512" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="ps-blue-r" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00D4FF" />
                      <stop offset="100%" stopColor="#0085FF" />
                    </linearGradient>
                    <linearGradient id="ps-green-r" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00F076" />
                      <stop offset="100%" stopColor="#00C853" />
                    </linearGradient>
                    <linearGradient id="ps-yellow-r" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFD500" />
                      <stop offset="100%" stopColor="#FFA000" />
                    </linearGradient>
                    <linearGradient id="ps-red-r" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FF4F4F" />
                      <stop offset="100%" stopColor="#E53935" />
                    </linearGradient>
                  </defs>
                  <path fill="url(#ps-blue-r)" d="M48 24c-8 4-13 12-13 22v420c0 10 5 18 13 22l228-232L48 24z" />
                  <path fill="url(#ps-green-r)" d="M380 154 96 14c-8-4-17-5-25-2l232 234 77-92z" />
                  <path fill="url(#ps-red-r)" d="M303 268 71 500c8 3 17 2 25-2l284-140-77-90z" />
                  <path fill="url(#ps-yellow-r)" d="M460 232 380 188l-77 80 77 80 80-44c22-12 22-60 0-72z" />
                </svg>
              </div>
              <span className="flex-1 text-left text-sm text-foreground font-medium">
                Télécharger sur Play Store
              </span>
              <ChevronRight className="w-4 h-4 text-muted-foreground/60 shrink-0" />
            </button>

            <button
              onClick={() => openStore("app")}
              className="w-full flex items-center gap-4 px-3 py-3 rounded-2xl hover:bg-secondary/40 transition-colors"
            >
              <div className="w-11 h-11 rounded-full overflow-hidden shrink-0 flex items-center justify-center">
                <svg viewBox="0 0 256 256" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="as-bg-r" x1="50%" y1="0%" x2="50%" y2="100%">
                      <stop offset="0%" stopColor="#2AC9FA" />
                      <stop offset="100%" stopColor="#1F62E8" />
                    </linearGradient>
                  </defs>
                  <rect width="256" height="256" rx="56" fill="url(#as-bg-r)" />
                  <path
                    fill="#ffffff"
                    d="M82.6 174.7l-7.4 12.8c-2.7 4.7-8.7 6.3-13.4 3.6-4.7-2.7-6.3-8.7-3.6-13.4l5.5-9.5c6.2-1.9 11.3-.4 15.2 4.4l3.7 2.1zM168.9 154.6h22.7l-46.6-80.7-2.8 4.9c-3.2 5.5-3.7 11-1.7 17.5 4.5 7.7 11.2 19.4 20.1 35l8.3 23.3zm21.1 13.4H68.6c-5.4 0-9.8-4.4-9.8-9.8s4.4-9.8 9.8-9.8h25.2l32.3-55.9-10.1-17.5c-2.7-4.7-1.1-10.6 3.6-13.4 4.7-2.7 10.6-1.1 13.4 3.6l4.4 7.6 4.4-7.6c2.7-4.7 8.7-6.3 13.4-3.6 4.7 2.7 6.3 8.7 3.6 13.4l-42 72.7h30.4c9.9 0 15.4 11.6 11.1 19.7H190c5.4 0 9.8 4.4 9.8 9.8s-4.4 9.8-9.8 9.8z"
                  />
                </svg>
              </div>
              <span className="flex-1 text-left text-sm text-foreground font-medium">
                Télécharger sur App Store
              </span>
              <ChevronRight className="w-4 h-4 text-muted-foreground/60 shrink-0" />
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Full screen search animation */}
      <AppSearchAnimation
        isOpen={scanOpen}
        query={scanQuery}
        matchedApp={matchedApp}
        onComplete={handleScanComplete}
        onClose={() => setScanOpen(false)}
      />
    </>
  );
};

export default AddAppModal;
