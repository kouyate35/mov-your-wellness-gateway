import * as poseDetection from "@tensorflow-models/pose-detection";

interface SkeletonOverlayProps {
  keypoints: poseDetection.Keypoint[];
  videoWidth: number;
  videoHeight: number;
}

// MoveNet skeleton connections
const SKELETON_CONNECTIONS: [string, string][] = [
  // Face
  ["nose", "left_eye"],
  ["nose", "right_eye"],
  ["left_eye", "left_ear"],
  ["right_eye", "right_ear"],
  // Upper body
  ["left_shoulder", "right_shoulder"],
  ["left_shoulder", "left_elbow"],
  ["right_shoulder", "right_elbow"],
  ["left_elbow", "left_wrist"],
  ["right_elbow", "right_wrist"],
  // Torso
  ["left_shoulder", "left_hip"],
  ["right_shoulder", "right_hip"],
  ["left_hip", "right_hip"],
  // Lower body
  ["left_hip", "left_knee"],
  ["right_hip", "right_knee"],
  ["left_knee", "left_ankle"],
  ["right_knee", "right_ankle"],
];

const SkeletonOverlay = ({
  keypoints,
  videoWidth,
  videoHeight,
}: SkeletonOverlayProps) => {
  const minConfidence = 0.3;

  const getKeypoint = (name: string) =>
    keypoints.find((kp) => kp.name === name);

  // Draw keypoint as circle
  const renderKeypoint = (kp: poseDetection.Keypoint) => {
    if (!kp || kp.score! < minConfidence) return null;

    return (
      <circle
        key={kp.name}
        cx={kp.x}
        cy={kp.y}
        r={8}
        fill="white"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth={2}
        style={{
          filter: "drop-shadow(0 0 6px rgba(255,255,255,0.8))",
        }}
      />
    );
  };

  // Draw connection line between two keypoints
  const renderConnection = (from: string, to: string, index: number) => {
    const kpFrom = getKeypoint(from);
    const kpTo = getKeypoint(to);

    if (
      !kpFrom ||
      !kpTo ||
      kpFrom.score! < minConfidence ||
      kpTo.score! < minConfidence
    ) {
      return null;
    }

    return (
      <line
        key={`${from}-${to}-${index}`}
        x1={kpFrom.x}
        y1={kpFrom.y}
        x2={kpTo.x}
        y2={kpTo.y}
        stroke="#ff6600"
        strokeWidth={4}
        strokeLinecap="round"
        style={{
          filter: "drop-shadow(0 0 4px rgba(255,102,0,0.6))",
        }}
      />
    );
  };

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox={`0 0 ${videoWidth} ${videoHeight}`}
      preserveAspectRatio="xMidYMid slice"
      style={{ transform: "scaleX(-1)" }} // Mirror to match front camera
    >
      {/* Draw connections first (so joints appear on top) */}
      {SKELETON_CONNECTIONS.map(([from, to], index) =>
        renderConnection(from, to, index)
      )}

      {/* Draw keypoints */}
      {keypoints.map((kp) => renderKeypoint(kp))}
    </svg>
  );
};

export default SkeletonOverlay;
