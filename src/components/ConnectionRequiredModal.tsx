import { AlertCircle, Link } from "lucide-react";

interface ConnectionRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: () => void;
}

const ConnectionRequiredModal = ({
  isOpen,
  onClose,
  onConnect,
}: ConnectionRequiredModalProps) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 z-50"
        onClick={onClose}
      />

      {/* Modal - centered, Apple-like style */}
      <div className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-50 max-w-sm mx-auto">
        <div className="bg-zinc-900 rounded-3xl overflow-hidden border border-white/10">
          {/* Content */}
          <div className="p-6 pt-8 text-center">
            {/* Icon */}
            <div className="w-14 h-14 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center">
              <Link className="w-7 h-7 text-white" />
            </div>

            {/* Title */}
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Connexion requise
            </h2>

            {/* Description */}
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Connecte d'abord cette application à Mov pour pouvoir sélectionner ton programme et débloquer tes sessions.
            </p>

            {/* Buttons */}
            <div className="space-y-3">
              <button
                onClick={onConnect}
                className="w-full py-3.5 bg-white text-black text-base font-medium rounded-full hover:bg-white/90 transition-colors"
              >
                Connecter
              </button>
              
              <button
                onClick={onClose}
                className="w-full py-3 text-muted-foreground text-sm font-medium hover:text-foreground transition-colors"
              >
                Plus tard
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConnectionRequiredModal;
