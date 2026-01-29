import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import onboardingHero from "@/assets/onboarding-hero.jpg";

const OnboardingStep2 = () => {
  const navigate = useNavigate();
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef(0);
  
  const maxDrag = 200; // Maximum drag distance
  const threshold = 150; // Threshold to trigger navigation

  const handleStart = (clientX: number) => {
    setIsDragging(true);
    startXRef.current = clientX;
  };

  const handleMove = (clientX: number) => {
    if (!isDragging) return;
    const diff = clientX - startXRef.current;
    const newX = Math.max(0, Math.min(diff, maxDrag));
    setDragX(newX);
  };

  const handleEnd = () => {
    if (dragX >= threshold) {
      navigate("/auth");
    }
    setDragX(0);
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => handleStart(e.touches[0].clientX);
  const handleTouchMove = (e: React.TouchEvent) => handleMove(e.touches[0].clientX);
  const handleMouseDown = (e: React.MouseEvent) => handleStart(e.clientX);
  const handleMouseMove = (e: React.MouseEvent) => handleMove(e.clientX);

  return (
    <div className="fixed inset-0 overflow-hidden bg-background">
      {/* Background Image with blur effect */}
      <div className="absolute inset-0">
        <img
          src={onboardingHero}
          alt="Workout Onboarding"
          className="h-full w-full object-cover blur-sm scale-105"
        />
        {/* Darker overlay for readability */}
        <div className="absolute inset-0 bg-background/70" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center px-6">
        {/* Main Message */}
        <div className="space-y-6 max-w-sm text-center mb-16">
          <p className="text-lg leading-relaxed text-muted-foreground animate-fade-in" style={{ animationDelay: "0.1s", animationFillMode: "both" }}>
            Certaines apps demandent
            <br />
            <span className="text-foreground font-medium">votre attention.</span>
          </p>
          
          <div className="w-12 h-px bg-border mx-auto animate-fade-in" style={{ animationDelay: "0.25s", animationFillMode: "both" }} />
          
          <p className="text-xl font-semibold leading-relaxed text-foreground animate-fade-in" style={{ animationDelay: "0.4s", animationFillMode: "both" }}>
            WORKOUT vous demande
            <br />
            <span className="inline-block rounded-lg bg-primary/20 px-3 py-1 text-primary">
              votre mouvement.
            </span>
          </p>
        </div>

        {/* Slider Container - Bottom */}
        <div className="absolute bottom-8 left-6 right-6 animate-fade-in" style={{ animationDelay: "0.6s", animationFillMode: "both" }}>
          <div
            ref={containerRef}
            className="relative h-14 bg-card/50 backdrop-blur-sm rounded-full border border-border overflow-hidden"
          >
            {/* Slider Track */}
            <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-center">
              <span className="text-muted-foreground text-sm ml-12">
                Créer mon compte <ChevronRight className="inline h-4 w-4" />
              </span>
            </div>

            {/* Draggable Button */}
            <div
              className="absolute top-1 left-1 bottom-1 touch-none select-none"
              style={{ transform: `translateX(${dragX}px)` }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleEnd}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleEnd}
              onMouseLeave={() => isDragging && handleEnd()}
            >
              <div className="h-full aspect-square rounded-full bg-foreground flex items-center justify-center shadow-lg cursor-grab active:cursor-grabbing">
                <ChevronRight className="h-5 w-5 text-background" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingStep2;
