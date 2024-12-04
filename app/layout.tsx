import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'macOS Terminal',
  description: 'A web-based macOS Terminal interface',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-['Courier_New']">{children}</body>
    </html>
  );
}