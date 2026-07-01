import { useEffect, useState } from "react";
import boxBreathingVideo from "@/assets/exercise-box-breathing.mp4";
import pushupsVideo from "@/assets/exercise-pushups.mp4";
import forwardFoldVideo from "@/assets/exercise-forward-fold.mp4";
import pauseVideo from "@/assets/exercise-pause.mp4";

const VIDEOS = [boxBreathingVideo, pushupsVideo, forwardFoldVideo, pauseVideo];

/**
 * Ambient background used across the app — crossfading category videos
 * covered by a heavy dark gradient so UI stays legible while a soft, moody
 * ambience shows through. No heavy blur (keeps videos crisp, à la onboarding).
 */
const GlobalBackground = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => (i + 1) % VIDEOS.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-black"
    >
      {VIDEOS.map((src, i) => (
        <video
          key={src}
          src={src}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-[1400ms] ease-in-out"
          style={{ opacity: active === i ? 0.55 : 0 }}
        />
      ))}
      {/* Dark tint — keeps UI dominant, videos visible as ambience */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.72) 50%, rgba(0,0,0,0.85) 100%)",
        }}
      />
      {/* Subtle vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)",
        }}
      />
    </div>
  );
};

export default GlobalBackground;
