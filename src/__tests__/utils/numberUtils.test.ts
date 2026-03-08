import { formatNumber, clamp, roundToDecimals } from '@/utils/numberUtils';

describe('formatNumber', () => {
  it('retorna o número como string para valores abaixo de 1000', () => {
    expect(formatNumber(999)).toBe('999');
    expect(formatNumber(0)).toBe('0');
  });

  it('formata valores >= 1000 com "K"', () => {
    expect(formatNumber(1000)).toBe('1.0K');
    expect(formatNumber(1500)).toBe('1.5K');
    expect(formatNumber(999999)).toBe('1000.0K');
  });

  it('formata valores >= 1000000 com "M"', () => {
    expect(formatNumber(1000000)).toBe('1.0M');
    expect(formatNumber(2500000)).toBe('2.5M');
  });
});

describe('clamp', () => {
  it('retorna o valor quando está dentro do intervalo', () => {
    expect(clamp(5, 0, 10)).toBe(5);
  });

  it('retorna min quando o valor está abaixo do mínimo', () => {
    expect(clamp(-5, 0, 10)).toBe(0);
  });

  it('retorna max quando o valor está acima do máximo', () => {
    expect(clamp(15, 0, 10)).toBe(10);
  });

  it('retorna o valor quando é exatamente min', () => {
    expect(clamp(0, 0, 10)).toBe(0);
  });

  it('retorna o valor quando é exatamente max', () => {
    expect(clamp(10, 0, 10)).toBe(10);
  });
});

describe('roundToDecimals', () => {
  it('arredonda para o número especificado de casas decimais', () => {
    expect(roundToDecimals(1.2345, 2)).toBe(1.23);
  });

  it('arredonda para cima corretamente', () => {
    expect(roundToDecimals(1.2355, 2)).toBe(1.24);
  });

  it('funciona com 0 casas decimais', () => {
    expect(roundToDecimals(1.7, 0)).toBe(2);
  });

  it('funciona com 3 casas decimais', () => {
    expect(roundToDecimals(1.23456, 3)).toBe(1.235);
  });
});
