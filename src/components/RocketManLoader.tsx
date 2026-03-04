import "./RocketManLoader.css";

const RocketManLoader = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`rocketman-wrapper ${className}`}>
      <div className="rm-clouds">
        <div className="rm-cloud rm-cloud1"></div>
        <div className="rm-cloud rm-cloud2"></div>
        <div className="rm-cloud rm-cloud3"></div>
        <div className="rm-cloud rm-cloud4"></div>
        <div className="rm-cloud rm-cloud5"></div>
      </div>

      <div className="rm-loader">
        <span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </span>
        <div className="rm-base">
          <span></span>
          <div className="rm-face"></div>
        </div>
      </div>

      <div className="rm-longfazers">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default RocketManLoader;
