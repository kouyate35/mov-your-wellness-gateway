import "./BongoLoader.css";

const BongoLoader = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`bongo-loader ${className}`}>
      {/* Head */}
      <svg
        className="bongo-head"
        width="120"
        height="100"
        viewBox="0 0 120 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse cx="60" cy="50" rx="50" ry="42" fill="#2d3250" />
        {/* Eye left */}
        <circle cx="42" cy="38" r="6" fill="white" />
        <circle cx="43" cy="37" r="3" fill="#2d3250" />
        {/* Eye right */}
        <circle cx="68" cy="34" r="5" fill="white" />
        <circle cx="69" cy="33" r="2.5" fill="#2d3250" />
        {/* Beak */}
        <path
          d="M75 45 L95 42 L80 52 Z"
          fill="#5c6384"
          stroke="#4a5070"
          strokeWidth="1"
        />
        {/* Crack/mouth line */}
        <path
          d="M50 55 Q55 60 48 65 Q52 62 56 66"
          fill="none"
          stroke="#4a5070"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* Wing hint */}
        <path
          d="M30 55 Q20 65 25 75 Q30 68 35 62"
          fill="none"
          stroke="#4a5070"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>

      {/* Body */}
      <svg
        className="bongo-bod"
        width="140"
        height="120"
        viewBox="0 0 140 120"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse cx="70" cy="55" rx="60" ry="50" fill="#2d3250" />
        {/* Body detail lines */}
        <path
          d="M35 70 Q40 80 30 85"
          fill="none"
          stroke="#4a5070"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M95 40 Q105 45 100 55"
          fill="none"
          stroke="#4a5070"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>

      {/* Left leg */}
      <svg
        className="bongo-legl"
        width="22"
        height="70"
        viewBox="0 0 22 70"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11 0 L11 50 Q11 58 6 62 L2 65 Q0 67 3 68 L15 68 Q18 68 16 65 L11 58 L11 50"
          fill="#2d3250"
          stroke="#1e2240"
          strokeWidth="0.5"
        />
      </svg>

      {/* Right leg */}
      <svg
        className="bongo-legr"
        width="22"
        height="70"
        viewBox="0 0 22 70"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11 0 L11 50 Q11 58 6 62 L2 65 Q0 67 3 68 L15 68 Q18 68 16 65 L11 58 L11 50"
          fill="#2d3250"
          stroke="#1e2240"
          strokeWidth="0.5"
        />
      </svg>

      {/* Ground / shadow */}
      <svg
        className="bongo-gnd"
        width="400"
        height="200"
        viewBox="0 0 400 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Ground lines */}
        <path
          d="M200 180 Q220 170 250 180 Q280 190 300 175"
          fill="none"
          stroke="#2d3250"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M250 160 L260 150 M255 160 L255 148 M260 160 L268 152"
          fill="none"
          stroke="#2d3250"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Shadow ellipse */}
        <ellipse cx="280" cy="185" rx="50" ry="8" fill="#2d3250" opacity="0.3" />
      </svg>
    </div>
  );
};

export default BongoLoader;
