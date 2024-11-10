"use client";

import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Layers,
  User,
  BarChart,
  Settings,
  X,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <aside
      className={`${
        isOpen ? "translate-x-0" : "translate-x-full"
      } fixed top-[20vh] right-0 z-50 w-64 h-[60vh] bg-white dark:bg-gray-800 transform transition-all duration-300 ease-in-out border-l border-gray-200 dark:border-gray-700 rounded-tl-2xl rounded-bl-2xl shadow-lg`}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700 rounded-tl-2xl">
        <span className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
          Add widgets
        </span>
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          onClick={toggleSidebar}
        >
          <X className="h-6 w-6" />
          <span className="sr-only">Close Sidebar</span>
        </Button>
      </div>
      <ScrollArea className="h-[calc(60vh-4rem)] px-3">
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
  );
}
