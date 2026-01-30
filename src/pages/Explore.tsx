import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { categories } from "@/data/categories";
import ExploreCard from "@/components/ExploreCard";

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
import categoryFocusVideo from "@/assets/category-focus-video.mp4";

// Map program IDs to videos
const programVideos: Record<string, string> = {
  "squats-10": exerciseSquats,
  "pompes-10": exercisePushups,
  "gainage": exercisePlank,
  "lateral-stretch": exerciseLateralStretch,
  "forward-fold": exerciseForwardFold,
  "yoga-arms": exerciseYogaArms,
  "box-breathing": exerciseBoxBreathing,
  "coherence": exerciseCoherence,
  "pause": exercisePause,
  "intention": categoryFocusVideo,
  "timer": categoryFocusVideo,
  "affirmation": categoryFocusVideo,
};

// Build flat list of all programs with their categories
const allPrograms = categories.flatMap((category) =>
  category.programs.map((program) => ({
    program,
    category: {
      id: category.id,
      name: category.name,
      color: category.color,
    },
    videoSrc: programVideos[program.id] || categoryFocusVideo,
  }))
);

const Explore = () => {
  const navigate = useNavigate();

  const handleStartProgram = (programId: string) => {
    navigate(`/challenge?program=${programId}`);
  };

  return (
    <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth">
      {/* Floating back button */}
      <button
        onClick={() => navigate("/home")}
        className="fixed top-6 left-4 z-50 w-10 h-10 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center border border-white/10"
      >
        <ArrowLeft className="w-5 h-5 text-white" />
      </button>

      {/* Navigation dots */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2">
        {allPrograms.map((item, index) => (
          <div
            key={item.program.id}
            className="w-2 h-2 rounded-full bg-white/30"
          />
        ))}
      </div>

      {/* Fullscreen swipeable cards */}
      {allPrograms.map((item) => (
        <ExploreCard
          key={item.program.id}
          program={item.program}
          category={item.category}
          videoSrc={item.videoSrc}
          onStart={() => handleStartProgram(item.program.id)}
        />
      ))}
    </div>
  );
};

export default Explore;
