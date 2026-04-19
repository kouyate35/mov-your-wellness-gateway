import "./HeroFigureAnimation.css";

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
          viewBox="0 0 200 300"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Head */}
          <circle cx="100" cy="40" r="16" fill="#ffffff" />
          {/* Hair outline */}
          <path
            d="M 84 40 Q 84 20 100 18 Q 116 20 116 40"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2"
          />
          {/* Torso */}
          <ellipse
            cx="100"
            cy="75"
            rx="18"
            ry="25"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2.5"
          />
          {/* Waist */}
          <line x1="82" y1="95" x2="118" y2="95" stroke="#ffffff" strokeWidth="2" />

          {/* Left arm */}
          <g className="hero-anim-left-arm">
            <line
              x1="82"
              y1="65"
              x2="60"
              y2="40"
              stroke="#ffffff"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle cx="60" cy="35" r="5" fill="#ffffff" />
          </g>

          {/* Right arm */}
          <g className="hero-anim-right-arm">
            <line
              x1="118"
              y1="65"
              x2="140"
              y2="40"
              stroke="#ffffff"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle cx="140" cy="35" r="5" fill="#ffffff" />
          </g>

          {/* Hip */}
          <line x1="85" y1="100" x2="115" y2="100" stroke="#ffffff" strokeWidth="2.5" />

          {/* Legs */}
          <g className="hero-anim-legs">
            <line
              x1="90"
              y1="100"
              x2="80"
              y2="180"
              stroke="#ffffff"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <line
              x1="80"
              y1="180"
              x2="78"
              y2="240"
              stroke="#ffffff"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <line
              x1="110"
              y1="100"
              x2="120"
              y2="180"
              stroke="#ffffff"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <line
              x1="120"
              y1="180"
              x2="122"
              y2="240"
              stroke="#ffffff"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Feet */}
            <ellipse cx="78" cy="245" rx="8" ry="3" fill="#ffffff" />
            <ellipse cx="122" cy="245" rx="8" ry="3" fill="#ffffff" />
          </g>
        </svg>
      </div>
    </div>
  );
};

export default HeroFigureAnimation;
