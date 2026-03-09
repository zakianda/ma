"use client";

import { ReactNode, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Bell, 
  Settings, 
  LogOut, 
  Menu,
  X,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface DashboardLayoutProps {
  children: ReactNode;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    avatar?: string | null;
  };
  title: string;
  sidebar: ReactNode;
  notifications?: number;
}

const roleColors: Record<string, string> = {
  PRINCIPAL: "from-purple-500 to-indigo-600",
  ADMIN: "from-blue-500 to-cyan-600",
  TEACHER: "from-green-500 to-emerald-600",
  PARENT: "from-orange-500 to-amber-600",
  STUDENT: "from-rose-500 to-pink-600"
};

const roleNames: Record<string, string> = {
  PRINCIPAL: "المدير العام",
  ADMIN: "الإداري",
  TEACHER: "الأستاذ",
  PARENT: "ولي الأمر",
  STUDENT: "التلميذ"
};

export function DashboardLayout({ 
  children, 
  user, 
  title, 
  sidebar,
  notifications = 0 
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  // Get today's date in Arabic
  const todayDate = new Date().toLocaleDateString('ar-MA', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="min-h-screen bg-slate-900 flex" dir="rtl">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static right-0 top-0 h-full w-72 bg-slate-800 border-l border-slate-700 z-50 transition-transform duration-300 ${
          isMobile && !sidebarOpen ? 'translate-x-full' : 'translate-x-0'
        }`}
      >
        {/* Mobile close button */}
        {isMobile && (
          <div className="p-4 border-b border-slate-700 flex items-center justify-between lg:hidden">
            <h2 className="text-white font-bold text-lg">القائمة</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(false)}
              className="text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        )}
        {sidebar}
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="bg-slate-800 border-b border-slate-700 sticky top-0 z-30">
          <div className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-4">
              {isMobile && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSidebarOpen(true)}
                  className="text-slate-400 hover:text-white"
                >
                  <Menu className="w-5 h-5" />
                </Button>
              )}
              <h1 className="text-xl font-bold text-white">{title}</h1>
            </div>

            <div className="flex items-center gap-3">
              {/* Current Date */}
              <div className="hidden sm:block text-slate-400 text-sm">
                {todayDate}
              </div>

              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative text-slate-400 hover:text-white">
                <Bell className="w-5 h-5" />
                {notifications > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500">
                    {notifications}
                  </Badge>
                )}
              </Button>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 text-slate-300 hover:text-white">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className={`bg-gradient-to-br ${roleColors[user.role]} text-white text-sm`}>
                        {user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden sm:block text-right">
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-slate-400">{roleNames[user.role]}</p>
                    </div>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="left" className="w-56 bg-slate-800 border-slate-700">
                  <DropdownMenuLabel className="text-slate-300">حسابي</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-slate-700" />
                  <DropdownMenuItem className="text-slate-300 hover:text-white hover:bg-slate-700">
                    <Settings className="w-4 h-4 ml-2" />
                    الإعدادات
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-slate-700" />
                  <DropdownMenuItem 
                    className="text-red-400 hover:text-red-300 hover:bg-slate-700"
                    onClick={handleLogout}
                  >
                    <LogOut className="w-4 h-4 ml-2" />
                    تسجيل الخروج
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </main>

        {/* Footer */}
        <footer className="bg-slate-800 border-t border-slate-700 p-4 text-center">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} نظام إدارة المدرسة - جميع الحقوق محفوظة
          </p>
        </footer>
      </div>
    </div>
  );
}
