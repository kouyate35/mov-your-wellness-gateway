import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import onboardingHero from "@/assets/onboarding-hero.jpg";
import boxBreathingVideo from "@/assets/exercise-box-breathing.mp4";
import pushupsVideo from "@/assets/exercise-pushups.mp4";
import forwardFoldVideo from "@/assets/exercise-forward-fold.mp4";
import pauseVideo from "@/assets/exercise-pause.mp4";

const CATEGORY_VIDEOS = [
  { src: boxBreathingVideo, label: "Sérénité" },
  { src: pushupsVideo, label: "Force" },
  { src: forwardFoldVideo, label: "Souplesse" },
  { src: pauseVideo, label: "Pause" },
];

const OnboardingStep2 = () => {
  const navigate = useNavigate();
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [activeVideo, setActiveVideo] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef(0);
  const maxDragRef = useRef(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveVideo((i) => (i + 1) % CATEGORY_VIDEOS.length);
    }, 4500);
    return () => clearInterval(id);
  }, []);

  const getMaxDrag = () => {
    const w = containerRef.current?.offsetWidth ?? 0;
    // 56px = button (h-14 minus padding) → ensure handle reaches the right edge
    return Math.max(0, w - 56);
  };

  const handleStart = (clientX: number) => {
    if (completed) return;
    maxDragRef.current = getMaxDrag();
    setIsDragging(true);
    startXRef.current = clientX;
  };

  const handleMove = (clientX: number) => {
    if (!isDragging) return;
    const diff = clientX - startXRef.current;
    const newX = Math.max(0, Math.min(diff, maxDragRef.current));
    setDragX(newX);
  };

  const handleEnd = () => {
    const threshold = maxDragRef.current * 0.85;
    if (dragX >= threshold && maxDragRef.current > 0) {
      setDragX(maxDragRef.current);
      setCompleted(true);
      setTimeout(() => navigate("/auth"), 250);
    } else {
      setDragX(0);
    }
    setIsDragging(false);
  };

  const progress = maxDragRef.current > 0 ? dragX / maxDragRef.current : 0;

  const handleTouchStart = (e: React.TouchEvent) => handleStart(e.touches[0].clientX);
  const handleTouchMove = (e: React.TouchEvent) => handleMove(e.touches[0].clientX);
  const handleMouseDown = (e: React.MouseEvent) => handleStart(e.clientX);
  const handleMouseMove = (e: React.MouseEvent) => handleMove(e.clientX);

  return (
    <div className="fixed inset-0 overflow-hidden bg-black">
      {/* Full-screen crossfading video background — NO blur, fully visible */}
      <div className="absolute inset-0">
        {CATEGORY_VIDEOS.map((v, i) => (
          <video
            key={v.src}
            src={v.src}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
            style={{ opacity: activeVideo === i ? 1 : 0 }}
            aria-hidden="true"
          />
        ))}
        {/* Light gradient overlay only — keeps videos crisp, ensures text legibility top + bottom */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.10) 28%, rgba(0,0,0,0.10) 60%, rgba(0,0,0,0.75) 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col px-6">


        {/* Bottom block: subtitle + slider */}
        <div className="mt-auto pb-8">
          <div
            className="mb-7 text-center animate-fade-in select-none"
            style={{ animationDelay: "0.2s", animationFillMode: "both" }}
          >
            <h2
              className="font-bold text-white leading-[1.08]"
              style={{
                fontFamily: '"Baloo 2", "Fredoka", system-ui, sans-serif',
                textShadow: "0 6px 24px rgba(0,0,0,0.65), 0 2px 8px rgba(0,0,0,0.5)",
                letterSpacing: "-0.005em",
              }}
            >
              <span className="block text-[24px] text-white/75 font-medium">
                Moins de scroll,
              </span>
              <span className="block text-[30px] mt-0.5">
                votre bien-être
              </span>
              <span className="block text-[26px] mt-0.5 text-white/95">
                physique d'abord.
              </span>
            </h2>
          </div>

          {/* Slider Container */}
          <div className="animate-fade-in" style={{ animationDelay: "0.45s", animationFillMode: "both" }}>
            <div
              ref={containerRef}
              className="relative h-14 bg-black/45 backdrop-blur-sm rounded-full border border-white/15 overflow-hidden"
            >
              <div
                className="absolute inset-y-0 left-0 bg-foreground rounded-full pointer-events-none"
                style={{
                  width: `${dragX + 56}px`,
                  transition: isDragging ? "none" : "width 250ms cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              />
              <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-center pointer-events-none">
                <span
                  className="text-sm ml-12 transition-colors duration-200"
                  style={{ color: progress > 0.15 ? "hsl(var(--background))" : "rgba(255,255,255,0.85)" }}
                >
                  Créer mon compte <ChevronRight className="inline h-4 w-4" />
                </span>
              </div>
              <div
                className="absolute top-1 left-1 bottom-1 touch-none select-none"
                style={{
                  transform: `translateX(${dragX}px)`,
                  transition: isDragging ? "none" : "transform 250ms cubic-bezier(0.22, 1, 0.36, 1)",
                }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleEnd}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleEnd}
                onMouseLeave={() => isDragging && handleEnd()}
              >
                <div className="h-full aspect-square rounded-full bg-background flex items-center justify-center shadow-lg cursor-grab active:cursor-grabbing border border-border">
                  <ChevronRight className="h-5 w-5 text-foreground" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingStep2;
