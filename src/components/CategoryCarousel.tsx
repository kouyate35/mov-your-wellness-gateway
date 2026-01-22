import { categories, Category } from "@/data/categories";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface CategoryCarouselProps {
  selectedCategory: "move" | "breath" | "focus";
  onSelectCategory: (id: "move" | "breath" | "focus") => void;
}

const CategoryCarousel = ({ selectedCategory, onSelectCategory }: CategoryCarouselProps) => {
  return (
    <div className="w-full px-4">
      <Carousel
        opts={{
          align: "center",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2">
          {categories.map((category) => (
            <CarouselItem key={category.id} className="pl-2 basis-[85%] sm:basis-[70%]">
              <CategoryCard
                category={category}
                isSelected={selectedCategory === category.id}
                onSelect={() => onSelectCategory(category.id)}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

interface CategoryCardProps {
  category: Category;
  isSelected: boolean;
  onSelect: () => void;
}

const CategoryCard = ({ category, isSelected, onSelect }: CategoryCardProps) => {
  return (
    <button
      onClick={onSelect}
      className={`
        relative w-full overflow-hidden rounded-2xl p-6 text-left transition-all duration-300
        bg-gradient-to-br ${category.gradient}
        ${isSelected ? "ring-2 ring-white/50 scale-[1.02]" : "opacity-80 hover:opacity-100"}
      `}
    >
      <div className="relative z-10">
        <div className="text-4xl mb-3">{category.icon}</div>
        <h3 className="text-2xl font-bold text-white mb-1">{category.name}</h3>
        <p className="text-white/90 text-sm font-medium mb-2">{category.tagline}</p>
        <p className="text-white/70 text-xs line-clamp-2">{category.description}</p>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
      
      {isSelected && (
        <div className="absolute top-3 right-3 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
          <div className="w-3 h-3 bg-white rounded-full" />
        </div>
      )}
    </button>
  );
};

export default CategoryCarousel;
