import { useNavigate } from "react-router-dom";
import BentoCard from "@/components/BentoCard";

// Import category videos
import categoryMoveVideo from "@/assets/category-move-video.mp4";
import categoryFlexVideo from "@/assets/category-flex-video.mp4";
import categoryBreathVideo from "@/assets/category-breath-video.mp4";
import categoryFocusVideo from "@/assets/category-focus-video.mp4";

// Import exercise videos
import exerciseSquats from "@/assets/exercise-squats.mp4";
import exercisePushups from "@/assets/exercise-pushups.mp4";
import exercisePlank from "@/assets/exercise-plank.mp4";
import exerciseLateralStretch from "@/assets/exercise-lateral-stretch.mp4";
import exerciseForwardFold from "@/assets/exercise-forward-fold.mp4";
import exerciseYogaArms from "@/assets/exercise-yoga-arms.mp4";
import exerciseBoxBreathing from "@/assets/exercise-box-breathing.mp4";
import exerciseCoherence from "@/assets/exercise-coherence.mp4";
import exercisePause from "@/assets/exercise-pause.mp4";

interface BentoItem {
  id: string;
  name: string;
  videoSrc: string;
  size: "small" | "medium" | "large" | "wide" | "tall";
}

// All 16 cards: 4 categories + 12 programs (3 per category)
const bentoItems: BentoItem[] = [
  // Row 1: MOVE (tall) + FLEX (large)
  { id: "move", name: "MOVE", videoSrc: categoryMoveVideo, size: "tall" },
  { id: "flex", name: "FLEX", videoSrc: categoryFlexVideo, size: "large" },
  
  // Row 2: Squats (small) + BREATH (large spanning)
  { id: "squats-10", name: "Squats", videoSrc: exerciseSquats, size: "small" },
  { id: "breath", name: "BREATH", videoSrc: categoryBreathVideo, size: "large" },
  
  // Row 3: Pompes + Focus (tall)
  { id: "pompes-10", name: "Pompes", videoSrc: exercisePushups, size: "small" },
  { id: "focus", name: "FOCUS", videoSrc: categoryFocusVideo, size: "tall" },
  
  // Row 4: Gainage (wide) + Flexion latérale
  { id: "gainage", name: "Gainage", videoSrc: exercisePlank, size: "wide" },
  { id: "lateral-stretch", name: "Flexion latérale", videoSrc: exerciseLateralStretch, size: "small" },
  
  // Row 5: Pince debout + Bras en prière (wide)
  { id: "forward-fold", name: "Pince debout", videoSrc: exerciseForwardFold, size: "small" },
  { id: "yoga-arms", name: "Bras en prière", videoSrc: exerciseYogaArms, size: "wide" },
  
  // Row 6: Box Breathing (medium) + Cohérence (medium)
  { id: "box-breathing", name: "Box Breathing", videoSrc: exerciseBoxBreathing, size: "medium" },
  { id: "coherence", name: "Cohérence", videoSrc: exerciseCoherence, size: "medium" },
  
  // Row 7: Pause consciente (wide)
  { id: "pause", name: "Pause consciente", videoSrc: exercisePause, size: "wide" },
  
  // Focus programs - simplified names
  { id: "intention", name: "Intention", videoSrc: categoryFocusVideo, size: "small" },
  { id: "timer", name: "Timer", videoSrc: categoryFocusVideo, size: "small" },
  { id: "affirmation", name: "Affirmation", videoSrc: categoryFocusVideo, size: "small" },
];

const Explore = () => {
  const navigate = useNavigate();

  const handleCardClick = (id: string) => {
    // Navigate to category or program detail
    console.log("Clicked:", id);
  };

  return (
    <div className="min-h-screen bg-background p-3">
      {/* Bento Grid - No header, just the grid */}
      <div 
        className="grid gap-2"
        style={{
          gridTemplateColumns: "repeat(3, 1fr)",
          gridAutoRows: "100px",
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
    </div>
  );
};

export default Explore;
