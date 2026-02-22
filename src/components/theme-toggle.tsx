'use client';

import { useTheme } from 'next-themes';
import { MoonIcon, SunIcon } from '@phosphor-icons/react';
import { Button } from '#/components/ui/button';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    const isDark = theme === 'dark';
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="toggle theme">
      <SunIcon className="hidden size-5 dark:block" />
      <MoonIcon className="block size-5 dark:hidden" />
    </Button>
  );
}
