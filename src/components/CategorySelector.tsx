import { categories, getCategoryById, Category } from "@/data/categories";
import { useRef, useState, useEffect } from "react";
import categoryMoveImg from "@/assets/category-move.jpg";
import categoryFlexImg from "@/assets/category-flex.jpg";
import categoryBreathImg from "@/assets/category-breath.jpg";
import categoryFocusImg from "@/assets/category-focus.jpg";
import { ChevronRight, Check } from "lucide-react";
import ProgramCarousel from "./ProgramCarousel";

type CategoryId = Category["id"];

interface CategorySelectorProps {
  selectedCategory: CategoryId;
  onSelectCategory: (id: CategoryId) => void;
  selectedProgramId: string | null;
  onSelectProgram: (programId: string) => void;
}

const categoryImages: Record<string, string> = {
  move: categoryMoveImg,
  flex: categoryFlexImg,
  breath: categoryBreathImg,
  focus: categoryFocusImg,
};

const categoryFeatures: Record<string, string[]> = {
  move: ["Exercices rapides", "Condition physique", "Mobilité"],
  flex: ["Étirements doux", "Souplesse", "Articulations"],
  breath: ["Respiration guidée", "Méditation", "Relaxation"],
  focus: ["Intention claire", "Discipline", "Habitudes"],
};

// Short descriptions for each category (ChatGPT style)
const categoryDescriptions: Record<string, string> = {
  move: "Réveille ton corps avec des exercices rapides avant de scroller. Chaque mouvement compte pour ta santé.",
  flex: "Améliore ta souplesse et libère les tensions avec des étirements doux. Prends soin de tes articulations.",
  breath: "Calme ton esprit et réduis l'impulsivité avec des exercices de respiration guidée.",
  focus: "Crée une intention claire avant d'ouvrir l'app. Prends le contrôle de tes habitudes.",
};

const CategorySelector = ({ selectedCategory, onSelectCategory, selectedProgramId, onSelectProgram }: CategorySelectorProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(
    categories.findIndex(c => c.id === selectedCategory)
  );
  const [isTouching, setIsTouching] = useState(false);

  // Sync currentIndex when selectedCategory changes externally
  useEffect(() => {
    const index = categories.findIndex(c => c.id === selectedCategory);
    if (index !== currentIndex) {
      setCurrentIndex(index);
    }
  }, [selectedCategory]);

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

  const currentCategory = categories[currentIndex];

  // Color classes for dots
  const getCategoryDotColor = (catId: string) => {
    switch(catId) {
      case 'move': return 'bg-move';
      case 'flex': return 'bg-amber-500';
      case 'breath': return 'bg-breath';
      case 'focus': return 'bg-focus';
      default: return 'bg-white';
    }
  };

  return (
    <div className="w-full">
      {/* Container - full width cards, one visible at a time */}
      <div 
        className="relative rounded-3xl overflow-hidden"
        onTouchStart={() => setIsTouching(true)}
        onTouchEnd={() => setIsTouching(false)}
        onMouseEnter={() => setIsTouching(true)}
        onMouseLeave={() => setIsTouching(false)}
      >
        {/* Scrollable cards container - full width per card */}
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
              className="relative flex-shrink-0 w-full aspect-[3/4] snap-start overflow-hidden"
            >
              {/* Background image */}
              <img 
                src={categoryImages[category.id]} 
                alt={category.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
              
              {/* Selection indicator - top right circle */}
              <div className="absolute top-4 right-4">
                <div 
                  className={`
                    w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-200
                    ${currentIndex === index 
                      ? 'bg-white border-white' 
                      : 'bg-transparent border-white/50'
                    }
                  `}
                >
                  {currentIndex === index && (
                    <Check className="w-4 h-4 text-black" />
                  )}
                </div>
              </div>
              
              {/* Content - Top */}
              <div className="absolute top-0 left-0 right-0 p-6 pr-14">
                <h3 className="text-3xl font-bold text-white tracking-tight">{category.name}</h3>
                <p className="text-white/80 text-sm font-medium uppercase tracking-wider mt-2">
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
              </div>
            </button>
          ))}
        </div>

        {/* Navigation arrow - glassmorphism, appears only on touch/hover */}
        <button
          onClick={handleNextCard}
          className={`
            absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full 
            bg-white/20 backdrop-blur-md border border-white/30
            flex items-center justify-center
            transition-opacity duration-200
            ${isTouching ? 'opacity-100' : 'opacity-0'}
          `}
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Dots indicator - inside at bottom left */}
        <div className="absolute bottom-4 left-4 flex gap-2">
          {categories.map((category, index) => (
            <button
              key={category.id}
              onClick={() => scrollToCard(index)}
              className={`
                h-2 rounded-full transition-all duration-300
                ${currentIndex === index 
                  ? `w-7 ${getCategoryDotColor(category.id)}` 
                  : "w-2 bg-white/40 hover:bg-white/60"
                }
              `}
            />
          ))}
        </div>
      </div>

      {/* Dynamic description text - ChatGPT style */}
      <p className="text-white text-base leading-relaxed mt-6 px-1">
        {categoryDescriptions[currentCategory.id]}
      </p>

      {/* Program Carousel - below description */}
      <div className="mt-8">
        <ProgramCarousel 
          category={currentCategory}
          selectedProgramId={selectedProgramId}
          onSelectProgram={onSelectProgram}
        />
      </div>
    </div>
  );
};

export default CategorySelector;
