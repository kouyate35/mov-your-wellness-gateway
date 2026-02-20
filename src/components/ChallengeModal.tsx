import { useState } from "react";
import { ChevronRight } from "lucide-react";
import challengeMorningImg from "@/assets/challenge-morning.jpg";
import challengeDurationImg from "@/assets/challenge-duration.jpg";

interface Challenge {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
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
    subtitle: "Commence ta journée en mouvement",
    description:
      "Chaque matin, dès le déverrouillage de ton téléphone, effectue ton programme avant toute chose. Un rituel simple qui transforme tes habitudes et booste ton énergie pour la journée.",
    image: challengeMorningImg,
  },
  {
    id: "time-based",
    title: "Défi de durée",
    subtitle: "Reste actif tout au long de la journée",
    description:
      "Toutes les 45 minutes passées sur une app connectée, effectue ton programme pour continuer. Un défi d'endurance qui t'aide à rester en forme tout au long de la journée.",
    image: challengeDurationImg,
  },
];

const ChallengeModal = ({ isOpen, onClose, programName }: ChallengeModalProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!isOpen) return null;

  const currentChallenge = challenges[currentIndex];

  const nextChallenge = () => {
    setCurrentIndex((prev) => (prev + 1) % challenges.length);
  };

  const handleSelect = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" style={{ touchAction: 'none', overscrollBehavior: 'none' }}>
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        style={{ touchAction: 'none' }}
      />

      {/* Card — slides up from bottom */}
      <div className="relative w-full max-w-md rounded-t-3xl overflow-hidden bg-background animate-in slide-in-from-bottom duration-500 flex flex-col"
           style={{ maxHeight: "85vh", overscrollBehavior: 'contain', touchAction: 'pan-y' }}>

        {/* Hero image zone ~45% */}
        <div className="relative w-full" style={{ minHeight: "42%" }}>
          <img
            src={currentChallenge.image}
            alt={currentChallenge.title}
            className="w-full h-64 object-cover transition-opacity duration-300"
          />
          {/* Gradient overlay bottom for seamless fusion */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

          {/* Navigation arrow — top right */}
          <button
            onClick={nextChallenge}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/60 transition-colors"
            aria-label="Défi suivant"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

        </div>

        {/* Content */}
        <div className="px-6 pb-10 pt-8 flex flex-col flex-1">
          <h3 className="text-[26px] font-bold text-foreground leading-tight mb-2">
            {currentChallenge.title}
          </h3>
          <p className="text-[15px] font-medium text-primary/90 mb-5">
            {currentChallenge.subtitle}
          </p>
          <p className="text-[15px] text-muted-foreground leading-relaxed mb-10">
            {currentChallenge.description}
          </p>

          {/* CTA */}
          <button
            onClick={handleSelect}
            className="w-full py-4 rounded-2xl bg-white text-black font-semibold text-[15px] tracking-wide hover:bg-white/90 transition-colors mt-auto"
          >
            Choisir ce défi
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChallengeModal;
