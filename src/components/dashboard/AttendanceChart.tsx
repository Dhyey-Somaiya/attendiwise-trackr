
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/common/Card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

// Sample data
const weeklyData = [
  { day: "Mon", hours: 8.5, target: 8 },
  { day: "Tue", hours: 8.2, target: 8 },
  { day: "Wed", hours: 7.8, target: 8 },
  { day: "Thu", hours: 8.0, target: 8 },
  { day: "Fri", hours: 7.5, target: 8 },
  { day: "Sat", hours: 0, target: 0 },
  { day: "Sun", hours: 0, target: 0 },
];

const monthlyData = [
  { day: "Week 1", hours: 40.5, target: 40 },
  { day: "Week 2", hours: 39.2, target: 40 },
  { day: "Week 3", hours: 41.0, target: 40 },
  { day: "Week 4", hours: 38.5, target: 40 },
];

export function AttendanceChart() {
  const [timeframe, setTimeframe] = useState("weekly");
  const data = timeframe === "weekly" ? weeklyData : monthlyData;
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-1">
          <CardTitle>Working Hours</CardTitle>
          <CardDescription>Your attendance hours over time</CardDescription>
        </div>
        <Select 
          defaultValue="weekly" 
          onValueChange={setTimeframe}
        >
          <SelectTrigger className="w-36">
            <SelectValue placeholder="Select timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-[300px] w-full px-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
              <XAxis 
                dataKey="day" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `${value}h`}
              />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: 'var(--radius)', 
                  border: '1px solid var(--border)',
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
                  padding: '8px 12px',
                  backgroundColor: 'var(--background)',
                }}
                formatter={(value) => [`${value} hours`, 'Hours Worked']}
                labelFormatter={(label) => `${label}`}
              />
              <Bar 
                dataKey="hours" 
                fill="hsl(var(--primary))" 
                radius={[4, 4, 0, 0]} 
                barSize={30}
                animationDuration={1000}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
