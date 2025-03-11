
import { cn } from "@/lib/utils";
import { BellIcon, MenuIcon, UserIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  onMenuClick?: () => void;
}

export function Navbar({ className, onMenuClick, ...props }: NavbarProps) {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div
      className={cn(
        "h-16 px-4 border-b bg-background/95 backdrop-blur sticky top-0 z-30 flex items-center justify-between animate-slide-down",
        className
      )}
      {...props}
    >
      <div className="flex items-center">
        <button
          onClick={onMenuClick}
          className="mr-4 p-2 rounded-lg hover:bg-accent transition-colors duration-200"
          aria-label="Toggle Menu"
        >
          <MenuIcon className="h-5 w-5" />
        </button>
        <Link to="/" className="flex items-center">
          <span className="font-semibold text-lg tracking-tight">AttendWise</span>
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-lg hover:bg-accent transition-colors duration-200 relative"
            aria-label="Notifications"
          >
            <BellIcon className="h-5 w-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
          </button>
          
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 glass-card rounded-lg shadow-md py-2 z-50 animate-fade-in">
              <div className="px-4 py-2 border-b border-border">
                <h3 className="font-medium">Notifications</h3>
              </div>
              <div className="max-h-[50vh] overflow-y-auto">
                <div className="px-4 py-3 hover:bg-accent/50 transition-colors duration-200">
                  <p className="text-sm font-medium">Attendance Reminder</p>
                  <p className="text-xs text-muted-foreground">Don't forget to check-in today</p>
                  <p className="text-xs text-muted-foreground mt-1">10 minutes ago</p>
                </div>
                <div className="px-4 py-3 hover:bg-accent/50 transition-colors duration-200">
                  <p className="text-sm font-medium">Location Verification Required</p>
                  <p className="text-xs text-muted-foreground">Your last check-in location needs verification</p>
                  <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                </div>
              </div>
              <div className="px-4 py-2 border-t border-border">
                <Link to="/notifications" className="text-xs text-primary hover:underline">View all notifications</Link>
              </div>
            </div>
          )}
        </div>
        
        <Link to="/profile">
          <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center overflow-hidden">
            <UserIcon className="h-5 w-5 text-muted-foreground" />
          </div>
        </Link>
      </div>
    </div>
  );
}
