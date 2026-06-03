import { useEffect, useState } from "react";
import { Sparkles, ScanLine, Dumbbell, Lock } from "lucide-react";

interface OnboardingGuideProps {
  isOpen: boolean;
  onComplete: () => void;
}

type Step = {
  eyebrow: string;
  title: string;
  highlight: string; // word colored in accent
  subtitle: string;
  Icon: typeof Sparkles;
};

const steps: Step[] = [
  {
    eyebrow: "BIENVENUE",
    title: "Bouge avant de scroller",
    highlight: "Workout",
    subtitle:
      "Workout transforme tes pauses écran en mouvement. Reprends le contrôle de ton temps et de ton corps.",
    Icon: Sparkles,
  },
  {
    eyebrow: "ÉTAPE 1",
    title: "Connecte tes applications",
    highlight: "Connecte",
    subtitle:
      "Choisis les apps qui te distraient. Workout va les détecter et te demander un effort avant d'y entrer.",
    Icon: ScanLine,
  },
  {
    eyebrow: "ÉTAPE 2",
    title: "Choisis ton défi",
    highlight: "Choisis",
    subtitle:
      "Pompes, gainage, respiration… Sélectionne le mouvement qui correspond à ton énergie du moment.",
    Icon: Dumbbell,
  },
  {
    eyebrow: "ÉTAPE 3",
    title: "Débloque par le mouvement",
    highlight: "Débloque",
    subtitle:
      "À chaque ouverture d'une app bloquée, fais ton défi pour la débloquer. Un corps actif, un esprit plus libre.",
    Icon: Lock,
  },
];

const ACCENT = "#5BA8FF";

const OnboardingGuide = ({ isOpen, onComplete }: OnboardingGuideProps) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (isOpen) setIndex(0);
  }, [isOpen]);

  // Scroll lock
  useEffect(() => {
    if (!isOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const step = steps[index];
  const isLast = index === steps.length - 1;
  const next = () => (isLast ? onComplete() : setIndex((i) => i + 1));

  return (
    <div className="fixed inset-0 z-[9998] flex items-end sm:items-center justify-center bg-black/85 backdrop-blur-md p-4">
      <div
        key={index}
        className="w-full max-w-[420px] rounded-[28px] bg-[#0c0d10] border border-white/[0.06] shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)] overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300"
      >
        {/* Visual hero */}
        <div
          className="relative h-[240px] flex items-center justify-center overflow-hidden"
          style={{
            background: `radial-gradient(120% 80% at 50% 0%, ${ACCENT}1A 0%, rgba(0,0,0,0) 65%), linear-gradient(180deg, rgba(255,255,255,0.02), rgba(0,0,0,0))`,
          }}
        >
          {/* Halo */}
          <div
            className="absolute w-[200px] h-[200px] rounded-full blur-2xl"
            style={{ background: `${ACCENT}26` }}
          />
          {/* Icon */}
          <div
            className="relative w-[88px] h-[88px] rounded-3xl flex items-center justify-center"
            style={{
              background: `linear-gradient(160deg, ${ACCENT}33, rgba(255,255,255,0.03))`,
              border: `1px solid ${ACCENT}40`,
              boxShadow: `0 10px 40px -10px ${ACCENT}66`,
            }}
          >
            <step.Icon className="w-9 h-9" style={{ color: ACCENT }} strokeWidth={1.8} />
          </div>
        </div>

        {/* Body */}
        <div className="px-6 pt-5 pb-6">
          <p
            className="text-[10.5px] font-semibold tracking-[0.22em] mb-2.5"
            style={{ color: ACCENT }}
          >
            {step.eyebrow}
          </p>
          <h2 className="text-foreground text-[22px] font-bold leading-tight tracking-tight">
            {renderHighlighted(step.title, step.highlight)}
          </h2>
          <p className="mt-2.5 text-[13.5px] text-muted-foreground leading-relaxed">
            {step.subtitle}
          </p>

          {/* Progress dots */}
          <div className="mt-5 flex items-center gap-1.5">
            {steps.map((_, i) => (
              <span
                key={i}
                className="h-1 rounded-full transition-all duration-300"
                style={{
                  width: i === index ? 22 : 6,
                  backgroundColor: i === index ? ACCENT : "rgba(255,255,255,0.14)",
                }}
              />
            ))}
          </div>

          {/* CTA */}
          <button
            onClick={next}
            className="mt-5 w-full h-12 rounded-full bg-foreground text-background text-[14px] font-semibold tracking-tight active:scale-[0.98] transition-transform"
          >
            {isLast ? "Commencer" : "Suivant"}
          </button>

          {!isLast && (
            <button
              onClick={onComplete}
              className="mt-2 w-full h-9 text-[12px] text-muted-foreground/70 hover:text-foreground/80 transition-colors"
            >
              Passer
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

function renderHighlighted(title: string, highlight: string) {
  const idx = title.toLowerCase().indexOf(highlight.toLowerCase());
  if (idx === -1) return title;
  return (
    <>
      {title.slice(0, idx)}
      <span style={{ color: ACCENT }}>{title.slice(idx, idx + highlight.length)}</span>
      {title.slice(idx + highlight.length)}
    </>
  );
}

export default OnboardingGuide;
