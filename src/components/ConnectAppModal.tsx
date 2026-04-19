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
          className="rounded-3xl px-6 pt-8 pb-6 flex flex-col items-center"
          style={{
            background:
              "linear-gradient(to bottom right, hsl(199 89% 60%), hsl(199 89% 70%), hsl(40 90% 75%))",
          }}
        >
          {/* App icons */}
          <div className="flex items-center gap-4 mb-5">
            {getAppIcon(app.id, "lg", true)}
            <span className="text-foreground/40 text-2xl font-light">|</span>
            <MovIcon size="lg" />
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-foreground text-center mb-3">
            Connecter {app.name} à Workout
          </h2>

          {/* Subtitle */}
          <p className="text-sm text-foreground/80 text-center max-w-[260px] mb-6 leading-relaxed">
            Workout utilise {app.name} pour mieux comprendre vos habitudes numériques et vous proposer un programme adapté.
          </p>

          {/* Buttons */}
          <div className="flex items-center gap-3 w-full justify-center">
            <button
              onClick={onConnect}
              className="px-7 py-3 bg-background text-foreground font-medium rounded-full text-sm hover:bg-background/90 transition-colors shadow-sm"
            >
              Connecter
            </button>
            <button
              onClick={onClose}
              className="px-7 py-3 bg-foreground text-background font-medium rounded-full text-sm hover:bg-foreground/90 transition-colors"
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
