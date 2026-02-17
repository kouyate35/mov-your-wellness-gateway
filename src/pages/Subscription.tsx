import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check, ChevronDown, ChevronUp, Zap, Crown, Star } from "lucide-react";
import subscriptionHero from "@/assets/subscription-hero.jpg";
import movIcon from "@/assets/mov-icon.png";

type PlanId = "free" | "classique" | "premium";
type Billing = "monthly" | "annual";

interface PlanFeature {
  text: string;
  included: boolean;
}

interface Plan {
  id: PlanId;
  name: string;
  badge: string;
  icon: React.ElementType;
  monthlyPrice: number;
  annualPrice: number;
  description: string;
  features: PlanFeature[];
  highlight?: boolean;
  borderColor?: string;
}

const plans: Plan[] = [
  {
    id: "free",
    name: "Gratuit",
    badge: "GRATUIT",
    icon: Star,
    monthlyPrice: 0,
    annualPrice: 0,
    description: "Commencez à bouger avec les fonctionnalités essentielles.",
    features: [
      { text: "3 programmes d'entraînement de base", included: true },
      { text: "Suivi de progression limité", included: true },
      { text: "1 challenge par semaine", included: true },
      { text: "Connexion de 2 applications", included: true },
      { text: "Statistiques avancées", included: false },
      { text: "Programmes personnalisés", included: false },
    ],
  },
  {
    id: "classique",
    name: "Classique",
    badge: "CLASSIQUE",
    icon: Zap,
    monthlyPrice: 4.99,
    annualPrice: 3.99,
    description: "Débloquez tout le potentiel de votre entraînement quotidien.",
    highlight: true,
    borderColor: "from-[hsl(199,89%,48%)] via-[hsl(270,70%,60%)] to-[hsl(199,89%,48%)]",
    features: [
      { text: "Programmes d'entraînement illimités", included: true },
      { text: "Suivi de progression avancé", included: true },
      { text: "Challenges illimités avec badges", included: true },
      { text: "Connexion de 5 applications", included: true },
      { text: "Rappels intelligents", included: true },
      { text: "Statistiques détaillées", included: true },
    ],
  },
  {
    id: "premium",
    name: "Premium",
    badge: "PREMIUM",
    icon: Crown,
    monthlyPrice: 9.99,
    annualPrice: 7.99,
    description: "L'expérience ultime pour les passionnés de mouvement.",
    features: [
      { text: "Tous les avantages Classique", included: true },
      { text: "Programmes personnalisés par IA", included: true },
      { text: "Coaching en temps réel", included: true },
      { text: "Applications illimitées", included: true },
      { text: "Accès anticipé aux nouveautés", included: true },
      { text: "Support prioritaire", included: true },
    ],
  },
];

const Subscription = () => {
  const navigate = useNavigate();
  const [billing, setBilling] = useState<Billing>("annual");
  const [selectedPlan, setSelectedPlan] = useState<PlanId>("classique");
  const [expandedPlan, setExpandedPlan] = useState<PlanId | null>("classique");

  const savings = billing === "annual" ? 20 : 0;

  const getPrice = (plan: Plan) => {
    return billing === "annual" ? plan.annualPrice : plan.monthlyPrice;
  };

  const getAnnualTotal = (plan: Plan) => {
    return (plan.annualPrice * 12).toFixed(2);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Hero Header */}
      <div className="relative w-full h-[280px] overflow-hidden">
        <img
          src={subscriptionHero}
          alt="Subscription hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-background" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />

        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 pt-4 z-10">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full bg-background/20 backdrop-blur-sm text-foreground hover:bg-background/30 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/20 backdrop-blur-sm">
            <span className="text-foreground text-sm font-medium">Jojo</span>
            <div className="w-7 h-7 rounded-full bg-info flex items-center justify-center">
              <span className="text-info-foreground font-semibold text-xs">J</span>
            </div>
          </div>
        </div>

        {/* Title overlay */}
        <div className="absolute bottom-6 left-5 z-10">
          <div className="flex items-center gap-2 mb-1">
            <img src={movIcon} alt="Workout" className="w-5 h-5 rounded" />
            <span className="text-foreground/80 text-xs font-medium tracking-wide uppercase">Workout</span>
          </div>
          <h1 className="text-foreground text-2xl font-bold tracking-tight">Plans upgradés</h1>
        </div>
      </div>

      {/* Billing Toggle */}
      <div className="px-5 -mt-1">
        <div className="flex items-center justify-between bg-secondary/80 rounded-full px-4 py-3">
          <span className="text-foreground text-sm font-medium">Plans annuels</span>
          <div className="flex items-center gap-2">
            {savings > 0 && (
              <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-info/20 text-info">
                économisez {savings}% par an
              </span>
            )}
            <button
              onClick={() => setBilling(billing === "annual" ? "monthly" : "annual")}
              className={`relative w-11 h-6 rounded-full transition-colors ${
                billing === "annual" ? "bg-foreground" : "bg-muted"
              }`}
            >
              <span
                className={`absolute top-[3px] w-[18px] h-[18px] rounded-full shadow-sm transition-transform ${
                  billing === "annual"
                    ? "left-[23px] bg-background"
                    : "left-[3px] bg-foreground"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Plans */}
      <div className="flex-1 px-5 py-5 space-y-4 pb-32">
        {plans.map((plan) => {
          const isSelected = selectedPlan === plan.id;
          const isExpanded = expandedPlan === plan.id;
          const price = getPrice(plan);

          return (
            <div key={plan.id} className="relative">
              {/* Gradient border for highlight plan */}
              {plan.highlight && (
                <div className={`absolute -inset-[1.5px] rounded-2xl bg-gradient-to-r ${plan.borderColor} opacity-80`} />
              )}

              <div
                onClick={() => setSelectedPlan(plan.id)}
                className={`relative rounded-2xl p-5 cursor-pointer transition-all ${
                  plan.highlight
                    ? "bg-card"
                    : isSelected
                    ? "bg-card border border-border"
                    : "bg-card/60 border border-border/50"
                }`}
              >
                {/* Plan header */}
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                        isSelected
                          ? "border-foreground bg-foreground"
                          : "border-muted-foreground/50"
                      }`}
                    >
                      {isSelected && (
                        <div className="w-2 h-2 rounded-full bg-background" />
                      )}
                    </div>
                  </div>

                  {billing === "annual" && price > 0 && (
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-muted text-muted-foreground">
                      Économisez {((plan.monthlyPrice - plan.annualPrice) * 12).toFixed(0)} € par an*
                    </span>
                  )}
                </div>

                {/* Badge + Price */}
                <div className="flex items-end justify-between mb-3">
                  <span className="text-xs font-bold tracking-wider px-3 py-1 rounded-full bg-foreground text-background">
                    {plan.badge}
                  </span>
                  <div className="text-right">
                    {price === 0 ? (
                      <span className="text-2xl font-bold text-foreground">Gratuit</span>
                    ) : (
                      <>
                        <span className="text-2xl font-bold text-foreground">
                          {price.toFixed(2)} €
                        </span>
                        <span className="text-foreground/70 text-sm"> /mois</span>
                        {billing === "annual" && (
                          <p className="text-muted-foreground text-xs mt-0.5">
                            {getAnnualTotal(plan)} € /an
                          </p>
                        )}
                      </>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                  {plan.description}
                </p>

                {plan.id !== "free" && plans.indexOf(plan) > 0 && (
                  <p className="text-foreground/80 text-xs font-medium mb-2">
                    Tous les avantages de{" "}
                    <span className="font-bold text-foreground">
                      {plans[plans.indexOf(plan) - 1].badge}
                    </span>{" "}
                    et plus
                  </p>
                )}

                {/* Expand/Collapse features */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpandedPlan(isExpanded ? null : plan.id);
                  }}
                  className="flex items-center gap-1.5 text-foreground/80 text-sm font-medium hover:text-foreground transition-colors"
                >
                  Voir les avantages
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>

                {/* Features list */}
                {isExpanded && (
                  <div className="mt-4 space-y-3 pt-3 border-t border-border/30">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div
                          className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                            feature.included
                              ? "bg-info/20 text-info"
                              : "bg-muted text-muted-foreground/40"
                          }`}
                        >
                          <Check className="w-2.5 h-2.5" />
                        </div>
                        <span
                          className={`text-sm ${
                            feature.included
                              ? "text-foreground/90"
                              : "text-muted-foreground/50 line-through"
                          }`}
                        >
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Disclaimer */}
        <p className="text-muted-foreground/60 text-xs text-center pt-2">
          * Cette économie est calculée par rapport aux abonnements mensuels
        </p>
      </div>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-background via-background to-transparent pt-8 pb-6 px-5 z-20">
        {selectedPlan !== "free" ? (
          <>
            <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-info via-[hsl(270,70%,60%)] to-[hsl(320,70%,55%)] text-foreground font-semibold text-base shadow-lg shadow-info/20 hover:opacity-90 transition-opacity">
              Commencer l'essai gratuit
            </button>
            <button className="w-full py-3 text-muted-foreground text-sm font-medium hover:text-foreground transition-colors">
              Passer l'essai et acheter maintenant
            </button>
          </>
        ) : (
          <button
            onClick={() => navigate(-1)}
            className="w-full py-4 rounded-2xl bg-secondary text-foreground font-semibold text-base hover:bg-secondary/80 transition-colors"
          >
            Continuer avec le plan gratuit
          </button>
        )}
      </div>
    </div>
  );
};

export default Subscription;
