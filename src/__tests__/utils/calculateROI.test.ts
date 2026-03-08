import { calculateROI, calculateCAC } from '@/utils/calculateROI';

describe('calculateROI', () => {
  it('retorna ((revenue - cost) / cost) * 100 para entradas válidas', () => {
    expect(calculateROI(1500, 1000)).toBe(50);
  });

  it('retorna 0 quando cost é 0', () => {
    expect(calculateROI(1500, 0)).toBe(0);
  });

  it('retorna ROI negativo quando revenue < cost', () => {
    expect(calculateROI(500, 1000)).toBe(-50);
  });

  it('retorna 0 quando revenue é igual ao cost', () => {
    expect(calculateROI(1000, 1000)).toBe(0);
  });

  it('retorna 100 para lucro dobrado', () => {
    expect(calculateROI(2000, 1000)).toBe(100);
  });
});

describe('calculateCAC', () => {
  it('retorna spend/acquisitions para entradas válidas', () => {
    expect(calculateCAC(1000, 10)).toBe(100);
  });

  it('retorna 0 quando acquisitions é 0', () => {
    expect(calculateCAC(1000, 0)).toBe(0);
  });

  it('retorna valor decimal', () => {
    expect(calculateCAC(100, 3)).toBeCloseTo(33.333, 2);
  });
});
