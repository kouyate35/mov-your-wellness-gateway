import React from "react";
import movIconImage from "@/assets/mov-icon.png";

interface IconProps {
  size?: "sm" | "md" | "lg" | "xl";
  withBg?: boolean;
}

const sizeClasses = {
  sm: "w-8 h-8",
  md: "w-12 h-12",
  lg: "w-16 h-16",
  xl: "w-20 h-20",
};

const svgSizeClasses = {
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-8 h-8",
  xl: "w-10 h-10",
};

// MOV icon with black squircle background
export const MovIcon = ({ size = "md" }: { size?: "sm" | "md" | "lg" | "xl" }) => {
  return (
    <div className={`${sizeClasses[size]} bg-black rounded-2xl flex items-center justify-center shrink-0 overflow-hidden`}>
      <img src={movIconImage} alt="MOV" className="w-[70%] h-[70%] object-contain" />
    </div>
  );
};

// TikTok icon with authentic black background
export const TikTokIcon = ({ size = "md", withBg = true }: IconProps) => {
  const svg = (
    <svg viewBox="0 0 24 24" className={withBg ? svgSizeClasses[size] : sizeClasses[size]} fill="white">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
    </svg>
  );

  if (!withBg) return svg;

  return (
    <div className={`${sizeClasses[size]} bg-black rounded-2xl flex items-center justify-center shrink-0`}>
      {svg}
    </div>
  );
};

// Instagram icon with authentic gradient background
export const InstagramIcon = ({ size = "md", withBg = true }: IconProps) => {
  const svg = (
    <svg viewBox="0 0 24 24" className={withBg ? svgSizeClasses[size] : sizeClasses[size]} fill="white">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );

  if (!withBg) return svg;

  return (
    <div className={`${sizeClasses[size]} bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 rounded-2xl flex items-center justify-center shrink-0`}>
      {svg}
    </div>
  );
};

// YouTube icon with authentic red background
export const YouTubeIcon = ({ size = "md", withBg = true }: IconProps) => {
  const svg = (
    <svg viewBox="0 0 24 24" className={withBg ? svgSizeClasses[size] : sizeClasses[size]} fill="white">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );

  if (!withBg) return svg;

  return (
    <div className={`${sizeClasses[size]} bg-red-600 rounded-2xl flex items-center justify-center shrink-0`}>
      {svg}
    </div>
  );
};

// X (Twitter) icon with authentic black background
export const XIcon = ({ size = "md", withBg = true }: IconProps) => {
  const svg = (
    <svg viewBox="0 0 24 24" className={withBg ? svgSizeClasses[size] : sizeClasses[size]} fill="white">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );

  if (!withBg) return svg;

  return (
    <div className={`${sizeClasses[size]} bg-black rounded-2xl flex items-center justify-center shrink-0`}>
      {svg}
    </div>
  );
};

// Snapchat icon with authentic yellow background
export const SnapchatIcon = ({ size = "md", withBg = true }: IconProps) => {
  const svg = (
    <svg viewBox="0 0 24 24" className={withBg ? svgSizeClasses[size] : sizeClasses[size]} fill="white">
      <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12 1.033-.301.165-.088.344-.104.464-.104.182 0 .359.029.509.09.45.149.734.479.734.838.015.449-.39.839-1.213 1.168-.089.029-.209.075-.344.119-.45.135-1.139.36-1.333.81-.09.224-.061.524.12.868l.015.015c.06.136 1.526 3.475 4.791 4.014.255.044.435.27.42.509 0 .075-.015.149-.045.225-.24.569-1.273.988-3.146 1.271-.059.091-.12.375-.164.57-.029.179-.074.36-.134.553-.076.271-.27.405-.555.405h-.03a4.22 4.22 0 0 1-.595-.074c-.42-.074-1.034-.164-1.768-.164-.419 0-.87.029-1.3.135-.85.209-1.544.749-2.246 1.291-.359.269-.719.538-1.094.779-.179.121-.359.179-.538.179-.18 0-.36-.059-.54-.18-.359-.209-.704-.464-1.049-.704-.719-.569-1.414-1.109-2.291-1.32a5.865 5.865 0 0 0-1.286-.135c-.734 0-1.318.09-1.768.164a4.44 4.44 0 0 1-.585.074h-.03c-.284 0-.479-.134-.555-.405a4.93 4.93 0 0 1-.134-.553c-.044-.194-.104-.479-.164-.57-1.872-.283-2.905-.702-3.145-1.271a.564.564 0 0 1-.045-.225c-.015-.239.165-.465.42-.509 3.265-.539 4.731-3.878 4.791-4.014l.015-.015c.18-.344.21-.644.12-.868-.195-.45-.884-.675-1.333-.81a8.072 8.072 0 0 1-.345-.119c-.823-.33-1.228-.72-1.213-1.168 0-.36.284-.689.734-.838.149-.06.327-.09.509-.09.12 0 .299.015.465.104.359.181.719.286 1.033.301.194 0 .325-.045.401-.09l-.03-.51a69.6 69.6 0 0 1-.003-.06c-.104-1.628-.23-3.654.299-4.847C7.859 1.069 11.216.793 12.206.793z"/>
    </svg>
  );

  if (!withBg) return svg;

  return (
    <div className={`${sizeClasses[size]} bg-yellow-400 rounded-2xl flex items-center justify-center shrink-0`}>
      {svg}
    </div>
  );
};

// Facebook icon with authentic blue background
export const FacebookIcon = ({ size = "md", withBg = true }: IconProps) => {
  const svg = (
    <svg viewBox="0 0 24 24" className={withBg ? svgSizeClasses[size] : sizeClasses[size]} fill="white">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );

  if (!withBg) return svg;

  return (
    <div className={`${sizeClasses[size]} bg-blue-600 rounded-2xl flex items-center justify-center shrink-0`}>
      {svg}
    </div>
  );
};

// WhatsApp icon with authentic green background
export const WhatsAppIcon = ({ size = "md", withBg = true }: IconProps) => {
  const svg = (
    <svg viewBox="0 0 24 24" className={withBg ? svgSizeClasses[size] : sizeClasses[size]} fill="white">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );

  if (!withBg) return svg;

  return (
    <div className={`${sizeClasses[size]} bg-green-500 rounded-2xl flex items-center justify-center shrink-0`}>
      {svg}
    </div>
  );
};

// Netflix icon with authentic black background and red N
export const NetflixIcon = ({ size = "md", withBg = true }: IconProps) => {
  const svg = (
    <svg viewBox="0 0 24 24" className={withBg ? svgSizeClasses[size] : sizeClasses[size]} fill="#E50914">
      <path d="M5.398 0v.006c3.028 8.556 5.37 15.175 8.348 23.596 2.344.058 4.85.398 4.854.398-2.8-7.924-5.923-16.747-8.487-24zm8.489 0v9.63L18.6 22.951c-.043-7.86-.004-15.913.002-22.95zM5.398 1.05V24c1.873-.225 2.81-.312 4.715-.398v-9.22z"/>
    </svg>
  );

  if (!withBg) return svg;

  return (
    <div className={`${sizeClasses[size]} bg-black rounded-2xl flex items-center justify-center shrink-0`}>
      {svg}
    </div>
  );
};

// Reddit icon with authentic orange background
export const RedditIcon = ({ size = "md", withBg = true }: IconProps) => {
  const svg = (
    <svg viewBox="0 0 24 24" className={withBg ? svgSizeClasses[size] : sizeClasses[size]} fill="white">
      <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
    </svg>
  );

  if (!withBg) return svg;

  return (
    <div className={`${sizeClasses[size]} bg-orange-600 rounded-2xl flex items-center justify-center shrink-0`}>
      {svg}
    </div>
  );
};

// Twitch icon with authentic purple background
export const TwitchIcon = ({ size = "md", withBg = true }: IconProps) => {
  const svg = (
    <svg viewBox="0 0 24 24" className={withBg ? svgSizeClasses[size] : sizeClasses[size]} fill="white">
      <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z"/>
    </svg>
  );

  if (!withBg) return svg;

  return (
    <div className={`${sizeClasses[size]} bg-purple-600 rounded-2xl flex items-center justify-center shrink-0`}>
      {svg}
    </div>
  );
};

// Discord icon with authentic indigo background
export const DiscordIcon = ({ size = "md", withBg = true }: IconProps) => {
  const svg = (
    <svg viewBox="0 0 24 24" className={withBg ? svgSizeClasses[size] : sizeClasses[size]} fill="white">
      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z"/>
    </svg>
  );

  if (!withBg) return svg;

  return (
    <div className={`${sizeClasses[size]} bg-indigo-600 rounded-2xl flex items-center justify-center shrink-0`}>
      {svg}
    </div>
  );
};

// Helper function to get app icon component by ID
export const getAppIcon = (appId: string, size: IconProps["size"] = "md", withBg = true): React.ReactNode => {
  const icons: Record<string, (props: IconProps) => JSX.Element> = {
    tiktok: TikTokIcon,
    instagram: InstagramIcon,
    youtube: YouTubeIcon,
    twitter: XIcon,
    snapchat: SnapchatIcon,
    facebook: FacebookIcon,
    whatsapp: WhatsAppIcon,
    netflix: NetflixIcon,
    reddit: RedditIcon,
    twitch: TwitchIcon,
    discord: DiscordIcon,
  };

  const IconComponent = icons[appId];
  if (IconComponent) {
    return <IconComponent size={size} withBg={withBg} />;
  }
  return null;
};

// Legacy exports for backward compatibility (always with background now)
export const appIconComponents: Record<string, React.ReactNode> = {
  tiktok: <TikTokIcon size="md" withBg={true} />,
  instagram: <InstagramIcon size="md" withBg={true} />,
  youtube: <YouTubeIcon size="md" withBg={true} />,
  twitter: <XIcon size="md" withBg={true} />,
  snapchat: <SnapchatIcon size="md" withBg={true} />,
  facebook: <FacebookIcon size="md" withBg={true} />,
  whatsapp: <WhatsAppIcon size="md" withBg={true} />,
  netflix: <NetflixIcon size="md" withBg={true} />,
  reddit: <RedditIcon size="md" withBg={true} />,
  twitch: <TwitchIcon size="md" withBg={true} />,
  discord: <DiscordIcon size="md" withBg={true} />,
};
