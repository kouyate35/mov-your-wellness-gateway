import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import onboardingHero from "@/assets/onboarding-hero.jpg";
import boxBreathingVideo from "@/assets/exercise-box-breathing.mp4";

const OnboardingStep2 = () => {
  const navigate = useNavigate();
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [completed, setCompleted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef(0);
  const maxDragRef = useRef(0);

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
      {/* Soft blurred background — barely visible for atmosphere */}
      <div className="absolute inset-0">
        <img
          src={onboardingHero}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover blur-2xl scale-110 opacity-25"
        />
        <div className="absolute inset-0 bg-black/75" />
      </div>

      {/* Content — cloud title + centered breathing bubble */}
      <div className="absolute inset-0 flex flex-col justify-start items-center px-6 pt-12">
        {/* Cloud-style title — airy, layered, premium */}
        <div
          className="relative mb-8 w-full max-w-sm text-center animate-fade-in select-none"
          style={{ animationDelay: "0.05s", animationFillMode: "both" }}
        >
          <p
            className="text-[11px] uppercase tracking-[0.4em] text-white/40 mb-2"
          >
            Workout
          </p>
          <h1
            className="font-bold leading-[0.95] text-white"
            style={{
              fontFamily: '"Baloo 2", "Fredoka", system-ui, sans-serif',
              textShadow:
                "0 2px 0 rgba(255,255,255,0.08), 0 8px 24px rgba(255,255,255,0.12), 0 18px 60px rgba(255,255,255,0.06)",
              letterSpacing: "-0.01em",
            }}
          >
            <span className="block text-[28px] text-white/90">Votre bien-être</span>
            <span className="block text-[34px] mt-1 bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent">
              physique,
            </span>
            <span className="block text-[22px] mt-2 italic font-medium text-white/60">
              notre sérénité.
            </span>
          </h1>
        </div>

        {/* Box Breathing animated bubble — fills the squircle */}
        <div
          className="relative w-[78%] max-w-sm aspect-square rounded-[2.5rem] overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] ring-1 ring-white/10 animate-fade-in"
          style={{ animationDelay: "0.15s", animationFillMode: "both" }}
        >
          <video
            src={boxBreathingVideo}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30 pointer-events-none" />
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
