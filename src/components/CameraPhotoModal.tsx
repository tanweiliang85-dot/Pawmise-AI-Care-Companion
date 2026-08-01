import React, { useState, useRef, useEffect } from 'react';
import { Camera, RefreshCw, Check, Upload, X, AlertCircle, FlipHorizontal, Sparkles, Image as ImageIcon } from 'lucide-react';

interface CameraPhotoModalProps {
  petName: string;
  currentAvatarUrl?: string;
  onClose: () => void;
  onPhotoCaptured: (dataUrl: string) => void;
}

export const CameraPhotoModal: React.FC<CameraPhotoModalProps> = ({
  petName,
  currentAvatarUrl,
  onClose,
  onPhotoCaptured,
}) => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isLoadingCamera, setIsLoadingCamera] = useState<boolean>(true);
  const [flashActive, setFlashActive] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Initialize camera stream
  useEffect(() => {
    let currentStream: MediaStream | null = null;
    let isMounted = true;

    async function startCamera() {
      setIsLoadingCamera(true);
      setCameraError(null);

      // Stop existing stream if any
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }

      try {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          throw new Error('Camera access is not supported by your browser environment.');
        }

        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: facingMode,
            width: { ideal: 1280 },
            height: { ideal: 1280 },
          },
          audio: false,
        });

        if (isMounted) {
          currentStream = mediaStream;
          setStream(mediaStream);
          if (videoRef.current) {
            videoRef.current.srcObject = mediaStream;
          }
          setIsLoadingCamera(false);
        } else {
          mediaStream.getTracks().forEach((track) => track.stop());
        }
      } catch (err: any) {
        if (isMounted) {
          console.warn('Camera initiation notice:', err);
          setCameraError(
            err.message ||
              'Unable to access camera device. You can upload a photo file from your device instead.'
          );
          setIsLoadingCamera(false);
        }
      }
    }

    if (!capturedImage) {
      startCamera();
    }

    return () => {
      isMounted = false;
      if (currentStream) {
        currentStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [facingMode, capturedImage]);

  // Clean up stream when closing
  const handleCloseModal = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    onClose();
  };

  // Switch between front and rear cameras
  const toggleFacingMode = () => {
    setFacingMode((prev) => (prev === 'user' ? 'environment' : 'user'));
  };

  // Capture photo snapshot from video canvas
  const takeSnapshot = () => {
    if (!videoRef.current) return;

    // Trigger visual flash
    setFlashActive(true);
    setTimeout(() => setFlashActive(false), 200);

    const video = videoRef.current;
    const canvas = canvasRef.current || document.createElement('canvas');

    // Square crop for pet avatar
    const size = Math.min(video.videoWidth || 640, video.videoHeight || 640);
    canvas.width = size;
    canvas.height = size;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      const startX = ((video.videoWidth || size) - size) / 2;
      const startY = ((video.videoHeight || size) - size) / 2;

      // Flip canvas if using front camera
      if (facingMode === 'user') {
        ctx.translate(size, 0);
        ctx.scale(-1, 1);
      }

      ctx.drawImage(video, startX, startY, size, size, 0, 0, size, size);

      const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
      setCapturedImage(dataUrl);

      // Stop camera stream to save battery/resources
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        setStream(null);
      }
    }
  };

  // Handle local file selection fallback
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCapturedImage(event.target.result as string);
          if (stream) {
            stream.getTracks().forEach((track) => track.stop());
            setStream(null);
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Save selected or captured photo
  const handleSavePhoto = () => {
    if (capturedImage) {
      onPhotoCaptured(capturedImage);
      handleCloseModal();
    }
  };

  // Retake photo
  const handleRetake = () => {
    setCapturedImage(null);
    setCameraError(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-stone-950 font-bold flex items-center justify-center shadow-md">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-serif text-stone-900">
                Snap {petName}'s Photo
              </h3>
              <p className="text-xs text-stone-500">
                Live camera capture for display avatar
              </p>
            </div>
          </div>

          <button
            onClick={handleCloseModal}
            className="p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Hidden File Input Fallback */}
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          capture="environment"
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Viewfinder / Preview Section */}
        <div className="relative w-full aspect-square bg-stone-900 rounded-3xl overflow-hidden flex items-center justify-center shadow-inner border border-stone-800">
          
          {/* Flash Effect Overlay */}
          {flashActive && (
            <div className="absolute inset-0 bg-white z-30 animate-out fade-out duration-200" />
          )}

          {/* MODE 1: Photo Preview State */}
          {capturedImage ? (
            <div className="relative w-full h-full group">
              <img
                src={capturedImage}
                alt="Captured Pet Avatar"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 px-3 py-1 bg-amber-500 text-stone-950 text-xs font-bold rounded-full shadow flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Captured Photo Ready</span>
              </div>
            </div>
          ) : cameraError ? (
            /* MODE 2: Camera Error or Unavailable Fallback */
            <div className="p-6 text-center space-y-4 max-w-xs">
              <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-800 mx-auto flex items-center justify-center">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-stone-100">Camera Feed Unavailable</p>
                <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                  {cameraError}
                </p>
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-3 px-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition"
              >
                <Upload className="w-4 h-4" />
                <span>Upload Photo from Device</span>
              </button>
            </div>
          ) : (
            /* MODE 3: Live Video Viewfinder Stream */
            <div className="relative w-full h-full">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className={`w-full h-full object-cover ${
                  facingMode === 'user' ? 'scale-x-[-1]' : ''
                }`}
              />

              {/* Viewfinder Target Guidelines */}
              <div className="absolute inset-0 border-2 border-amber-400/40 rounded-full m-8 pointer-events-none flex items-center justify-center">
                <div className="w-full h-full rounded-full border border-dashed border-amber-300/60 animate-pulse flex items-center justify-center">
                  <span className="bg-stone-950/70 text-amber-300 text-[11px] font-bold px-3 py-1 rounded-full backdrop-blur-sm">
                    Center {petName}'s Face Here
                  </span>
                </div>
              </div>

              {/* Toggle Camera Button */}
              <button
                type="button"
                onClick={toggleFacingMode}
                title="Switch Camera"
                className="absolute top-4 right-4 p-3 rounded-full bg-stone-950/60 hover:bg-stone-950 text-white backdrop-blur-md transition border border-white/20 shadow-lg"
              >
                <FlipHorizontal className="w-5 h-5" />
              </button>

              {/* Loading Spinner */}
              {isLoadingCamera && (
                <div className="absolute inset-0 bg-stone-900/90 flex flex-col items-center justify-center gap-3 text-stone-300">
                  <RefreshCw className="w-8 h-8 animate-spin text-amber-400" />
                  <span className="text-xs font-bold">Starting camera stream...</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Hidden canvas for taking snapshot */}
        <canvas ref={canvasRef} className="hidden" />

        {/* Bottom Action Controls */}
        <div className="space-y-3 pt-2">
          {capturedImage ? (
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleRetake}
                className="w-full py-3 rounded-2xl border border-stone-300 hover:bg-stone-50 text-stone-800 font-bold text-xs flex items-center justify-center gap-2 transition"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Retake Photo</span>
              </button>

              <button
                type="button"
                onClick={handleSavePhoto}
                className="w-full py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition"
              >
                <Check className="w-4 h-4" />
                <span>Set as Avatar</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between gap-3">
              {/* File upload option */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-3 rounded-2xl border border-stone-200 hover:bg-stone-100 text-stone-700 font-bold text-xs flex items-center gap-2 transition"
              >
                <ImageIcon className="w-4 h-4 text-amber-600" />
                <span className="hidden sm:inline">Upload File</span>
              </button>

              {/* Shutter Button */}
              <button
                type="button"
                disabled={isLoadingCamera || !!cameraError}
                onClick={takeSnapshot}
                className="flex-grow py-3.5 px-6 rounded-2xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-stone-950 font-bold text-xs flex items-center justify-center gap-2 shadow-xl transition"
              >
                <Camera className="w-5 h-5" />
                <span>Snap Photo Now</span>
              </button>
            </div>
          )}

          {/* Current Avatar comparison thumbnail if available */}
          {currentAvatarUrl && !capturedImage && (
            <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1 border-t border-stone-100">
              <span>Current Avatar:</span>
              <div className="flex items-center gap-2 font-medium text-stone-700">
                <img
                  src={currentAvatarUrl}
                  alt={petName}
                  className="w-6 h-6 rounded-full object-cover ring-1 ring-amber-400"
                />
                <span>Active</span>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
