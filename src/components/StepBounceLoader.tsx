import "./StepBounceLoader.css";

const StepBounceLoader = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`step-bounce-loader ${className}`} />
  );
};

export default StepBounceLoader;
