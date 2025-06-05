'use client';

import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // Ensure component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Always render the same button initially, then update after hydration
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => mounted && setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="h-9 w-9 rounded-full bg-secondary/50 hover:bg-secondary"
      aria-label="Toggle theme"
      disabled={!mounted}
    >
      {mounted ? (
        <>
          <Sun className={`h-4 w-4 transition-all ${theme === 'dark' ? 'rotate-90 scale-0' : 'rotate-0 scale-100'}`} />
          <Moon className={`absolute h-4 w-4 transition-all ${theme === 'dark' ? 'rotate-0 scale-100' : 'rotate-90 scale-0'}`} />
        </>
      ) : (
        <Sun className="h-4 w-4" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
} 