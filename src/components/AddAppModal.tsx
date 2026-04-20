import { useState, useMemo, useEffect, useRef } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Search, X } from "lucide-react";
import { apps, AppData } from "@/data/apps";
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

  const handleSearch = () => {
    const q = query.trim();
    if (!q) return;
    setMatchedApp(liveMatch);
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

  return (
    <>
      <Dialog open={isOpen && !scanOpen} onOpenChange={(o) => !o && onClose()}>
        <DialogContent
          className="sm:max-w-md bg-card border-border rounded-3xl p-0 gap-0 overflow-hidden"
          hideCloseButton
        >
          {/* Header */}
          <div className="px-6 pt-6 pb-4 flex items-start justify-between border-b border-border/50">
            <div>
              <h2 className="text-xl font-semibold text-foreground tracking-tight">
                Ajouter une application
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Recherche ou télécharge une appli manquante
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-secondary hover:bg-secondary/70 flex items-center justify-center transition-colors shrink-0"
              aria-label="Fermer"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>

          <div className="p-6 space-y-5">
            {/* Search bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Nom (ex. TikTok)"
                className="w-full h-12 pl-11 pr-[110px] bg-secondary/60 border border-border/50 rounded-full text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all truncate"
              />
              <button
                onClick={handleSearch}
                disabled={!query.trim()}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 h-9 px-4 rounded-full bg-foreground text-background text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
              >
                Rechercher
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-border/50" />
              <span className="text-[11px] uppercase tracking-wider text-muted-foreground/70 font-medium">
                ou télécharger
              </span>
              <div className="flex-1 h-px bg-border/50" />
            </div>

            {/* Stores — full bubble icons */}
            <div className="grid grid-cols-2 gap-3">
              {/* Play Store */}
              <button
                onClick={() => openStore("play")}
                className="group relative aspect-square rounded-3xl bg-white overflow-hidden shadow-sm border border-border/40 transition-all active:scale-[0.97] hover:shadow-md"
                aria-label="Ouvrir Play Store"
              >
                <svg
                  viewBox="0 0 512 512"
                  className="absolute inset-0 w-full h-full p-8"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="ps-blue" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00D4FF" />
                      <stop offset="100%" stopColor="#0085FF" />
                    </linearGradient>
                    <linearGradient id="ps-green" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00F076" />
                      <stop offset="100%" stopColor="#00C853" />
                    </linearGradient>
                    <linearGradient id="ps-yellow" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFD500" />
                      <stop offset="100%" stopColor="#FFA000" />
                    </linearGradient>
                    <linearGradient id="ps-red" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FF4F4F" />
                      <stop offset="100%" stopColor="#E53935" />
                    </linearGradient>
                  </defs>
                  <path
                    fill="url(#ps-blue)"
                    d="M48 24c-8 4-13 12-13 22v420c0 10 5 18 13 22l228-232L48 24z"
                  />
                  <path
                    fill="url(#ps-green)"
                    d="M380 154 96 14c-8-4-17-5-25-2l232 234 77-92z"
                  />
                  <path
                    fill="url(#ps-red)"
                    d="M303 268 71 500c8 3 17 2 25-2l284-140-77-90z"
                  />
                  <path
                    fill="url(#ps-yellow)"
                    d="M460 232 380 188l-77 80 77 80 80-44c22-12 22-60 0-72z"
                  />
                </svg>
              </button>

              {/* App Store */}
              <button
                onClick={() => openStore("app")}
                className="group relative aspect-square rounded-3xl overflow-hidden shadow-sm border border-border/40 transition-all active:scale-[0.97] hover:shadow-md"
                style={{
                  background:
                    "linear-gradient(135deg, #1FBFFE 0%, #1376FE 50%, #0E47C9 100%)",
                }}
                aria-label="Ouvrir App Store"
              >
                <svg
                  viewBox="0 0 100 100"
                  className="absolute inset-0 w-full h-full p-6"
                  fill="none"
                  stroke="white"
                  strokeWidth="7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Stylized "A" — App Store mark */}
                  <path d="M28 74 L46 36 L54 36 L72 74" />
                  <path d="M37 60 L63 60" />
                  <path d="M40 78 L42 81" />
                </svg>
              </button>
            </div>
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
