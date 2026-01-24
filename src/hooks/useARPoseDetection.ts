import { useState, useEffect, useRef, useCallback } from "react";
import * as poseDetection from "@tensorflow-models/pose-detection";
import * as tf from "@tensorflow/tfjs";

export type PushUpPhase = "up" | "down";

interface ARPoseDetectionResult {
  isLoading: boolean;
  isReady: boolean;
  error: string | null;
  phase: PushUpPhase;
  count: number;
  keypoints: poseDetection.Keypoint[];
  videoRef: React.RefObject<HTMLVideoElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  videoWidth: number;
  videoHeight: number;
  startDetection: () => Promise<void>;
  stopDetection: () => void;
  resetCount: () => void;
}

export const useARPoseDetection = (): ARPoseDetectionResult => {
  const [isLoading, setIsLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [phase, setPhase] = useState<PushUpPhase>("up");
  const [count, setCount] = useState(0);
  const [keypoints, setKeypoints] = useState<poseDetection.Keypoint[]>([]);
  const [videoWidth, setVideoWidth] = useState(640);
  const [videoHeight, setVideoHeight] = useState(480);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const detectorRef = useRef<poseDetection.PoseDetector | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const lastPhaseRef = useRef<PushUpPhase>("up");
  const phaseHistoryRef = useRef<PushUpPhase[]>([]);

  // Initialize TensorFlow and detector
  const initializeDetector = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      await tf.ready();
      await tf.setBackend("webgl");

      const detector = await poseDetection.createDetector(
        poseDetection.SupportedModels.MoveNet,
        {
          modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
        }
      );

      detectorRef.current = detector;
      setIsLoading(false);
      console.log("AR Pose detector initialized");
    } catch (err) {
      console.error("Failed to initialize detector:", err);
      setError("Impossible d'initialiser la détection");
      setIsLoading(false);
    }
  }, []);

  const startDetection = useCallback(async () => {
    try {
      if (!detectorRef.current) {
        await initializeDetector();
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 640 },
          height: { ideal: 480 },
        },
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        
        videoRef.current.onloadedmetadata = () => {
          if (videoRef.current) {
            setVideoWidth(videoRef.current.videoWidth);
            setVideoHeight(videoRef.current.videoHeight);
          }
        };
        
        await videoRef.current.play();
        setIsReady(true);
        detectPose();
      }
    } catch (err) {
      console.error("Camera error:", err);
      setError("Accès caméra refusé. Autorisez la caméra pour continuer.");
    }
  }, [initializeDetector]);

  const stopDetection = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setIsReady(false);
    setKeypoints([]);
  }, []);

  const resetCount = useCallback(() => {
    setCount(0);
    phaseHistoryRef.current = [];
  }, []);

  // Analyze pose for push-up detection - ADAPTIVE to any phone orientation
  const analyzePushUp = useCallback(
    (kps: poseDetection.Keypoint[]) => {
      const getKeypoint = (name: string) => kps.find((kp) => kp.name === name);

      const leftShoulder = getKeypoint("left_shoulder");
      const rightShoulder = getKeypoint("right_shoulder");
      const leftElbow = getKeypoint("left_elbow");
      const rightElbow = getKeypoint("right_elbow");
      const leftWrist = getKeypoint("left_wrist");
      const rightWrist = getKeypoint("right_wrist");
      const leftHip = getKeypoint("left_hip");
      const rightHip = getKeypoint("right_hip");

      const minConfidence = 0.25;

      // Need at least shoulders and elbows for push-up detection
      const hasRequiredParts =
        leftShoulder?.score! > minConfidence &&
        rightShoulder?.score! > minConfidence &&
        leftElbow?.score! > minConfidence &&
        rightElbow?.score! > minConfidence;

      if (!hasRequiredParts) {
        return;
      }

      // Calculate body reference scale (distance between shoulders)
      // This makes detection work regardless of distance from camera
      const shoulderWidth = Math.sqrt(
        Math.pow(rightShoulder!.x - leftShoulder!.x, 2) +
        Math.pow(rightShoulder!.y - leftShoulder!.y, 2)
      );

      // Minimum body scale to avoid noise
      if (shoulderWidth < 30) {
        return;
      }

      // Calculate arm angles using relative positions
      const avgShoulderX = (leftShoulder!.x + rightShoulder!.x) / 2;
      const avgShoulderY = (leftShoulder!.y + rightShoulder!.y) / 2;
      const avgElbowX = (leftElbow!.x + rightElbow!.x) / 2;
      const avgElbowY = (leftElbow!.y + rightElbow!.y) / 2;

      // Distance from shoulders to elbows (normalized by shoulder width)
      const shoulderToElbowDist = Math.sqrt(
        Math.pow(avgElbowX - avgShoulderX, 2) +
        Math.pow(avgElbowY - avgShoulderY, 2)
      ) / shoulderWidth;

      // Calculate elbow bend angle approximation
      // In "down" position: elbows bend outward, creating larger spread
      const elbowSpread = Math.sqrt(
        Math.pow(rightElbow!.x - leftElbow!.x, 2) +
        Math.pow(rightElbow!.y - leftElbow!.y, 2)
      ) / shoulderWidth;

      // Wrist positions relative to elbows (if available)
      let wristBelowElbow = false;
      if (leftWrist?.score! > minConfidence && rightWrist?.score! > minConfidence) {
        const avgWristY = (leftWrist!.y + rightWrist!.y) / 2;
        // In push-up position, wrists are typically below or at elbow level
        wristBelowElbow = avgWristY >= avgElbowY - (shoulderWidth * 0.3);
      }

      // Hip position for body alignment check (optional enhancement)
      let bodyHorizontal = true;
      if (leftHip?.score! > minConfidence && rightHip?.score! > minConfidence) {
        const avgHipY = (leftHip!.y + rightHip!.y) / 2;
        const verticalBodyRatio = Math.abs(avgHipY - avgShoulderY) / shoulderWidth;
        // In push-up, body is more horizontal (smaller vertical difference relative to width)
        bodyHorizontal = verticalBodyRatio < 2.5;
      }

      // DOWN position indicators (relative ratios):
      // 1. Elbows spread wider (bent arms)
      // 2. Shoulder-to-elbow distance changes
      // 3. Body compression
      
      const elbowsAreBent = elbowSpread > 1.3; // Elbows wider than shoulders
      const armsCompressed = shoulderToElbowDist < 0.8; // Arms closer to body vertically
      
      // Combined scoring for phase detection
      let downScore = 0;
      if (elbowsAreBent) downScore += 2;
      if (armsCompressed) downScore += 1;
      if (wristBelowElbow) downScore += 1;
      if (!bodyHorizontal) downScore -= 1; // Penalize standing position

      // Determine current phase based on score
      let currentPhase: PushUpPhase = downScore >= 2 ? "down" : "up";

      // Smooth phase transitions with history
      phaseHistoryRef.current.push(currentPhase);
      if (phaseHistoryRef.current.length > 6) {
        phaseHistoryRef.current.shift();
      }

      // Require consistent detection (4 out of 6 frames)
      const downCount = phaseHistoryRef.current.filter((p) => p === "down").length;
      const upCount = phaseHistoryRef.current.filter((p) => p === "up").length;

      const stablePhase: PushUpPhase =
        downCount >= 4 ? "down" : upCount >= 4 ? "up" : phase;

      // Count push-up only on clean transition from down to up
      if (lastPhaseRef.current === "down" && stablePhase === "up") {
        setCount((prev) => prev + 1);
        console.log("Push-up counted! Score:", downScore, "Elbow spread:", elbowSpread.toFixed(2));
      }

      lastPhaseRef.current = stablePhase;
      setPhase(stablePhase);
    },
    [phase]
  );

  // Main detection loop
  const detectPose = useCallback(async () => {
    if (!detectorRef.current || !videoRef.current || !isReady) {
      animationFrameRef.current = requestAnimationFrame(detectPose);
      return;
    }

    try {
      const poses = await detectorRef.current.estimatePoses(videoRef.current);

      if (poses.length > 0 && poses[0].keypoints) {
        setKeypoints(poses[0].keypoints);
        analyzePushUp(poses[0].keypoints);
      }
    } catch (err) {
      console.error("Detection error:", err);
    }

    animationFrameRef.current = requestAnimationFrame(detectPose);
  }, [isReady, analyzePushUp]);

  useEffect(() => {
    if (isReady && detectorRef.current) {
      detectPose();
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isReady, detectPose]);

  useEffect(() => {
    initializeDetector();

    return () => {
      stopDetection();
      if (detectorRef.current) {
        detectorRef.current.dispose();
      }
    };
  }, [initializeDetector, stopDetection]);

  return {
    isLoading,
    isReady,
    error,
    phase,
    count,
    keypoints,
    videoRef,
    canvasRef,
    videoWidth,
    videoHeight,
    startDetection,
    stopDetection,
    resetCount,
  };
};
