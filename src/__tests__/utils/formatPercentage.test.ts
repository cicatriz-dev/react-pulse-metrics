import { formatPercentage, toPercent } from '@/utils/formatPercentage';

describe('formatPercentage', () => {
  it('formata com 1 casa decimal por padrão', () => {
    expect(formatPercentage(12.567)).toBe('12.6%');
  });

  it('respeita o número de casas decimais personalizado', () => {
    expect(formatPercentage(12.567, 2)).toBe('12.57%');
  });

  it('formata zero corretamente', () => {
    expect(formatPercentage(0)).toBe('0.0%');
  });

  it('formata 100 corretamente', () => {
    expect(formatPercentage(100)).toBe('100.0%');
  });

  it('retorna "0%" para null', () => {
    expect(formatPercentage(null as any)).toBe('0%');
  });

  it('retorna "0%" para undefined', () => {
    expect(formatPercentage(undefined as any)).toBe('0%');
  });
});

describe('toPercent', () => {
  it('formata com exatamente 2 casas decimais', () => {
    expect(toPercent(12)).toBe('12.00%');
  });

  it('formata valor decimal com 2 casas', () => {
    expect(toPercent(12.5)).toBe('12.50%');
  });

  it('formata zero', () => {
    expect(toPercent(0)).toBe('0.00%');
  });
});
