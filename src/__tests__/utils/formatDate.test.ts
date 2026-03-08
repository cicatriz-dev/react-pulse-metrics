import { formatDate, formatDateLong, dateToString, formatDateRange } from '@/utils/formatDate';

describe('formatDate', () => {
  it('formata data no padrão brasileiro', () => {
    const result = formatDate('2024-01-15T12:00:00');
    expect(result).toBe('15/01/2024');
  });

  it('retorna string vazia para data inválida', () => {
    const result = formatDate('');
    expect(result).toBe('');
  });

  it('formata data com hora', () => {
    const result = formatDate('2024-01-15T10:30:00');
    expect(typeof result).toBe('string');
  });

  it('retorna string vazia para null', () => {
    const result = formatDate(null as any);
    expect(result).toBe('');
  });

  it('aceita objeto Date', () => {
    const date = new Date('2024-06-15');
    const result = formatDate(date);
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });
});

describe('formatDateLong', () => {
  it('retorna string vazia para data falsy', () => {
    expect(formatDateLong('')).toBe('');
    expect(formatDateLong(null as any)).toBe('');
  });

  it('retorna string não-vazia para data válida', () => {
    const result = formatDateLong('2024-01-15');
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });

  it('inclui o nome do mês por extenso', () => {
    const result = formatDateLong('2024-01-15');
    expect(result).toMatch(/janeiro/i);
  });
});

describe('dateToString', () => {
  it('retorna "-" para valor falsy', () => {
    expect(dateToString('')).toBe('-');
    expect(dateToString(null)).toBe('-');
    expect(dateToString(undefined)).toBe('-');
  });

  it('formata data válida como string brasileira', () => {
    const result = dateToString('2024-01-15T12:00:00');
    expect(result).toBe('15/01/2024');
  });
});

describe('formatDateRange', () => {
  it('formata intervalo de datas com " - " entre elas', () => {
    const result = formatDateRange('2024-01-01', '2024-03-31');
    expect(result).toContain(' - ');
  });

  it('retorna string com as duas datas formatadas', () => {
    const result = formatDateRange('2024-01-15T12:00:00', '2024-06-30T12:00:00');
    expect(result).toBe('15/01/2024 - 30/06/2024');
  });
});
