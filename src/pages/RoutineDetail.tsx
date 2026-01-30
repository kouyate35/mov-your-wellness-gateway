import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MoreHorizontal, Play, Pause, Clock } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { apps } from "@/data/apps";
import { categories } from "@/data/categories";
import { useAppSettings } from "@/hooks/useAppSettings";
import { Progress } from "@/components/ui/progress";

// Import exercise videos
import exerciseSquats from "@/assets/exercise-squats.mp4";
import exercisePushups from "@/assets/exercise-pushups.mp4";
import exercisePlank from "@/assets/exercise-plank.mp4";
import exerciseLateralStretch from "@/assets/exercise-lateral-stretch.mp4";
import exerciseForwardFold from "@/assets/exercise-forward-fold.mp4";
import exerciseYogaArms from "@/assets/exercise-yoga-arms.mp4";
import exerciseBoxBreathing from "@/assets/exercise-box-breathing.mp4";
import exerciseCoherence from "@/assets/exercise-coherence.mp4";
import exercisePause from "@/assets/exercise-pause.mp4";
import categoryMoveVideo from "@/assets/category-move-video.mp4";
import categoryFlexVideo from "@/assets/category-flex-video.mp4";
import categoryBreathVideo from "@/assets/category-breath-video.mp4";
import categoryFocusVideo from "@/assets/category-focus-video.mp4";

// Map program IDs to videos
const programVideos: Record<string, string> = {
  "squats-10": exerciseSquats,
  "pompes-10": exercisePushups,
  "gainage": exercisePlank,
  "lateral-stretch": exerciseLateralStretch,
  "forward-fold": exerciseForwardFold,
  "yoga-arms": exerciseYogaArms,
  "box-breathing": exerciseBoxBreathing,
  "coherence": exerciseCoherence,
  "pause": exercisePause,
  "intention": categoryFocusVideo,
  "timer": categoryFocusVideo,
  "affirmation": categoryFocusVideo,
};

const categoryVideos: Record<string, string> = {
  move: categoryMoveVideo,
  flex: categoryFlexVideo,
  breath: categoryBreathVideo,
  focus: categoryFocusVideo,
};

// Mock weekly progress data
const weeklyProgress = [
  { day: "Lun", value: 75 },
  { day: "Mar", value: 40 },
  { day: "Mer", value: 90 },
  { day: "Jeu", value: 60 },
  { day: "Ven", value: 85 },
  { day: "Sam", value: 30 },
  { day: "Dim", value: 55 },
];

const RoutineDetail = () => {
  const { appId } = useParams<{ appId: string }>();
  const navigate = useNavigate();
  const { getAppSetting } = useAppSettings();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const app = apps.find((a) => a.id === appId);
  const appSetting = appId ? getAppSetting(appId) : null;
  
  // Get selected program and category
  const category = categories.find((c) => c.id === appSetting?.categoryId);
  const program = category?.programs.find((p) => p.id === appSetting?.selectedProgramId);
  
  // Get video source
  const videoSrc = program 
    ? programVideos[program.id] || categoryVideos[category?.id || "move"]
    : categoryVideos[appSetting?.categoryId || "move"];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => setCurrentTime(video.currentTime);
    const handleDurationChange = () => setDuration(video.duration);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("durationchange", handleDurationChange);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("durationchange", handleDurationChange);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
    };
  }, []);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    videoRef.current.currentTime = percentage * duration;
  };

  if (!app) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Application non trouvée</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Video Header - 55% of screen */}
      <div className="relative h-[55vh]">
        <video
          ref={videoRef}
          src={videoSrc}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-background" />

        {/* Top navigation */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 pt-6">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <button className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center">
            <MoreHorizontal className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Play/Pause button center */}
        <button
          onClick={togglePlayPause}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30"
        >
          {isPlaying ? (
            <Pause className="w-7 h-7 text-white" fill="white" />
          ) : (
            <Play className="w-7 h-7 text-white ml-1" fill="white" />
          )}
        </button>

        {/* Timeline at bottom of video */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlayPause}
              className="text-white"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5" />
              )}
            </button>
            <span className="text-xs text-white/80 w-10">
              {formatTime(currentTime)}
            </span>
            <div 
              className="flex-1 h-1 bg-white/30 rounded-full cursor-pointer"
              onClick={handleSeek}
            >
              <div 
                className="h-full bg-white rounded-full transition-all"
                style={{ width: duration ? `${(currentTime / duration) * 100}%` : '0%' }}
              />
            </div>
            <span className="text-xs text-white/80 w-10 text-right">
              {formatTime(duration)}
            </span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-5 py-6 -mt-4 bg-background rounded-t-3xl relative">
        {/* Program Title */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-xl font-semibold text-foreground mb-1">
              {program?.name || category?.name || "Programme"}
            </h1>
            <p className="text-sm text-muted-foreground">
              {program?.description || category?.tagline || ""}
            </p>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted">
            <Clock className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-xs font-medium text-muted-foreground">
              {program?.duration || "1 min"}
            </span>
          </div>
        </div>

        {/* App info card */}
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-card/50 border border-border/50 mb-6">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${app.bgColor} ${app.iconColor}`}
          >
            {app.icon}
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">{app.name}</p>
            <p className="text-xs text-muted-foreground">{app.description}</p>
          </div>
        </div>

        {/* My Progress Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Ma Progression</h2>
            <button className="text-xs font-medium text-primary">
              Cette semaine
            </button>
          </div>

          {/* Progress bars graph */}
          <div className="flex items-end justify-between gap-2 h-24 mb-2">
            {weeklyProgress.map((day, index) => (
              <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full h-20 bg-muted rounded-lg relative overflow-hidden">
                  <div
                    className={`absolute bottom-0 left-0 right-0 rounded-lg transition-all ${
                      index === new Date().getDay() - 1 
                        ? "bg-primary" 
                        : "bg-muted-foreground/30"
                    }`}
                    style={{ height: `${day.value}%` }}
                  />
                </div>
                <span className={`text-[10px] ${
                  index === new Date().getDay() - 1 
                    ? "text-primary font-medium" 
                    : "text-muted-foreground"
                }`}>
                  {day.day}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-4 rounded-2xl bg-card/50 border border-border/50 text-center">
            <p className="text-2xl font-semibold text-foreground mb-1">7</p>
            <p className="text-xs text-muted-foreground">Jours consécutifs</p>
          </div>
          <div className="p-4 rounded-2xl bg-card/50 border border-border/50 text-center">
            <p className="text-2xl font-semibold text-foreground mb-1">23</p>
            <p className="text-xs text-muted-foreground">Sessions ce mois</p>
          </div>
          <div className="p-4 rounded-2xl bg-card/50 border border-border/50 text-center">
            <p className="text-2xl font-semibold text-foreground mb-1">85%</p>
            <p className="text-xs text-muted-foreground">Taux de réussite</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoutineDetail;
