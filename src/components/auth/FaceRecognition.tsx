
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/common/Card";
import { ArrowLeftIcon, CameraIcon, LoaderIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function FaceRecognition() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [captureSuccess, setCaptureSuccess] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    let stream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
          audio: false,
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
      }
    };

    if (isCapturing) {
      startCamera();
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isCapturing]);

  const handleStartCapture = () => {
    setIsCapturing(true);
  };

  const handleCapture = () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    setIsProcessing(true);
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    
    if (!context) return;
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Simulate face recognition processing
    setTimeout(() => {
      setIsProcessing(false);
      // Randomly succeed or fail for demo purposes
      const success = Math.random() > 0.3;
      setCaptureSuccess(success);
      
      if (success) {
        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      }
    }, 2000);
  };

  const handleBackToLogin = () => {
    setIsCapturing(false);
    setCaptureSuccess(null);
  };

  return (
    <Card className="w-full max-w-md mx-auto animate-fade-in">
      <CardHeader className="space-y-2">
        <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
          {isCapturing && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-4"
              onClick={handleBackToLogin}
            >
              <ArrowLeftIcon className="h-5 w-5" />
            </Button>
          )}
          {isCapturing ? "Face Recognition" : "Sign in with Face ID"}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center">
        {!isCapturing ? (
          <div className="text-center py-6">
            <div className="w-32 h-32 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <CameraIcon className="h-16 w-16 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              Quickly sign in using facial recognition for a secure and seamless experience
            </p>
            <Button onClick={handleStartCapture}>
              Start Face Recognition
            </Button>
          </div>
        ) : (
          <div className="relative w-full aspect-video max-h-80 rounded-lg overflow-hidden bg-muted">
            <video 
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className={`w-full h-full object-cover ${isProcessing ? 'opacity-70' : ''}`}
            />
            <canvas ref={canvasRef} className="hidden" />
            
            {!isProcessing && captureSuccess === null && (
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="w-64 h-64 border-2 border-primary/50 rounded-full"></div>
                <Button 
                  className="mt-6"
                  onClick={handleCapture}
                >
                  Capture
                </Button>
              </div>
            )}
            
            {isProcessing && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col items-center">
                  <LoaderIcon className="h-12 w-12 text-primary animate-spin" />
                  <p className="mt-4 text-sm font-medium">Processing...</p>
                </div>
              </div>
            )}
            
            {!isProcessing && captureSuccess !== null && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col items-center">
                  {captureSuccess ? (
                    <>
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                        <svg 
                          className="h-10 w-10 text-primary" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M5 13l4 4L19 7" 
                          />
                        </svg>
                      </div>
                      <p className="mt-4 font-medium">Authentication successful</p>
                      <p className="text-sm text-muted-foreground">Redirecting to dashboard...</p>
                    </>
                  ) : (
                    <>
                      <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center">
                        <svg 
                          className="h-10 w-10 text-destructive" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M6 18L18 6M6 6l12 12" 
                          />
                        </svg>
                      </div>
                      <p className="mt-4 font-medium">Authentication failed</p>
                      <Button 
                        variant="outline" 
                        className="mt-4"
                        onClick={() => setCaptureSuccess(null)}
                      >
                        Try Again
                      </Button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-center">
        {isCapturing && !isProcessing && captureSuccess === null && (
          <p className="text-xs text-muted-foreground text-center">
            Position your face within the circle and ensure good lighting
          </p>
        )}
      </CardFooter>
    </Card>
  );
}
