
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/common/Card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";

interface EmployeeStatusProps {
  className?: string;
}

export function EmployeeStatus({ className }: EmployeeStatusProps) {
  // Sample data - in a real app, this would come from API
  const employees = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "UX Designer",
      status: "present",
      lastSeen: "2 min ago",
      avatar: null,
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Front-end Developer",
      status: "present",
      lastSeen: "5 min ago",
      avatar: null,
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      role: "Product Manager",
      status: "late",
      lastSeen: "1 hour ago",
      avatar: null,
    },
    {
      id: 4,
      name: "David Kim",
      role: "Backend Developer",
      status: "absent",
      lastSeen: "yesterday",
      avatar: null,
    },
  ];

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle>Team Status</CardTitle>
        <CardDescription>Current attendance status of team members</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {employees.map((employee) => (
            <div key={employee.id} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border">
                  <div className="bg-muted flex h-full w-full items-center justify-center rounded-full">
                    {employee.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">{employee.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{employee.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge 
                  variant="outline" 
                  className={`
                    ${employee.status === 'present' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : ''} 
                    ${employee.status === 'late' ? 'bg-amber-50 text-amber-600 border-amber-200' : ''} 
                    ${employee.status === 'absent' ? 'bg-rose-50 text-rose-600 border-rose-200' : ''}
                  `}
                >
                  {employee.status.charAt(0).toUpperCase() + employee.status.slice(1)}
                </Badge>
                <span className="text-xs text-muted-foreground">{employee.lastSeen}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
