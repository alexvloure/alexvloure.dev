import "./globals.css";
import type { Metadata } from "next";
import ProvidersWrapper from "./ProvidersWrapper";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { mersad } from "../styles/fonts";

export const metadata: Metadata = {
  title: "alexvloure | Frontend developer",
  description: "Made with 🖤",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="min-h-screen" suppressHydrationWarning>
      <body className={mersad.className}>
        <ProvidersWrapper attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ProvidersWrapper>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
