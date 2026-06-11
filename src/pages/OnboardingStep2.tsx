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
      {/* Full-screen crossfading video background */}
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
        {/* Glassmorphism overlay — slightly dark + frosted blur, lets animation breathe through */}
        <div
          className="absolute inset-0 backdrop-blur-2xl"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.45) 45%, rgba(0,0,0,0.65) 100%)",
          }}
        />
        {/* Subtle vignette for depth */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(120% 80% at 50% 30%, transparent 0%, rgba(0,0,0,0.35) 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center px-6">
        {/* Cloud-style title */}
        <div
          className="relative w-full max-w-sm text-center animate-fade-in select-none"
          style={{ animationDelay: "0.05s", animationFillMode: "both" }}
        >
          <p className="text-[11px] uppercase tracking-[0.4em] text-white/50 mb-3">
            Workout
          </p>
          <h1
            className="font-bold leading-[0.98] text-white"
            style={{
              fontFamily: '"Baloo 2", "Fredoka", system-ui, sans-serif',
              textShadow:
                "0 2px 0 rgba(255,255,255,0.08), 0 8px 24px rgba(0,0,0,0.45), 0 18px 60px rgba(0,0,0,0.5)",
              letterSpacing: "-0.01em",
            }}
          >
            <span className="block text-[26px] text-white/70 font-light">Moins de scroll,</span>
            <span className="block text-[34px] mt-1 bg-gradient-to-b from-white to-white/75 bg-clip-text text-transparent">
              votre bien-être
            </span>
            <span className="block text-[30px] mt-1 text-white/95">
              physique d'abord.
            </span>
          </h1>
        </div>


        {/* Slider Container - Bottom (unchanged behavior) */}
        <div className="absolute bottom-8 left-6 right-6 animate-fade-in" style={{ animationDelay: "0.6s", animationFillMode: "both" }}>
          <div
            ref={containerRef}
            className="relative h-14 bg-card/50 backdrop-blur-sm rounded-full border border-border overflow-hidden"
          >
            {/* White progressive fill — anchored to handle, grows as user drags */}
            <div
              className="absolute inset-y-0 left-0 bg-foreground rounded-full pointer-events-none"
              style={{
                width: `${dragX + 56}px`,
                transition: isDragging ? "none" : "width 250ms cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            />

            {/* Label — stays readable as white fill grows underneath */}
            <div
              className="absolute inset-y-0 left-0 right-0 flex items-center justify-center pointer-events-none"
            >
              <span
                className="text-sm ml-12 transition-colors duration-200"
                style={{ color: progress > 0.15 ? "hsl(var(--background))" : "hsl(var(--muted-foreground))" }}
              >
                Créer mon compte <ChevronRight className="inline h-4 w-4" />
              </span>
            </div>

            {/* Draggable Button */}
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
  );
};

export default OnboardingStep2;
