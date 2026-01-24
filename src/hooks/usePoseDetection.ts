import { useState, useEffect, useRef, useCallback } from "react";
import * as poseDetection from "@tensorflow-models/pose-detection";
import * as tf from "@tensorflow/tfjs";

export type BodyZone = "left-arm" | "right-arm" | "left-leg" | "right-leg" | "torso" | null;

interface PoseDetectionResult {
  isLoading: boolean;
  isReady: boolean;
  error: string | null;
  activeZone: BodyZone;
  videoRef: React.RefObject<HTMLVideoElement>;
  startDetection: () => Promise<void>;
  stopDetection: () => void;
}

export const usePoseDetection = (): PoseDetectionResult => {
  const [isLoading, setIsLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeZone, setActiveZone] = useState<BodyZone>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const detectorRef = useRef<poseDetection.PoseDetector | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Initialize TensorFlow and detector
  const initializeDetector = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Initialize TensorFlow.js backend
      await tf.ready();
      await tf.setBackend("webgl");

      // Create MoveNet detector (fastest and most accurate for single person)
      const detector = await poseDetection.createDetector(
        poseDetection.SupportedModels.MoveNet,
        {
          modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
        }
      );

      detectorRef.current = detector;
      setIsLoading(false);
      console.log("Pose detector initialized successfully");
    } catch (err) {
      console.error("Failed to initialize pose detector:", err);
      setError("Impossible d'initialiser la détection de pose");
      setIsLoading(false);
    }
  }, []);

  // Start camera and detection
  const startDetection = useCallback(async () => {
    try {
      if (!detectorRef.current) {
        await initializeDetector();
      }

      // Request camera access
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: "user",
          width: { ideal: 640 },
          height: { ideal: 480 }
        },
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setIsReady(true);
        detectPose();
      }
    } catch (err) {
      console.error("Camera access error:", err);
      setError("Accès caméra refusé. Autorisez la caméra pour continuer.");
    }
  }, [initializeDetector]);

  // Stop detection and cleanup
  const stopDetection = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setIsReady(false);
  }, []);

  // Analyze pose and determine active zone
  const analyzePose = useCallback((keypoints: poseDetection.Keypoint[]) => {
    // MoveNet keypoint indices:
    // 5: left_shoulder, 6: right_shoulder
    // 7: left_elbow, 8: right_elbow
    // 9: left_wrist, 10: right_wrist
    // 11: left_hip, 12: right_hip
    // 13: left_knee, 14: right_knee
    // 15: left_ankle, 16: right_ankle

    const getKeypoint = (name: string) => 
      keypoints.find(kp => kp.name === name);

    const leftShoulder = getKeypoint("left_shoulder");
    const rightShoulder = getKeypoint("right_shoulder");
    const leftWrist = getKeypoint("left_wrist");
    const rightWrist = getKeypoint("right_wrist");
    const leftElbow = getKeypoint("left_elbow");
    const rightElbow = getKeypoint("right_elbow");

    const minConfidence = 0.3;

    // Check if right arm is raised (wrist above shoulder)
    if (
      rightWrist && rightShoulder && 
      rightWrist.score! > minConfidence && 
      rightShoulder.score! > minConfidence &&
      rightWrist.y < rightShoulder.y - 50
    ) {
      setActiveZone("right-arm");
      return;
    }

    // Check if left arm is raised (wrist above shoulder)
    if (
      leftWrist && leftShoulder && 
      leftWrist.score! > minConfidence && 
      leftShoulder.score! > minConfidence &&
      leftWrist.y < leftShoulder.y - 50
    ) {
      setActiveZone("left-arm");
      return;
    }

    // Check for torso movement (arms spread wide)
    if (
      leftElbow && rightElbow && leftShoulder && rightShoulder &&
      leftElbow.score! > minConfidence && rightElbow.score! > minConfidence
    ) {
      const shoulderWidth = Math.abs(rightShoulder.x - leftShoulder.x);
      const elbowWidth = Math.abs(rightElbow.x - leftElbow.x);
      
      if (elbowWidth > shoulderWidth * 1.5) {
        setActiveZone("torso");
        return;
      }
    }

    setActiveZone(null);
  }, []);

  // Main detection loop
  const detectPose = useCallback(async () => {
    if (!detectorRef.current || !videoRef.current || !isReady) {
      animationFrameRef.current = requestAnimationFrame(detectPose);
      return;
    }

    try {
      const poses = await detectorRef.current.estimatePoses(videoRef.current);
      
      if (poses.length > 0 && poses[0].keypoints) {
        analyzePose(poses[0].keypoints);
      }
    } catch (err) {
      console.error("Pose detection error:", err);
    }

    animationFrameRef.current = requestAnimationFrame(detectPose);
  }, [isReady, analyzePose]);

  // Start detection loop when ready
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

  // Cleanup on unmount
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
    activeZone,
    videoRef,
    startDetection,
    stopDetection,
  };
};
