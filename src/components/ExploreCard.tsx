import { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

interface Program {
  id: string;
  name: string;
  duration: string;
  description: string;
}

interface Category {
  id: string;
  name: string;
  color: string;
}

interface ExploreCardProps {
  program: Program;
  category: Category;
  videoSrc: string;
  onStart: () => void;
}

const categoryColors: Record<string, { badge: string; button: string }> = {
  move: { 
    badge: "bg-emerald-500", 
    button: "bg-emerald-500 hover:bg-emerald-600" 
  },
  flex: { 
    badge: "bg-amber-500", 
    button: "bg-amber-500 hover:bg-amber-600" 
  },
  breath: { 
    badge: "bg-blue-500", 
    button: "bg-blue-500 hover:bg-blue-600" 
  },
  focus: { 
    badge: "bg-violet-500", 
    button: "bg-violet-500 hover:bg-violet-600" 
  },
};

const ExploreCard = ({ program, category, videoSrc, onStart }: ExploreCardProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const colors = categoryColors[category.id] || categoryColors.move;

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay may be blocked
      });
    }
  }, [videoSrc]);

  return (
    <div className="relative h-screen w-full snap-start snap-always flex-shrink-0">
      {/* Video Background */}
      <video
        ref={videoRef}
        src={videoSrc}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 pb-24">
        {/* Category Badge */}
        <div className="mb-4">
          <span 
            className={`px-4 py-1.5 text-xs font-bold text-white rounded-full uppercase tracking-wider ${colors.badge}`}
          >
            {category.name}
          </span>
        </div>

        {/* Program Info */}
        <h1 className="text-3xl font-bold text-white mb-2">
          {program.name}
        </h1>
        <p className="text-white/70 text-sm mb-1">
          {program.duration} · {program.description}
        </p>

        {/* CTA Button */}
        <div className="mt-6">
          <Button
            onClick={onStart}
            className={`w-full h-14 rounded-2xl text-base font-semibold text-white ${colors.button}`}
          >
            <Play className="w-5 h-5 mr-2" fill="white" />
            Commencer
          </Button>
        </div>
      </div>

      {/* Swipe indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-1 text-white/50 text-xs">
        <span>Swipe pour découvrir</span>
        <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  );
};

export default ExploreCard;
