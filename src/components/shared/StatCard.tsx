"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  gradient: string;
}

export function StatCard({ title, value, icon: Icon, description, trend, gradient }: StatCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="bg-slate-800/50 border-slate-700 overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-slate-400 text-sm mb-1">{title}</p>
              <p className="text-3xl font-bold text-white">{value}</p>
              {description && (
                <p className="text-slate-500 text-xs mt-1">{description}</p>
              )}
              {trend && (
                <p className={`text-sm mt-2 ${trend.isPositive ? "text-green-400" : "text-red-400"}`}>
                  {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
                </p>
              )}
            </div>
            <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient}`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
