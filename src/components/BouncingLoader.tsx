import "./BouncingLoader.css";

interface BouncingLoaderProps {
  className?: string;
}

const BouncingLoader = ({ className = "" }: BouncingLoaderProps) => {
  return (
    <div className={`bouncing-wrapper ${className}`}>
      <div className="bouncing-circle" />
      <div className="bouncing-circle" />
      <div className="bouncing-circle" />
      <div className="bouncing-shadow" />
      <div className="bouncing-shadow" />
      <div className="bouncing-shadow" />
    </div>
  );
};

export default BouncingLoader;
