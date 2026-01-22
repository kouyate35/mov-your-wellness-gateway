import { categories } from "@/data/categories";
import { useRef, useState } from "react";
import categoryMoveImg from "@/assets/category-move.jpg";
import categoryBreathImg from "@/assets/category-breath.jpg";
import categoryFocusImg from "@/assets/category-focus.jpg";
import { Dumbbell, Wind, Target } from "lucide-react";

interface CategoryCarouselProps {
  selectedCategory: "move" | "breath" | "focus";
  onSelectCategory: (id: "move" | "breath" | "focus") => void;
}

const categoryImages: Record<string, string> = {
  move: categoryMoveImg,
  breath: categoryBreathImg,
  focus: categoryFocusImg,
};

const categoryIcons: Record<string, React.ReactNode> = {
  move: <Dumbbell className="w-5 h-5" />,
  breath: <Wind className="w-5 h-5" />,
  focus: <Target className="w-5 h-5" />,
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

  const scrollToCard = (index: number) => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.offsetWidth * 0.82;
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
      const cardWidth = scrollRef.current.offsetWidth * 0.82;
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
              relative flex-shrink-0 w-[82%] aspect-[4/5] rounded-3xl overflow-hidden
              snap-center transition-all duration-300
              ${currentIndex === index ? "scale-100" : "scale-95 opacity-60"}
            `}
          >
            {/* Background image */}
            <img 
              src={categoryImages[category.id]} 
              alt={category.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
            
            {/* Content - Top */}
            <div className="absolute top-0 left-0 right-0 p-6">
              <div className="flex items-center gap-2 mb-1">
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center
                  ${category.id === 'move' ? 'bg-move/20 text-move' : ''}
                  ${category.id === 'breath' ? 'bg-breath/20 text-breath' : ''}
                  ${category.id === 'focus' ? 'bg-focus/20 text-focus' : ''}
                `}>
                  {categoryIcons[category.id]}
                </div>
              </div>
              <h3 className="text-3xl font-bold text-white tracking-tight">{category.name}</h3>
              <p className="text-white/80 text-sm font-medium uppercase tracking-wider mt-1">
                {category.tagline}
              </p>
            </div>

            {/* Content - Bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <ul className="space-y-2 mb-4">
                {categoryFeatures[category.id].map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-white/90 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              {/* Action hint */}
              <div className={`
                inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
                ${category.id === 'move' ? 'bg-move/20 text-move' : ''}
                ${category.id === 'breath' ? 'bg-breath/20 text-breath' : ''}
                ${category.id === 'focus' ? 'bg-focus/20 text-focus' : ''}
              `}>
                {categoryIcons[category.id]}
                <span>Commencer</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center gap-2 mt-3">
        {categories.map((category, index) => (
          <button
            key={category.id}
            onClick={() => scrollToCard(index)}
            className={`
              h-2 rounded-full transition-all duration-300
              ${currentIndex === index 
                ? `w-8 ${category.id === 'move' ? 'bg-move' : ''} ${category.id === 'breath' ? 'bg-breath' : ''} ${category.id === 'focus' ? 'bg-focus' : ''}` 
                : "w-2 bg-white/20 hover:bg-white/40"
              }
            `}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryCarousel;
