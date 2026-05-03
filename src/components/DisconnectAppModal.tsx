import { Dialog, DialogContent } from "@/components/ui/dialog";
import { getAppIcon, MovIcon } from "@/components/AppIcons";
import { apps } from "@/data/apps";

interface DisconnectAppModalProps {
  isOpen: boolean;
  appId?: string;
  appName: string;
  onClose: () => void;
  onConfirm: () => void;
}

const DisconnectAppModal = ({ isOpen, appId, appName, onClose, onConfirm }: DisconnectAppModalProps) => {
  const app = apps.find((a) => a.id === appId);

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
              "linear-gradient(140deg, hsl(220 25% 22%) 0%, hsl(220 20% 14%) 50%, hsl(15 35% 22%) 100%)",
          }}
        >
          {/* Torn paper effect with two icons separating */}
          <div className="relative w-full flex items-center justify-center mb-6 h-24">
            {/* Left side - app icon (sliding left) */}
            <div
              className="absolute"
              style={{
                left: "calc(50% - 88px)",
                transform: "rotate(-8deg) translateX(-4px)",
                filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.4))",
              }}
            >
              {app ? getAppIcon(app.id, "lg", true) : null}
            </div>

            {/* Torn line (jagged) */}
            <svg
              width="40"
              height="96"
              viewBox="0 0 40 96"
              className="relative z-10"
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

            {/* Right side - workout icon (sliding right) */}
            <div
              className="absolute"
              style={{
                left: "calc(50% + 24px)",
                transform: "rotate(8deg) translateX(4px)",
                filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.4))",
              }}
            >
              <MovIcon size="lg" />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-xl font-semibold text-foreground text-center mb-3 px-2">
            Déconnecter {appName} de Workout&nbsp;?
          </h2>

          {/* Description */}
          <p className="text-sm text-foreground/70 text-center leading-relaxed mb-6 px-2">
            {appName} ne déclenchera plus de micro-défis. Tu pourras la reconnecter à tout moment.
          </p>

          {/* Buttons */}
          <div className="flex items-center gap-3 w-full">
            <button
              onClick={onConfirm}
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
      </DialogContent>
    </Dialog>
  );
};

export default DisconnectAppModal;
