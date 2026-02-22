import { useNavigate } from "react-router-dom";
import { ArrowLeft, MoreHorizontal, Heart } from "lucide-react";
import { useRef, useState } from "react";
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
    likes: 127,
  },
  {
    id: 2,
    username: "yogi_lena",
    avatar: "L",
    text: "Ma routine étirement du matin, 15 min qui changent tout 🧘‍♀️",
    images: [post2],
    likes: 89,
  },
  {
    id: 3,
    username: "maxime.k",
    avatar: "M",
    text: "100 pompes par jour pendant 30 jours — jour 12 ✅ Qui relève le défi ?",
    images: [post3],
    likes: 234,
  },
  {
    id: 4,
    username: "zen_nina",
    avatar: "N",
    text: "Respiration cohérente sur le rooftop au coucher du soleil 🌅",
    images: [post4],
    likes: 56,
  },
  {
    id: 5,
    username: "trail_alex",
    avatar: "A",
    text: "Trail matinal en forêt — rien de mieux pour commencer la journée 🌲",
    images: [post5],
    likes: 178,
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
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());

  const toggleLike = (id: number) => {
    setLikedPosts((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      {/* Header */}
      <header className="flex items-center px-4 pt-4 pb-3">
        <button onClick={() => navigate(-1)} className="p-1 -ml-1">
          <ArrowLeft className="w-5 h-5 text-muted-foreground" />
        </button>
      </header>

      {/* Branding area — like Threads */}
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
              className="snap-center shrink-0 w-[75vw] max-w-[340px] rounded-2xl bg-secondary/40 border border-border/30 overflow-hidden"
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

              {/* Like row */}
              <div className="px-4 pb-4 flex items-center gap-2">
                <button
                  onClick={() => toggleLike(post.id)}
                  className="p-1 -ml-1 active:scale-125 transition-transform"
                >
                  <Heart
                    className={`w-5 h-5 transition-colors ${
                      likedPosts.has(post.id)
                        ? "fill-red-500 text-red-500"
                        : "text-muted-foreground"
                    }`}
                  />
                </button>
                <span className="text-xs text-muted-foreground">
                  {post.likes + (likedPosts.has(post.id) ? 1 : 0)} J'aime
                </span>
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
