"use client";

import { useI18n } from '@/lib/i18n/context';
import { LanguageCode } from '@/lib/i18n/config';

export function useTranslation() {
  const { t, language, setLanguage, dir, isRTL, languageConfig, formatDate, formatNumber, formatCurrency } = useI18n();

  // Format relative time (e.g., "2 hours ago")
  const formatRelativeTime = (date: Date | string): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);
    
    const rtf = new Intl.RelativeTimeFormat(languageConfig.locale, { numeric: 'auto' });
    
    if (diffInSeconds < 60) {
      return rtf.format(-diffInSeconds, 'second');
    } else if (diffInSeconds < 3600) {
      return rtf.format(-Math.floor(diffInSeconds / 60), 'minute');
    } else if (diffInSeconds < 86400) {
      return rtf.format(-Math.floor(diffInSeconds / 3600), 'hour');
    } else if (diffInSeconds < 604800) {
      return rtf.format(-Math.floor(diffInSeconds / 86400), 'day');
    } else if (diffInSeconds < 2592000) {
      return rtf.format(-Math.floor(diffInSeconds / 604800), 'week');
    } else {
      return rtf.format(-Math.floor(diffInSeconds / 2592000), 'month');
    }
  };

  // Get RTL-aware classes
  const rtlClass = (ltrClass: string, rtlClass: string): string => {
    return isRTL ? rtlClass : ltrClass;
  };

  // Get directional margin/padding
  const dirMargin = (start: string, end: string): string => {
    return isRTL ? `mr-${start} ml-${end}` : `ml-${start} mr-${end}`;
  };

  const dirPadding = (start: string, end: string): string => {
    return isRTL ? `pr-${start} pl-${end}` : `pl-${start} pr-${end}`;
  };

  return {
    t,
    language,
    setLanguage,
    dir,
    isRTL,
    languageConfig,
    formatNumber,
    formatCurrency,
    formatDate,
    formatRelativeTime,
    rtlClass,
    dirMargin,
    dirPadding
  };
}
