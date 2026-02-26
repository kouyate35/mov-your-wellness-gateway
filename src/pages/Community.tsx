import { useNavigate } from "react-router-dom";
import { X, Plus } from "lucide-react";

const Community = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Blue header with arc */}
      <div className="relative">
        {/* Blue background */}
        <div
          className="relative pt-12 pb-24 flex flex-col items-center"
          style={{ background: "hsl(199 89% 48%)" }}
        >
          {/* Close button top-left */}
          <button
            onClick={() => navigate(-1)}
            className="absolute top-4 left-4 p-1"
          >
            <X className="w-6 h-6" style={{ color: "hsl(0 0% 8%)" }} />
          </button>

          {/* Title */}
          <h1
            className="text-3xl font-black tracking-tight"
            style={{ color: "hsl(0 0% 8%)" }}
          >
            Workout
          </h1>

          {/* Tag button */}
          <button
            className="mt-4 px-6 py-3 rounded-full font-semibold text-sm flex items-center gap-2"
            style={{
              background: "hsl(0 0% 8%)",
              color: "hsl(0 0% 95%)",
            }}
          >
            <Plus className="w-4 h-4" />
            Ajouter un tag
          </button>
        </div>

        {/* Arc curve overlay */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{ height: "60px", marginBottom: "-1px" }}
        >
          <svg
            viewBox="0 0 1440 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
            preserveAspectRatio="none"
          >
            <path
              d="M0 60V20C0 20 360 0 720 0C1080 0 1440 20 1440 20V60H0Z"
              fill="hsl(0 0% 13%)"
            />
          </svg>
        </div>
      </div>

      {/* Content area - empty for now */}
      <div className="flex-1 px-4 pt-2">
      </div>
    </div>
  );
};

export default Community;
