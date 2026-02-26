import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, Plus, Search } from "lucide-react";

const tags = ["Burgers", "Dance", "Workout", "Music", "Gaming", "Anime"];

const mockUsers: Record<string, { id: number; name: string; active: boolean; img: string }[]> = {
  Burgers: [
    { id: 1, name: "Mjee", active: false, img: "https://i.pravatar.cc/300?img=1" },
    { id: 2, name: "Manon", active: false, img: "https://i.pravatar.cc/300?img=2" },
    { id: 3, name: "M", active: true, img: "https://i.pravatar.cc/300?img=3" },
    { id: 4, name: "Taehzen", active: true, img: "https://i.pravatar.cc/300?img=4" },
    { id: 5, name: "Léa", active: true, img: "https://i.pravatar.cc/300?img=5" },
    { id: 6, name: "Rayan", active: false, img: "https://i.pravatar.cc/300?img=6" },
  ],
  Dance: [
    { id: 7, name: "Sofia", active: true, img: "https://i.pravatar.cc/300?img=7" },
    { id: 8, name: "Nora", active: false, img: "https://i.pravatar.cc/300?img=8" },
    { id: 9, name: "Karim", active: true, img: "https://i.pravatar.cc/300?img=9" },
    { id: 10, name: "Emma", active: false, img: "https://i.pravatar.cc/300?img=10" },
  ],
  Workout: [
    { id: 11, name: "Alex", active: true, img: "https://i.pravatar.cc/300?img=11" },
    { id: 12, name: "Jordan", active: false, img: "https://i.pravatar.cc/300?img=12" },
    { id: 13, name: "Sam", active: true, img: "https://i.pravatar.cc/300?img=13" },
    { id: 14, name: "Chris", active: false, img: "https://i.pravatar.cc/300?img=14" },
  ],
};

const getUsers = (tag: string) =>
  mockUsers[tag] || [
    { id: 99, name: "User1", active: true, img: "https://i.pravatar.cc/300?img=20" },
    { id: 98, name: "User2", active: false, img: "https://i.pravatar.cc/300?img=21" },
  ];

const Community = () => {
  const navigate = useNavigate();
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [dismissed, setDismissed] = useState<Record<number, boolean>>({});

  const openTag = (tag: string) => {
    setSelectedTag(tag);
    setDismissed({});
  };

  const closeTag = () => setSelectedTag(null);

  const dismiss = (id: number) => setDismissed((prev) => ({ ...prev, [id]: true }));

  const users = selectedTag ? getUsers(selectedTag).filter((u) => !dismissed[u.id]) : [];

  // TAG LIST VIEW
  if (!selectedTag) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] flex flex-col">
        <div className="bg-[#4A90E2] p-6 pb-10 relative">
          <button onClick={() => navigate(-1)} className="absolute top-4 left-4 p-1">
            <X className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-2xl font-bold text-white text-center mt-6">Explore les tags</h1>
        </div>
        <div className="p-4 grid grid-cols-2 gap-3 -mt-4">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => openTag(tag)}
              className="bg-[#4A90E2] hover:bg-[#357ABD] text-white font-bold py-4 px-3 rounded-2xl shadow-md transition-all active:scale-95"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // TAG DETAIL VIEW — style Yubo
  return (
    <div className="min-h-screen bg-[#1a1a1a] flex flex-col relative">
      {/* HEADER BLEU FIXE avec effet arc */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="bg-[#4A90E2] px-6 pt-5 pb-8 flex flex-col items-center relative">
          <div className="w-full flex justify-start mb-2">
            <button onClick={closeTag} className="text-white text-2xl font-light leading-none p-1">
              <X className="w-6 h-6" />
            </button>
          </div>
          <h2 className="text-3xl font-black text-[#141414]">{selectedTag}</h2>
          <button className="mt-3 bg-[#141414] text-white font-semibold px-6 py-2 rounded-full text-sm flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Ajouter ce tag
          </button>
        </div>
        {/* Arc de cercle : div bleu avec border-radius bottom arrondi qui déborde */}
        <div
          style={{
            position: "relative",
            left: "-5%",
            width: "110%",
            height: "40px",
            background: "#4A90E2",
            borderBottomLeftRadius: "50%",
            borderBottomRightRadius: "50%",
            marginTop: "-1px",
          }}
        />
      </div>

      {/* ZONE DE SCROLL */}
      <div className="flex-1 overflow-y-auto pt-[220px] pb-[80px] px-3">
        <p className="text-white font-bold text-lg px-1 mb-3">
          Ils aiment ce tag
        </p>

        {users.length === 0 && (
          <div className="text-gray-400 text-center mt-10">
            Plus personne à voir ! 🎉
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          {users.map((user) => (
            <div
              key={user.id}
              className="relative rounded-2xl overflow-hidden bg-gray-800"
              style={{ aspectRatio: "3/4" }}
            >
              <img
                src={user.img}
                alt={user.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              <div className="absolute top-3 left-3">
                <span className="text-white font-bold text-base drop-shadow">
                  {user.name}
                </span>
              </div>

              {user.active && (
                <div className="absolute top-3 right-3 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
                  <span className="text-white text-xs">Actif</span>
                </div>
              )}

              <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-4">
                <button
                  onClick={() => dismiss(user.id)}
                  className="w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-lg active:scale-90 transition-transform"
                >
                  <X className="w-5 h-5 text-red-500" />
                </button>
                <button className="w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-lg active:scale-90 transition-transform">
                  <Plus className="w-5 h-5 text-green-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Barre recherche fixe en bas */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-3 bg-[#1a1a1a]">
        <button className="w-full bg-yellow-400 text-black font-bold py-3 rounded-full flex items-center justify-center gap-2">
          <Search className="w-5 h-5" />
          Recherche des tags
        </button>
      </div>
    </div>
  );
};

export default Community;
