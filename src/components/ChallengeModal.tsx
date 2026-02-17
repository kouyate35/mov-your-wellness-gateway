import { useState } from "react";
import { Smartphone, Timer } from "lucide-react";

interface Challenge {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface ChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
  programName: string;
}

const challenges: Challenge[] = [
  {
    id: "morning-unlock",
    title: "Défi du matin",
    description: "Chaque matin, au déverrouillage de ton téléphone, effectue ton programme avant toute chose.",
    icon: <Smartphone className="w-5 h-5" />,
  },
  {
    id: "time-based",
    title: "Défi de durée",
    description: "Toutes les 45 minutes passées sur une app connectée, effectue ton programme pour continuer.",
    icon: <Timer className="w-5 h-5" />,
  },
];

const ChallengeModal = ({ isOpen, onClose, programName }: ChallengeModalProps) => {
  const [selectedChallenges, setSelectedChallenges] = useState<string[]>([]);

  if (!isOpen) return null;

  const toggleChallenge = (id: string) => {
    setSelectedChallenges(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const handleConfirm = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center px-4 pb-8">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-sm bg-secondary rounded-3xl p-8 animate-slide-up">
        {/* Fire icon */}
        <div className="flex justify-center mb-5">
          <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center">
            <span className="text-2xl">🔥</span>
          </div>
        </div>

        {/* Text */}
        <h3 className="text-xl font-semibold text-foreground text-center mb-2">
          Défis supplémentaires
        </h3>
        <p className="text-muted-foreground text-center text-sm leading-relaxed mb-6">
          Ajoute des défis liés à ton programme <span className="font-medium text-foreground/80">{programName}</span> pour aller plus loin.
        </p>

        {/* Challenge options */}
        <div className="space-y-3 mb-6">
          {challenges.map((challenge) => {
            const isSelected = selectedChallenges.includes(challenge.id);
            return (
              <button
                key={challenge.id}
                onClick={() => toggleChallenge(challenge.id)}
                className={`
                  w-full flex items-start gap-3 p-4 rounded-xl text-left transition-all
                  ${isSelected
                    ? 'bg-foreground text-background'
                    : 'bg-muted text-foreground hover:bg-muted/80'
                  }
                `}
              >
                <div className={`
                  w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5
                  ${isSelected ? 'bg-background/20' : 'bg-foreground/10'}
                `}>
                  <span className={isSelected ? 'text-background' : 'text-foreground'}>
                    {challenge.icon}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm mb-1">{challenge.title}</p>
                  <p className={`text-xs leading-relaxed ${isSelected ? 'text-background/70' : 'text-muted-foreground'}`}>
                    {challenge.description}
                  </p>
                </div>
                <div className={`
                  w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1
                  ${isSelected ? 'bg-background border-background' : 'border-muted-foreground/30'}
                `}>
                  {isSelected && <div className="w-2 h-2 rounded-full bg-foreground" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Buttons */}
        <button
          onClick={handleConfirm}
          className="w-full py-3.5 bg-white text-black font-medium rounded-full text-sm hover:bg-white/90 transition-colors mb-3"
        >
          {selectedChallenges.length > 0 ? "Valider mes défis" : "Choisir un challenge"}
        </button>
        <button
          onClick={onClose}
          className="w-full py-3 text-muted-foreground text-sm font-medium hover:text-foreground transition-colors"
        >
          Renoncer
        </button>
      </div>
    </div>
  );
};

export default ChallengeModal;
