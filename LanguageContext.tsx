import React, { createContext, useState } from 'react';
import { TranslationInit } from './src/helpers/languageservice';

export type LanguageContextType = {
  lang: string
  changeLang: React.Dispatch<React.SetStateAction<string>>
}


const LanguageContext = React.createContext({} as LanguageContextType);
const LanguageConsumer = LanguageContext.Consumer;

const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState<string>(TranslationInit.CLang);

  const changeLang = (newLang) => {
    setLang(newLang)
  }

  

  return (
    <LanguageContext.Provider value={{ lang, changeLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export {LanguageContext, LanguageProvider, LanguageConsumer}