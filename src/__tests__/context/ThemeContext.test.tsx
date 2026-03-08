import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, useTheme } from '@/context/ThemeContext';

function ThemeConsumer() {
  const { theme, isDark, toggleTheme } = useTheme();
  return (
    <div>
      <span data-testid="isDark">{String(isDark)}</span>
      <span data-testid="primary">{theme.colors.primary}</span>
      <span data-testid="background">{theme.colors.background}</span>
      <button onClick={toggleTheme} data-testid="toggle">Toggle</button>
    </div>
  );
}

describe('ThemeContext', () => {
  it('começa com tema claro por padrão', () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    );
    expect(screen.getByTestId('isDark').textContent).toBe('false');
  });

  it('provê cores do tema claro por padrão', () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    );
    expect(screen.getByTestId('background').textContent).toBe('#f3f4f6');
  });

  it('alterna para tema escuro ao chamar toggleTheme', () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    );
    fireEvent.click(screen.getByTestId('toggle'));
    expect(screen.getByTestId('isDark').textContent).toBe('true');
  });

  it('provê cores do tema escuro após toggle', () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    );
    fireEvent.click(screen.getByTestId('toggle'));
    expect(screen.getByTestId('background').textContent).toBe('#111827');
  });

  it('volta ao tema claro ao fazer toggle duas vezes', () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    );
    fireEvent.click(screen.getByTestId('toggle'));
    fireEvent.click(screen.getByTestId('toggle'));
    expect(screen.getByTestId('isDark').textContent).toBe('false');
  });
});
