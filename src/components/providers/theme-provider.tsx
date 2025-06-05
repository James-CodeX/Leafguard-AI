'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ReactNode, useEffect, useState } from 'react';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only showing children after first render
  useEffect(() => {
    setMounted(true);
  }, []);

  // Use a more robust approach to prevent hydration issues
  if (!mounted) {
    // Return a placeholder with the same structure but suppressed hydration warnings
    return (
      <div style={{ visibility: 'hidden' }} suppressHydrationWarning>
        {children}
      </div>
    );
  }

  return (
    <NextThemesProvider attribute="class" defaultTheme="light" enableSystem={false}>
      {children}
    </NextThemesProvider>
  );
} 