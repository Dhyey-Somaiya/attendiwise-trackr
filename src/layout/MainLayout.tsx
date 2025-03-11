
import { SidebarProvider, Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarGroup, SidebarGroupContent, SidebarGroupLabel } from "@/components/ui/sidebar";
import { Navbar } from "@/components/common/Navbar";
import { CalendarIcon, ClockIcon, LayoutDashboardIcon, MapPinIcon, UserIcon, UsersIcon } from "lucide-react";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

export function MainLayout() {
  const [collapsed, setCollapsed] = useState(false);
  
  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboardIcon,
      href: "/dashboard",
    },
    {
      title: "Attendance",
      icon: ClockIcon,
      href: "/attendance",
    },
    {
      title: "Locations",
      icon: MapPinIcon,
      href: "/locations",
    },
    {
      title: "Calendar",
      icon: CalendarIcon,
      href: "/calendar",
    },
    {
      title: "Employees",
      icon: UsersIcon,
      href: "/employees",
    },
    {
      title: "Profile",
      icon: UserIcon,
      href: "/profile",
    },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar collapsed={collapsed} onCollapsedChange={setCollapsed} className="border-r shadow-sm">
          <SidebarHeader className="py-4">
            <Link to="/" className="flex items-center px-4">
              {!collapsed ? (
                <span className="font-semibold text-lg tracking-tight ml-2">AttendWise</span>
              ) : (
                <span className="font-semibold text-lg tracking-tight">AW</span>
              )}
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton asChild>
                        <Link to={item.href} className="flex items-center gap-2">
                          <item.icon className="h-5 w-5" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="py-4 px-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              {!collapsed && (
                <>
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>System Status: Online</span>
                </>
              )}
            </div>
          </SidebarFooter>
        </Sidebar>
        <div className="flex-1 flex flex-col min-h-screen max-h-screen overflow-hidden">
          <Navbar onMenuClick={() => setCollapsed(!collapsed)} />
          <main className="flex-1 overflow-y-auto p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
