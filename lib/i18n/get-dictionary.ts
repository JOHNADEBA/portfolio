import "server-only";
import en from "@/dictionaries/en.json";
import sl from "@/dictionaries/sl.json";
import de from "@/dictionaries/de.json";

export const dictionaries = {
  en,
  sl,
  de,
} as const;

export type Dictionary = typeof en;
export type Locale = keyof typeof dictionaries;

export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
  return dictionaries[locale];
};

export const hasLocale = (locale: string): locale is Locale => {
  return locale in dictionaries;
};

// For cases where locale might be invalid, use a fallback
export const getDictionarySafe = async (
  locale: string,
): Promise<Dictionary> => {
  if (hasLocale(locale)) {
    return dictionaries[locale];
  }
  return dictionaries.en;
};
