"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { LucideIcon, LogOut, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface SidebarItem {
  id: string;
  icon: LucideIcon;
  label: string;
  href?: string;
  badge?: number;
  onClick?: () => void;
  active?: boolean;
}

interface SidebarProps {
  items: SidebarItem[];
  title: string;
  icon: LucideIcon;
  gradient: string;
  user?: {
    name: string;
    role: string;
  };
  showSettings?: boolean;
  onSettingsClick?: () => void;
  activeTab?: string;
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

export function Sidebar({ 
  items, 
  title, 
  icon: Icon, 
  gradient, 
  user, 
  showSettings = true,
  onSettingsClick,
  activeTab
}: SidebarProps) {
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <div className="h-full flex flex-col">
      {/* Logo */}
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-xl bg-gradient-to-br ${gradient}`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-white font-bold">{title}</h2>
            <p className="text-slate-400 text-xs">نظام إدارة المدرسة</p>
          </div>
        </div>
      </div>

      {/* User Info */}
      {user && (
        <div className="p-4 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback className={`bg-gradient-to-br ${roleColors[user.role] || 'from-slate-500 to-slate-600'} text-white`}>
                {user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium truncate">{user.name}</p>
              <p className="text-slate-400 text-xs truncate">{roleNames[user.role] || user.role}</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {items.map((item) => {
          const isActive = activeTab ? item.id === activeTab : (item.href ? (pathname === item.href || pathname.startsWith(item.href + "?")) : item.active);
          
          const content = (
            <motion.div
              whileHover={{ x: -4 }}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors cursor-pointer",
                isActive 
                  ? "bg-slate-700 text-white" 
                  : "text-slate-400 hover:text-white hover:bg-slate-700/50"
              )}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <span className="flex-1">{item.label}</span>
              {item.badge !== undefined && item.badge > 0 && (
                <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="w-1 h-6 bg-white rounded-full"
                />
              )}
            </motion.div>
          );

          // If onClick is provided, use a button/div instead of Link
          if (item.onClick) {
            return (
              <div key={item.id} onClick={item.onClick}>
                {content}
              </div>
            );
          }

          // Otherwise use Link
          return (
            <Link key={item.id} href={item.href || "#"}>
              {content}
            </Link>
          );
        })}
      </nav>

      {/* Settings & Logout */}
      <div className="p-4 border-t border-slate-700 space-y-2">
        {showSettings && (
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-slate-400 hover:text-white hover:bg-slate-700"
            onClick={onSettingsClick}
          >
            <Settings className="w-5 h-5" />
            <span>الإعدادات</span>
          </Button>
        )}
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-red-400 hover:text-red-300 hover:bg-slate-700"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5" />
          <span>تسجيل الخروج</span>
        </Button>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-slate-700">
        <p className="text-slate-500 text-xs text-center">
          العام الدراسي 2025-2026
        </p>
      </div>
    </div>
  );
}
