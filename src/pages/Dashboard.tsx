
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/common/Card";
import { AttendanceStatus } from "@/components/dashboard/AttendanceStatus";
import { AttendanceChart } from "@/components/dashboard/AttendanceChart";
import { LocationMap } from "@/components/dashboard/LocationMap";
import { EmployeeStatus } from "@/components/dashboard/EmployeeStatus";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarIcon, ChevronDownIcon, DownloadIcon, UsersIcon } from "lucide-react";

export default function Dashboard() {
  // Stats data - in a real app, this would come from an API
  const stats = [
    {
      title: "Present",
      value: "42",
      change: "+12.5%",
      trend: "up",
    },
    {
      title: "Absent",
      value: "7",
      change: "-3.2%",
      trend: "down",
    },
    {
      title: "Late",
      value: "5",
      change: "+2.1%",
      trend: "up",
    },
    {
      title: "On Leave",
      value: "3",
      change: "0%",
      trend: "neutral",
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor attendance and location data in real-time
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4" />
            <span>Apr 1 - Apr 30</span>
            <ChevronDownIcon className="h-4 w-4" />
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <DownloadIcon className="h-4 w-4" />
            <span>Export</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="animate-scale-in" style={{ animationDelay: `${i * 0.05}s` }}>
            <CardContent className="p-6">
              <div className="flex flex-row items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  stat.trend === 'up' ? 'bg-emerald-50 text-emerald-600' :
                  stat.trend === 'down' ? 'bg-rose-50 text-rose-600' :
                  'bg-gray-50 text-gray-600'
                }`}>
                  {stat.change}
                </span>
              </div>
              <div className="mt-1">
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="employees">Employees</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <AttendanceStatus />
            <LocationMap />
            <EmployeeStatus className="lg:block hidden" />
          </div>
          
          <AttendanceChart />
        </TabsContent>
        
        <TabsContent value="attendance" className="animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Records</CardTitle>
              <CardDescription>
                Detailed attendance records for all employees
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10">
                <UsersIcon className="mx-auto h-12 w-12 text-muted-foreground/60" />
                <h3 className="mt-4 text-lg font-medium">Detailed attendance records</h3>
                <p className="mt-2 text-muted-foreground text-sm">
                  View and manage complete attendance records for all employees
                </p>
                <Button className="mt-4" size="sm">View All Records</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="employees" className="animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle>Employee Directory</CardTitle>
              <CardDescription>
                Complete employee listing with status and contact information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10">
                <UsersIcon className="mx-auto h-12 w-12 text-muted-foreground/60" />
                <h3 className="mt-4 text-lg font-medium">Employee management</h3>
                <p className="mt-2 text-muted-foreground text-sm">
                  Add, edit, and manage employee profiles and permissions
                </p>
                <Button className="mt-4" size="sm">Manage Employees</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
