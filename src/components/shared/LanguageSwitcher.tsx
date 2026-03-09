"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Globe, ChevronDown, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useI18n } from "@/lib/i18n/context";
import { languages, LanguageCode } from "@/lib/i18n/config";

interface LanguageSwitcherProps {
  variant?: "dropdown" | "buttons" | "compact";
}

export function LanguageSwitcher({ variant = "dropdown" }: LanguageSwitcherProps) {
  const { language, setLanguage, isRTL } = useI18n();
  const [isOpen, setIsOpen] = useState(false);

  if (variant === "buttons") {
    return (
      <div className="flex items-center gap-1">
        {Object.entries(languages).map(([code, config]) => (
          <Button
            key={code}
            variant={language === code ? "default" : "ghost"}
            size="sm"
            onClick={() => setLanguage(code as LanguageCode)}
            className={`min-w-[40px] ${
              language === code 
                ? "bg-emerald-600 hover:bg-emerald-700 text-white" 
                : "text-slate-300 hover:text-white hover:bg-slate-700"
            }`}
          >
            <span className="text-lg">{config.flag}</span>
          </Button>
        ))}
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center gap-1 text-slate-300 hover:text-white hover:bg-slate-700/50"
          >
            <span className="text-lg">{languages[language].flag}</span>
            <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align={isRTL ? "start" : "end"}
          className="bg-slate-800 border-slate-700"
        >
          {Object.entries(languages).map(([code, config]) => (
            <DropdownMenuItem
              key={code}
              onClick={() => {
                setLanguage(code as LanguageCode);
                setIsOpen(false);
              }}
              className={`flex items-center gap-2 cursor-pointer ${
                language === code 
                  ? "bg-emerald-500/20 text-emerald-400" 
                  : "text-slate-300 hover:text-white hover:bg-slate-700"
              }`}
            >
              <span className="text-lg">{config.flag}</span>
              <span>{config.nativeName}</span>
              {language === code && <Check className="w-4 h-4 mr-auto" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  // Default dropdown variant
  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className="flex items-center gap-2 bg-slate-800/50 border-slate-700 text-white hover:bg-slate-700 hover:text-white"
        >
          <Globe className="w-4 h-4" />
          <span className="text-lg">{languages[language].flag}</span>
          <span>{languages[language].nativeName}</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align={isRTL ? "start" : "end"}
        className="w-48 bg-slate-800 border-slate-700"
      >
        <AnimatePresence>
          {Object.entries(languages).map(([code, config], index) => (
            <motion.div
              key={code}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <DropdownMenuItem
                onClick={() => {
                  setLanguage(code as LanguageCode);
                  setIsOpen(false);
                }}
                className={`flex items-center gap-3 cursor-pointer py-3 ${
                  language === code 
                    ? "bg-emerald-500/20 text-emerald-400" 
                    : "text-slate-300 hover:text-white hover:bg-slate-700"
                }`}
              >
                <span className="text-xl">{config.flag}</span>
                <div className="flex-1">
                  <p className="font-medium">{config.nativeName}</p>
                  <p className="text-xs text-slate-400">{config.name}</p>
                </div>
                {language === code && <Check className="w-4 h-4" />}
              </DropdownMenuItem>
            </motion.div>
          ))}
        </AnimatePresence>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
