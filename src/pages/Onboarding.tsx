import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import onboardingHero from "@/assets/onboarding-hero.jpg";

const Onboarding = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 overflow-hidden bg-background">
      {/* Background Image - Full Screen */}
      <div className="absolute inset-0">
        <img
          src={onboardingHero}
          alt="MOV Onboarding"
          className="h-full w-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/90" />
      </div>

      {/* Content - Positioned absolutely to avoid scroll */}
      <div className="absolute inset-0 flex flex-col px-6 py-8">
        {/* Top Section - Title */}
        <div className="pt-4">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-foreground">
            Reprenez le{" "}
            <span className="inline-block rounded-lg bg-primary/20 px-2 py-0.5 text-primary">
              contrôle
            </span>
            <br />
            de votre{" "}
            <span className="inline-block rounded-lg bg-secondary/30 px-2 py-0.5">
              temps
            </span>
          </h1>
        </div>

        {/* Spacer to push content to bottom */}
        <div className="flex-1" />

        {/* Bottom Section */}
        <div className="flex items-end justify-between pb-4">
          {/* Subtitle */}
          <p className="text-base leading-relaxed text-muted-foreground max-w-[65%]">
            Bougez, respirez, et réduisez
            <br />
            l'usage excessif de vos apps.
          </p>

          {/* Arrow Button - Smaller, more minimal */}
          <button
            onClick={() => navigate("/onboarding-2")}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-foreground shadow-lg transition-transform hover:scale-105 active:scale-95"
          >
            <ChevronRight className="h-5 w-5 text-background" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
