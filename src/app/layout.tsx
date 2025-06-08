import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import GenkitProvider from '@/components/providers/GenkitProvider';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import LiveChatButton from '@/components/common/LiveChatButton';

export const metadata: Metadata = {
  title: 'Apex Digital Group - Full-Service Digital Agency',
  description: 'Apex Digital Group offers comprehensive digital marketing, AI automation, web development, and IT implementation services to elevate your business.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased flex flex-col min-h-screen">
        <GenkitProvider>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <LiveChatButton />
          <Toaster />
        </GenkitProvider>
      </body>
    </html>
  );
}
