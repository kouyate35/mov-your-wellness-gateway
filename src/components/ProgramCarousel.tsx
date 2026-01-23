import { Category } from "@/data/categories";
import { useRef } from "react";
import { Check } from "lucide-react";

interface ProgramCarouselProps {
  category: Category;
  selectedProgramId: string | null;
  onSelectProgram: (programId: string) => void;
}

// ChatGPT-style vibrant multi-color gradients
const programGradients = [
  "from-sky-300 via-blue-400 via-indigo-400 to-rose-400",
  "from-amber-300 via-orange-400 via-rose-400 to-purple-500",
  "from-emerald-300 via-teal-400 via-cyan-400 to-blue-500",
];

const ProgramCarousel = ({ category, selectedProgramId, onSelectProgram }: ProgramCarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Get first 3 programs for the carousel
  const displayPrograms = category.programs.slice(0, 3);

  return (
    <div className="w-full">
      {/* Title with separator line */}
      <div className="mb-4">
        <h3 className="text-base font-normal text-foreground mb-3">
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
              relative flex-shrink-0 w-[60%] snap-start rounded-3xl overflow-hidden
              transition-all duration-300
            `}
            style={{ aspectRatio: '3/4' }}
          >
            {/* Gradient background - ChatGPT style smooth */}
            <div className={`absolute inset-0 bg-gradient-to-b ${programGradients[index % programGradients.length]}`} />
            
            {/* Content overlay */}
            <div className="relative h-full flex flex-col p-5">
              {/* Duration badge - top left - more subtle */}
              <div>
                <span className="inline-block px-3 py-1.5 rounded-full bg-white/30 backdrop-blur-sm text-white/90 text-xs font-medium">
                  {program.duration}
                </span>
              </div>
              
              {/* Selection indicator - top right - clean white circle with check */}
              <div className="absolute top-4 right-4">
                <div className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all
                  ${selectedProgramId === program.id 
                    ? 'bg-white border-white' 
                    : 'bg-transparent border-white/40'
                  }
                `}>
                  {selectedProgramId === program.id && (
                    <Check className="w-3.5 h-3.5 text-gray-800" strokeWidth={3} />
                  )}
                </div>
              </div>
              
              {/* Program name & description - bottom */}
              <div className="mt-auto">
                <h4 className="text-white font-bold text-2xl mb-2 leading-tight">
                  {program.name}
                </h4>
                <p className="text-white/80 text-sm leading-relaxed">
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
