
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from "@/components/auth/LoginForm";
import { FaceRecognition } from "@/components/auth/FaceRecognition";
import { useState } from "react";

export default function Login() {
  const [activeTab, setActiveTab] = useState("credentials");
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md mx-auto animate-fade-in">
        <h1 className="text-3xl font-bold text-center mb-2">AttendWise</h1>
        <p className="text-muted-foreground text-center mb-8">AI & GPS-Based Attendance System</p>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 w-full mb-8">
            <TabsTrigger value="credentials">Credentials</TabsTrigger>
            <TabsTrigger value="face-id">Face ID</TabsTrigger>
          </TabsList>
          <TabsContent value="credentials" className="animate-fade-in">
            <LoginForm />
          </TabsContent>
          <TabsContent value="face-id" className="animate-fade-in">
            <FaceRecognition />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
