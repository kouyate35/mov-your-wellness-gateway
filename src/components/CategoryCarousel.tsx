import { categories } from "@/data/categories";
import { useRef, useState } from "react";
import categoryMoveImg from "@/assets/category-move.jpg";
import categoryBreathImg from "@/assets/category-breath.jpg";
import categoryFocusImg from "@/assets/category-focus.jpg";
import { Dumbbell, Wind, Target, ChevronRight } from "lucide-react";

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
      const cardWidth = scrollRef.current.offsetWidth * 0.72;
      const gap = 12;
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
      const cardWidth = scrollRef.current.offsetWidth * 0.72;
      const gap = 12;
      const scrollLeft = scrollRef.current.scrollLeft;
      const newIndex = Math.round(scrollLeft / (cardWidth + gap));
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
      {/* Container with rounded corners and subtle background */}
      <div className="relative bg-secondary/10 rounded-3xl p-3 overflow-hidden">
        {/* Scrollable cards container */}
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {categories.map((category, index) => (
            <button
              key={category.id}
              onClick={() => scrollToCard(index)}
              className={`
                relative flex-shrink-0 w-[72%] aspect-[3/4] rounded-2xl overflow-hidden
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
              <div className="absolute top-0 left-0 right-0 p-5">
                <div className="flex items-center gap-2 mb-1">
                  <div className={`
                    w-7 h-7 rounded-full flex items-center justify-center
                    ${category.id === 'move' ? 'bg-move/20 text-move' : ''}
                    ${category.id === 'breath' ? 'bg-breath/20 text-breath' : ''}
                    ${category.id === 'focus' ? 'bg-focus/20 text-focus' : ''}
                  `}>
                    {categoryIcons[category.id]}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight">{category.name}</h3>
                <p className="text-white/80 text-xs font-medium uppercase tracking-wider mt-1">
                  {category.tagline}
                </p>
              </div>

              {/* Content - Bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <ul className="space-y-1.5 mb-3">
                  {categoryFeatures[category.id].map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-white/90 text-xs">
                      <span className="w-1 h-1 rounded-full bg-white/60" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                {/* Action hint */}
                <div className={`
                  inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium
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

        {/* Navigation arrow - positioned on the right inside the container */}
        <button
          onClick={handleNextCard}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-background transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-foreground" />
        </button>

        {/* Dots indicator - inside the container at bottom left */}
        <div className="flex gap-1.5 mt-3 ml-1">
          {categories.map((category, index) => (
            <button
              key={category.id}
              onClick={() => scrollToCard(index)}
              className={`
                h-1.5 rounded-full transition-all duration-300
                ${currentIndex === index 
                  ? `w-6 ${category.id === 'move' ? 'bg-move' : ''} ${category.id === 'breath' ? 'bg-breath' : ''} ${category.id === 'focus' ? 'bg-focus' : ''}` 
                  : "w-1.5 bg-white/30 hover:bg-white/50"
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
