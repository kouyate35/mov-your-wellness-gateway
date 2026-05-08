import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { getAppIcon, MovIcon } from "@/components/AppIcons";
import { AppData } from "@/data/apps";
import { cn } from "@/lib/utils";

interface ConnectAppModalProps {
  app: AppData;
  isOpen: boolean;
  onClose: () => void;
  onConnect: () => void;
}

const ConnectAppModal = ({ app, isOpen, onClose, onConnect }: ConnectAppModalProps) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpen) setIsClosing(false);
  }, [isOpen]);

  const handleConnect = () => {
    setIsClosing(true);
    setTimeout(() => {
      onConnect();
    }, 700);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && !isClosing && onClose()}>
      <DialogContent
        hideCloseButton
        className={cn(
          "sm:max-w-[340px] max-w-[calc(100%-48px)] mx-auto p-0 gap-0 border-0 overflow-hidden bg-transparent shadow-none transition-all duration-500",
          isClosing && "opacity-0 scale-[0.92] blur-sm"
        )}
      >
        <div
          className="rounded-3xl px-6 pt-8 pb-6 flex flex-col items-center relative overflow-hidden"
          style={{
            background:
              "linear-gradient(140deg, hsl(220 25% 22%) 0%, hsl(220 20% 14%) 50%, hsl(25 45% 22%) 100%)",
          }}
        >
          {/* Two icons fusing */}
          <div className="relative w-full flex items-center justify-center mb-6 h-24">
            {/* Glow that intensifies during fusion */}
            <div
              className="absolute w-24 h-24 rounded-full transition-all duration-700"
              style={{
                background: "radial-gradient(circle, hsl(25 95% 60% / 0.6) 0%, transparent 70%)",
                opacity: isClosing ? 1 : 0,
                transform: isClosing ? "scale(1.4)" : "scale(0.6)",
                filter: "blur(8px)",
              }}
            />

            {/* Left side - app icon */}
            <div
              className="absolute transition-all duration-[700ms] ease-[cubic-bezier(0.65,0,0.35,1)]"
              style={{
                left: "calc(50% - 88px)",
                transform: isClosing
                  ? "translateX(64px) rotate(0deg) scale(0.7)"
                  : "rotate(-4deg) translateX(4px)",
                opacity: isClosing ? 0 : 1,
                filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.4))",
              }}
            >
              {getAppIcon(app.id, "lg", true)}
            </div>

            {/* Connection link */}
            <svg
              width="40"
              height="96"
              viewBox="0 0 40 96"
              className={cn(
                "relative z-10 transition-all duration-500",
                isClosing && "opacity-0 scale-90"
              )}
            >
              <defs>
                <linearGradient id="connect-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(25 95% 60%)" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="hsl(25 95% 60%)" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="hsl(25 95% 60%)" stopOpacity="0.2" />
                </linearGradient>
              </defs>
              <path
                d="M20 4 C 28 24, 12 40, 20 48 C 28 56, 12 72, 20 92"
                stroke="url(#connect-grad)"
                strokeWidth="1.8"
                fill="none"
                strokeLinecap="round"
              />
              <circle cx="20" cy="48" r="3.5" fill="hsl(25 95% 60%)" opacity="0.95" />
              <circle cx="20" cy="48" r="6.5" fill="hsl(25 95% 60%)" opacity="0.25" />
            </svg>

            {/* Right side - workout icon */}
            <div
              className="absolute transition-all duration-[700ms] ease-[cubic-bezier(0.65,0,0.35,1)]"
              style={{
                left: "calc(50% + 24px)",
                transform: isClosing
                  ? "translateX(-64px) rotate(0deg) scale(0.7)"
                  : "rotate(4deg) translateX(-4px)",
                opacity: isClosing ? 0 : 1,
                filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.4))",
              }}
            >
              <MovIcon size="lg" />
            </div>
          </div>

          <div className={cn("transition-opacity duration-300 w-full flex flex-col items-center", isClosing && "opacity-0")}>
            <h2 className="text-xl font-semibold text-foreground text-center mb-3 px-2">
              Connecter {app.name} à Workout&nbsp;?
            </h2>

            <p className="text-sm text-foreground/70 text-center leading-relaxed mb-6 px-2">
              Workout te propose des micro-défis rapides à chaque ouverture de {app.name}, pour prendre soin de ton corps au quotidien.
            </p>

            <div className="flex items-center gap-3 w-full">
              <button
                onClick={handleConnect}
                className="flex-1 py-3 bg-foreground text-background text-sm font-semibold rounded-full hover:bg-foreground/90 transition-colors"
              >
                Connecter
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-3 bg-white/10 backdrop-blur-md text-foreground text-sm font-semibold rounded-full hover:bg-white/15 transition-colors border border-white/10"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConnectAppModal;
