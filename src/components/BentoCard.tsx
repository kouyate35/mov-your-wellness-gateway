import { useRef, useEffect } from "react";

type BentoSize = "small" | "medium" | "large" | "wide";

interface BentoCardProps {
  id: string;
  name: string;
  videoSrc: string;
  size: BentoSize;
  onClick?: () => void;
}

const sizeClasses: Record<BentoSize, string> = {
  small: "col-span-1 row-span-1",
  medium: "col-span-1 row-span-2",
  large: "col-span-2 row-span-2",
  wide: "col-span-2 row-span-1",
};

const BentoCard = ({ id, name, videoSrc, size, onClick }: BentoCardProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay may be blocked, that's ok
      });
    }
  }, []);

  return (
    <button
      onClick={onClick}
      className={`
        ${sizeClasses[size]}
        relative overflow-hidden rounded-3xl
        group cursor-pointer
        transition-transform duration-300
        hover:scale-[1.02] active:scale-[0.98]
      `}
    >
      {/* Video Background */}
      <video
        ref={videoRef}
        src={videoSrc}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Subtle overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

      {/* Glassmorphism Badge */}
      <div className="absolute top-3 left-3">
        <span className="px-3 py-1.5 text-xs font-semibold text-white bg-white/20 backdrop-blur-md rounded-full border border-white/10">
          {name}
        </span>
      </div>
    </button>
  );
};

export default BentoCard;
