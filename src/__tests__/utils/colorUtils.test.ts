import { hexToRgba, STATUS_COLORS } from '@/utils/colorUtils';

describe('hexToRgba', () => {
  it('converte hex #000000 para rgba(0, 0, 0, alpha)', () => {
    expect(hexToRgba('#000000', 1)).toBe('rgba(0, 0, 0, 1)');
  });

  it('converte hex #ffffff para rgba(255, 255, 255, alpha)', () => {
    expect(hexToRgba('#ffffff', 0.5)).toBe('rgba(255, 255, 255, 0.5)');
  });

  it('converte cor primária do projeto (#2563eb)', () => {
    expect(hexToRgba('#2563eb', 0.1)).toBe('rgba(37, 99, 235, 0.1)');
  });

  it('converte com alpha 0 para totalmente transparente', () => {
    const result = hexToRgba('#ff0000', 0);
    expect(result).toBe('rgba(255, 0, 0, 0)');
  });
});

describe('STATUS_COLORS', () => {
  it('possui cor para status "active"', () => {
    expect(STATUS_COLORS.active).toBeDefined();
    expect(typeof STATUS_COLORS.active).toBe('string');
  });

  it('possui cor para status "paused"', () => {
    expect(STATUS_COLORS.paused).toBeDefined();
  });

  it('possui cor para status "ended"', () => {
    expect(STATUS_COLORS.ended).toBeDefined();
  });

  it('possui cor para status "draft"', () => {
    expect(STATUS_COLORS.draft).toBeDefined();
  });

  it('possui cor para status "error"', () => {
    expect(STATUS_COLORS.error).toBeDefined();
  });
});
