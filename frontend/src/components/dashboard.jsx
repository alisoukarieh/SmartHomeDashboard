"use client";

import { useState, useEffect } from "react";
import {
  BarChart,
  Bell,
  Home,
  Image,
  Layers,
  LayoutDashboard,
  Moon,
  Settings,
  Sun,
  User,
  X,
} from "lucide-react";
import {
  Bar,
  BarChart as RechartsBarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";

const data = [
  { name: "Jan", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Feb", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Mar", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Apr", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "May", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Jun", total: Math.floor(Math.random() * 5000) + 1000 },
];

export function DashboardComponent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else if (savedTheme === "custom") {
        document.documentElement.classList.add("custom-theme");
      }
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("custom-theme");
      localStorage.setItem("theme", "dark");
    } else if (theme === "custom") {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("custom-theme");
      localStorage.setItem("theme", "custom");
    } else {
      document.documentElement.classList.remove("dark", "custom-theme");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleTheme = (newTheme) => {
    setTheme(newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("custom-theme");
      localStorage.setItem("theme", "dark");
    } else if (newTheme === "custom") {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("custom-theme");
      localStorage.setItem("theme", "custom");
    } else {
      document.documentElement.classList.remove("dark", "custom-theme");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <div
      className={`flex h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300 custom-theme`}
    >
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 transform transition-all duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 border-r border-gray-200 dark:border-gray-700`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
          <span className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
            Dashboard
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            onClick={toggleSidebar}
          >
            <X className="h-6 w-6" />
            <span className="sr-only">Close Sidebar</span>
          </Button>
        </div>
        <ScrollArea className="h-[calc(100vh-4rem)] px-3">
          <nav className="space-y-2 py-4">
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <Layers className="mr-2 h-4 w-4" />
              Projects
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <User className="mr-2 h-4 w-4" />
              Team
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <BarChart className="mr-2 h-4 w-4" />
              Analytics
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </nav>
        </ScrollArea>
      </aside>
      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between px-4 py-2 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            onClick={toggleSidebar}
          >
            <Layers className="h-6 w-6" />
            <span className="sr-only">Toggle Sidebar</span>
          </Button>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => toggleTheme("light")}
              className={`text-gray-500 hover:text-gray-700 ${
                theme === "light" ? "bg-gray-200" : ""
              }`}
            >
              <Sun className="h-5 w-5" />
              <span className="sr-only">Light Mode</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => toggleTheme("dark")}
              className={`text-gray-500 hover:text-gray-700 ${
                theme === "dark" ? "bg-gray-200" : ""
              }`}
            >
              <Moon className="h-5 w-5" />
              <span className="sr-only">Dark Mode</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => toggleTheme("custom")}
              className={`text-gray-500 hover:text-gray-700 ${
                theme === "custom" ? "bg-gray-200" : ""
              }`}
            >
              <Image className="h-5 w-5" />
              <span className="sr-only">Custom Theme</span>
            </Button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          >
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-user.jpg" alt="@johndoe" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">John Doe</p>
                  <p className="text-xs leading-none text-gray-600 dark:text-gray-400">
                    john@example.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Home className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-4 bg-gray-100 dark:bg-gray-900">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-white dark:bg-gray-800 transition-colors duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Total Revenue
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-gray-600 dark:text-gray-400"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  $45,231.89
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  +20.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white dark:bg-gray-800 transition-colors duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Subscriptions
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-gray-600 dark:text-gray-400"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  +2350
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  +180.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white dark:bg-gray-800 transition-colors duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Sales
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-gray-600 dark:text-gray-400"
                >
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <path d="M2 10h20" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  +12,234
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  +19% from last month
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white dark:bg-gray-800 transition-colors duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Active Now
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-gray-600 dark:text-gray-400"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  +573
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  +201 since last hour
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
            <Card className="col-span-4 bg-white dark:bg-gray-800 transition-colors duration-300">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-gray-100">
                  Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                  <RechartsBarChart data={data}>
                    <XAxis
                      dataKey="name"
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `$${value}`}
                    />
                    <Bar
                      dataKey="total"
                      fill={theme === "dark" ? "#4B5563" : "#1F2937"}
                      radius={[4, 4, 0, 0]}
                    />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="col-span-3 bg-white dark:bg-gray-800 transition-colors duration-300">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-gray-100">
                  Recent Sales
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  You made 265 sales this month.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {[...Array(5)].map((_, i) => (
                    <div className="flex items-center" key={i}>
                      <Avatar className="h-9 w-9">
                        <AvatarImage
                          src={`/placeholder-user-0${i + 1}.jpg`}
                          alt="Avatar"
                        />
                        <AvatarFallback>OM</AvatarFallback>
                      </Avatar>
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none text-gray-900 dark:text-gray-100">
                          Olivia Martin
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          olivia.martin@email.com
                        </p>
                      </div>
                      <div className="ml-auto font-medium text-gray-900 dark:text-gray-100">
                        +$1,999.00
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}

<style jsx global>{`
  .custom-theme {
    background-image: url("/D.jpg");
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
  }
  .custom-theme .bg-white,
  .custom-theme .dark\\:bg-gray-800 {
    background-color: rgba(255, 255, 255, 0.1) !important;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
  .custom-theme .text-gray-900,
  .custom-theme .dark\\:text-gray-100,
  .custom-theme .text-gray-700,
  .custom-theme .dark\\:text-gray-300 {
    color: white !important;
  }
  .custom-theme .text-gray-600,
  .custom-theme .dark\\:text-gray-400 {
    color: rgba(255, 255, 255, 0.7) !important;
  }
`}</style>;
