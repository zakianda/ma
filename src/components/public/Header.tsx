"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, School, ChevronDown, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import { useTranslation } from "@/hooks/useTranslation";

interface HeaderProps {
  onLoginClick?: () => void;
  currentPage?: string;
  onNavigate?: (page: string) => void;
}

export function Header({ onLoginClick, currentPage = "home", onNavigate }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, isRTL } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: t("nav.home"), page: "home" },
    { label: t("nav.about"), page: "about" },
    { label: t("nav.programs"), page: "programs" },
    { label: t("nav.registration"), page: "registration" },
    { label: t("nav.news"), page: "news" },
    { label: t("nav.contact"), page: "contact" },
  ];

  const handleNavClick = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    } else {
      window.location.href = `/?page=${page}`;
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-slate-900/95 backdrop-blur-md shadow-lg"
          : "bg-slate-900/70 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <button
            onClick={() => handleNavClick("home")}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <motion.div
              whileHover={{ rotate: 10 }}
              className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-lg"
            >
              <School className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
            </motion.div>
            <div>
              <h1 className="text-lg lg:text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                مدرستنا
              </h1>
              <p className="text-xs text-slate-400 hidden sm:block">نحو مستقبل مشرق</p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => handleNavClick(item.page)}
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  currentPage === item.page
                    ? "text-emerald-400 bg-emerald-500/10"
                    : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-2 lg:gap-4">
            <LanguageSwitcher variant="compact" />

            {/* Login Button */}
            <Button
              onClick={onLoginClick}
              className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white shadow-lg shadow-emerald-600/25"
            >
              <LogIn className="w-4 h-4" />
              <span className="hidden sm:inline">{t("common.login")}</span>
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-white hover:bg-slate-800"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-slate-900/95 backdrop-blur-md border-t border-slate-800"
          >
            <div className="max-w-7xl mx-auto px-4 py-4">
              <nav className="flex flex-col gap-2">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.page}
                    initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <button
                      onClick={() => handleNavClick(item.page)}
                      className={`w-full text-right px-4 py-3 rounded-lg transition-colors ${
                        currentPage === item.page
                          ? "text-emerald-400 bg-emerald-500/10"
                          : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                      }`}
                    >
                      {item.label}
                    </button>
                  </motion.div>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
