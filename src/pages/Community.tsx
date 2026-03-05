import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { User, Search, Bell, UserPlus, MoreHorizontal } from "lucide-react";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";

interface Profile {
  id: number;
  name: string;
  age: number;
  location: string;
  occupation?: string;
  description?: string;
  emojis?: string[];
  interests?: string[];
  tags: string[];
  photos: string[];
}

const mockProfiles: Profile[] = [
  {
    id: 1, name: "Léa", age: 24, location: "France, Paris",
    occupation: "Coach sportive",
    description: "Passionnée de fitness et de bien-être 🧘‍♀️ Toujours partante pour un bon workout !",
    emojis: ["💪", "🧘‍♀️", "🌿", "☀️", "🎵"],
    interests: ["YOGA", "RUNNING", "MEDITATION"],
    tags: ["MOVE", "BREATH"],
    photos: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=1200&fit=crop",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&h=1200&fit=crop",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&h=1200&fit=crop",
    ],
  },
  {
    id: 2, name: "Karim", age: 27, location: "France, Lyon",
    occupation: "Développeur",
    description: "Dev le jour, sportif la nuit 🏋️ Fan de calisthenics et de challenges",
    emojis: ["🏋️", "💻", "🎮", "🍕", "🔥"],
    interests: ["CALISTHENICS", "MUSCULATION"],
    tags: ["FLEX", "FOCUS"],
    photos: [
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&h=1200&fit=crop",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&h=1200&fit=crop",
    ],
  },
  {
    id: 3, name: "Sofia", age: 22, location: "France, Marseille",
    occupation: "Étudiante",
    description: "Étudiante en kiné, j'adore le Pilates et la méditation 🌸",
    emojis: ["🌸", "📚", "🧘", "🌊", "🎨"],
    interests: ["PILATES", "NATATION", "STRETCHING"],
    tags: ["PAUSE", "BREATH"],
    photos: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=1200&fit=crop",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&h=1200&fit=crop",
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&h=1200&fit=crop",
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&h=1200&fit=crop",
    ],
  },
  {
    id: 4, name: "Rayan", age: 29, location: "France, Toulouse",
    occupation: "Préparateur physique",
    description: "Le sport c'est la vie 💯 Objectif : repousser les limites",
    emojis: ["💯", "🏃", "🥊", "🎯", "⚡"],
    interests: ["BOXE", "CROSSFIT", "HIIT"],
    tags: ["MOVE", "FLEX"],
    photos: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1200&fit=crop",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&h=1200&fit=crop",
    ],
  },
  {
    id: 5, name: "Emma", age: 25, location: "France, Bordeaux",
    occupation: "Nutritionniste",
    description: "Healthy body, healthy mind ✨ Ici pour partager et s'inspirer",
    emojis: ["✨", "🥑", "🏄‍♀️", "📖", "🌺"],
    interests: ["SURF", "YOGA", "NUTRITION"],
    tags: ["FOCUS", "PAUSE"],
    photos: [
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&h=1200&fit=crop",
      "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=800&h=1200&fit=crop",
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=800&h=1200&fit=crop",
    ],
  },
  {
    id: 6, name: "Nora", age: 23, location: "France, Nice",
    occupation: "Prof de danse",
    description: "Danseuse dans l'âme 💃 La musique guide mes mouvements",
    emojis: ["💃", "🎶", "🌅", "🌴", "😊"],
    interests: ["DANSE", "STRETCHING"],
    tags: ["BREATH", "MOVE"],
    photos: [
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&h=1200&fit=crop",
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&h=1200&fit=crop",
    ],
  },
  {
    id: 7, name: "Hugo", age: 26, location: "France, Nantes",
    occupation: "Kinésithérapeute",
    description: "Kiné passionné par la mobilité et le mouvement fonctionnel 🦴",
    emojis: ["🦴", "🏊", "🎸", "🍳", "🐕"],
    interests: ["MOBILITÉ", "NATATION", "RÉÉDUCATION"],
    tags: ["FLEX", "PAUSE"],
    photos: [
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&h=1200&fit=crop",
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=800&h=1200&fit=crop",
      "https://images.unsplash.com/photo-1463453091185-61582044d556?w=800&h=1200&fit=crop",
    ],
  },
  {
    id: 8, name: "Lina", age: 21, location: "France, Strasbourg",
    occupation: "Étudiante en STAPS",
    description: "Future prof de sport 🎓 Fan de tout ce qui bouge !",
    emojis: ["🎓", "🤸‍♀️", "🎾", "🌟", "🎉"],
    interests: ["GYMNASTIQUE", "ATHLÉTISME"],
    tags: ["FOCUS", "BREATH"],
    photos: [
      "https://images.unsplash.com/photo-1485875437071-bb711b02ea95?w=800&h=1200&fit=crop",
      "https://images.unsplash.com/photo-1496440737103-cd596325d314?w=800&h=1200&fit=crop",
    ],
  },
];

const SWIPE_THRESHOLD = 120;

const Community = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"swipe" | "nearby">("swipe");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [swipeOverlay, setSwipeOverlay] = useState<"like" | "nope" | null>(null);
  const [dragX, setDragX] = useState(0);

  const profile = currentIndex < mockProfiles.length ? mockProfiles[currentIndex] : null;

  const goNext = useCallback((dir: "left" | "right") => {
    if (isAnimating || !profile) return;
    setDirection(dir);
    setIsAnimating(true);
  }, [isAnimating, profile]);

  const handleDrag = (_: unknown, info: PanInfo) => {
    setDragX(info.offset.x);
    if (info.offset.x > 60) {
      setSwipeOverlay("like");
    } else if (info.offset.x < -60) {
      setSwipeOverlay("nope");
    } else {
      setSwipeOverlay(null);
    }
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    setDragX(0);
    setSwipeOverlay(null);
    if (Math.abs(info.offset.x) > SWIPE_THRESHOLD) {
      goNext(info.offset.x > 0 ? "right" : "left");
    }
  };

  const handleExitComplete = () => {
    setCurrentIndex((prev) => prev + 1);
    setCurrentPhoto(0);
    setDirection(null);
    setIsAnimating(false);
  };

  const handlePhotoTap = (e: React.MouseEvent | React.TouchEvent) => {
    if (!profile) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const x = clientX - rect.left;
    if (x < rect.width / 3) {
      setCurrentPhoto((p) => Math.max(0, p - 1));
    } else if (x > (rect.width * 2) / 3) {
      setCurrentPhoto((p) => Math.min(profile.photos.length - 1, p + 1));
    }
  };

  const noMoreProfiles = currentIndex >= mockProfiles.length;
  const isLastPhoto = profile ? currentPhoto === profile.photos.length - 1 : false;

  return (
    <div className="fixed inset-0 bg-[hsl(0,0%,8%)] flex flex-col overflow-hidden">
      {/* HEADER - Snapchat style */}
      <div className="relative z-50 px-3 pt-3 pb-2 flex items-center gap-2">
        {/* Left side */}
        <button
          onClick={() => navigate("/settings")}
          className="w-11 h-11 rounded-full bg-[hsl(0,0%,16%)] flex items-center justify-center"
        >
          <User className="w-5 h-5 text-white/90" />
        </button>
        <button className="w-11 h-11 rounded-full bg-[hsl(0,0%,16%)] flex items-center justify-center">
          <Search className="w-5 h-5 text-white/90" />
        </button>

        <div className="flex-1" />

        {/* Right side */}
        <button className="w-11 h-11 rounded-full bg-[hsl(0,0%,16%)] flex items-center justify-center">
          <Bell className="w-5 h-5 text-white/90" />
        </button>
        <button className="relative w-11 h-11 rounded-full bg-[hsl(50,100%,50%)] flex items-center justify-center">
          <UserPlus className="w-5 h-5 text-[hsl(0,0%,8%)]" />
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[hsl(0,80%,55%)] text-white text-[10px] font-bold flex items-center justify-center">
            3
          </span>
        </button>
        <button className="w-11 h-11 rounded-full bg-[hsl(0,0%,16%)] flex items-center justify-center">
          <MoreHorizontal className="w-5 h-5 text-white/90" />
        </button>
      </div>

      {/* TABS */}
      <div className="relative z-50 flex mx-4 mb-1.5 bg-[hsl(0,0%,12%)] rounded-[14px] p-[3px]">
        <button
          onClick={() => setActiveTab("swipe")}
          className={`flex-1 py-[6px] rounded-[11px] text-[13px] font-semibold transition-all ${
            activeTab === "swipe"
              ? "bg-[hsl(0,0%,20%)] text-white"
              : "text-white/45"
          }`}
        >
          Swipe
        </button>
        <button
          onClick={() => setActiveTab("nearby")}
          className={`flex-1 py-[6px] rounded-[11px] text-[13px] font-semibold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === "nearby"
              ? "bg-[hsl(0,0%,20%)] text-white"
              : "text-white/45"
          }`}
        >
          À proximité
          <span className="bg-[hsl(0,85%,58%)] text-white text-[9px] font-bold px-1.5 py-[2px] rounded-full leading-none">
            +99
          </span>
        </button>
      </div>

      {/* CARD AREA */}
      <div className="flex-1 relative mx-2 mb-2 overflow-hidden rounded-2xl">
        {noMoreProfiles ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white/60">
            <span className="text-5xl mb-4">🎉</span>
            <p className="text-lg font-semibold">Plus de profils !</p>
            <p className="text-sm mt-1">Reviens plus tard</p>
          </div>
        ) : (
          <AnimatePresence onExitComplete={handleExitComplete}>
            {profile && !direction && (
              <motion.div
                key={profile.id}
                className="absolute inset-0 cursor-grab active:cursor-grabbing"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.9}
                onDrag={handleDrag}
                onDragEnd={handleDragEnd}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ 
                  scale: 1, 
                  opacity: 1,
                  rotate: dragX * 0.03,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                style={{ willChange: "transform" }}
              >
                <div
                  className="relative w-full h-full rounded-2xl overflow-hidden"
                  onClick={handlePhotoTap}
                >
                  {/* Photo */}
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={`${profile.id}-${currentPhoto}`}
                      src={profile.photos[currentPhoto]}
                      alt={profile.name}
                      className="absolute inset-0 w-full h-full object-cover"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      draggable={false}
                    />
                  </AnimatePresence>

                  {/* Photo indicators */}
                  <div className="absolute top-3 left-3 right-3 flex gap-1 z-10">
                    {profile.photos.map((_, i) => (
                      <div
                        key={i}
                        className="flex-1 h-[3px] rounded-full overflow-hidden bg-white/30"
                      >
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${
                            i === currentPhoto ? "bg-white w-full" : i < currentPhoto ? "bg-white/70 w-full" : "w-0"
                          }`}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Three dots menu */}
                  <button className="absolute top-3 right-3 z-10 p-1">
                    <MoreHorizontal className="w-6 h-6 text-white drop-shadow-lg" />
                  </button>

                  {/* Gradient overlay bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />

                  {/* Swipe overlays */}
                  <AnimatePresence>
                    {swipeOverlay === "like" && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
                      >
                        <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-2xl">
                          <svg width="40" height="40" viewBox="0 0 24 24" fill="hsl(0,0%,8%)">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                          </svg>
                        </div>
                      </motion.div>
                    )}
                    {swipeOverlay === "nope" && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
                      >
                        <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-2xl">
                          <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                            <path d="M18 6L6 18M6 6l12 12" stroke="hsl(0,0%,8%)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Profile info */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 z-10 pointer-events-none">
                    <div className="flex items-baseline gap-2">
                      <h2 className="text-3xl font-bold text-white">{profile.name}</h2>
                      <span className="text-2xl text-white/80 font-light">{profile.age}</span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-1">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-white/70">
                        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="text-white/70 text-sm">{profile.location}</span>
                    </div>
                    <div className="flex gap-2 mt-3">
                      {profile.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-md uppercase tracking-wide"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="mt-3 pointer-events-auto">
                      <button className="w-full py-2.5 rounded-full border border-white/25 text-white text-sm font-medium bg-white/5 backdrop-blur-sm active:bg-white/10 transition-colors">
                        Envoie un message
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Exiting card */}
            {profile && direction && (
              <motion.div
                key={`exit-${profile.id}`}
                className="absolute inset-0"
                initial={{ x: 0, rotate: 0, opacity: 1 }}
                animate={{
                  x: direction === "right" ? 500 : -500,
                  rotate: direction === "right" ? 20 : -20,
                  opacity: 0,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                style={{ willChange: "transform" }}
              >
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                  <img
                    src={profile.photos[currentPhoto]}
                    alt={profile.name}
                    className="absolute inset-0 w-full h-full object-cover"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  
                  {/* Exit overlay icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-2xl">
                      {direction === "right" ? (
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="hsl(0,0%,8%)">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                        </svg>
                      ) : (
                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                          <path d="M18 6L6 18M6 6l12 12" stroke="hsl(0,0%,8%)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                  </div>

                  {/* Profile info on exit */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="flex items-baseline gap-2">
                      <h2 className="text-3xl font-bold text-white">{profile.name}</h2>
                      <span className="text-2xl text-white/80 font-light">{profile.age}</span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="text-white/70 text-sm">{profile.location}</span>
                    </div>
                    <div className="flex gap-2 mt-3">
                      {profile.tags.map((tag) => (
                        <span key={tag} className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-md uppercase tracking-wide">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default Community;
