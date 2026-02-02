import { describe, test, expect, mock } from 'bun:test';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeToggle } from '#/components/theme-toggle';

let mockTheme = 'light';
const mockSetTheme = mock(() => {});

mock.module('next-themes', () => ({
  useTheme: () => ({
    theme: mockTheme,
    setTheme: mockSetTheme,
  }),
}));

describe('ThemeToggle', () => {
  test('renders toggle button with correct aria label', () => {
    render(<ThemeToggle />);
    const button = screen.getByRole('button', { name: 'toggle theme' });
    expect(button).toBeDefined();
  });

  test('calls setTheme with dark when current theme is light', () => {
    mockTheme = 'light';
    mockSetTheme.mockClear();

    render(<ThemeToggle />);
    const button = screen.getByRole('button', { name: 'toggle theme' });
    fireEvent.click(button);

    expect(mockSetTheme).toHaveBeenCalledWith('dark');
  });

  test('calls setTheme with light when current theme is dark', () => {
    mockTheme = 'dark';
    mockSetTheme.mockClear();

    render(<ThemeToggle />);
    const button = screen.getByRole('button', { name: 'toggle theme' });
    fireEvent.click(button);

    expect(mockSetTheme).toHaveBeenCalledWith('light');
  });
});
