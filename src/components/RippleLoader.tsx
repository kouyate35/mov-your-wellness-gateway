import "./RippleLoader.css";

const RippleLoader = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`ripple-wrapper ${className}`}>
      <div className="ripple-box">
        <div className="ripple-logo">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 50">
            <text x="50" y="40" textAnchor="middle" fontSize="42" fontWeight="bold" fontFamily="sans-serif" fill="grey">WK</text>
          </svg>
        </div>
      </div>
      <div className="ripple-box"></div>
      <div className="ripple-box"></div>
      <div className="ripple-box"></div>
      <div className="ripple-box"></div>
    </div>
  );
};

export default RippleLoader;
