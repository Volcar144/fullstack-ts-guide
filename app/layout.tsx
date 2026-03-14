import type { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import './global.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'TypeScript Full-Stack Guide',
  description: 'From zero to full-stack — HTML, TypeScript, React, Next.js and beyond.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
        {children}
      </body>
    </html>
  );
}
