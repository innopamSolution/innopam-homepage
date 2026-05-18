import { createContext, useContext, useState, useCallback } from 'react';

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
  // useCallback으로 메모이제이션 → lang이 바뀔 때만 새 함수 생성
  const t = useCallback((ko, en) => lang === 'en' ? en : ko, [lang]);
  return { lang, setLang, t };
}
