import "./HeroFigureAnimation.css";

/**
 * Athletic silhouette — clean, anatomically proportioned figure performing
 * a smooth idle → squat → stretch → meditation cycle (12s loop).
 */
const HeroFigureAnimation = () => {
  return (
    <div className="hero-anim-stage">
      <div className="hero-anim-aura" />
      <div className="hero-anim-ring" />
      <div className="hero-anim-ring" />
      <div className="hero-anim-ring" />

      <div className="hero-anim-figure-container">
        <svg
          className="hero-anim-svg"
          viewBox="0 0 200 320"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.85" />
            </linearGradient>
          </defs>

          {/* Head */}
          <circle cx="100" cy="42" r="14" fill="url(#bodyGrad)" />
          {/* Neck */}
          <rect x="96" y="54" width="8" height="8" rx="3" fill="url(#bodyGrad)" />

          {/* Torso (athletic V-shape) */}
          <path
            d="M 78 64 Q 78 60 84 60 L 116 60 Q 122 60 122 64 L 118 110 Q 116 118 100 118 Q 84 118 82 110 Z"
            fill="url(#bodyGrad)"
          />

          {/* Left arm */}
          <g className="hero-anim-left-arm">
            <path
              d="M 80 66 Q 70 70 64 88 Q 60 102 62 118 Q 64 122 68 122 Q 72 120 72 116 Q 72 102 76 92 Q 80 80 84 72 Z"
              fill="url(#bodyGrad)"
            />
            {/* Hand */}
            <circle cx="65" cy="120" r="4.5" fill="url(#bodyGrad)" />
          </g>

          {/* Right arm */}
          <g className="hero-anim-right-arm">
            <path
              d="M 120 66 Q 130 70 136 88 Q 140 102 138 118 Q 136 122 132 122 Q 128 120 128 116 Q 128 102 124 92 Q 120 80 116 72 Z"
              fill="url(#bodyGrad)"
            />
            <circle cx="135" cy="120" r="4.5" fill="url(#bodyGrad)" />
          </g>

          {/* Hip */}
          <path
            d="M 84 116 L 116 116 L 118 132 Q 100 138 82 132 Z"
            fill="url(#bodyGrad)"
          />

          {/* Legs */}
          <g className="hero-anim-legs">
            {/* Left leg */}
            <path
              d="M 86 132 Q 84 170 88 210 Q 90 240 92 260 Q 92 264 88 264 Q 84 264 82 260 Q 78 230 78 200 Q 78 170 82 134 Z"
              fill="url(#bodyGrad)"
            />
            {/* Right leg */}
            <path
              d="M 114 132 Q 116 170 112 210 Q 110 240 108 260 Q 108 264 112 264 Q 116 264 118 260 Q 122 230 122 200 Q 122 170 118 134 Z"
              fill="url(#bodyGrad)"
            />
            {/* Feet */}
            <ellipse cx="85" cy="266" rx="9" ry="3.5" fill="url(#bodyGrad)" />
            <ellipse cx="115" cy="266" rx="9" ry="3.5" fill="url(#bodyGrad)" />
          </g>
        </svg>
      </div>
    </div>
  );
};

export default HeroFigureAnimation;
