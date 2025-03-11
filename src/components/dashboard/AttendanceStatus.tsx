
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/common/Card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckIcon, ClockIcon, MapPinIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function AttendanceStatus() {
  const [checkedIn, setCheckedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const handleCheckInOut = () => {
    setLoading(true);
    
    // Simulate API call for check-in/out
    setTimeout(() => {
      if (!checkedIn) {
        toast.success("Successfully checked in");
      } else {
        toast.success("Successfully checked out");
      }
      setCheckedIn(!checkedIn);
      setLoading(false);
    }, 1500);
  };
  
  // Calculate current time
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const currentTime = `${hours}:${minutes}`;
  
  // Work hours calculation
  const workHours = checkedIn ? 
    Math.floor(Math.random() * 5) + 2 : // Random hours between 2-7
    0;
  const workMinutes = checkedIn ? 
    Math.floor(Math.random() * 60) : 
    0;
  
  // Progress calculation (assuming 8-hour workday)
  const progressPercentage = Math.min(((workHours * 60 + workMinutes) / (8 * 60)) * 100, 100);
  
  return (
    <Card className="glass-card">
      <CardHeader className="pb-3">
        <CardTitle>Attendance Status</CardTitle>
        <CardDescription>Your current status and work hours</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ClockIcon className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm font-medium">Current Time:</span>
            </div>
            <span className="font-mono text-lg font-semibold">{currentTime}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPinIcon className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm font-medium">Location:</span>
            </div>
            <span className="text-sm">Office HQ</span>
          </div>
          
          <div className="mt-2 p-4 rounded-lg bg-background border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Today's Work Hours</span>
              <span className="font-mono font-medium">
                {workHours}h {workMinutes}m / 8h 0m
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
          
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${checkedIn ? 'bg-primary animate-pulse-subtle' : 'bg-muted'}`}></div>
              <span className="text-sm font-medium">Status:</span>
            </div>
            <span className={`text-sm font-medium ${checkedIn ? 'text-primary' : 'text-muted-foreground'}`}>
              {checkedIn ? 'Checked In' : 'Not Checked In'}
            </span>
          </div>
          
          <Button 
            className="mt-2 w-full"
            disabled={loading}
            onClick={handleCheckInOut}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                {checkedIn ? 'Check Out' : 'Check In'}
                {!checkedIn && <CheckIcon className="h-4 w-4" />}
              </span>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
