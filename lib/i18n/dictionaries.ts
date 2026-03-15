import en from "@/dictionaries/en.json";
import sl from "@/dictionaries/sl.json";
import de from "@/dictionaries/de.json";

export const dictionaries = {
  en,
  sl,
  de,
} as const;

export type Dictionary = typeof en;
