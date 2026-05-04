import { Dialog, DialogContent } from "@/components/ui/dialog";
import { getAppIcon, MovIcon } from "@/components/AppIcons";
import { AppData } from "@/data/apps";

interface ConnectAppModalProps {
  app: AppData;
  isOpen: boolean;
  onClose: () => void;
  onConnect: () => void;
}

const ConnectAppModal = ({ app, isOpen, onClose, onConnect }: ConnectAppModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        hideCloseButton
        className="sm:max-w-[340px] max-w-[calc(100%-48px)] mx-auto p-0 gap-0 border-0 overflow-hidden bg-transparent shadow-none"
      >
        <div
          className="rounded-3xl px-6 pt-8 pb-6 flex flex-col items-center relative overflow-hidden"
          style={{
            background:
              "linear-gradient(140deg, hsl(220 25% 22%) 0%, hsl(220 20% 14%) 50%, hsl(25 45% 22%) 100%)",
          }}
        >
          {/* Two icons connected by a flowing link */}
          <div className="relative w-full flex items-center justify-center mb-6 h-24">
            {/* Left side - app icon (slightly tilted toward center) */}
            <div
              className="absolute"
              style={{
                left: "calc(50% - 88px)",
                transform: "rotate(-4deg) translateX(4px)",
                filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.4))",
              }}
            >
              {getAppIcon(app.id, "lg", true)}
            </div>

            {/* Connection link (smooth wave with glow) */}
            <svg
              width="40"
              height="96"
              viewBox="0 0 40 96"
              className="relative z-10"
            >
              <defs>
                <linearGradient id="connect-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(25 95% 60%)" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="hsl(25 95% 60%)" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="hsl(25 95% 60%)" stopOpacity="0.2" />
                </linearGradient>
              </defs>
              {/* Smooth S-curve connecting both icons */}
              <path
                d="M20 4 C 28 24, 12 40, 20 48 C 28 56, 12 72, 20 92"
                stroke="url(#connect-grad)"
                strokeWidth="1.8"
                fill="none"
                strokeLinecap="round"
              />
              {/* Center connection node */}
              <circle cx="20" cy="48" r="3.5" fill="hsl(25 95% 60%)" opacity="0.95" />
              <circle cx="20" cy="48" r="6.5" fill="hsl(25 95% 60%)" opacity="0.25" />
            </svg>

            {/* Right side - workout icon (slightly tilted toward center) */}
            <div
              className="absolute"
              style={{
                left: "calc(50% + 24px)",
                transform: "rotate(4deg) translateX(-4px)",
                filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.4))",
              }}
            >
              <MovIcon size="lg" />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-xl font-semibold text-foreground text-center mb-3 px-2">
            Connecter {app.name} à Workout&nbsp;?
          </h2>

          {/* Description */}
          <p className="text-sm text-foreground/70 text-center leading-relaxed mb-6 px-2">
            Workout te propose des micro-défis rapides à chaque ouverture de {app.name}, pour prendre soin de ton corps au quotidien.
          </p>

          {/* Buttons */}
          <div className="flex items-center gap-3 w-full">
            <button
              onClick={onConnect}
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
      </DialogContent>
    </Dialog>
  );
};

export default ConnectAppModal;
