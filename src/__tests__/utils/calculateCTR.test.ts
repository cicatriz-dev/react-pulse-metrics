import { calculateCTR, calculateCPC, calculateROAS, calculateCPM } from '@/utils/calculateCTR';

describe('calculateCTR', () => {
  it('retorna (clicks/impressions)*100 para entradas válidas', () => {
    expect(calculateCTR(100, 1000)).toBe(10);
  });

  it('retorna 0 quando impressions é 0', () => {
    expect(calculateCTR(100, 0)).toBe(0);
  });

  it('retorna resultado decimal corretamente', () => {
    expect(calculateCTR(1, 3)).toBeCloseTo(33.333, 2);
  });

  it('retorna 0 quando clicks e impressions são 0', () => {
    expect(calculateCTR(0, 0)).toBe(0);
  });
});

describe('calculateCPC', () => {
  it('retorna spent/clicks para entradas válidas', () => {
    expect(calculateCPC(500, 100)).toBe(5);
  });

  it('retorna 0 quando clicks é 0', () => {
    expect(calculateCPC(500, 0)).toBe(0);
  });

  it('retorna valor decimal', () => {
    expect(calculateCPC(100, 3)).toBeCloseTo(33.333, 2);
  });
});

describe('calculateROAS', () => {
  it('retorna revenue/spent para entradas válidas', () => {
    expect(calculateROAS(1000, 200)).toBe(5);
  });

  it('retorna 0 quando spent é 0', () => {
    expect(calculateROAS(1000, 0)).toBe(0);
  });

  it('retorna valor menor que 1 quando revenue < spent', () => {
    expect(calculateROAS(50, 100)).toBe(0.5);
  });
});

describe('calculateCPM', () => {
  it('retorna (spent/impressions)*1000 para entradas válidas', () => {
    expect(calculateCPM(100, 10000)).toBe(10);
  });

  it('retorna 0 quando impressions é 0', () => {
    expect(calculateCPM(100, 0)).toBe(0);
  });

  it('calcula corretamente com impressions altas', () => {
    expect(calculateCPM(500, 1000000)).toBe(0.5);
  });
});
