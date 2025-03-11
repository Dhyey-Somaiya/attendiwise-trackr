
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/common/Card";
import { CalendarIcon, ClockIcon, LineChartIcon, MapPinIcon, ScanFaceIcon, ShieldIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function Index() {
  const features = [
    {
      icon: ScanFaceIcon,
      title: "Face Recognition",
      description: "Securely check-in and out with advanced facial recognition technology.",
    },
    {
      icon: MapPinIcon,
      title: "GPS Tracking",
      description: "Verify attendance locations and track field staff in real-time.",
    },
    {
      icon: ClockIcon,
      title: "Time Tracking",
      description: "Automatically log working hours for accurate payroll processing.",
    },
    {
      icon: LineChartIcon,
      title: "Attendance Analytics",
      description: "Get insights into attendance patterns and work hour trends.",
    },
    {
      icon: CalendarIcon,
      title: "Leave Management",
      description: "Easily request and approve leaves with integrated calendar.",
    },
    {
      icon: ShieldIcon,
      title: "Compliance",
      description: "Ensure workplace compliance with automated attendance records.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="relative w-full h-[70vh] overflow-hidden flex items-center justify-center bg-gradient-to-b from-accent/50 to-background">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Modern Attendance Tracking <span className="text-primary">Simplified</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto">
              Harness the power of AI and GPS technology for seamless, accurate attendance management
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/login">
                <Button size="lg" className="rounded-full px-8 h-12">
                  Get Started
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="outline" size="lg" className="rounded-full px-8 h-12">
                  View Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl font-bold mb-4">Key Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our AI & GPS-based attendance system offers everything you need for modern workforce management
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index}
                glass={true}
                className="border-none overflow-hidden animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-accent/30 py-20">
        <div className="container mx-auto px-4 text-center animate-fade-in">
          <h2 className="text-3xl font-bold mb-4">Ready to transform your attendance tracking?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Join thousands of organizations using AttendWise to simplify their attendance management
          </p>
          <Link to="/login">
            <Button size="lg" className="rounded-full px-8 h-12">
              Get Started Today
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
