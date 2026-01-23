import { Category } from "@/data/categories";
import { useRef } from "react";

interface ProgramCarouselProps {
  category: Category;
  selectedProgramId: string | null;
  onSelectProgram: (programId: string) => void;
}

// ChatGPT-style vibrant gradients for each program card
const programGradients = [
  "bg-gradient-to-b from-sky-200 via-blue-400 via-purple-400 to-rose-500",
  "bg-gradient-to-b from-amber-200 via-orange-400 via-rose-400 to-purple-500",
  "bg-gradient-to-b from-teal-200 via-cyan-400 via-blue-400 to-indigo-500",
];

const ProgramCarousel = ({ category, selectedProgramId, onSelectProgram }: ProgramCarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Get first 3 programs for the carousel
  const displayPrograms = category.programs.slice(0, 3);

  return (
    <div className="w-full">
      {/* Title with separator line */}
      <div className="mb-5">
        <h3 className="text-lg font-normal text-foreground mb-3">
          Choisissez votre programme
        </h3>
        <div className="h-px bg-border" />
      </div>
      
      {/* Horizontal scroll container */}
      <div 
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2 -mx-4 px-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {displayPrograms.map((program, index) => (
          <button
            key={program.id}
            onClick={() => onSelectProgram(program.id)}
            className={`
              relative flex-shrink-0 w-[55%] snap-start rounded-2xl overflow-hidden
              transition-all duration-200
              ${selectedProgramId === program.id 
                ? 'ring-2 ring-white/50 scale-[1.02]' 
                : 'hover:scale-[1.01]'
              }
            `}
            style={{ aspectRatio: '3/4' }}
          >
            {/* Gradient background - ChatGPT style */}
            <div className={`absolute inset-0 ${programGradients[index % programGradients.length]}`} />
            
            {/* Content overlay */}
            <div className="relative h-full flex flex-col justify-end p-4">
              {/* Duration badge - top left */}
              <div className="absolute top-3 left-3">
                <span className="inline-block px-3 py-1.5 rounded-full bg-white/25 backdrop-blur-sm text-white text-xs font-medium">
                  {program.duration}
                </span>
              </div>
              
              {/* Selection indicator - top right */}
              {selectedProgramId === program.id && (
                <div className="absolute top-3 right-3 w-5 h-5 bg-white/30 rounded-full flex items-center justify-center">
                  <div className="w-2.5 h-2.5 bg-white rounded-full" />
                </div>
              )}
              
              {/* Program name & description - bottom */}
              <div className="mt-auto">
                <h4 className="text-white font-bold text-xl mb-2 leading-tight">
                  {program.name}
                </h4>
                <p className="text-white/85 text-sm leading-relaxed">
                  {program.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProgramCarousel;
