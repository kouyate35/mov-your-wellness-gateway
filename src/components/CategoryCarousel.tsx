import { categories } from "@/data/categories";
import { useRef, useState } from "react";
import categoryMoveImg from "@/assets/category-move.jpg";
import categoryBreathImg from "@/assets/category-breath.jpg";
import categoryFocusImg from "@/assets/category-focus.jpg";
import { ChevronRight } from "lucide-react";

interface CategoryCarouselProps {
  selectedCategory: "move" | "breath" | "focus";
  onSelectCategory: (id: "move" | "breath" | "focus") => void;
}

const categoryImages: Record<string, string> = {
  move: categoryMoveImg,
  breath: categoryBreathImg,
  focus: categoryFocusImg,
};

const categoryFeatures: Record<string, string[]> = {
  move: ["Exercices rapides", "Condition physique", "Mobilité"],
  breath: ["Respiration guidée", "Méditation", "Relaxation"],
  focus: ["Intention claire", "Discipline", "Habitudes"],
};

const CategoryCarousel = ({ selectedCategory, onSelectCategory }: CategoryCarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(
    categories.findIndex(c => c.id === selectedCategory)
  );
  const [isTouching, setIsTouching] = useState(false);

  const scrollToCard = (index: number) => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.offsetWidth;
      scrollRef.current.scrollTo({
        left: index * cardWidth,
        behavior: "smooth"
      });
    }
    setCurrentIndex(index);
    onSelectCategory(categories[index].id);
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.offsetWidth;
      const scrollLeft = scrollRef.current.scrollLeft;
      const newIndex = Math.round(scrollLeft / cardWidth);
      if (newIndex !== currentIndex && newIndex >= 0 && newIndex < categories.length) {
        setCurrentIndex(newIndex);
        onSelectCategory(categories[newIndex].id);
      }
    }
  };

  const handleNextCard = () => {
    const nextIndex = (currentIndex + 1) % categories.length;
    scrollToCard(nextIndex);
  };

  return (
    <div className="w-full px-4">
      {/* Container - reduced height for minimal look */}
      <div 
        className="relative rounded-2xl overflow-hidden"
        onTouchStart={() => setIsTouching(true)}
        onTouchEnd={() => setIsTouching(false)}
        onMouseEnter={() => setIsTouching(true)}
        onMouseLeave={() => setIsTouching(false)}
      >
        {/* Scrollable cards container - compact aspect ratio */}
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {categories.map((category, index) => (
            <button
              key={category.id}
              onClick={() => scrollToCard(index)}
              className="relative flex-shrink-0 w-full aspect-[4/3] snap-start overflow-hidden"
            >
              {/* Background image */}
              <img 
                src={categoryImages[category.id]} 
                alt={category.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
              
              {/* Gradient overlay - minimal */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              {/* Content - Top only (name + tagline) */}
              <div className="absolute top-0 left-0 right-0 p-5">
                <h3 className="text-2xl font-bold text-white tracking-tight">{category.name}</h3>
                <p className="text-white/70 text-xs font-medium uppercase tracking-wider mt-1">
                  {category.tagline}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Navigation arrow - glassmorphism, appears only on touch/hover */}
        <button
          onClick={handleNextCard}
          className={`
            absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full 
            bg-white/20 backdrop-blur-md border border-white/30
            flex items-center justify-center
            transition-opacity duration-200
            ${isTouching ? 'opacity-100' : 'opacity-0'}
          `}
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>

        {/* Dots indicator - inside at bottom left */}
        <div className="absolute bottom-3 left-3 flex gap-1.5">
          {categories.map((category, index) => (
            <button
              key={category.id}
              onClick={() => scrollToCard(index)}
              className={`
                h-1.5 rounded-full transition-all duration-300
                ${currentIndex === index 
                  ? `w-5 ${category.id === 'move' ? 'bg-move' : ''} ${category.id === 'breath' ? 'bg-breath' : ''} ${category.id === 'focus' ? 'bg-focus' : ''}` 
                  : "w-1.5 bg-white/40 hover:bg-white/60"
                }
              `}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryCarousel;