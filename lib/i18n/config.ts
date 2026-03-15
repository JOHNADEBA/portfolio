export const i18n = {
  defaultLocale: "en",
  locales: ["en", "sl", "de"],
} as const;

export type Locale = (typeof i18n)["locales"][number];

export function isValidLocale(value: string | undefined): value is Locale {
  if (!value) return false;
  return i18n.locales.includes(value as Locale);
}

export function getFirstPathSegment(url: string): string | undefined {
  try {
    const urlObj = new URL(url);
    const segment = urlObj.pathname.split("/")[1];
    return segment || undefined;
  } catch {
    return undefined;
  }
}
