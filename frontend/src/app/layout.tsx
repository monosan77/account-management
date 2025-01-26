import type { Metadata } from 'next';
import { DotGothic16 } from 'next/font/google';
import './globals.css';

const DotGothic = DotGothic16({
  weight: '400',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Account Management System',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${DotGothic.className} `}>{children}</body>
    </html>
  );
}
