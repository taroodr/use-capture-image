export type UseCaptureImage = {
  constraints?: Omit<MediaStreamConstraints, "audio">;
  quality?: number;
};

export type UseCaptureImageResult = {
  error: Error | null;
  startCamera: () => void;
  stopCamera: () => void;
  captureImage: () => Promise<Blob>;
  videoRef: React.RefObject<HTMLVideoElement>;
};
