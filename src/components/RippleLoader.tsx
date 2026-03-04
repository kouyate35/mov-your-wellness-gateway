import "./RippleLoader.css";

const RippleLoader = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`ripple-loader ${className}`}>
      <div className="rl-box">
        <div className="rl-logo">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 50">
            <text x="50" y="40" textAnchor="middle" fontSize="42" fontWeight="bold" fontFamily="sans-serif">WK</text>
          </svg>
        </div>
      </div>
      <div className="rl-box"></div>
      <div className="rl-box"></div>
      <div className="rl-box"></div>
      <div className="rl-box"></div>
    </div>
  );
};

export default RippleLoader;
