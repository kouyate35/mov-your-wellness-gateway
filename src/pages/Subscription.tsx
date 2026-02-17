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
    borderColor: "from-[hsl(199,89%,48%)] via-[hsl(270,70%,60%)] to-[hsl(320,70%,55%)]",
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
  const [selectedPlan, setSelectedPlan] = useState<PlanId | null>(null);
  const [expandedPlan, setExpandedPlan] = useState<PlanId | null>(null);

  const savings = billing === "annual" ? 20 : 0;

  const getPrice = (plan: Plan) => {
    return billing === "annual" ? plan.annualPrice : plan.monthlyPrice;
  };

  const getAnnualTotal = (plan: Plan) => {
    return (plan.annualPrice * 12).toFixed(2);
  };

  const handleSelectPlan = (planId: PlanId) => {
    setSelectedPlan(planId);
    setExpandedPlan(planId);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Hero Header — taller, richer gradients */}
      <div className="relative w-full h-[320px] overflow-hidden">
        <img
          src={subscriptionHero}
          alt="Subscription hero"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Rich multi-layer gradient for seamless fusion */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(270,70%,30%)]/20 via-transparent to-[hsl(199,89%,40%)]/15" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background via-background/80 to-transparent" />

        {/* Back button only — no profile icon */}
        <div className="absolute top-0 left-0 right-0 flex items-center px-4 pt-5 z-10">
          <button
            onClick={() => navigate(-1)}
            className="p-2.5 rounded-full bg-black/30 backdrop-blur-md text-foreground hover:bg-black/50 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>

        {/* Title overlay */}
        <div className="absolute bottom-8 left-5 z-10">
          <div className="flex items-center gap-2.5 mb-2">
            <img src={movIcon} alt="Workout" className="w-6 h-6 rounded-md shadow-lg" />
            <span className="text-foreground/70 text-xs font-semibold tracking-[0.15em] uppercase">
              Workout
            </span>
          </div>
          <h1 className="text-foreground text-[1.75rem] font-extrabold tracking-tight leading-tight">
            Plans upgradés
          </h1>
        </div>
      </div>

      {/* Billing Toggle */}
      <div className="px-5 -mt-2">
        <div className="flex items-center justify-between bg-secondary/60 backdrop-blur-sm rounded-2xl px-5 py-3.5 border border-border/30">
          <span className="text-foreground text-sm font-semibold">Plans annuels</span>
          <div className="flex items-center gap-3">
            {savings > 0 && (
              <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[hsl(142,70%,45%)]/15 text-[hsl(142,70%,55%)] border border-[hsl(142,70%,45%)]/20">
                -{savings}%
              </span>
            )}
            <button
              onClick={() => setBilling(billing === "annual" ? "monthly" : "annual")}
              className={`relative w-12 h-[26px] rounded-full transition-all duration-300 ${
                billing === "annual"
                  ? "bg-gradient-to-r from-info to-[hsl(270,70%,60%)]"
                  : "bg-muted"
              }`}
            >
              <span
                className={`absolute top-[3px] w-5 h-5 rounded-full shadow-md transition-all duration-300 ${
                  billing === "annual"
                    ? "left-[25px] bg-foreground"
                    : "left-[3px] bg-foreground/80"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Plans */}
      <div className="flex-1 px-5 py-5 space-y-3.5 pb-36">
        {plans.map((plan) => {
          const isSelected = selectedPlan === plan.id;
          const isExpanded = expandedPlan === plan.id;
          const price = getPrice(plan);

          return (
            <div key={plan.id} className="relative group">
              {/* Gradient border for highlighted plan */}
              {plan.highlight && (
                <div
                  className={`absolute -inset-[1.5px] rounded-[18px] bg-gradient-to-r ${plan.borderColor} transition-opacity ${
                    isSelected ? "opacity-100" : "opacity-60 group-hover:opacity-80"
                  }`}
                />
              )}

              {/* Selected ring for non-highlight plans */}
              {!plan.highlight && isSelected && (
                <div className="absolute -inset-[1.5px] rounded-[18px] bg-foreground/30" />
              )}

              <div
                onClick={() => handleSelectPlan(plan.id)}
                className={`relative rounded-[17px] p-5 cursor-pointer transition-all duration-200 ${
                  plan.highlight
                    ? "bg-card"
                    : "bg-card/50 border border-border/40 hover:border-border/60"
                }`}
              >
                {/* Radio + Badge + Price row */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                        isSelected
                          ? plan.highlight
                            ? "border-info bg-info"
                            : "border-foreground bg-foreground"
                          : "border-muted-foreground/40"
                      }`}
                    >
                      {isSelected && (
                        <div className="w-[6px] h-[6px] rounded-full bg-background" />
                      )}
                    </div>
                    <span
                      className={`text-[10px] font-bold tracking-[0.12em] px-3 py-1 rounded-full ${
                        plan.highlight
                          ? "bg-gradient-to-r from-info/20 to-[hsl(270,70%,60%)]/20 text-info border border-info/20"
                          : "bg-foreground/10 text-foreground/80"
                      }`}
                    >
                      {plan.badge}
                    </span>
                  </div>

                  <div className="text-right">
                    {price === 0 ? (
                      <span className="text-xl font-bold text-foreground">Gratuit</span>
                    ) : (
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl font-bold text-foreground">
                          {price.toFixed(2)}€
                        </span>
                        <span className="text-foreground/50 text-xs font-medium">/mois</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground text-[13px] leading-relaxed mb-3">
                  {plan.description}
                </p>

                {/* Annual savings badge */}
                {billing === "annual" && price > 0 && (
                  <div className="mb-3">
                    <span className="text-[11px] font-medium text-muted-foreground">
                      {getAnnualTotal(plan)}€ facturé par an
                    </span>
                  </div>
                )}

                {/* Expand/Collapse features */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpandedPlan(isExpanded ? null : plan.id);
                  }}
                  className="flex items-center gap-1.5 text-foreground/60 text-[13px] font-medium hover:text-foreground transition-colors"
                >
                  Voir les avantages
                  {isExpanded ? (
                    <ChevronUp className="w-3.5 h-3.5" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5" />
                  )}
                </button>

                {/* Features list */}
                {isExpanded && (
                  <div className="mt-4 space-y-2.5 pt-3 border-t border-border/20">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2.5">
                        <div
                          className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                            feature.included
                              ? plan.highlight
                                ? "bg-info/15 text-info"
                                : "bg-foreground/10 text-foreground/70"
                              : "bg-muted text-muted-foreground/30"
                          }`}
                        >
                          <Check className="w-2.5 h-2.5" strokeWidth={3} />
                        </div>
                        <span
                          className={`text-[13px] ${
                            feature.included
                              ? "text-foreground/80"
                              : "text-muted-foreground/40 line-through"
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
        <p className="text-muted-foreground/40 text-[11px] text-center pt-3">
          * Les économies sont calculées par rapport à l'abonnement mensuel
        </p>
      </div>

      {/* Fixed Bottom CTA — only visible when a paid plan is selected */}
      {selectedPlan && selectedPlan !== "free" && (
        <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-background via-background/95 to-transparent pt-8 pb-6 px-5 z-20 animate-in slide-in-from-bottom-4 duration-300">
          <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-info via-[hsl(270,70%,60%)] to-[hsl(320,70%,55%)] text-foreground font-bold text-[15px] shadow-xl shadow-info/25 hover:shadow-info/40 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200">
            Commencer l'essai gratuit
          </button>
          <button className="w-full py-2.5 mt-1 text-muted-foreground text-[13px] font-medium hover:text-foreground transition-colors">
            Passer l'essai et acheter maintenant
          </button>
        </div>
      )}
    </div>
  );
};

export default Subscription;
