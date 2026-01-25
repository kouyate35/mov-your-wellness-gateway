export interface Program {
  id: string;
  name: string;
  duration: string;
  description: string;
}

export interface Category {
  id: "move" | "flex" | "breath" | "focus";
  name: string;
  tagline: string;
  description: string;
  icon: string;
  color: string;
  gradient: string;
  programs: Program[];
}

export const categories: Category[] = [
  {
    id: "move",
    name: "MOVE",
    tagline: "Corps & Mobilité",
    description: "Réveille ton corps avant d'accéder à tes apps. Réduis la sédentarité avec des micro-exercices.",
    icon: "🏃",
    color: "move",
    gradient: "from-emerald-500 to-green-600",
    programs: [
      {
        id: "squats-10",
        name: "10 Squats",
        duration: "30 sec",
        description: "Renforce tes jambes avec 10 squats rapides",
      },
      {
        id: "pompes-10",
        name: "10 Pompes",
        duration: "45 sec",
        description: "Travaille le haut du corps avec 10 pompes",
      },
      {
        id: "gainage",
        name: "Gainage 1 min",
        duration: "1 min",
        description: "Renforce ta ceinture abdominale",
      },
    ],
  },
  {
    id: "flex",
    name: "FLEX",
    tagline: "Souplesse & Articulation",
    description: "Améliore ta flexibilité et délie tes articulations. Des étirements doux pour libérer les tensions.",
    icon: "🧘‍♀️",
    color: "flex",
    gradient: "from-amber-500 to-orange-500",
    programs: [
      {
        id: "lateral-stretch",
        name: "Flexion latérale",
        duration: "1 min",
        description: "Étire les côtés de ton corps en douceur",
      },
      {
        id: "forward-fold",
        name: "Pince debout",
        duration: "45 sec",
        description: "Étire ton dos et tes ischio-jambiers",
      },
      {
        id: "yoga-arms",
        name: "Bras en prière",
        duration: "30 sec",
        description: "Étire tes épaules et ton dos",
      },
    ],
  },
  {
    id: "breath",
    name: "BREATH",
    tagline: "Mental & Régulation",
    description: "Calme ton esprit et réduis l'impulsivité. Une pause consciente avant le scroll.",
    icon: "🧘",
    color: "breath",
    gradient: "from-blue-500 to-cyan-500",
    programs: [
      {
        id: "box-breathing",
        name: "Box Breathing",
        duration: "1 min",
        description: "Respiration en carré : inspire, retiens, expire, retiens",
      },
      {
        id: "coherence",
        name: "Cohérence cardiaque",
        duration: "3 min",
        description: "5 secondes inspire, 5 secondes expire",
      },
      {
        id: "pause",
        name: "Pause consciente",
        duration: "30 sec",
        description: "Ferme les yeux et respire profondément",
      },
    ],
  },
  {
    id: "focus",
    name: "FOCUS",
    tagline: "Discipline & Habitudes",
    description: "Crée une intention claire avant d'ouvrir une app. Lutte contre l'automatisme.",
    icon: "🎯",
    color: "focus",
    gradient: "from-purple-500 to-violet-600",
    programs: [
      {
        id: "intention",
        name: "Définis ton intention",
        duration: "15 sec",
        description: "Pourquoi veux-tu ouvrir cette app ?",
      },
      {
        id: "timer",
        name: "Timer d'usage",
        duration: "Setup",
        description: "Définis combien de temps tu vas y passer",
      },
      {
        id: "affirmation",
        name: "Affirmation",
        duration: "10 sec",
        description: "Répète une affirmation positive",
      },
    ],
  },
];

export const getCategoryById = (id: string): Category | undefined => {
  return categories.find((cat) => cat.id === id);
};
