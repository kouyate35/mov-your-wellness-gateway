import { Category } from "@/data/categories";
import { useRef } from "react";

interface ProgramCarouselProps {
  category: Category;
  selectedProgramId: string | null;
  onSelectProgram: (programId: string) => void;
}

// Gradient mappings for each category
const categoryGradients: Record<string, string> = {
  move: "from-emerald-600 via-green-500 to-teal-400",
  breath: "from-blue-600 via-cyan-500 to-sky-400",
  focus: "from-purple-600 via-violet-500 to-fuchsia-400",
};

const ProgramCarousel = ({ category, selectedProgramId, onSelectProgram }: ProgramCarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Get first 3 programs for the carousel
  const displayPrograms = category.programs.slice(0, 3);

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Choisissez votre programme
      </h3>
      
      {/* Horizontal scroll container */}
      <div 
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {displayPrograms.map((program) => (
          <button
            key={program.id}
            onClick={() => onSelectProgram(program.id)}
            className={`
              relative flex-shrink-0 w-[75%] snap-start rounded-2xl p-5 text-left
              bg-gradient-to-br ${categoryGradients[category.id]}
              transition-all duration-200
              ${selectedProgramId === program.id 
                ? 'ring-2 ring-white/50 scale-[1.02]' 
                : 'hover:scale-[1.01]'
              }
            `}
            style={{ minHeight: '140px' }}
          >
            {/* Selection indicator */}
            {selectedProgramId === program.id && (
              <div className="absolute top-3 right-3 w-5 h-5 bg-white/30 rounded-full flex items-center justify-center">
                <div className="w-2.5 h-2.5 bg-white rounded-full" />
              </div>
            )}
            
            {/* Duration badge */}
            <span className="inline-block px-2.5 py-1 rounded-full bg-white/20 text-white text-xs font-medium mb-3">
              {program.duration}
            </span>
            
            {/* Program name */}
            <h4 className="text-white font-bold text-lg mb-1.5 leading-tight">
              {program.name}
            </h4>
            
            {/* Description */}
            <p className="text-white/80 text-sm leading-relaxed line-clamp-2">
              {program.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProgramCarousel;
