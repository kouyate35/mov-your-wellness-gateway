import * as poseDetection from "@tensorflow-models/pose-detection";

interface SkeletonOverlayProps {
  keypoints: poseDetection.Keypoint[];
  videoWidth: number;
  videoHeight: number;
}

// MoveNet skeleton connections grouped for styling
const FACE_CONNECTIONS: [string, string][] = [
  ["nose", "left_eye"],
  ["nose", "right_eye"],
  ["left_eye", "left_ear"],
  ["right_eye", "right_ear"],
];

const BODY_CONNECTIONS: [string, string][] = [
  ["left_shoulder", "right_shoulder"],
  ["left_shoulder", "left_elbow"],
  ["right_shoulder", "right_elbow"],
  ["left_elbow", "left_wrist"],
  ["right_elbow", "right_wrist"],
  ["left_shoulder", "left_hip"],
  ["right_shoulder", "right_hip"],
  ["left_hip", "right_hip"],
  ["left_hip", "left_knee"],
  ["right_hip", "right_knee"],
  ["left_knee", "left_ankle"],
  ["right_knee", "right_ankle"],
];

// Major joint keypoints to highlight (subtle, not all 17)
const KEY_JOINTS = new Set([
  "left_shoulder", "right_shoulder",
  "left_elbow", "right_elbow",
  "left_wrist", "right_wrist",
  "left_hip", "right_hip",
  "left_knee", "right_knee",
  "left_ankle", "right_ankle",
]);

const SkeletonOverlay = ({
  keypoints,
  videoWidth,
  videoHeight,
}: SkeletonOverlayProps) => {
  const minConfidence = 0.35;

  const getKeypoint = (name: string) =>
    keypoints.find((kp) => kp.name === name);

  const renderJoint = (kp: poseDetection.Keypoint) => {
    if (!kp || !kp.name || kp.score! < minConfidence) return null;
    if (!KEY_JOINTS.has(kp.name)) return null;

    return (
      <g key={kp.name}>
        {/* Soft halo */}
        <circle cx={kp.x} cy={kp.y} r={5} fill="white" fillOpacity={0.12} />
        {/* Inner dot */}
        <circle cx={kp.x} cy={kp.y} r={2} fill="white" />
      </g>
    );
  };

  const renderConnection = (
    from: string,
    to: string,
    index: number,
    opts: { width: number; opacity: number }
  ) => {
    const a = getKeypoint(from);
    const b = getKeypoint(to);
    if (!a || !b || a.score! < minConfidence || b.score! < minConfidence) {
      return null;
    }
    return (
      <line
        key={`${from}-${to}-${index}`}
        x1={a.x}
        y1={a.y}
        x2={b.x}
        y2={b.y}
        stroke="white"
        strokeOpacity={opts.opacity}
        strokeWidth={opts.width}
        strokeLinecap="round"
      />
    );
  };

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox={`0 0 ${videoWidth} ${videoHeight}`}
      preserveAspectRatio="xMidYMid slice"
      style={{ transform: "scaleX(-1)" }}
    >
      {/* Face — very thin, very subtle */}
      {FACE_CONNECTIONS.map(([f, t], i) =>
        renderConnection(f, t, i, { width: 1, opacity: 0.35 })
      )}
      {/* Body — thin pro lines */}
      {BODY_CONNECTIONS.map(([f, t], i) =>
        renderConnection(f, t, i, { width: 1.5, opacity: 0.85 })
      )}
      {/* Joints */}
      {keypoints.map((kp) => renderJoint(kp))}
    </svg>
  );
};

export default SkeletonOverlay;
