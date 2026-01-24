import { useState, useEffect, useRef, useCallback } from "react";
import * as poseDetection from "@tensorflow-models/pose-detection";
import * as tf from "@tensorflow/tfjs";
import { PushUpPhase } from "@/components/PushUpSilhouette";

interface PushUpDetectionResult {
  isLoading: boolean;
  isReady: boolean;
  error: string | null;
  phase: PushUpPhase;
  count: number;
  videoRef: React.RefObject<HTMLVideoElement>;
  startDetection: () => Promise<void>;
  stopDetection: () => void;
  resetCount: () => void;
}

export const usePushUpDetection = (): PushUpDetectionResult => {
  const [isLoading, setIsLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [phase, setPhase] = useState<PushUpPhase>("up");
  const [count, setCount] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);
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
      console.log("Push-up detector initialized");
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
        await videoRef.current.play();
        setIsReady(true);
        detectPushUp();
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
  }, []);

  const resetCount = useCallback(() => {
    setCount(0);
    phaseHistoryRef.current = [];
  }, []);

  // Analyze pose for push-up detection
  const analyzePushUp = useCallback((keypoints: poseDetection.Keypoint[]) => {
    const getKeypoint = (name: string) =>
      keypoints.find((kp) => kp.name === name);

    const leftShoulder = getKeypoint("left_shoulder");
    const rightShoulder = getKeypoint("right_shoulder");
    const leftElbow = getKeypoint("left_elbow");
    const rightElbow = getKeypoint("right_elbow");
    const leftWrist = getKeypoint("left_wrist");
    const rightWrist = getKeypoint("right_wrist");
    const nose = getKeypoint("nose");
    const leftHip = getKeypoint("left_hip");
    const rightHip = getKeypoint("right_hip");

    const minConfidence = 0.3;

    // Calculate average positions with confidence check
    const hasValidUpperBody =
      leftShoulder?.score! > minConfidence &&
      rightShoulder?.score! > minConfidence &&
      leftElbow?.score! > minConfidence &&
      rightElbow?.score! > minConfidence;

    if (!hasValidUpperBody) {
      return;
    }

    // For front-facing camera, we detect push-up by:
    // 1. Vertical position of shoulders relative to screen
    // 2. Arm bend angle (elbow position relative to shoulder and wrist)
    // 3. Head/nose position

    const avgShoulderY = (leftShoulder!.y + rightShoulder!.y) / 2;
    const avgElbowY = (leftElbow!.y + rightElbow!.y) / 2;
    const avgElbowX = (leftElbow!.x + rightElbow!.x) / 2;
    const avgShoulderX = (leftShoulder!.x + rightShoulder!.x) / 2;

    // Detect DOWN position:
    // - Elbows are bent (elbows move outward from body)
    // - Shoulders drop lower in frame
    // - Face gets closer to camera (larger in frame or nose drops)

    const shoulderWidth = Math.abs(leftShoulder!.x - rightShoulder!.x);
    const elbowSpread = Math.abs(leftElbow!.x - rightElbow!.x);

    // In down position, elbows spread wider than shoulders
    const elbowsWide = elbowSpread > shoulderWidth * 1.2;

    // In down position, elbows are at or above shoulder level
    const elbowsUp = avgElbowY <= avgShoulderY + 30;

    // Check nose position (lower in frame = down position)
    const noseY = nose?.score! > minConfidence ? nose!.y : avgShoulderY - 50;

    // Hip position check for body alignment
    const hasHips =
      leftHip?.score! > minConfidence && rightHip?.score! > minConfidence;
    const avgHipY = hasHips ? (leftHip!.y + rightHip!.y) / 2 : avgShoulderY + 100;

    // Down position: shoulders closer to hips vertically (body compressed)
    const bodyCompressed = Math.abs(avgHipY - avgShoulderY) < 80;

    // Determine current phase
    let currentPhase: PushUpPhase = "up";

    if ((elbowsWide && elbowsUp) || bodyCompressed) {
      currentPhase = "down";
    }

    // Update phase with some smoothing
    phaseHistoryRef.current.push(currentPhase);
    if (phaseHistoryRef.current.length > 5) {
      phaseHistoryRef.current.shift();
    }

    // Require consistent detection
    const downCount = phaseHistoryRef.current.filter((p) => p === "down").length;
    const upCount = phaseHistoryRef.current.filter((p) => p === "up").length;

    const stablePhase: PushUpPhase = downCount >= 3 ? "down" : upCount >= 3 ? "up" : phase;

    // Count push-up on transition from down to up
    if (lastPhaseRef.current === "down" && stablePhase === "up") {
      setCount((prev) => prev + 1);
      console.log("Push-up counted!");
    }

    lastPhaseRef.current = stablePhase;
    setPhase(stablePhase);
  }, [phase]);

  // Main detection loop
  const detectPushUp = useCallback(async () => {
    if (!detectorRef.current || !videoRef.current || !isReady) {
      animationFrameRef.current = requestAnimationFrame(detectPushUp);
      return;
    }

    try {
      const poses = await detectorRef.current.estimatePoses(videoRef.current);

      if (poses.length > 0 && poses[0].keypoints) {
        analyzePushUp(poses[0].keypoints);
      }
    } catch (err) {
      console.error("Detection error:", err);
    }

    animationFrameRef.current = requestAnimationFrame(detectPushUp);
  }, [isReady, analyzePushUp]);

  useEffect(() => {
    if (isReady && detectorRef.current) {
      detectPushUp();
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isReady, detectPushUp]);

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
    videoRef,
    startDetection,
    stopDetection,
    resetCount,
  };
};
