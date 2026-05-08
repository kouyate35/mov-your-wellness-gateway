import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { getAppIcon, MovIcon } from "@/components/AppIcons";
import { apps } from "@/data/apps";
import { cn } from "@/lib/utils";

interface DisconnectAppModalProps {
  isOpen: boolean;
  appId?: string;
  appName: string;
  onClose: () => void;
  onConfirm: () => void;
}

const DisconnectAppModal = ({ isOpen, appId, appName, onClose, onConfirm }: DisconnectAppModalProps) => {
  const app = apps.find((a) => a.id === appId);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpen) setIsClosing(false);
  }, [isOpen]);

  const handleConfirm = () => {
    setIsClosing(true);
    setTimeout(() => {
      onConfirm();
    }, 650);
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
              "linear-gradient(140deg, hsl(220 25% 22%) 0%, hsl(220 20% 14%) 50%, hsl(15 35% 22%) 100%)",
          }}
        >
          {/* Two icons separating */}
          <div className="relative w-full flex items-center justify-center mb-6 h-24">
            {/* Left side - app icon */}
            <div
              className="absolute transition-all duration-[650ms] ease-[cubic-bezier(0.55,0,0.2,1)]"
              style={{
                left: "calc(50% - 88px)",
                transform: isClosing
                  ? "rotate(-18deg) translateX(-60px) scale(0.85)"
                  : "rotate(-8deg) translateX(-4px)",
                opacity: isClosing ? 0 : 1,
                filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.4))",
              }}
            >
              {app ? getAppIcon(app.id, "lg", true) : null}
            </div>

            {/* Torn line */}
            <svg
              width="40"
              height="96"
              viewBox="0 0 40 96"
              className={cn(
                "relative z-10 transition-all duration-500",
                isClosing && "opacity-0 scale-y-150"
              )}
              style={{ filter: "drop-shadow(0 0 8px rgba(255,255,255,0.05))" }}
            >
              <path
                d="M20 0 L14 8 L24 16 L12 24 L26 32 L14 40 L24 48 L12 56 L26 64 L14 72 L24 80 L16 88 L20 96"
                stroke="hsl(0 0% 100% / 0.25)"
                strokeWidth="1.5"
                fill="none"
                strokeDasharray="2 3"
              />
            </svg>

            {/* Right side - workout icon */}
            <div
              className="absolute transition-all duration-[650ms] ease-[cubic-bezier(0.55,0,0.2,1)]"
              style={{
                left: "calc(50% + 24px)",
                transform: isClosing
                  ? "rotate(18deg) translateX(60px) scale(0.85)"
                  : "rotate(8deg) translateX(4px)",
                opacity: isClosing ? 0 : 1,
                filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.4))",
              }}
            >
              <MovIcon size="lg" />
            </div>
          </div>

          <div className={cn("transition-opacity duration-300 w-full flex flex-col items-center", isClosing && "opacity-0")}>
            <h2 className="text-xl font-semibold text-foreground text-center mb-3 px-2">
              Déconnecter {appName} de Workout&nbsp;?
            </h2>

            <p className="text-sm text-foreground/70 text-center leading-relaxed mb-6 px-2">
              {appName} ne déclenchera plus de micro-défis. Tu pourras la reconnecter à tout moment.
            </p>

            <div className="flex items-center gap-3 w-full">
              <button
                onClick={handleConfirm}
                className="flex-1 py-3 bg-foreground text-background text-sm font-semibold rounded-full hover:bg-foreground/90 transition-colors"
              >
                Déconnecter
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

export default DisconnectAppModal;
