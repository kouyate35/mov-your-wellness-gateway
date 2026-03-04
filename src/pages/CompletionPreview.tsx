import { useState } from "react";
import CompletionCelebration from "@/components/CompletionCelebration";

const CompletionPreview = () => {
  const [show, setShow] = useState(true);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      {show ? (
        <CompletionCelebration
          onClose={() => setShow(false)}
          programName="Vagues concentriques"
          duration="7 min"
        />
      ) : (
        <button
          onClick={() => setShow(true)}
          className="px-6 py-3 rounded-full text-sm font-semibold"
          style={{
            background: "linear-gradient(135deg, #FFD700, #FFA500)",
            color: "#0a0a0a",
          }}
        >
          Relancer l'animation
        </button>
      )}
    </div>
  );
};

export default CompletionPreview;
