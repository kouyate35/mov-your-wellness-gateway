import { useNavigate } from "react-router-dom";
import { ArrowLeft, MoreHorizontal } from "lucide-react";
import { useRef, useState, useEffect, useCallback } from "react";
import movIcon from "@/assets/mov-icon.png";
import post1 from "@/assets/community-post-1.jpg";
import post2 from "@/assets/community-post-2.jpg";
import post3 from "@/assets/community-post-3.jpg";
import post4 from "@/assets/community-post-4.jpg";
import post5 from "@/assets/community-post-5.jpg";

const posts = [
  {
    id: 1,
    username: "sarah_fit",
    avatar: "S",
    text: "Session squats en groupe ce matin au parc 🔥 Qui veut rejoindre demain ?",
    images: [post1],
  },
  {
    id: 2,
    username: "yogi_lena",
    avatar: "L",
    text: "Ma routine étirement du matin, 15 min qui changent tout 🧘‍♀️",
    images: [post2],
  },
  {
    id: 3,
    username: "maxime.k",
    avatar: "M",
    text: "100 pompes par jour pendant 30 jours — jour 12 ✅ Qui relève le défi ?",
    images: [post3],
  },
  {
    id: 4,
    username: "zen_nina",
    avatar: "N",
    text: "Respiration cohérente sur le rooftop au coucher du soleil 🌅",
    images: [post4],
  },
  {
    id: 5,
    username: "trail_alex",
    avatar: "A",
    text: "Trail matinal en forêt — rien de mieux pour commencer la journée 🌲",
    images: [post5],
  },
];

const avatarColors = [
  "bg-emerald-600",
  "bg-violet-600",
  "bg-amber-600",
  "bg-sky-600",
  "bg-rose-600",
];

const Community = () => {
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollX, setScrollX] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);

  const handleScroll = useCallback(() => {
    if (scrollRef.current) {
      setScrollX(scrollRef.current.scrollLeft);
    }
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    // Measure card width (75vw + gap)
    const firstCard = el.querySelector("[data-card]") as HTMLElement;
    if (firstCard) {
      setCardWidth(firstCard.offsetWidth + 16); // 16 = gap-4
    }
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const getCardStyle = (index: number) => {
    if (!cardWidth) return {};
    const cardCenter = index * cardWidth + cardWidth / 2;
    const viewCenter = scrollX + (scrollRef.current?.offsetWidth || 0) / 2;
    const distance = (cardCenter - viewCenter) / cardWidth;
    const clampedDistance = Math.max(-1.5, Math.min(1.5, distance));

    const scale = 1 - Math.abs(clampedDistance) * 0.08;
    const rotateY = clampedDistance * -6;
    const translateZ = -Math.abs(clampedDistance) * 30;
    const opacity = 1 - Math.abs(clampedDistance) * 0.25;

    return {
      transform: `perspective(800px) rotateY(${rotateY}deg) scale(${scale}) translateZ(${translateZ}px)`,
      opacity: Math.max(0.5, opacity),
      transition: "transform 0.05s linear, opacity 0.05s linear",
    };
  };

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      {/* Header */}
      <header className="flex items-center px-4 pt-4 pb-3">
        <button onClick={() => navigate(-1)} className="p-1 -ml-1">
          <ArrowLeft className="w-5 h-5 text-muted-foreground" />
        </button>
      </header>

      {/* Branding area */}
      <div className="flex flex-col items-center pt-6 pb-10">
        <img src={movIcon} alt="Workout" className="w-10 h-10 rounded-xl mb-3" />
        <h1 className="text-lg font-semibold text-foreground tracking-tight">
          Workout suggérés
        </h1>
      </div>

      {/* Horizontal carousel */}
      <div className="flex-1 flex items-start overflow-hidden">
        <div
          ref={scrollRef}
          className="flex gap-4 px-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8"
          style={{
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {posts.map((post, i) => (
            <div
              key={post.id}
              data-card
              className="snap-center shrink-0 w-[75vw] max-w-[340px] rounded-2xl overflow-hidden border border-white/[0.06]"
              style={{
                background: "linear-gradient(145deg, hsl(0 0% 12%), hsl(0 0% 7%))",
                ...getCardStyle(i),
                willChange: "transform, opacity",
              }}
            >
              {/* Card header */}
              <div className="flex items-center justify-between px-4 pt-4 pb-3">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-8 h-8 rounded-full ${avatarColors[i % avatarColors.length]} flex items-center justify-center text-xs font-semibold text-foreground`}
                  >
                    {post.avatar}
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {post.username}
                  </span>
                </div>
                <button className="p-1">
                  <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>

              {/* Text */}
              <p className="px-4 pb-3 text-sm text-foreground/90 leading-relaxed">
                {post.text}
              </p>

              {/* Image */}
              <div className="px-3 pb-4">
                <img
                  src={post.images[0]}
                  alt=""
                  className="w-full aspect-[4/5] object-cover rounded-xl"
                  loading="lazy"
                />
              </div>
            </div>
          ))}

          {/* Spacer for last card scroll */}
          <div className="shrink-0 w-4" />
        </div>
      </div>
    </div>
  );
};

export default Community;
