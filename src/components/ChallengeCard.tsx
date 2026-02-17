import { useState, useCallback } from "react";
import { Smartphone, Timer, ChevronRight } from "lucide-react";
import FireEmojiAnimation from "./FireEmojiAnimation";

interface Challenge {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface ChallengeCardProps {
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

const ChallengeCard = ({ programName }: ChallengeCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedChallenges, setSelectedChallenges] = useState<string[]>([]);
  const [showFireAnimation, setShowFireAnimation] = useState(false);

  const handleAccept = () => {
    setShowFireAnimation(true);
    setIsExpanded(true);
  };

  const handleFireComplete = useCallback(() => {
    setShowFireAnimation(false);
  }, []);

  const toggleChallenge = (id: string) => {
    setSelectedChallenges(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  return (
    <>
      <FireEmojiAnimation isActive={showFireAnimation} onComplete={handleFireComplete} />
      
      <div className="mt-8 mx-1">
        {!isExpanded ? (
          /* Initial card - White background, black text */
          <button
            onClick={handleAccept}
            className="w-full bg-white rounded-2xl p-6 text-left transition-all active:scale-[0.98]"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-black font-semibold text-base mb-1">
                  🔥 Envie de te challenger ?
                </p>
                <p className="text-black/60 text-sm leading-relaxed">
                  Ajoute des défis supplémentaires liés à ton programme <span className="font-medium text-black/80">{programName}</span> pour aller plus loin.
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-black/40 flex-shrink-0 ml-3" />
            </div>
          </button>
        ) : (
          /* Expanded state - Challenge options */
          <div className="bg-white rounded-2xl p-6 space-y-4">
            <p className="text-black font-semibold text-base">
              Défis supplémentaires
            </p>
            <p className="text-black/60 text-sm leading-relaxed -mt-2">
              Liés à ton programme <span className="font-medium text-black/80">{programName}</span>
            </p>

            {challenges.map((challenge) => {
              const isSelected = selectedChallenges.includes(challenge.id);
              return (
                <button
                  key={challenge.id}
                  onClick={() => toggleChallenge(challenge.id)}
                  className={`
                    w-full flex items-start gap-4 p-4 rounded-xl text-left transition-all
                    ${isSelected 
                      ? 'bg-black text-white' 
                      : 'bg-gray-100 text-black hover:bg-gray-200'
                    }
                  `}
                >
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5
                    ${isSelected ? 'bg-white/20' : 'bg-black/10'}
                  `}>
                    <span className={isSelected ? 'text-white' : 'text-black'}>
                      {challenge.icon}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm mb-1">{challenge.title}</p>
                    <p className={`text-xs leading-relaxed ${isSelected ? 'text-white/70' : 'text-black/50'}`}>
                      {challenge.description}
                    </p>
                  </div>
                  <div className={`
                    w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1
                    ${isSelected ? 'bg-white border-white' : 'border-black/20'}
                  `}>
                    {isSelected && <div className="w-2 h-2 rounded-full bg-black" />}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default ChallengeCard;
