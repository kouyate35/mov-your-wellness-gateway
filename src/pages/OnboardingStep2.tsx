import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import onboardingHero from "@/assets/onboarding-hero.jpg";

const OnboardingStep2 = () => {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen w-full overflow-hidden bg-background">
      {/* Background Image with blur effect */}
      <div className="absolute inset-0">
        <img
          src={onboardingHero}
          alt="MOV Onboarding"
          className="h-full w-full object-cover blur-sm scale-105"
        />
        {/* Darker overlay for readability */}
        <div className="absolute inset-0 bg-background/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-center items-center px-8 text-center">
        {/* Main Message */}
        <div className="space-y-8 max-w-sm">
          <p className="text-xl leading-relaxed text-muted-foreground">
            Certaines apps demandent
            <br />
            <span className="text-foreground font-medium">votre attention.</span>
          </p>
          
          <div className="w-16 h-px bg-border mx-auto" />
          
          <p className="text-2xl font-semibold leading-relaxed text-foreground">
            MOV vous demande
            <br />
            <span className="inline-block rounded-lg bg-primary/20 px-3 py-1 text-primary">
              votre mouvement.
            </span>
          </p>
        </div>

        {/* Arrow Button - Bottom Right */}
        <button
          onClick={() => navigate("/auth")}
          className="absolute bottom-8 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-foreground shadow-lg transition-transform hover:scale-105 active:scale-95"
        >
          <ChevronRight className="h-6 w-6 text-background" />
        </button>
      </div>
    </div>
  );
};

export default OnboardingStep2;
