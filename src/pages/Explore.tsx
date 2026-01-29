import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import BentoCard from "@/components/BentoCard";

// Import category videos
import categoryMoveVideo from "@/assets/category-move-video.mp4";
import categoryFlexVideo from "@/assets/category-flex-video.mp4";
import categoryBreathVideo from "@/assets/category-breath-video.mp4";
import categoryFocusVideo from "@/assets/category-focus-video.mp4";

// Import exercise videos
import exerciseSquats from "@/assets/exercise-squats.mp4";
import exercisePushups from "@/assets/exercise-pushups.mp4";
import exerciseLateralStretch from "@/assets/exercise-lateral-stretch.mp4";
import exerciseBoxBreathing from "@/assets/exercise-box-breathing.mp4";
import exerciseYogaArms from "@/assets/exercise-yoga-arms.mp4";
import exerciseCoherence from "@/assets/exercise-coherence.mp4";

interface BentoItem {
  id: string;
  name: string;
  videoSrc: string;
  size: "small" | "medium" | "large" | "wide";
}

const bentoItems: BentoItem[] = [
  // First row: MOVE (medium) + FLEX (large)
  { id: "move", name: "MOVE", videoSrc: categoryMoveVideo, size: "medium" },
  { id: "flex", name: "FLEX", videoSrc: categoryFlexVideo, size: "large" },
  
  // Second row (continues): Squats (small)
  { id: "squats-10", name: "Squats", videoSrc: exerciseSquats, size: "small" },
  
  // Third row: BREATH (large) + FOCUS (medium)
  { id: "breath", name: "BREATH", videoSrc: categoryBreathVideo, size: "large" },
  { id: "focus", name: "FOCUS", videoSrc: categoryFocusVideo, size: "medium" },
  
  // Fourth row: 3 small cards
  { id: "pompes-10", name: "Pompes", videoSrc: exercisePushups, size: "small" },
  { id: "lateral-stretch", name: "Flexion latérale", videoSrc: exerciseLateralStretch, size: "small" },
  { id: "box-breathing", name: "Box Breathing", videoSrc: exerciseBoxBreathing, size: "small" },
  
  // Fifth row: Wide cards
  { id: "yoga-arms", name: "Bras en prière", videoSrc: exerciseYogaArms, size: "wide" },
  { id: "coherence", name: "Cohérence cardiaque", videoSrc: exerciseCoherence, size: "wide" },
];

const Explore = () => {
  const navigate = useNavigate();

  const handleCardClick = (id: string) => {
    // Navigate to category or program detail
    // For now, just log it
    console.log("Clicked:", id);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="flex items-center gap-4 px-4 py-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-semibold text-foreground">Explorer</h1>
        </div>
      </header>

      {/* Bento Grid */}
      <main className="p-4">
        <div 
          className="grid gap-3"
          style={{
            gridTemplateColumns: "repeat(3, 1fr)",
            gridAutoRows: "120px",
          }}
        >
          {bentoItems.map((item) => (
            <BentoCard
              key={item.id}
              id={item.id}
              name={item.name}
              videoSrc={item.videoSrc}
              size={item.size}
              onClick={() => handleCardClick(item.id)}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Explore;
