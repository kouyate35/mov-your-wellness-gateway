import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import onboardingHero from "@/assets/onboarding-hero.jpg";

const Onboarding = () => {
  const navigate = useNavigate();

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
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-between px-6 pt-6 pb-8">
        {/* Top Section - Title */}
        <div className="pt-safe-area-inset-top">
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
        <div className="space-y-6">
          {/* Subtitle */}
          <p className="text-lg leading-relaxed text-muted-foreground">
            Bougez, respirez, et réduisez
            <br />
            l'usage excessif de vos apps.
          </p>
        </div>

        {/* Arrow Button - Bottom Right */}
        <button
          onClick={() => navigate("/onboarding-2")}
          className="absolute bottom-8 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-foreground shadow-lg transition-transform hover:scale-105 active:scale-95"
        >
          <ChevronRight className="h-6 w-6 text-background" />
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
