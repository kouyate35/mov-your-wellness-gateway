import { useState, useMemo, useEffect, useRef } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Search, Loader2, Check, X } from "lucide-react";
import { apps, AppData } from "@/data/apps";
import { getAppIcon } from "@/components/AppIcons";

interface AddAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  connectedAppIds: string[];
  onAddApp: (appId: string) => void;
}

type ScanState = "idle" | "scanning" | "found" | "not-found";

// Icônes officielles (URLs CDN simplecons / brand)
const PLAY_STORE_ICON =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/512px-Google_Play_Store_badge_EN.svg.png";

const AddAppModal = ({ isOpen, onClose, connectedAppIds, onAddApp }: AddAppModalProps) => {
  const [query, setQuery] = useState("");
  const [scanState, setScanState] = useState<ScanState>("idle");
  const [matchedApp, setMatchedApp] = useState<AppData | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Reset à l'ouverture
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setScanState("idle");
      setMatchedApp(null);
      setTimeout(() => inputRef.current?.focus(), 200);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isOpen]);

  // Suggestion en live (best match)
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
    const match = liveMatch;
    setMatchedApp(match);
    setScanState("scanning");

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      if (match) {
        setScanState("found");
        // auto-add après une courte pause
        timerRef.current = setTimeout(() => {
          onAddApp(match.id);
          onClose();
        }, 900);
      } else {
        setScanState("not-found");
      }
    }, 1500);
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

  const isAlreadyAdded = matchedApp ? connectedAppIds.includes(matchedApp.id) : false;

  return (
    <Dialog open={isOpen} onOpenChange={(o) => !o && onClose()}>
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
              onChange={(e) => {
                setQuery(e.target.value);
                if (scanState !== "idle") setScanState("idle");
              }}
              onKeyDown={handleKeyDown}
              placeholder="Nom de l'application (ex. Telegram)"
              className="w-full h-12 pl-11 pr-24 bg-secondary/60 border border-border/50 rounded-full text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all"
              disabled={scanState === "scanning"}
            />
            <button
              onClick={handleSearch}
              disabled={!query.trim() || scanState === "scanning"}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 h-9 px-4 rounded-full bg-foreground text-background text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
            >
              Rechercher
            </button>
          </div>

          {/* Scan / Result panel */}
          {scanState !== "idle" && (
            <div className="rounded-2xl bg-secondary/40 border border-border/40 p-5 animate-in fade-in slide-in-from-top-2 duration-300">
              {scanState === "scanning" && (
                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-14 shrink-0 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-2xl border-2 border-foreground/10" />
                    <div className="absolute inset-0 rounded-2xl border-2 border-t-foreground border-r-transparent border-b-transparent border-l-transparent animate-spin" />
                    {matchedApp ? (
                      <div className="scale-[0.55]">{getAppIcon(matchedApp.id, "md", true)}</div>
                    ) : (
                      <Loader2 className="w-5 h-5 text-foreground animate-spin" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      Recherche de « {query.trim()} »…
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Analyse de ton téléphone en cours
                    </p>
                  </div>
                </div>
              )}

              {scanState === "found" && matchedApp && (
                <div className="flex items-center gap-4">
                  <div className="relative shrink-0">
                    {getAppIcon(matchedApp.id, "md", true)}
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white flex items-center justify-center ring-2 ring-card">
                      <Check className="w-3 h-3 text-black" strokeWidth={3} />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">
                      {matchedApp.name} {isAlreadyAdded ? "déjà ajoutée" : "trouvée"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5 truncate">
                      {isAlreadyAdded ? "Cette appli est déjà dans ta liste" : "Ajout à ta liste…"}
                    </p>
                  </div>
                </div>
              )}

              {scanState === "not-found" && (
                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center shrink-0">
                      <Search className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground">Application introuvable</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Télécharge-la depuis un store ci-dessous
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-border/50" />
            <span className="text-[11px] uppercase tracking-wider text-muted-foreground/70 font-medium">
              ou télécharger
            </span>
            <div className="flex-1 h-px bg-border/50" />
          </div>

          {/* Stores */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => openStore("play")}
              className="group flex flex-col items-center gap-2 p-4 rounded-2xl bg-secondary/40 hover:bg-secondary/70 border border-border/40 transition-all active:scale-[0.97]"
            >
              <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-sm overflow-hidden">
                {/* Play Store SVG (Google official colors) */}
                <svg viewBox="0 0 512 512" className="w-9 h-9">
                  <path fill="#00C3FF" d="M325.3 234.3 104.7 32.5l297.4 171.7-77 77zM47.6 18C34.5 24.7 25.7 37.4 25.7 53.9v404.2c0 16.5 8.8 29.2 21.9 35.9l255.3-256L47.6 18z" />
                  <path fill="#FFCE00" d="m458.5 232.6-72.1-41.7-86.6 86 86.6 86.5 73.6-42.6c20.9-16.5 20.9-71.7-1.5-88.2z" />
                  <path fill="#00F076" d="M104.7 32.5 325.3 234.3l77-77L122.6 11.4C115.4 7.7 108.1 6 101.3 6c-9.4 0-17.7 3.2-24 9z" />
                  <path fill="#F63448" d="M302.9 277.9 47.6 494c10.5 5.4 23.9 4.8 38.9-3.9l298.9-172.8-82.5-39.4z" />
                </svg>
              </div>
              <div className="text-center">
                <p className="text-xs font-semibold text-foreground">Play Store</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">Android</p>
              </div>
            </button>

            <button
              onClick={() => openStore("app")}
              className="group flex flex-col items-center gap-2 p-4 rounded-2xl bg-secondary/40 hover:bg-secondary/70 border border-border/40 transition-all active:scale-[0.97]"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#00C8FF] via-[#0077FF] to-[#0040D0] flex items-center justify-center shadow-sm">
                {/* App Store SVG (Apple official "A" mark) */}
                <svg viewBox="0 0 24 24" className="w-8 h-8" fill="white">
                  <path d="M8.81 14.39h2.06l-.86-2.46-.18-.61c-.05-.21-.09-.39-.13-.55h-.04c-.04.16-.08.34-.13.55l-.18.61-.54 2.46zm10.45 1.4h-2.5l-.55 1.6c-.07.2-.18.34-.34.43-.16.09-.36.13-.6.13-.27 0-.5-.08-.66-.25-.17-.17-.25-.39-.25-.66 0-.16.04-.31.11-.46l3.3-9.27c.06-.18.18-.32.36-.43.18-.11.4-.16.66-.16.27 0 .49.05.67.16.18.11.3.25.36.43l3.3 9.27c.07.15.11.3.11.46 0 .27-.09.49-.26.66-.17.17-.39.25-.66.25-.24 0-.44-.04-.6-.13-.16-.09-.27-.23-.34-.43l-.55-1.6h-1.56zm-12.1.59-.5.86c-.06.11-.15.19-.26.25-.11.06-.23.09-.36.09-.27 0-.49-.09-.66-.25-.17-.17-.25-.39-.25-.66 0-.16.04-.31.13-.45l4.43-7.61-.79-1.36c-.09-.16-.13-.31-.13-.45 0-.27.08-.49.25-.66.17-.17.39-.25.66-.25.13 0 .25.03.36.09.11.06.2.14.26.25l.39.66.39-.66c.06-.11.15-.19.26-.25.11-.06.23-.09.36-.09.27 0 .49.08.66.25.17.17.25.39.25.66 0 .14-.04.29-.13.45l-3.69 6.34h2.67c.21 0 .39.06.53.19.14.13.21.31.21.54 0 .22-.07.4-.21.53-.14.13-.32.19-.53.19H6.78c-.21 0-.39-.06-.53-.19-.14-.13-.21-.31-.21-.54l-.88.05zm-.74-.74c0-.22.07-.4.21-.53.14-.13.32-.19.53-.19h.04c.21 0 .39.06.53.19.14.13.21.31.21.54 0 .22-.07.4-.21.53-.14.13-.32.19-.53.19H6.7c-.22 0-.39-.06-.54-.19-.13-.13-.21-.31-.21-.54z" />
                </svg>
              </div>
              <div className="text-center">
                <p className="text-xs font-semibold text-foreground">App Store</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">iOS</p>
              </div>
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddAppModal;
