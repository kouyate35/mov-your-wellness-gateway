export interface AppData {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
}

export const apps: AppData[] = [
  {
    id: "tiktok",
    name: "TikTok",
    icon: "🎵",
    description: "Vidéos courtes et divertissement",
    color: "hsl(0 0% 0%)",
  },
  {
    id: "instagram",
    name: "Instagram",
    icon: "📸",
    description: "Photos, stories et reels",
    color: "hsl(340 80% 55%)",
  },
  {
    id: "youtube",
    name: "YouTube",
    icon: "▶️",
    description: "Vidéos et streaming",
    color: "hsl(0 80% 50%)",
  },
  {
    id: "twitter",
    name: "X (Twitter)",
    icon: "𝕏",
    description: "Actualités et conversations",
    color: "hsl(0 0% 0%)",
  },
  {
    id: "snapchat",
    name: "Snapchat",
    icon: "👻",
    description: "Messages éphémères",
    color: "hsl(55 100% 50%)",
  },
  {
    id: "facebook",
    name: "Facebook",
    icon: "📘",
    description: "Réseau social",
    color: "hsl(220 70% 50%)",
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    icon: "💬",
    description: "Messagerie instantanée",
    color: "hsl(142 70% 45%)",
  },
  {
    id: "netflix",
    name: "Netflix",
    icon: "🎬",
    description: "Streaming de films et séries",
    color: "hsl(0 80% 45%)",
  },
  {
    id: "reddit",
    name: "Reddit",
    icon: "🤖",
    description: "Communautés et discussions",
    color: "hsl(16 100% 50%)",
  },
  {
    id: "twitch",
    name: "Twitch",
    icon: "🎮",
    description: "Streaming en direct",
    color: "hsl(264 100% 64%)",
  },
];
