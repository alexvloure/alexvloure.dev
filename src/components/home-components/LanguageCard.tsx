'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function LanguageCard() {
  const { t, i18n } = useTranslation('global');
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const item = localStorage.getItem('language');
    if (item) {
      setLanguage(item);
      changeLanguage(item);
    } else {
      localStorage.setItem('language', 'en');
      setLanguage('en');
      changeLanguage('en');
    }
  }, []);

  useEffect(() => {
    changeLanguage(i18n.language);
  }, [i18n.language]);

  const toggleLanguage = () => {
    if (language === 'en') {
      changeLanguage('es');
    } else {
      changeLanguage('en');
    }
  };

  const changeLanguage = (lng: string) => {
    if (lng === language) return;

    localStorage.setItem('language', lng);
    setLanguage(lng);
    i18n.changeLanguage(lng);
  };

  return (
    <div
      onClick={toggleLanguage}
      className="h-full flex flex-col justify-center items-center">
      <p className="font-semibold uppercase text-5xl md:text-8xl bg-clip-text text-transparent dark:bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))] dark:from-amber-200 dark:via-violet-600 dark:to-sky-900 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-pink-500 via-red-500 to-yellow-500">
        {language}
      </p>
      <p className="font-bold transition duration-300 ease-in-out ">
        <span
          className={
            language === 'en'
              ? 'dark:text-purple-300 text-red-400'
              : 'dark:text-white text-zinc-700'
          }>
          EN
        </span>{' '}
        <span
          className={
            language === 'es'
              ? 'dark:text-purple-300 text-red-400'
              : 'dark:text-white text-zinc-700'
          }>
          ES
        </span>
      </p>
    </div>
  );
}
