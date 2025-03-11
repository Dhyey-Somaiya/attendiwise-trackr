
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/common/Card";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPinIcon, TargetIcon } from "lucide-react";

export function LocationMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);
  
  // Simulate map loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      
      // Simulate getting user location
      setLocation({
        lat: 37.7749,
        lng: -122.4194,
      });
      
      // Draw a simple placeholder map (in a real app, you'd use a mapping library like Mapbox or Google Maps)
      if (mapRef.current) {
        const canvas = document.createElement('canvas');
        canvas.width = mapRef.current.clientWidth;
        canvas.height = mapRef.current.clientHeight;
        mapRef.current.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        if (ctx) {
          // Draw a simple grid as placeholder
          ctx.fillStyle = '#f5f7fa';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          
          // Draw grid lines
          ctx.strokeStyle = '#e2e8f0';
          ctx.lineWidth = 1;
          
          // Horizontal lines
          for (let y = 20; y < canvas.height; y += 20) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
          }
          
          // Vertical lines
          for (let x = 20; x < canvas.width; x += 20) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
          }
          
          // Draw roads
          ctx.strokeStyle = '#cbd5e1';
          ctx.lineWidth = 6;
          
          // Main road horizontal
          ctx.beginPath();
          ctx.moveTo(0, canvas.height / 2);
          ctx.lineTo(canvas.width, canvas.height / 2);
          ctx.stroke();
          
          // Main road vertical
          ctx.beginPath();
          ctx.moveTo(canvas.width / 2, 0);
          ctx.lineTo(canvas.width / 2, canvas.height);
          ctx.stroke();
          
          // Draw location marker
          const centerX = canvas.width / 2;
          const centerY = canvas.height / 2;
          
          // Outer circle (shadow)
          ctx.beginPath();
          ctx.arc(centerX, centerY, 18, 0, 2 * Math.PI);
          ctx.fillStyle = 'rgba(59, 130, 246, 0.2)';
          ctx.fill();
          
          // Inner circle
          ctx.beginPath();
          ctx.arc(centerX, centerY, 8, 0, 2 * Math.PI);
          ctx.fillStyle = 'hsl(var(--primary))';
          ctx.fill();
          
          // Pulse animation effect
          let pulseRadius = 10;
          const pulse = () => {
            if (!mapRef.current) return;
            
            ctx.clearRect(centerX - 30, centerY - 30, 60, 60);
            
            // Redraw map section
            ctx.fillStyle = '#f5f7fa';
            ctx.fillRect(centerX - 30, centerY - 30, 60, 60);
            
            // Redraw grid lines
            ctx.strokeStyle = '#e2e8f0';
            ctx.lineWidth = 1;
            
            // Redraw location marker
            // Outer pulse circle
            ctx.beginPath();
            ctx.arc(centerX, centerY, pulseRadius, 0, 2 * Math.PI);
            ctx.fillStyle = `rgba(59, 130, 246, ${0.4 - pulseRadius/50})`;
            ctx.fill();
            
            // Inner circle
            ctx.beginPath();
            ctx.arc(centerX, centerY, 8, 0, 2 * Math.PI);
            ctx.fillStyle = 'hsl(var(--primary))';
            ctx.fill();
            
            pulseRadius += 0.3;
            if (pulseRadius > 25) pulseRadius = 10;
            
            requestAnimationFrame(pulse);
          };
          
          pulse();
        }
      }
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <MapPinIcon className="h-5 w-5" />
          Location Tracking
        </CardTitle>
        <CardDescription>Current location and nearby team members</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative w-full rounded-b-lg overflow-hidden">
          {loading ? (
            <div className="w-full h-60 bg-muted flex items-center justify-center">
              <div className="animate-pulse flex flex-col items-center">
                <div className="w-16 h-16 bg-muted-foreground/20 rounded-full mb-4"></div>
                <div className="h-4 w-32 bg-muted-foreground/20 rounded"></div>
              </div>
            </div>
          ) : (
            <>
              <div 
                ref={mapRef} 
                className="w-full h-60"
              ></div>
              
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/80 to-transparent p-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div>
                    <p className="text-sm font-medium">
                      Location: {location ? "Office Headquarters" : "Unknown"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {location ? `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}` : "Location not available"}
                    </p>
                  </div>
                  
                  <Button size="sm" variant="outline" className="flex items-center gap-1">
                    <TargetIcon className="h-4 w-4" />
                    <span>Refresh</span>
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
