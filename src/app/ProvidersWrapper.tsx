"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      onError() {
        console.log("Something went wrong!");
      },
    },
    mutations: {
      onError() {
        console.log("Something went wrong!");
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
  attribute?: ThemeProviderProps["attribute"];
  defaultTheme?: ThemeProviderProps["defaultTheme"];
  enableSystem?: ThemeProviderProps["enableSystem"];
}) {
  return (
    <NextThemesProvider
      attribute={attribute}
      defaultTheme={defaultTheme}
      enableSystem={enableSystem}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </NextThemesProvider>
  );
}
