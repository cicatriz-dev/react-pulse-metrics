import { getDaysAgo, getLastNDays, isDateInRange, today, yesterday } from '@/utils/dateHelpers';

describe('getDaysAgo', () => {
  it('retorna uma string de data no formato YYYY-MM-DD', () => {
    const result = getDaysAgo(7);
    expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it('retorna uma data no passado', () => {
    const todayStr = new Date().toISOString().split('T')[0];
    const result = getDaysAgo(1);
    expect(result < todayStr).toBe(true);
  });

  it('retorna hoje quando days é 0', () => {
    const todayStr = new Date().toISOString().split('T')[0];
    const result = getDaysAgo(0);
    expect(result).toBe(todayStr);
  });
});

describe('getLastNDays', () => {
  it('retorna objeto com startDate e endDate', () => {
    const result = getLastNDays(30);
    expect(result).toHaveProperty('startDate');
    expect(result).toHaveProperty('endDate');
  });

  it('startDate é anterior a endDate', () => {
    const result = getLastNDays(30);
    expect(result.startDate < result.endDate).toBe(true);
  });

  it('endDate é a data de hoje', () => {
    const todayStr = new Date().toISOString().split('T')[0];
    const result = getLastNDays(30);
    expect(result.endDate).toBe(todayStr);
  });
});

describe('isDateInRange', () => {
  it('retorna true quando a data está dentro do intervalo', () => {
    expect(isDateInRange('2026-02-15', '2026-01-01', '2026-03-31')).toBe(true);
  });

  it('retorna true para a data igual ao início do intervalo', () => {
    expect(isDateInRange('2026-01-01', '2026-01-01', '2026-03-31')).toBe(true);
  });

  it('retorna true para a data igual ao fim do intervalo', () => {
    expect(isDateInRange('2026-03-31', '2026-01-01', '2026-03-31')).toBe(true);
  });

  it('retorna false quando a data está antes do início', () => {
    expect(isDateInRange('2025-12-31', '2026-01-01', '2026-03-31')).toBe(false);
  });

  it('retorna false quando a data está após o fim', () => {
    expect(isDateInRange('2026-04-01', '2026-01-01', '2026-03-31')).toBe(false);
  });
});

describe('today', () => {
  it('retorna a data atual no formato YYYY-MM-DD', () => {
    const result = today();
    const expected = new Date().toISOString().split('T')[0];
    expect(result).toBe(expected);
  });
});

describe('yesterday', () => {
  it('retorna uma string de data no formato YYYY-MM-DD', () => {
    const result = yesterday();
    expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it('retorna data anterior a hoje', () => {
    const todayStr = new Date().toISOString().split('T')[0];
    expect(yesterday() < todayStr).toBe(true);
  });
});
