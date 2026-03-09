"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode, useMemo, useSyncExternalStore } from 'react';
import { LanguageCode, languages, defaultLanguage, getDirection, STORAGE_KEY } from './config';

// Import translations
import arTranslations from './translations/ar.json';
import enTranslations from './translations/en.json';
import frTranslations from './translations/fr.json';

const translations: Record<LanguageCode, Record<string, unknown>> = {
  ar: arTranslations,
  en: enTranslations,
  fr: frTranslations
};

interface I18nContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  dir: 'rtl' | 'ltr';
  isRTL: boolean;
  languageConfig: typeof languages[LanguageCode];
  formatDate: (date: Date | string, options?: Intl.DateTimeFormatOptions) => string;
  formatNumber: (num: number, options?: Intl.NumberFormatOptions) => string;
  formatCurrency: (amount: number) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

// External store for language preference
let languageStore = defaultLanguage;
const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function getSnapshot(): LanguageCode {
  return languageStore;
}

function setLanguageStore(lang: LanguageCode) {
  languageStore = lang;
  listeners.forEach(listener => listener());
}

// Initialize from localStorage on client
if (typeof window !== 'undefined') {
  const stored = localStorage.getItem(STORAGE_KEY) as LanguageCode | null;
  if (stored && stored in languages) {
    languageStore = stored;
  } else {
    const browserLang = navigator.language.split('-')[0] as LanguageCode;
    if (browserLang in languages) {
      languageStore = browserLang;
    }
  }
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const language = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  const setLanguage = useCallback((lang: LanguageCode) => {
    setLanguageStore(lang);
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = getDirection(lang);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = getDirection(language);
  }, [language]);

  const t = useCallback((key: string, params?: Record<string, string | number>): string => {
    const keys = key.split('.');
    let value: unknown = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        // Fallback to default language
        value = translations[defaultLanguage];
        for (const fallbackKey of keys) {
          if (value && typeof value === 'object' && fallbackKey in value) {
            value = (value as Record<string, unknown>)[fallbackKey];
          } else {
            return key; // Return key if not found
          }
        }
        break;
      }
    }
    
    if (typeof value === 'string') {
      if (params) {
        return Object.entries(params).reduce(
          (str, [paramKey, paramValue]) => 
            str.replace(new RegExp(`{{${paramKey}}}`, 'g'), String(paramValue)),
          value
        );
      }
      return value;
    }
    
    return key;
  }, [language]);

  // Format date with Western numerals
  const formatDate = useCallback((date: Date | string, options?: Intl.DateTimeFormatOptions): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const locale = languages[language].locale;
    
    // Use Western numerals by formatting with 'en' then translating month/day names if needed
    const defaultOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      ...options
    };
    
    // Format with locale but use Western numerals
    const formatter = new Intl.DateTimeFormat(locale, defaultOptions);
    return formatter.format(dateObj);
  }, [language]);

  // Format number with Western numerals
  const formatNumber = useCallback((num: number, options?: Intl.NumberFormatOptions): string => {
    // Always use Western numerals
    return new Intl.NumberFormat('en-US', options).format(num);
  }, []);

  // Format currency with Western numerals and MAD currency
  const formatCurrency = useCallback((amount: number): string => {
    const formatted = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
    
    const currency = languages[language].numberFormat.currency;
    return language === 'ar' ? `${formatted} ${currency}` : `${currency} ${formatted}`;
  }, [language]);

  const contextValue = useMemo(() => ({
    language,
    setLanguage,
    t,
    dir: getDirection(language),
    isRTL: getDirection(language) === 'rtl',
    languageConfig: languages[language],
    formatDate,
    formatNumber,
    formatCurrency
  }), [language, setLanguage, t, formatDate, formatNumber, formatCurrency]);

  return (
    <I18nContext.Provider value={contextValue}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
