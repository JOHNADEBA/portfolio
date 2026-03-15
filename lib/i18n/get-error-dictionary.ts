const errorDictionaries = {
  en: {
    title: "Something went wrong!",
    "try-again": "Try again",
    "not-found": {
      title: "Page Not Found",
      description: "Could not find the requested resource.",
      "back-home": "Return Home",
    },
  },
  sl: {
    title: "Nekaj je šlo narobe!",
    "try-again": "Poskusi ponovno",
    "not-found": {
      title: "Stran ni najdena",
      description: "Zahtevanega vira ni bilo mogoče najti.",
      "back-home": "Nazaj na domačo stran",
    },
  },
  de: {
    title: "Etwas ist schief gelaufen!",
    "try-again": "Erneut versuchen",
    "not-found": {
      title: "Seite nicht gefunden",
      description: "Die angeforderte Ressource konnte nicht gefunden werden.",
      "back-home": "Zurück zur Startseite",
    },
  },
};

export type ErrorDictionary = (typeof errorDictionaries)["en"];

export function getErrorDictionary(locale: string): ErrorDictionary {
  return (
    errorDictionaries[locale as keyof typeof errorDictionaries] ??
    errorDictionaries.en
  );
}
