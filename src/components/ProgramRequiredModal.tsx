import { Sparkles } from "lucide-react";

interface ProgramRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProgram: () => void;
}

const ProgramRequiredModal = ({ isOpen, onClose, onSelectProgram }: ProgramRequiredModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-5">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={onClose} />

      <div className="relative w-full max-w-sm bg-card/95 backdrop-blur-xl border border-white/[0.06] rounded-3xl px-7 pt-8 pb-5 shadow-2xl animate-in zoom-in-95 fade-in duration-200">
        {/* Subtle icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 rounded-2xl bg-foreground/5 blur-xl" />
            <div className="relative w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-foreground/90" strokeWidth={1.6} />
            </div>
          </div>
        </div>

        {/* Eyebrow */}
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/70 text-center mb-2">
          Étape suivante
        </p>

        {/* Title */}
        <h3 className="text-[19px] font-semibold text-foreground text-center tracking-tight mb-3">
          Choisis ton programme
        </h3>

        <p className="text-muted-foreground text-center text-[13px] leading-relaxed mb-7 px-1">
          Cette application est connectée. Sélectionne un programme pour activer tes sessions.
        </p>

        <button
          onClick={onSelectProgram}
          className="w-full h-11 bg-foreground text-background font-semibold rounded-full text-[13.5px] hover:opacity-90 transition-opacity"
        >
          Choisir un programme
        </button>
        <button
          onClick={onClose}
          className="w-full mt-1 h-10 text-muted-foreground text-[12.5px] font-medium hover:text-foreground transition-colors"
        >
          Plus tard
        </button>
      </div>
    </div>
  );
};

export default ProgramRequiredModal;
