'use client';

import i18next from 'i18next';
import global_en from '@/locales/en/global.json';
import global_es from '@/locales/es/global.json';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ThemeProviderProps } from 'next-themes/dist/types';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import FrozenRouter from '@/components/FrozenRouter';
import NextTopLoader from 'nextjs-toploader';

i18next.init({
  interpolation: { escapeValue: false },
  lng: 'en',
  resources: {
    en: {
      global: global_en,
    },
    es: {
      global: global_es,
    },
  },
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      onError() {
        console.log('Something went wrong!');
      },
    },
    mutations: {
      onError() {
        console.log('Something went wrong!');
      },
    },
  },
});

export default function ProvidersWrapper({
  children,
  attribute,
  defaultTheme,
  enableSystem,
}: {
  children: React.ReactNode;
  attribute?: ThemeProviderProps['attribute'];
  defaultTheme?: ThemeProviderProps['defaultTheme'];
  enableSystem?: ThemeProviderProps['enableSystem'];
}) {
  const path = usePathname();

  useEffect(() => {
    const language = localStorage.getItem('language');
    i18next.changeLanguage(language!);
  }, []);

  return (
    <I18nextProvider i18n={i18next}>
      <NextThemesProvider
        attribute={attribute}
        defaultTheme={defaultTheme}
        enableSystem={enableSystem}>
        <QueryClientProvider client={queryClient}>
          <NextTopLoader height={2} showSpinner={false} />
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              initial={{ opacity: 0, y: path !== '/blog' ? -800 : 600 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: path !== '/blog' ? -800 : 800 }}
              transition={{ duration: 0.5 }}
              key={path}>
              <FrozenRouter>{children}</FrozenRouter>
            </motion.div>
          </AnimatePresence>
        </QueryClientProvider>
      </NextThemesProvider>
    </I18nextProvider>
  );
}
