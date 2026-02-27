import { useNavigate } from "react-router-dom";
import { X, Plus } from "lucide-react";

import communityPost1 from "@/assets/community-post-1.jpg";
import communityPost2 from "@/assets/community-post-2.jpg";
import communityPost3 from "@/assets/community-post-3.jpg";
import communityPost4 from "@/assets/community-post-4.jpg";
import communityPost5 from "@/assets/community-post-5.jpg";

const mockProfiles = [
  { id: 1, name: "Alex", image: communityPost1 },
  { id: 2, name: "Jordan", image: communityPost2 },
  { id: 3, name: "Sam", image: communityPost3 },
  { id: 4, name: "Chris", image: communityPost4 },
  { id: 5, name: "Morgan", image: communityPost5 },
  { id: 6, name: "Taylor", image: communityPost1 },
];

const Community = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Fixed header — blue + arc as one block */}
      <div className="fixed top-0 left-0 right-0 z-50" style={{ background: "hsl(199 89% 48%)" }}>
        {/* Header content */}
        <div className="relative pt-10 pb-6 flex flex-col items-center">
          <button
            onClick={() => navigate(-1)}
            className="absolute top-4 left-4 p-1"
          >
            <X className="w-6 h-6" style={{ color: "hsl(0 0% 8%)" }} />
          </button>

          <h1
            className="text-3xl font-black tracking-tight"
            style={{ color: "hsl(0 0% 8%)" }}
          >
            Workout
          </h1>

          <button
            className="mt-4 px-6 py-3 rounded-full font-semibold text-sm flex items-center gap-2"
            style={{
              background: "hsl(0 0% 8%)",
              color: "hsl(0 0% 95%)",
            }}
          >
            <Plus className="w-4 h-4" />
            Ajouter un tag
          </button>
        </div>

        {/* Arc: blue on top (transparent), dark background on bottom */}
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full block"
          preserveAspectRatio="none"
          style={{ height: "50px" }}
        >
          <path
            d="M0 0 H1440 V120 C960 0 480 0 0 120 Z"
            fill="hsl(0 0% 13%)"
          />
        </svg>
      </div>

      {/* Scrollable content */}
      <div className="px-3 pt-[220px] pb-6">
        <p className="text-foreground font-bold text-base mb-4 px-1">
          Trouver un partenaire de sport
        </p>

        <div className="grid grid-cols-2 gap-3">
          {mockProfiles.map((profile) => (
            <div
              key={profile.id}
              className="relative rounded-2xl overflow-hidden"
              style={{ aspectRatio: "3 / 4" }}
            >
              <img
                src={profile.image}
                alt={profile.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

              <div className="absolute top-3 left-3">
                <span className="text-white font-bold text-lg drop-shadow-lg">
                  {profile.name}
                </span>
              </div>

              <div className="absolute bottom-3 left-3 flex items-center gap-2">
                <button
                  className="w-11 h-11 rounded-full flex items-center justify-center shadow-lg"
                  style={{ background: "hsl(0 0% 100%)" }}
                >
                  <X className="w-5 h-5" style={{ color: "hsl(0 72% 51%)" }} />
                </button>
                <button
                  className="w-11 h-11 rounded-full flex items-center justify-center shadow-lg"
                  style={{ background: "hsl(0 0% 100%)" }}
                >
                  <Plus className="w-5 h-5" style={{ color: "hsl(142 71% 45%)" }} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Community;
