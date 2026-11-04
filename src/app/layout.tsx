import type { Metadata } from 'next';
import './globals.css';
import { StoreProvider } from '@/lib/storage/use-store';

export const metadata: Metadata = {
  title: 'ReviewForge | Enterprise 360° Performance Review Platform',
  description:
    'Turn scattered employee performance data into clear, evidence-backed annual performance reviews.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans bg-[#F7F7F2] text-[#202820] selection:bg-[#C8ED78] selection:text-[#17251F]">
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
