import "./VortexLoader.css";

const VortexLoader = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`vortex-hole ${className}`}>
      <i /><i /><i /><i /><i /><i /><i /><i /><i /><i />
    </div>
  );
};

export default VortexLoader;
