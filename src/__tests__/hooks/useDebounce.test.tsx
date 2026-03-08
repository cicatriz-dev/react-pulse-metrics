import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { useDebounce } from '@/hooks/useDebounce';

function DebounceHarness({ value, delay }: { value: string; delay: number }) {
  const debouncedValue = useDebounce(value, delay);
  return <span data-testid="value">{debouncedValue}</span>;
}

describe('useDebounce', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('retorna o valor inicial imediatamente', () => {
    render(<DebounceHarness value="hello" delay={500} />);
    expect(screen.getByTestId('value').textContent).toBe('hello');
  });

  it('não atualiza o valor antes do delay expirar', () => {
    const { rerender } = render(<DebounceHarness value="hello" delay={500} />);
    rerender(<DebounceHarness value="world" delay={500} />);
    act(() => {
      jest.advanceTimersByTime(499);
    });
    expect(screen.getByTestId('value').textContent).toBe('hello');
  });

  it('atualiza o valor após o delay expirar', () => {
    const { rerender } = render(<DebounceHarness value="hello" delay={500} />);
    rerender(<DebounceHarness value="world" delay={500} />);
    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(screen.getByTestId('value').textContent).toBe('world');
  });

  it('reseta o timer quando o valor muda antes do delay expirar', () => {
    const { rerender } = render(<DebounceHarness value="hello" delay={500} />);
    // Muda para "world" e avança 300ms
    rerender(<DebounceHarness value="world" delay={500} />);
    act(() => {
      jest.advanceTimersByTime(300);
    });
    // Muda para "changed" antes dos 500ms completarem
    rerender(<DebounceHarness value="changed" delay={500} />);
    act(() => {
      jest.advanceTimersByTime(300);
    });
    // Ainda não completou 500ms desde a última mudança
    expect(screen.getByTestId('value').textContent).toBe('hello');
    // Agora completa o delay
    act(() => {
      jest.advanceTimersByTime(200);
    });
    expect(screen.getByTestId('value').textContent).toBe('changed');
  });

  it('funciona com delay diferente de 500ms', () => {
    const { rerender } = render(<DebounceHarness value="a" delay={200} />);
    rerender(<DebounceHarness value="b" delay={200} />);
    act(() => {
      jest.advanceTimersByTime(200);
    });
    expect(screen.getByTestId('value').textContent).toBe('b');
  });
});
