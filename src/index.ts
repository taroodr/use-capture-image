import { useRef, useState } from "react";
import { UseCaptureImage, UseCaptureImageResult } from "./type";

export function useCaptureImage({
  constraints,
  quality = 1,
}: UseCaptureImage): UseCaptureImageResult {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const startCamera = () => {
    navigator.mediaDevices
      .getUserMedia({
        audio: false,
        ...constraints,
      })
      .then((mediaStream) => {
        if (videoRef.current == null) {
          setError(new Error("video element is null"));
          return;
        }
        videoRef.current.srcObject = mediaStream;
        setMediaStream(mediaStream);
      })
      .catch((error) => {
        setError(error);
      });
  };

  const stopCamera = () => {
    if (videoRef.current == null) {
      setError(new Error("video element is null"));
      return;
    }
    mediaStream?.getVideoTracks().forEach((devise) => {
      devise.stop();
    });
    videoRef.current.srcObject = null;
    setMediaStream(null);
  };

  const captureImage = (): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      if (videoRef.current == null) {
        return reject(new Error("video element is null"));
      }

      // Get the resolution of the video
      const videoWidth = videoRef.current.videoWidth;
      const videoHeight = videoRef.current.videoHeight;

      const canvas = document.createElement("canvas");
      canvas.width = videoWidth;
      canvas.height = videoHeight;
      const canvasContext = canvas.getContext("2d");
      if (canvasContext == null) {
        return;
      }

      canvasContext.drawImage(videoRef.current, 0, 0, videoWidth, videoHeight);
      canvas.toBlob(
        (blob) => {
          if (blob == null) {
            setError(new Error("failed to capture image"));
            return;
          }

          return resolve(blob);
        },
        "image/jpeg",
        quality
      );
    });
  };

  return {
    error,
    startCamera,
    stopCamera,
    captureImage,
    videoRef,
  };
}
