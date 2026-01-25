import { Category } from "@/data/categories";
import { useRef } from "react";
import { Check, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Import exercise videos - Move
import exerciseSquats from "@/assets/exercise-squats.mp4";
import exercisePushups from "@/assets/exercise-pushups.mp4";
import exercisePlank from "@/assets/exercise-plank.mp4";

// Import exercise videos - Flex (new category)
import exerciseLateralStretch from "@/assets/exercise-lateral-stretch.mp4";
import exerciseForwardFold from "@/assets/exercise-forward-fold.mp4";
import exerciseYogaArms from "@/assets/exercise-yoga-arms.mp4";

// Import exercise videos - Breath
import exerciseBoxBreathing from "@/assets/exercise-box-breathing.mp4";
import exerciseCoherence from "@/assets/exercise-coherence.mp4";
import exercisePause from "@/assets/exercise-pause.mp4";

interface ProgramCarouselProps {
  category: Category;
  selectedProgramId: string | null;
  onSelectProgram: (programId: string) => void;
}

// Map program IDs to their video assets
const programVideos: Record<string, string> = {
  // Move
  "squats-10": exerciseSquats,
  "pompes-10": exercisePushups,
  "gainage": exercisePlank,
  // Flex
  "lateral-stretch": exerciseLateralStretch,
  "forward-fold": exerciseForwardFold,
  "yoga-arms": exerciseYogaArms,
  // Breath
  "box-breathing": exerciseBoxBreathing,
  "coherence": exerciseCoherence,
  "pause": exercisePause,
};

// Fallback gradients for Focus category (no videos yet)
const programGradients = [
  "from-purple-400 via-violet-500 to-indigo-600",
  "from-indigo-400 via-purple-500 to-pink-500",
  "from-violet-400 via-fuchsia-500 to-purple-600",
];

const ProgramCarousel = ({ category, selectedProgramId, onSelectProgram }: ProgramCarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  // Get first 3 programs for the carousel
  const displayPrograms = category.programs.slice(0, 3);

  const handleStartProgram = () => {
    if (selectedProgramId) {
      navigate(`/challenge?program=${selectedProgramId}`);
    }
  };

  // Check if category has videos (move, flex and breath)
  const hasVideos = category.id === "move" || category.id === "flex" || category.id === "breath";

  return (
    <div className="w-full">
      {/* Title with Play button */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-normal text-foreground">
            Choisissez votre programme
          </h3>
          
          {/* Play button - only visible when a program is selected */}
          {selectedProgramId && (
            <button
              onClick={handleStartProgram}
              className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-full font-medium text-sm hover:bg-white/90 transition-all animate-fade-in"
            >
              <Play className="w-4 h-4 fill-current" />
              Commencer
            </button>
          )}
        </div>
        <div className="h-px bg-border" />
      </div>
      
      {/* Horizontal scroll container */}
      <div 
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2 -mx-4 px-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {displayPrograms.map((program, index) => {
          const videoSrc = programVideos[program.id];
          const hasVideo = hasVideos && videoSrc;
          
          return (
            <button
              key={program.id}
              onClick={() => onSelectProgram(program.id)}
              className={`
                relative flex-shrink-0 w-[70%] snap-start rounded-3xl overflow-hidden
                transition-all duration-300
                ${selectedProgramId === program.id ? 'ring-2 ring-white ring-offset-2 ring-offset-background' : ''}
              `}
              style={{ aspectRatio: '3/4' }}
            >
              {/* Video background or gradient fallback */}
              {hasVideo ? (
                <video
                  src={videoSrc}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <div className={`absolute inset-0 bg-gradient-to-b ${programGradients[index % programGradients.length]}`} />
              )}
              
              {/* Dark overlay for better text readability on videos */}
              {hasVideo && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />
              )}
              
              {/* Content overlay */}
              <div className="relative h-full flex flex-col p-5">
                {/* Glassmorphism badge - top left - exercise name */}
                <div>
                  <span className="inline-block px-4 py-2 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 text-white text-sm font-semibold shadow-lg">
                    {program.name}
                  </span>
                </div>
                
                {/* Selection indicator - top right - clean white circle with check */}
                <div className="absolute top-4 right-4">
                  <div className={`
                    w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all
                    ${selectedProgramId === program.id 
                      ? 'bg-white border-white' 
                      : 'bg-white/20 backdrop-blur-sm border-white/40'
                    }
                  `}>
                    {selectedProgramId === program.id && (
                      <Check className="w-4 h-4 text-gray-800" strokeWidth={3} />
                    )}
                  </div>
                </div>
                
                {/* Duration badge - bottom left */}
                <div className="mt-auto">
                  <span className="inline-block px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-sm text-white/90 text-xs font-medium">
                    {program.duration}
                  </span>
                  <p className="text-white/80 text-sm leading-relaxed mt-2">
                    {program.description}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ProgramCarousel;
