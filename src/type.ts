export type UseScanImage = {
  constraints?: Omit<MediaStreamConstraints, "audio">;
  quality?: number;
};

export type UseScanImageResult = {
  error: Error | null;
  startCamera: () => void;
  stopCamera: () => void;
  scanImage: () => Promise<Blob>;
  videoRef: React.RefObject<HTMLVideoElement>;
};
