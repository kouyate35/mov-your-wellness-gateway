import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { User, Search, Bell, UserPlus, MoreHorizontal, X, Plus, ChevronLeft, Ban, AlertTriangle, Camera, ArrowLeft, Send, MapPin, Cake, Eye, UserSearch, Users, ChevronRight } from "lucide-react";
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

const mockMessages = [
  { id: 1, name: "Amira", message: "Hey salut 😊", time: "8h", color: "hsl(280,30%,35%)" },
  { id: 2, name: "Lucas", message: "Ça te dit un run ?", time: "9h", color: "hsl(0,40%,45%)" },
  { id: 3, name: "Jade", message: "Heyy 🥰🥰🥰", time: "14h", color: "hsl(35,30%,40%)" },
  { id: 4, name: "Théo", message: "Ça roule ?", time: "19h", color: "hsl(270,50%,45%)" },
  { id: 5, name: "Inès", message: "Coucouuuu", time: "1j", color: "hsl(30,25%,35%)" },
  { id: 6, name: "Maxime", message: "comment ce passe l...", time: "1j", color: "hsl(80,20%,35%)" },
];

const mockAddRequests = [
  { id: 1, name: "Sara", color: "hsl(200,40%,50%)", active: true },
  { id: 2, name: "Youssef", color: "hsl(30,50%,45%)", active: true },
  { id: 3, name: "Chloé", color: "hsl(150,30%,40%)", active: false },
  { id: 4, name: "Amine", color: "hsl(280,40%,50%)", active: true },
  { id: 5, name: "Lola", color: "hsl(340,40%,45%)", active: true },
  { id: 6, name: "Noah", color: "hsl(60,20%,40%)", active: false },
];

// Mock chat messages
const mockChatMessages = [
  { id: 1, text: "Hey salut 😊", fromMe: false, time: "12:57" },
  { id: 2, text: "Salut ! Ça va ?", fromMe: true, time: "13:02" },
  { id: 3, text: "Oui trop bien, tu fais du sport aujourd'hui ?", fromMe: false, time: "13:05" },
];

const SWIPE_THRESHOLD = 120;

type ViewState = "main" | "notifications" | "search" | "chat" | "chatProfile" | "profile";

const Community = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"swipe" | "nearby">("swipe");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [swipeOverlay, setSwipeOverlay] = useState<"like" | "nope" | null>(null);
  const [dragX, setDragX] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifTab, setNotifTab] = useState<"messages" | "added">("messages");
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [viewState, setViewState] = useState<ViewState>("main");
  const [notifPageTab, setNotifPageTab] = useState<"tout" | "messages" | "support">("tout");
  const [searchQuery, setSearchQuery] = useState("");
  const [chatContact, setChatContact] = useState<typeof mockMessages[0] | null>(null);
  const [chatMessage, setChatMessage] = useState("");
  const [chatProfilePhoto, setChatProfilePhoto] = useState(0);

  const profile = currentIndex < mockProfiles.length ? mockProfiles[currentIndex] : null;

  const goNext = useCallback((dir: "left" | "right") => {
    if (isAnimating || !profile) return;
    setDirection(dir);
    setIsAnimating(true);
  }, [isAnimating, profile]);

  const handleDrag = (_: unknown, info: PanInfo) => {
    setDragX(info.offset.x);
    if (info.offset.x > 60) setSwipeOverlay("like");
    else if (info.offset.x < -60) setSwipeOverlay("nope");
    else setSwipeOverlay(null);
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
    const isLast = currentPhoto === profile.photos.length - 1;
    if (x < rect.width / 3) {
      setCurrentPhoto((p) => Math.max(0, p - 1));
    } else if (x > (rect.width * 2) / 3) {
      if (isLast) setCurrentPhoto(0);
      else setCurrentPhoto((p) => Math.min(profile.photos.length - 1, p + 1));
    }
  };

  const noMoreProfiles = currentIndex >= mockProfiles.length;
  const isLastPhoto = profile ? currentPhoto === profile.photos.length - 1 : false;

  // ─── CHAT PROFILE VIEW ───
  if (viewState === "chatProfile" && chatContact) {
    // Use a mock profile-like view for the chat contact
    const contactProfile = mockProfiles.find(p => p.name === chatContact.name) || mockProfiles[0];
    const isLastChatPhoto = chatProfilePhoto === contactProfile.photos.length - 1;

    const handleChatProfilePhotoTap = (e: React.MouseEvent) => {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const x = (e as React.MouseEvent).clientX - rect.left;
      if (x < rect.width / 3) {
        setChatProfilePhoto(p => Math.max(0, p - 1));
      } else if (x > (rect.width * 2) / 3) {
        if (chatProfilePhoto === contactProfile.photos.length - 1) setChatProfilePhoto(0);
        else setChatProfilePhoto(p => p + 1);
      }
    };

    return (
      <div className="fixed inset-0 bg-[hsl(0,0%,8%)] flex flex-col overflow-hidden">
        {/* Top bar */}
        <div className="px-3 pt-3 pb-2 flex items-center gap-3 z-10">
          <button onClick={() => { setViewState("chat"); setChatProfilePhoto(0); }} className="w-10 h-10 rounded-full bg-[hsl(0,0%,16%)] flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-white/90" />
          </button>
          <div className="flex-1" />
          <button onClick={() => setShowBottomSheet(true)} className="w-10 h-10 rounded-full bg-[hsl(0,0%,16%)] flex items-center justify-center">
            <MoreHorizontal className="w-5 h-5 text-white/90" />
          </button>
        </div>

        {/* Profile card */}
        <div className="flex-1 mx-2 mb-2 rounded-2xl overflow-hidden relative" onClick={handleChatProfilePhotoTap}>
          {/* Photo */}
          <AnimatePresence mode="wait">
            <motion.img
              key={chatProfilePhoto}
              src={contactProfile.photos[chatProfilePhoto]}
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
            {contactProfile.photos.map((_, i) => (
              <div key={i} className="flex-1 h-[3px] rounded-full overflow-hidden bg-white/30">
                <div className={`h-full rounded-full transition-all duration-300 ${i === chatProfilePhoto ? "bg-white w-full" : i < chatProfilePhoto ? "bg-white/70 w-full" : "w-0"}`} />
              </div>
            ))}
          </div>

          {/* Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />

          {/* Darkened overlay for last photo */}
          {isLastChatPhoto && <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />}

          {/* Profile info */}
          <div className={`absolute bottom-0 left-0 right-0 z-10 ${isLastChatPhoto ? "inset-0 flex flex-col justify-start pt-14 px-5 pb-5 overflow-y-auto" : "p-5"}`}>
            <div className="flex items-baseline gap-2">
              <h2 className="text-3xl font-bold text-white">{contactProfile.name}</h2>
              <span className="text-2xl text-white/80 font-light">{contactProfile.age}</span>
            </div>
            <div className="flex items-center gap-1.5 mt-1">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-white/70"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <span className="text-white/70 text-sm">{contactProfile.location}</span>
            </div>
            {isLastChatPhoto && contactProfile.occupation && (
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-white/70 text-sm">{contactProfile.occupation}</span>
              </div>
            )}
            {isLastChatPhoto && contactProfile.emojis && (
              <div className="flex gap-1 mt-3">{contactProfile.emojis.map((e, i) => <span key={i} className="text-2xl">{e}</span>)}</div>
            )}
            {isLastChatPhoto && contactProfile.interests && (
              <div className="flex flex-wrap gap-2 mt-3">
                {contactProfile.interests.map(interest => (
                  <span key={interest} className="bg-white/10 border border-white/15 text-white text-xs font-bold px-3 py-1.5 rounded-md uppercase tracking-wide">{interest}</span>
                ))}
              </div>
            )}
            {isLastChatPhoto && contactProfile.description && (
              <p className="text-white/80 text-sm mt-3 leading-relaxed">{contactProfile.description}</p>
            )}
            <div className="flex gap-2 mt-3">
              {contactProfile.tags.map(tag => (
                <span key={tag} className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-md uppercase tracking-wide">{tag}</span>
              ))}
            </div>
            {!isLastChatPhoto && (
              <div className="mt-3">
                <button className="px-8 py-3 rounded-full border border-white/25 text-white text-sm font-medium bg-white/5 backdrop-blur-sm active:bg-white/10 transition-colors">
                  Envoie un message
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Bottom sheet for bloquer/signaler */}
        <AnimatePresence>
          {showBottomSheet && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 z-[200]" onClick={() => setShowBottomSheet(false)} />
              <motion.div
                initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="fixed bottom-0 left-0 right-0 z-[201] bg-[hsl(0,0%,14%)] rounded-t-3xl pb-8"
              >
                <div className="w-10 h-1 rounded-full bg-white/20 mx-auto mt-3 mb-4" />
                <p className="text-white/80 text-center text-sm mb-4 px-4">Quel est le problème avec {chatContact.name} ?</p>
                <button className="flex items-center gap-4 w-full px-6 py-4 active:bg-white/5 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center"><Ban className="w-5 h-5 text-[hsl(0,0%,8%)]" /></div>
                  <span className="text-white text-[16px] font-medium">Bloquer</span>
                </button>
                <button className="flex items-center gap-4 w-full px-6 py-4 active:bg-white/5 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center"><AlertTriangle className="w-5 h-5 text-[hsl(0,0%,8%)]" /></div>
                  <span className="text-white text-[16px] font-medium">Signaler</span>
                </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // ─── CHAT VIEW ───
  if (viewState === "chat" && chatContact) {
    return (
      <div className="fixed inset-0 bg-[hsl(0,0%,8%)] flex flex-col overflow-hidden">
        {/* Chat header */}
        <div className="px-3 pt-3 pb-2 flex items-center gap-3 border-b border-white/5">
          <button onClick={() => setViewState("notifications")} className="p-1">
            <ArrowLeft className="w-5 h-5 text-white/90" />
          </button>
          <button
            onClick={() => { setViewState("chatProfile"); setChatProfilePhoto(0); }}
            className="flex items-center gap-2.5"
          >
            <div className="w-9 h-9 rounded-full flex-shrink-0" style={{ background: chatContact.color }} />
            <div className="text-left">
              <p className="text-white text-sm font-semibold leading-tight">{chatContact.name}</p>
              <p className="text-white/50 text-[11px]">Il y a 1 heure</p>
            </div>
          </button>
          <div className="flex-1" />
          <button onClick={() => setShowBottomSheet(true)} className="p-1">
            <MoreHorizontal className="w-5 h-5 text-white/70" />
          </button>
        </div>

        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          <p className="text-center text-white/40 text-xs mb-4">jeu., 12:57</p>
          {mockChatMessages.map(msg => (
            <div key={msg.id} className={`flex ${msg.fromMe ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm ${
                msg.fromMe
                  ? "bg-[hsl(260,60%,55%)] text-white rounded-br-md"
                  : "bg-[hsl(0,0%,16%)] text-white/90 rounded-bl-md"
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Chat input */}
        <div className="px-3 pb-4 pt-2 flex items-center gap-2.5 border-t border-white/5">
          <button className="w-9 h-9 rounded-full bg-[hsl(0,0%,16%)] flex items-center justify-center flex-shrink-0">
            <Camera className="w-4 h-4 text-white/70" />
          </button>
          <div className="flex-1 bg-[hsl(0,0%,14%)] rounded-full flex items-center px-4 py-2.5">
            <input
              type="text"
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              placeholder="Aa"
              className="flex-1 bg-transparent text-white text-sm placeholder:text-white/30 focus:outline-none"
            />
          </div>
          <button className="w-9 h-9 rounded-full bg-[hsl(260,60%,55%)] flex items-center justify-center flex-shrink-0">
            <Send className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Bottom sheet */}
        <AnimatePresence>
          {showBottomSheet && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 z-[200]" onClick={() => setShowBottomSheet(false)} />
              <motion.div
                initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="fixed bottom-0 left-0 right-0 z-[201] bg-[hsl(0,0%,14%)] rounded-t-3xl pb-8"
              >
                <div className="w-10 h-1 rounded-full bg-white/20 mx-auto mt-3 mb-4" />
                <p className="text-white/80 text-center text-sm mb-4 px-4">Quel est le problème avec {chatContact.name} ?</p>
                <button className="flex items-center gap-4 w-full px-6 py-4 active:bg-white/5 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center"><Ban className="w-5 h-5 text-[hsl(0,0%,8%)]" /></div>
                  <span className="text-white text-[16px] font-medium">Bloquer</span>
                </button>
                <button className="flex items-center gap-4 w-full px-6 py-4 active:bg-white/5 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center"><AlertTriangle className="w-5 h-5 text-[hsl(0,0%,8%)]" /></div>
                  <span className="text-white text-[16px] font-medium">Signaler</span>
                </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // ─── SEARCH VIEW ───
  if (viewState === "search") {
    return (
      <div className="fixed inset-0 bg-[hsl(0,0%,8%)] flex flex-col overflow-hidden">
        <div className="px-4 pt-4 pb-3 flex items-center gap-3">
          <div className="flex-1 bg-[hsl(0,0%,16%)] rounded-full flex items-center px-4 py-3">
            <Search className="w-5 h-5 text-white/40 mr-3 flex-shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher"
              className="flex-1 bg-transparent text-white text-[15px] placeholder:text-white/40 focus:outline-none"
              autoFocus
            />
          </div>
          <button onClick={() => { setViewState("main"); setSearchQuery(""); }} className="text-white/60 text-[15px] font-medium">
            Annuler
          </button>
        </div>
        <div className="flex-1" />
      </div>
    );
  }

  // ─── NOTIFICATIONS PAGE (Bell icon) ───
  if (viewState === "notifications") {
    return (
      <div className="fixed inset-0 bg-[hsl(0,0%,8%)] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-4 pt-4 pb-2 flex items-center">
          <button onClick={() => setViewState("main")} className="p-1">
            <ChevronLeft className="w-6 h-6 text-white/90" />
          </button>
          <h1 className="flex-1 text-center text-white text-lg font-bold -ml-7">Notifications</h1>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 px-4 pb-3 pt-1">
          {(["tout", "messages", "support"] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setNotifPageTab(tab)}
              className={`px-4 py-1.5 rounded-full text-[13px] font-semibold transition-all ${
                notifPageTab === tab
                  ? "bg-white text-[hsl(0,0%,8%)]"
                  : "text-white/50"
              }`}
            >
              {tab === "tout" ? "Tout" : tab === "messages" ? "Messages reçus" : "Demandes de support"}
            </button>
          ))}
        </div>

        <div className="w-full h-px bg-white/10" />

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {notifPageTab === "tout" ? (
            <div className="flex-1 flex flex-col items-center justify-center py-20">
              <div className="w-16 h-16 rounded-full bg-[hsl(0,0%,16%)] flex items-center justify-center mb-4">
                <Bell className="w-7 h-7 text-white/40" />
              </div>
              <p className="text-white font-semibold text-base">Notifications</p>
              <p className="text-white/50 text-sm mt-1 text-center px-8">Vos notifications et vos activités apparaîtront ici.</p>
            </div>
          ) : notifPageTab === "messages" ? (
            <div className="px-4 pt-2">
              {mockMessages.map(msg => (
                <button
                  key={msg.id}
                  onClick={() => { setChatContact(msg); setViewState("chat"); setChatMessage(""); }}
                  className="flex items-center gap-3 py-3.5 border-b border-white/5 w-full text-left active:bg-white/5 transition-colors"
                >
                  <div className="w-14 h-14 rounded-full flex-shrink-0" style={{ background: msg.color }} />
                  <div className="flex-1 min-w-0">
                    <p className="text-white/60 text-xs font-medium mb-0.5">{msg.name}</p>
                    <p className="text-white/70 text-sm truncate">Dit "{msg.message}" · {msg.time}</p>
                  </div>
                  <div className="w-11 h-11 rounded-lg bg-[hsl(0,0%,16%)] flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-white/40" />
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center py-20">
              <div className="w-16 h-16 rounded-full bg-[hsl(0,0%,16%)] flex items-center justify-center mb-4">
                <AlertTriangle className="w-7 h-7 text-white/40" />
              </div>
              <p className="text-white font-semibold text-base">Aucune demande</p>
              <p className="text-white/50 text-sm mt-1 text-center px-8">Vos demandes de support apparaîtront ici.</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ─── MAIN VIEW ───
  return (
    <div className="fixed inset-0 bg-[hsl(0,0%,8%)] flex flex-col overflow-hidden">
      {/* HEADER */}
      <div className="relative z-50 px-3 pt-3 pb-2 flex items-center gap-2">
        <button onClick={() => navigate("/settings")} className="w-11 h-11 rounded-full bg-[hsl(0,0%,16%)] flex items-center justify-center">
          <User className="w-5 h-5 text-white/90" />
        </button>
        <button onClick={() => setViewState("search")} className="w-11 h-11 rounded-full bg-[hsl(0,0%,16%)] flex items-center justify-center">
          <Search className="w-5 h-5 text-white/90" />
        </button>
        <div className="flex-1" />
        <button onClick={() => setViewState("notifications")} className="w-11 h-11 rounded-full bg-[hsl(0,0%,16%)] flex items-center justify-center">
          <Bell className="w-5 h-5 text-white/90" />
        </button>
        <button
          onClick={() => setShowNotifications(true)}
          className="relative w-11 h-11 rounded-full bg-[hsl(50,100%,50%)] flex items-center justify-center"
        >
          <UserPlus className="w-5 h-5 text-[hsl(0,0%,8%)]" />
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[hsl(0,80%,55%)] text-white text-[10px] font-bold flex items-center justify-center">3</span>
        </button>
        <button className="w-11 h-11 rounded-full bg-[hsl(0,0%,16%)] flex items-center justify-center">
          <MoreHorizontal className="w-5 h-5 text-white/90" />
        </button>
      </div>

      {/* TABS */}
      <div className="relative z-50 flex mx-4 mb-1.5 bg-[hsl(0,0%,12%)] rounded-[14px] p-[3px]">
        <button
          onClick={() => setActiveTab("swipe")}
          className={`flex-1 py-[6px] rounded-[11px] text-[13px] font-semibold transition-all ${activeTab === "swipe" ? "bg-[hsl(0,0%,20%)] text-white" : "text-white/45"}`}
        >
          Swipe
        </button>
        <button
          onClick={() => setActiveTab("nearby")}
          className={`flex-1 py-[6px] rounded-[11px] text-[13px] font-semibold transition-all flex items-center justify-center gap-1.5 ${activeTab === "nearby" ? "bg-[hsl(0,0%,20%)] text-white" : "text-white/45"}`}
        >
          À proximité
          <span className="bg-[hsl(0,85%,58%)] text-white text-[9px] font-bold px-1.5 py-[2px] rounded-full leading-none">+99</span>
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
                animate={{ scale: 1, opacity: 1, rotate: dragX * 0.03 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                style={{ willChange: "transform" }}
              >
                <div className="relative w-full h-full rounded-2xl overflow-hidden" onClick={handlePhotoTap}>
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
                      <div key={i} className="flex-1 h-[3px] rounded-full overflow-hidden bg-white/30">
                        <div className={`h-full rounded-full transition-all duration-300 ${i === currentPhoto ? "bg-white w-full" : i < currentPhoto ? "bg-white/70 w-full" : "w-0"}`} />
                      </div>
                    ))}
                  </div>

                  {/* Three dots menu */}
                  <button
                    className="absolute top-3 right-3 z-10 p-1"
                    onClick={(e) => { e.stopPropagation(); setShowBottomSheet(true); }}
                  >
                    <MoreHorizontal className="w-6 h-6 text-white drop-shadow-lg" />
                  </button>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />

                  {/* Swipe overlays */}
                  <AnimatePresence>
                    {swipeOverlay === "like" && (
                      <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }} className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                        <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-2xl">
                          <svg width="40" height="40" viewBox="0 0 24 24" fill="hsl(0,0%,8%)"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                        </div>
                      </motion.div>
                    )}
                    {swipeOverlay === "nope" && (
                      <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }} className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                        <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-2xl">
                          <svg width="36" height="36" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="hsl(0,0%,8%)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Profile info */}
                  <div className={`absolute bottom-0 left-0 right-0 z-10 pointer-events-none transition-all duration-500 ${isLastPhoto ? "inset-0" : ""}`}>
                    {isLastPhoto && <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />}
                    <div className={`relative h-full flex flex-col ${isLastPhoto ? "justify-start pt-14 px-5 pb-5 overflow-y-auto pointer-events-auto" : "justify-end p-5"}`}>
                      <div className="flex items-baseline gap-2">
                        <h2 className="text-3xl font-bold text-white">{profile.name}</h2>
                        <span className="text-2xl text-white/80 font-light">{profile.age}</span>
                      </div>
                      <div className="flex items-center gap-1.5 mt-1">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-white/70"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        <span className="text-white/70 text-sm">{profile.location}</span>
                      </div>
                      {isLastPhoto && profile.occupation && (
                        <div className="flex items-center gap-1.5 mt-0.5"><span className="text-white/70 text-sm">{profile.occupation}</span></div>
                      )}
                      {isLastPhoto && profile.emojis && (
                        <div className="flex gap-1 mt-3">{profile.emojis.map((emoji, i) => <span key={i} className="text-2xl">{emoji}</span>)}</div>
                      )}
                      {isLastPhoto && profile.interests && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {profile.interests.map(interest => (
                            <span key={interest} className="bg-white/10 border border-white/15 text-white text-xs font-bold px-3 py-1.5 rounded-md uppercase tracking-wide">{interest}</span>
                          ))}
                        </div>
                      )}
                      {isLastPhoto && profile.description && (
                        <p className="text-white/80 text-sm mt-3 leading-relaxed">{profile.description}</p>
                      )}
                      <div className="flex gap-2 mt-3">
                        {profile.tags.map(tag => (
                          <span key={tag} className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-md uppercase tracking-wide">{tag}</span>
                        ))}
                      </div>
                      {!isLastPhoto && (
                        <div className="mt-3 pointer-events-auto">
                          <button className="px-8 py-3 rounded-full border border-white/25 text-white text-sm font-medium bg-white/5 backdrop-blur-sm active:bg-white/10 transition-colors">
                            Envoie un message
                          </button>
                        </div>
                      )}
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
                animate={{ x: direction === "right" ? 500 : -500, rotate: direction === "right" ? 20 : -20, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                style={{ willChange: "transform" }}
              >
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                  <img src={profile.photos[currentPhoto]} alt={profile.name} className="absolute inset-0 w-full h-full object-cover" draggable={false} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-2xl">
                      {direction === "right" ? (
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="hsl(0,0%,8%)"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                      ) : (
                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="hsl(0,0%,8%)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      )}
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="flex items-baseline gap-2">
                      <h2 className="text-3xl font-bold text-white">{profile.name}</h2>
                      <span className="text-2xl text-white/80 font-light">{profile.age}</span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-1"><span className="text-white/70 text-sm">{profile.location}</span></div>
                    <div className="flex gap-2 mt-3">
                      {profile.tags.map(tag => <span key={tag} className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-md uppercase tracking-wide">{tag}</span>)}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>

      {/* BOTTOM SHEET - Bloquer / Signaler */}
      <AnimatePresence>
        {showBottomSheet && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 z-[200]" onClick={() => setShowBottomSheet(false)} />
            <motion.div
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-[201] bg-[hsl(0,0%,14%)] rounded-t-3xl pb-8"
            >
              <div className="w-10 h-1 rounded-full bg-white/20 mx-auto mt-3 mb-4" />
              <p className="text-white/80 text-center text-sm mb-4 px-4">
                Quel est le problème avec {profile?.name} ?
              </p>
              <button className="flex items-center gap-4 w-full px-6 py-4 active:bg-white/5 transition-colors">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                  <Ban className="w-5 h-5 text-[hsl(0,0%,8%)]" />
                </div>
                <span className="text-white text-[16px] font-medium">Bloquer</span>
              </button>
              <button className="flex items-center gap-4 w-full px-6 py-4 active:bg-white/5 transition-colors">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-[hsl(0,0%,8%)]" />
                </div>
                <span className="text-white text-[16px] font-medium">Signaler</span>
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* YELLOW BUTTON NOTIFICATIONS OVERLAY (existing) */}
      <AnimatePresence>
        {showNotifications && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="fixed inset-0 z-[100] bg-[hsl(0,0%,8%)] flex flex-col"
          >
            <div className="px-4 pt-4 pb-2 flex items-center">
              <button onClick={() => setShowNotifications(false)} className="w-10 h-10 rounded-full bg-[hsl(0,0%,16%)] flex items-center justify-center">
                <ChevronLeft className="w-5 h-5 text-white/90" />
              </button>
              <div className="flex-1" />
            </div>
            <div className="flex mx-4 mb-4 bg-[hsl(0,0%,12%)] rounded-[14px] p-[3px]">
              <button
                onClick={() => setNotifTab("messages")}
                className={`flex-1 py-[6px] rounded-[11px] text-[13px] font-semibold transition-all ${notifTab === "messages" ? "bg-[hsl(0,0%,20%)] text-white" : "text-white/45"}`}
              >
                Messages reçus
              </button>
              <button
                onClick={() => setNotifTab("added")}
                className={`flex-1 py-[6px] rounded-[11px] text-[13px] font-semibold transition-all flex items-center justify-center gap-1.5 ${notifTab === "added" ? "bg-[hsl(0,0%,20%)] text-white" : "text-white/45"}`}
              >
                T'ont ajouté
                <span className="bg-[hsl(0,85%,58%)] text-white text-[9px] font-bold px-1.5 py-[2px] rounded-full leading-none">+99</span>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-4">
              {notifTab === "messages" ? (
                <div className="space-y-1">
                  {mockMessages.map((msg) => (
                    <button
                      key={msg.id}
                      onClick={() => { setChatContact(msg); setShowNotifications(false); setViewState("chat"); setChatMessage(""); }}
                      className="flex items-center gap-3 py-3 border-b border-white/5 w-full text-left active:bg-white/5 transition-colors"
                    >
                      <div className="w-14 h-14 rounded-full flex-shrink-0" style={{ background: msg.color }} />
                      <div className="flex-1 min-w-0">
                        <p className="text-white/60 text-xs font-medium mb-0.5">{msg.name}</p>
                        <p className="text-white/70 text-sm truncate">Dit "{msg.message}" · {msg.time}</p>
                      </div>
                      <div className="w-11 h-11 rounded-lg bg-[hsl(0,0%,16%)] flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5 text-white/40" />
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div>
                  <p className="text-white/80 text-center text-[15px] font-medium mb-5">133 personnes veulent faire du sport avec toi.</p>
                  <div className="grid grid-cols-2 gap-3">
                    {mockAddRequests.map((req) => (
                      <div key={req.id} className="rounded-2xl overflow-hidden bg-[hsl(0,0%,12%)]">
                        <div className="w-full aspect-[4/5] relative" style={{ background: `linear-gradient(135deg, ${req.color}, hsl(0,0%,20%))`, filter: "blur(8px)" }} />
                        <div className="px-3 pt-2 pb-3 -mt-12 relative z-10">
                          {req.active && (
                            <div className="flex items-center gap-1 mb-1">
                              <div className="w-2 h-2 rounded-full bg-[hsl(120,70%,50%)]" />
                              <span className="text-white/70 text-[11px]">Actif récemment</span>
                            </div>
                          )}
                          <div className="w-20 h-3 rounded bg-white/15 mb-2.5" />
                          <div className="flex gap-1.5">
                            <button className="flex-1 py-2 rounded-full bg-[hsl(0,0%,22%)] flex items-center justify-center active:bg-[hsl(0,0%,28%)] transition-colors">
                              <X className="w-4 h-4 text-white" strokeWidth={3} />
                            </button>
                            <button className="flex-1 py-2 rounded-full bg-white flex items-center justify-center active:bg-white/90 transition-colors">
                              <Plus className="w-4 h-4 text-[hsl(0,0%,8%)]" strokeWidth={3} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Community;
