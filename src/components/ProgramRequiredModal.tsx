import { AlertTriangle } from "lucide-react";

interface ProgramRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProgram: () => void;
}

const ProgramRequiredModal = ({ isOpen, onClose, onSelectProgram }: ProgramRequiredModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center px-4 pb-8">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      {/* Modal */}
      <div className="relative w-full max-w-sm bg-secondary rounded-3xl p-8 animate-slide-up">
        {/* Icon */}
        <div className="flex justify-center mb-5">
          <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center">
            <AlertTriangle className="w-7 h-7 text-foreground" />
          </div>
        </div>

        {/* Text */}
        <h3 className="text-xl font-semibold text-foreground text-center mb-2">
          Programme requis
        </h3>
        <p className="text-muted-foreground text-center text-sm leading-relaxed mb-8">
          Tu as connecté cette application mais tu n'as pas encore choisi de programme. 
          Sélectionne un programme pour activer tes sessions.
        </p>

        {/* Buttons */}
        <button
          onClick={onSelectProgram}
          className="w-full py-3.5 bg-white text-black font-medium rounded-full text-sm hover:bg-white/90 transition-colors mb-3"
        >
          Choisir un programme
        </button>
        <button
          onClick={onClose}
          className="w-full py-3 text-muted-foreground text-sm font-medium hover:text-foreground transition-colors"
        >
          Plus tard
        </button>
      </div>
    </div>
  );
};

export default ProgramRequiredModal;
