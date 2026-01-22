import { categories } from "@/data/categories";
import { useRef, useState } from "react";
import categoryMoveImg from "@/assets/category-move.jpg";
import categoryBreathImg from "@/assets/category-breath.jpg";
import categoryFocusImg from "@/assets/category-focus.jpg";

interface CategoryCarouselProps {
  selectedCategory: "move" | "breath" | "focus";
  onSelectCategory: (id: "move" | "breath" | "focus") => void;
}

const categoryImages: Record<string, string> = {
  move: categoryMoveImg,
  breath: categoryBreathImg,
  focus: categoryFocusImg,
};

const CategoryCarousel = ({ selectedCategory, onSelectCategory }: CategoryCarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(
    categories.findIndex(c => c.id === selectedCategory)
  );

  const scrollToCard = (index: number) => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.offsetWidth * 0.85;
      const gap = 16;
      scrollRef.current.scrollTo({
        left: index * (cardWidth + gap),
        behavior: "smooth"
      });
    }
    setCurrentIndex(index);
    onSelectCategory(categories[index].id);
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.offsetWidth * 0.85;
      const gap = 16;
      const scrollLeft = scrollRef.current.scrollLeft;
      const newIndex = Math.round(scrollLeft / (cardWidth + gap));
      if (newIndex !== currentIndex && newIndex >= 0 && newIndex < categories.length) {
        setCurrentIndex(newIndex);
        onSelectCategory(categories[newIndex].id);
      }
    }
  };

  return (
    <div className="w-full">
      {/* Scrollable cards container */}
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-4 overflow-x-auto px-4 pb-4 snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {categories.map((category, index) => (
          <button
            key={category.id}
            onClick={() => scrollToCard(index)}
            className={`
              relative flex-shrink-0 w-[85%] aspect-[16/10] rounded-3xl overflow-hidden
              snap-center transition-all duration-300
              ${currentIndex === index ? "ring-2 ring-white/30" : "opacity-70"}
            `}
          >
            {/* Background image */}
            <img 
              src={categoryImages[category.id]} 
              alt={category.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            
            {/* Content */}
            <div className="absolute inset-0 p-6 flex flex-col justify-end text-left">
              <h3 className="text-2xl font-bold text-white mb-1">{category.name}</h3>
              <p className="text-white/90 text-sm font-medium">{category.tagline}</p>
              <p className="text-white/70 text-xs mt-2 line-clamp-2">{category.description}</p>
            </div>

            {/* Selection indicator */}
            {currentIndex === index && (
              <div className="absolute top-4 right-4 w-6 h-6 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full" />
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center gap-2 mt-2">
        {categories.map((category, index) => (
          <button
            key={category.id}
            onClick={() => scrollToCard(index)}
            className={`
              h-1.5 rounded-full transition-all duration-300
              ${currentIndex === index 
                ? "w-6 bg-white" 
                : "w-1.5 bg-white/30 hover:bg-white/50"
              }
            `}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryCarousel;
