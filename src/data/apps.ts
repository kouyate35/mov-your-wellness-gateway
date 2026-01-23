export interface AppData {
  id: string;
  name: string;
  icon: string;
  description: string;
  bgColor: string;
  iconColor: string;
}

export const apps: AppData[] = [
  {
    id: "tiktok",
    name: "TikTok",
    icon: "♪",
    description: "Vidéos courtes et divertissement",
    bgColor: "bg-black",
    iconColor: "text-white",
  },
  {
    id: "instagram",
    name: "Instagram",
    icon: "📷",
    description: "Photos, stories et reels",
    bgColor: "bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400",
    iconColor: "text-white",
  },
  {
    id: "youtube",
    name: "YouTube",
    icon: "▶",
    description: "Vidéos et streaming",
    bgColor: "bg-red-600",
    iconColor: "text-white",
  },
  {
    id: "twitter",
    name: "X",
    icon: "𝕏",
    description: "Actualités et conversations",
    bgColor: "bg-black",
    iconColor: "text-white",
  },
  {
    id: "snapchat",
    name: "Snapchat",
    icon: "👻",
    description: "Messages éphémères",
    bgColor: "bg-yellow-400",
    iconColor: "text-black",
  },
  {
    id: "facebook",
    name: "Facebook",
    icon: "f",
    description: "Réseau social",
    bgColor: "bg-blue-600",
    iconColor: "text-white",
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    icon: "📱",
    description: "Messagerie instantanée",
    bgColor: "bg-green-500",
    iconColor: "text-white",
  },
  {
    id: "netflix",
    name: "Netflix",
    icon: "N",
    description: "Streaming de films et séries",
    bgColor: "bg-black",
    iconColor: "text-red-600",
  },
  {
    id: "reddit",
    name: "Reddit",
    icon: "🤖",
    description: "Communautés et discussions",
    bgColor: "bg-orange-600",
    iconColor: "text-white",
  },
  {
    id: "twitch",
    name: "Twitch",
    icon: "📺",
    description: "Streaming en direct",
    bgColor: "bg-purple-600",
    iconColor: "text-white",
  },
  {
    id: "discord",
    name: "Discord",
    icon: "🎮",
    description: "Chat vocal et communautés",
    bgColor: "bg-indigo-600",
    iconColor: "text-white",
  },
];
