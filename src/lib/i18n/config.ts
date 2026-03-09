export type LanguageCode = 'ar' | 'fr' | 'en';

export interface LanguageConfig {
  code: LanguageCode;
  name: string;
  nativeName: string;
  dir: 'rtl' | 'ltr';
  flag: string;
  dateFormat: string;
  numberFormat: {
    decimal: string;
    thousand: string;
    currency: string;
  };
  locale: string;
}

export const languages: Record<LanguageCode, LanguageConfig> = {
  ar: {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    dir: 'rtl',
    flag: '🇲🇦',
    dateFormat: 'DD/MM/YYYY',
    numberFormat: {
      decimal: '.',
      thousand: ' ',
      currency: 'د.م.'
    },
    locale: 'ar-MA'
  },
  fr: {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    dir: 'ltr',
    flag: '🇲🇦',
    dateFormat: 'DD/MM/YYYY',
    numberFormat: {
      decimal: ',',
      thousand: ' ',
      currency: 'MAD'
    },
    locale: 'fr-MA'
  },
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    dir: 'ltr',
    flag: '🇬🇧',
    dateFormat: 'MM/DD/YYYY',
    numberFormat: {
      decimal: '.',
      thousand: ',',
      currency: 'MAD'
    },
    locale: 'en-MA'
  }
};

export const defaultLanguage: LanguageCode = 'ar';

export function isRTL(lang: LanguageCode): boolean {
  return languages[lang].dir === 'rtl';
}

export function getLanguageConfig(lang: LanguageCode): LanguageConfig {
  return languages[lang];
}

export function getDirection(lang: LanguageCode): 'rtl' | 'ltr' {
  return languages[lang].dir;
}

export function getInitialLanguage(): LanguageCode {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('language');
    if (stored && stored in languages) {
      return stored as LanguageCode;
    }
    
    const browserLang = navigator.language.split('-')[0];
    if (browserLang in languages) {
      return browserLang as LanguageCode;
    }
  }
  return defaultLanguage;
}

export const STORAGE_KEY = 'school_language';
