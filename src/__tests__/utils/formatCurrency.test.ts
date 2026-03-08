import { formatCurrency, toBRL, formatBudget } from '@/utils/formatCurrency';

describe('formatCurrency', () => {
  it('retorna uma string contendo R$ para valores BRL', () => {
    expect(formatCurrency(1000)).toMatch(/R\$/);
  });

  it('formata zero e retorna string com R$', () => {
    expect(formatCurrency(0)).toMatch(/R\$/);
  });

  it('retorna "R$ 0,00" para null', () => {
    expect(formatCurrency(null as any)).toBe('R$ 0,00');
  });

  it('retorna "R$ 0,00" para undefined', () => {
    expect(formatCurrency(undefined as any)).toBe('R$ 0,00');
  });
});

describe('toBRL', () => {
  it('formata número positivo com vírgula como separador decimal', () => {
    expect(toBRL(9.99)).toBe('R$ 9,99');
  });

  it('formata valor inteiro com duas casas decimais', () => {
    expect(toBRL(100)).toBe('R$ 100,00');
  });

  it('formata zero', () => {
    expect(toBRL(0)).toBe('R$ 0,00');
  });
});

describe('formatBudget', () => {
  it('calcula percentUsed corretamente', () => {
    const result = formatBudget(1000, 300);
    expect(result.percentUsed).toBe(30);
  });

  it('usa Math.round para percentUsed', () => {
    const result = formatBudget(100, 33);
    expect(result.percentUsed).toBe(33);
  });

  it('retorna objeto com as chaves corretas', () => {
    const result = formatBudget(1000, 500);
    expect(result).toHaveProperty('budget');
    expect(result).toHaveProperty('spent');
    expect(result).toHaveProperty('remaining');
    expect(result).toHaveProperty('percentUsed');
  });

  it('remaining é formatado como string de moeda', () => {
    const result = formatBudget(1000, 300);
    expect(typeof result.remaining).toBe('string');
    expect(result.remaining).toMatch(/R\$/);
  });
});
