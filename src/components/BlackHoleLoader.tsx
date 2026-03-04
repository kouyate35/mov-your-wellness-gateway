import "./BlackHoleLoader.css";

const BlackHoleLoader = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`blackhole-wrapper ${className}`}>
      <div className="ring-3">
        <div className="ring-2">
          <div className="ring-1">
            <div className="black-hole"></div>
            <div className="glow"></div>
          </div>
        </div>
      </div>
      <div className="bh-container">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <svg key={i} className={`crescent crescent-${i}`} viewBox="0 0 50 50">
            <path
              d="M 0 0 C 54 50 185 57 226 0 C 198 39 35 32 0 0"
              fill="#ffffff55"
            />
          </svg>
        ))}
      </div>
    </div>
  );
};

export default BlackHoleLoader;
