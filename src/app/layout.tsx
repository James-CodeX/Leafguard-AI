import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster"
import './globals.css';

export const metadata: Metadata = {
  title: 'LeafGuard AI - Plant Disease Diagnosis',
  description: 'Identify plant diseases and get treatment advice with our AI-powered plant health assistant.',
  keywords: 'plant disease, AI diagnosis, garden health, plant care, leaf analysis',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased min-h-screen bg-gradient-to-b from-background to-secondary/20">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
