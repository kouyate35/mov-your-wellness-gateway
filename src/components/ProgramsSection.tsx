import { categories } from "@/data/categories";

// Video mapping for programs
const videoMap: Record<string, string> = {
  // MOVE
  "squats-10": "/src/assets/exercise-squats.mp4",
  "pompes-10": "/src/assets/exercise-pushups.mp4",
  "gainage": "/src/assets/exercise-plank.mp4",
  // FLEX
  "lateral-stretch": "/src/assets/exercise-lateral-stretch.mp4",
  "forward-fold": "/src/assets/exercise-forward-fold.mp4",
  "yoga-arms": "/src/assets/exercise-yoga-arms.mp4",
  // BREATH
  "box-breathing": "/src/assets/exercise-box-breathing.mp4",
  "coherence": "/src/assets/exercise-coherence.mp4",
  "pause": "/src/assets/exercise-pause.mp4",
  // FOCUS
  "intention": "/src/assets/category-focus-video.mp4",
  "timer": "/src/assets/category-focus-video.mp4",
  "affirmation": "/src/assets/category-focus-video.mp4",
};

// Program card with video background
const ProgramCard = ({ 
  programId, 
  name, 
  duration 
}: { 
  programId: string; 
  name: string; 
  duration: string;
}) => {
  const videoSrc = videoMap[programId] || videoMap["squats-10"];

  return (
    <div className="relative w-36 aspect-[3/4] rounded-2xl overflow-hidden shrink-0">
      {/* Video background */}
      <video
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      
      {/* Content */}
      <div className="absolute bottom-3 left-3 right-3">
        <p className="text-sm font-medium text-white">{name}</p>
        <p className="text-xs text-white/60">{duration}</p>
      </div>
    </div>
  );
};

// Category row with horizontal scroll
const CategoryRow = ({ 
  title, 
  subtitle, 
  programs 
}: { 
  title: string; 
  subtitle: string; 
  programs: { id: string; name: string; duration: string }[];
}) => {
  return (
    <div className="space-y-3">
      {/* Category header */}
      <div className="px-4">
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </div>
      
      {/* Horizontal scroll of programs */}
      <div className="flex gap-3 overflow-x-auto px-4 pb-2 scrollbar-hide">
        {programs.map((program) => (
          <ProgramCard
            key={program.id}
            programId={program.id}
            name={program.name}
            duration={program.duration}
          />
        ))}
      </div>
    </div>
  );
};

const ProgramsSection = () => {
  // All categories now have video support
  const categoriesWithVideos = categories;

  return (
    <div className="py-6 space-y-8 animate-fade-in">
      {categoriesWithVideos.map((category) => (
        <CategoryRow
          key={category.id}
          title={category.name}
          subtitle={category.tagline}
          programs={category.programs}
        />
      ))}
    </div>
  );
};

export default ProgramsSection;
