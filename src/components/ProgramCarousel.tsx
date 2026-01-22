import { Program, Category } from "@/data/categories";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface ProgramCarouselProps {
  category: Category;
  selectedProgramId: string | null;
  onSelectProgram: (programId: string) => void;
}

const ProgramCarousel = ({ category, selectedProgramId, onSelectProgram }: ProgramCarouselProps) => {
  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold text-foreground mb-4 px-4">
        Programmes {category.name}
      </h3>
      <Carousel
        opts={{
          align: "start",
          loop: false,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 pl-4">
          {category.programs.map((program) => (
            <CarouselItem key={program.id} className="pl-2 basis-[70%] sm:basis-[45%]">
              <ProgramCard
                program={program}
                category={category}
                isSelected={selectedProgramId === program.id}
                onSelect={() => onSelectProgram(program.id)}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

interface ProgramCardProps {
  program: Program;
  category: Category;
  isSelected: boolean;
  onSelect: () => void;
}

const ProgramCard = ({ program, category, isSelected, onSelect }: ProgramCardProps) => {
  return (
    <button
      onClick={onSelect}
      className={`
        w-full p-4 rounded-xl text-left transition-all duration-200
        ${isSelected 
          ? `bg-gradient-to-br ${category.gradient} ring-2 ring-white/30` 
          : "bg-card hover:bg-accent"
        }
      `}
    >
      <div className="flex items-center justify-between mb-2">
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
          isSelected ? "bg-white/20 text-white" : "bg-secondary text-muted-foreground"
        }`}>
          {program.duration}
        </span>
        {isSelected && (
          <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
            <div className="w-2.5 h-2.5 bg-white rounded-full" />
          </div>
        )}
      </div>
      <h4 className={`font-semibold mb-1 ${isSelected ? "text-white" : "text-foreground"}`}>
        {program.name}
      </h4>
      <p className={`text-sm line-clamp-2 ${isSelected ? "text-white/80" : "text-muted-foreground"}`}>
        {program.description}
      </p>
    </button>
  );
};

export default ProgramCarousel;
