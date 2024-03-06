import './globals.css';
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import localFont from 'next/font/local';
import ProvidersWrapper from './ProvidersWrapper';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

const montserrat = Montserrat({ subsets: ['latin'] });
const mersad = localFont({ src: '../assets/fonts/Mersad.ttf' });

export const metadata: Metadata = {
  title: 'alexvloure | Frontend developer',
  description: 'Made with 🖤',
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
