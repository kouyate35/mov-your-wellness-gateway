import "./OrbitalLoader.css";

const OrbitalLoader = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`svg-frame ${className}`}>
      <svg viewBox="0 0 344 344" style={{ "--i": 0, "--j": 0 } as React.CSSProperties}>
        <g id="out1">
          <path
            d="M72 172C72 116.772 116.772 72 172 72C227.228 72 272 116.772 272 172C272 227.228 227.228 272 172 272C116.772 272 72 227.228 72 172ZM197.322 172C197.322 158.015 185.985 146.678 172 146.678C158.015 146.678 146.678 158.015 146.678 172C146.678 185.985 158.015 197.322 172 197.322C185.985 197.322 197.322 185.985 197.322 172Z"
            stroke="#00FFFF"
            strokeWidth="2"
            fill="none"
          />
        </g>
      </svg>

      <svg viewBox="0 0 344 344" style={{ "--i": 1, "--j": 1 } as React.CSSProperties}>
        <g id="out2">
          <path
            d="M102.892 172C102.892 133.843 133.843 102.892 172 102.892C210.157 102.892 241.108 133.843 241.108 172C241.108 210.157 210.157 241.108 172 241.108C133.843 241.108 102.892 210.157 102.892 172Z"
            stroke="#00FFFF"
            strokeWidth="2"
            fill="none"
            strokeDasharray="12 8"
          />
        </g>
      </svg>

      <svg viewBox="0 0 344 344" style={{ "--i": 2, "--j": 2 } as React.CSSProperties}>
        <g id="out3">
          <circle cx="172" cy="172" r="55" stroke="#ff0" strokeWidth="1.5" fill="none" />
        </g>
      </svg>

      <svg viewBox="0 0 344 344" style={{ "--i": 3, "--j": 3 } as React.CSSProperties}>
        <g id="inner1">
          <path
            d="M142 172C142 155.431 155.431 142 172 142C188.569 142 202 155.431 202 172C202 188.569 188.569 202 172 202C155.431 202 142 188.569 142 172Z"
            stroke="#00FFFF"
            strokeWidth="2"
            fill="none"
            strokeDasharray="18 10"
          />
        </g>
      </svg>

      <svg viewBox="0 0 344 344" style={{ "--i": 4, "--j": 4 } as React.CSSProperties}>
        <g id="inner3">
          <path
            d="M152 172C152 160.954 160.954 152 172 152C183.046 152 192 160.954 192 172C192 183.046 183.046 192 172 192C160.954 192 152 183.046 152 172Z"
            stroke="#00FFFF"
            strokeWidth="1.5"
            fill="none"
            strokeDasharray="8 6"
          />
        </g>
      </svg>

      <svg viewBox="0 0 344 344" style={{ "--i": 5, "--j": 5 } as React.CSSProperties}>
        <g id="center">
          <circle id="center1" cx="172" cy="172" r="8" stroke="#ff0" strokeWidth="1.5" fill="none" />
        </g>
      </svg>
    </div>
  );
};

export default OrbitalLoader;
