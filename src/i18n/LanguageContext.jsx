import { createContext, useContext, useState } from 'react';

export const LanguageContext = createContext('ko');

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('ko');
  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const { lang, setLang } = useContext(LanguageContext);
  const t = (ko, en) => lang === 'en' ? en : ko;
  return { lang, setLang, t };
}
