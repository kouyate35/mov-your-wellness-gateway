import { Unlink } from "lucide-react";

interface DisconnectAppModalProps {
  isOpen: boolean;
  appName: string;
  onClose: () => void;
  onConfirm: () => void;
}

const DisconnectAppModal = ({ isOpen, appName, onClose, onConfirm }: DisconnectAppModalProps) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-50 animate-fade-in" onClick={onClose} />
      <div className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-50 max-w-sm mx-auto animate-scale-in">
        <div className="bg-zinc-900 rounded-3xl overflow-hidden border border-white/10">
          <div className="p-6 pt-8 text-center">
            <div className="w-14 h-14 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center">
              <Unlink className="w-7 h-7 text-white" />
            </div>

            <h2 className="text-xl font-semibold text-foreground mb-2">
              Déconnecter {appName} ?
            </h2>

            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Souhaitez-vous désactiver {appName} de Workout ? Vous devrez la reconnecter pour relancer vos sessions.
            </p>

            <div className="space-y-3">
              <button
                onClick={onConfirm}
                className="w-full py-3.5 bg-white text-black text-base font-medium rounded-full hover:bg-white/90 transition-colors"
              >
                Désactiver
              </button>
              <button
                onClick={onClose}
                className="w-full py-3 text-muted-foreground text-sm font-medium hover:text-foreground transition-colors"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DisconnectAppModal;
