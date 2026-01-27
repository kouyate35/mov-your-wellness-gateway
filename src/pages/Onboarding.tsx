import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import onboardingHero from "@/assets/onboarding-hero.jpg";

const Onboarding = () => {
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);
  const [dragX, setDragX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef(0);
  
  const SWIPE_THRESHOLD = 150;

  const handleStart = (clientX: number) => {
    setIsDragging(true);
    startXRef.current = clientX;
  };

  const handleMove = (clientX: number) => {
    if (!isDragging) return;
    const diff = clientX - startXRef.current;
    // Only allow right swipe
    setDragX(Math.max(0, Math.min(diff, SWIPE_THRESHOLD + 50)));
  };

  const handleEnd = () => {
    if (dragX > SWIPE_THRESHOLD) {
      // Navigate to home
      navigate("/home");
    }
    setIsDragging(false);
    setDragX(0);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    handleStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    handleStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX);
  };

  const progress = Math.min(dragX / SWIPE_THRESHOLD, 1);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-background">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={onboardingHero}
          alt="MOV Onboarding"
          className="h-full w-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/95" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-between px-6 py-12 pb-8">
        {/* Top Section - Title */}
        <div className="mt-8">
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground">
            Reprenez le{" "}
            <span className="inline-block rounded-lg bg-primary/20 px-2 py-1 text-primary">
              contrôle
            </span>
            <br />
            de votre{" "}
            <span className="inline-block rounded-lg bg-secondary/30 px-2 py-1">
              temps
            </span>
          </h1>
        </div>

        {/* Bottom Section */}
        <div className="space-y-8">
          {/* Subtitle */}
          <p className="text-lg leading-relaxed text-muted-foreground">
            Bougez, respirez, et réduisez
            <br />
            l'usage excessif de vos apps.
          </p>

          {/* Swipe Button */}
          <div
            ref={containerRef}
            className="relative mx-auto h-16 w-full max-w-sm overflow-hidden rounded-full bg-card/80 backdrop-blur-md border border-border/50"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleEnd}
            onMouseLeave={handleEnd}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleEnd}
          >
            {/* Progress Fill */}
            <div 
              className="absolute inset-y-0 left-0 bg-primary/20 transition-all duration-100"
              style={{ width: `${progress * 100}%` }}
            />
            
            {/* Draggable Button */}
            <div
              className="absolute left-1 top-1 flex h-14 w-14 items-center justify-center rounded-full bg-primary shadow-lg transition-transform cursor-grab active:cursor-grabbing"
              style={{ 
                transform: `translateX(${dragX}px)`,
                transition: isDragging ? 'none' : 'transform 0.3s ease-out'
              }}
            >
              <ChevronRight className="h-6 w-6 text-primary-foreground" />
            </div>

            {/* Text */}
            <div className="flex h-full items-center justify-center pl-16">
              <span 
                className="text-sm font-medium text-muted-foreground transition-opacity"
                style={{ opacity: 1 - progress * 0.5 }}
              >
                Glisser pour commencer
              </span>
              <ChevronRight 
                className="ml-1 h-4 w-4 text-muted-foreground transition-opacity" 
                style={{ opacity: 1 - progress }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
