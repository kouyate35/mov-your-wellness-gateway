import "./BalanceLoader.css";

interface BalanceLoaderProps {
  className?: string;
}

const BalanceLoader = ({ className = "" }: BalanceLoaderProps) => {
  return (
    <div className={`balance-container ${className}`}>
      <div className="balance-bar">
        <div className="balance-ball" />
      </div>
    </div>
  );
};

export default BalanceLoader;
