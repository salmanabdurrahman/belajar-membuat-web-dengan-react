import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { dictionaries } from "../utils/dictionaries";

const LocaleContext = createContext(null);
const LOCALE_STORAGE_KEY = "locale";

function getDefaultLocale() {
  const storedLocale = localStorage.getItem(LOCALE_STORAGE_KEY);
  return storedLocale === "en" ? "en" : "id";
}

function LocaleProvider({ children }) {
  const [locale, setLocale] = useState(getDefaultLocale);

  useEffect(() => {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  }, [locale]);

  function toggleLocale() {
    setLocale((previousLocale) => (previousLocale === "id" ? "en" : "id"));
  }

  const contextValue = useMemo(
    () => ({
      locale,
      dictionary: dictionaries[locale],
      toggleLocale,
    }),
    [locale]
  );

  return (
    <LocaleContext.Provider value={contextValue}>
      {children}
    </LocaleContext.Provider>
  );
}

function useLocale() {
  const context = useContext(LocaleContext);

  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }

  return context;
}

export { LocaleProvider, useLocale };
