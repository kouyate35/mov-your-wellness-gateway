/**
 * Ambient background — solid dark backdrop matching the original dashboard look.
 */
const GlobalBackground = () => {
  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ backgroundColor: "hsl(var(--background))" }}
    />
  );
};

export default GlobalBackground;
