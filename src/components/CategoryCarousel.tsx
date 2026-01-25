import { categories } from "@/data/categories";
import { useState, useEffect, useCallback } from "react";
import categoryMoveImg from "@/assets/category-move.jpg";
import categoryFlexImg from "@/assets/category-flex.jpg";
import categoryBreathImg from "@/assets/category-breath.jpg";
import categoryFocusImg from "@/assets/category-focus.jpg";
import { ChevronRight } from "lucide-react";

interface CategoryCarouselProps {
  selectedCategory: "move" | "flex" | "breath" | "focus";
  onSelectCategory: React.Dispatch<React.SetStateAction<"move" | "flex" | "breath" | "focus">>;
}

const categoryImages: Record<string, string> = {
  move: categoryMoveImg,
  flex: categoryFlexImg,
  breath: categoryBreathImg,
  focus: categoryFocusImg,
};

// Category-specific animation styles
const categoryAnimations: Record<string, string> = {
  move: "animate-category-move",
  flex: "animate-category-flex", 
  breath: "animate-category-breath",
  focus: "animate-category-focus",
};

const AUTO_SCROLL_INTERVAL = 4000; // 4 seconds

const CategoryCarousel = ({ selectedCategory, onSelectCategory }: CategoryCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(
    categories.findIndex(c => c.id === selectedCategory)
  );
  const [isInteracting, setIsInteracting] = useState(false);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    const nextIndex = (currentIndex + 1) % categories.length;
    
    // Short delay for fade-out, then switch
    setTimeout(() => {
      setCurrentIndex(nextIndex);
      onSelectCategory(categories[nextIndex].id as "move" | "flex" | "breath" | "focus");
      // Allow fade-in to complete
      setTimeout(() => setIsTransitioning(false), 300);
    }, 150);
  }, [currentIndex, onSelectCategory, isTransitioning]);

  // Auto-scroll effect - infinite loop A → B → C → A with crossfade
  useEffect(() => {
    if (!isAutoScrolling || isInteracting) return;

    const interval = setInterval(() => {
      goToNext();
    }, AUTO_SCROLL_INTERVAL);

    return () => clearInterval(interval);
  }, [isAutoScrolling, isInteracting, goToNext]);

  const handleInteractionStart = () => {
    setIsInteracting(true);
    setIsAutoScrolling(false);
  };

  const handleInteractionEnd = () => {
    setIsInteracting(false);
    // Resume auto-scroll after 3 seconds of no interaction
    setTimeout(() => {
      setIsAutoScrolling(true);
    }, 3000);
  };

  const handleNextCard = () => {
    goToNext();
  };

  const currentCategory = categories[currentIndex];

  return (
    <div className="px-4 mb-4">
      {/* Container with crossfade effect */}
      <div 
        className="relative rounded-2xl overflow-hidden"
        style={{ aspectRatio: '4/3' }}
        onTouchStart={handleInteractionStart}
        onTouchEnd={handleInteractionEnd}
        onMouseEnter={handleInteractionStart}
        onMouseLeave={handleInteractionEnd}
      >
        {/* All cards stacked - only current one visible with crossfade */}
        {categories.map((category, index) => (
          <div
            key={category.id}
            className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
              index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {/* Background image with category-specific animation */}
            <img 
              src={categoryImages[category.id]} 
              alt={category.name}
              className={`absolute inset-0 w-full h-full object-cover ${
                index === currentIndex ? categoryAnimations[category.id] : ''
              }`}
            />
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            
            {/* Content - only title */}
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-white text-xl font-semibold">{category.name}</h3>
            </div>
          </div>
        ))}

        {/* Navigation arrow - only visible during interaction */}
        <button
          onClick={handleNextCard}
          className={`
            absolute right-3 top-1/2 -translate-y-1/2 z-20
            w-10 h-10 rounded-full
            bg-white/20 backdrop-blur-md
            flex items-center justify-center
            transition-all duration-300
            hover:bg-white/30
            ${isInteracting ? 'opacity-100' : 'opacity-0 pointer-events-none'}
          `}
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  );
};

export default CategoryCarousel;