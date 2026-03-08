import { generateChartColors, timeSeriesLabels, timeSeriesValues } from '@/utils/chartHelpers';

describe('generateChartColors', () => {
  it('retorna o número correto de cores', () => {
    expect(generateChartColors(3)).toHaveLength(3);
    expect(generateChartColors(8)).toHaveLength(8);
  });

  it('retorna array vazio para count 0', () => {
    expect(generateChartColors(0)).toHaveLength(0);
  });

  it('cicla através das cores base quando count excede o número de cores base', () => {
    const colors = generateChartColors(9);
    expect(colors[0]).toBe(colors[8]); // 9 cores, a 9ª = a 1ª
  });

  it('retorna strings de cor válidas (começam com #)', () => {
    const colors = generateChartColors(3);
    colors.forEach(color => expect(color).toMatch(/^#/));
  });
});

describe('timeSeriesLabels', () => {
  it('extrai as datas dos dados de série temporal', () => {
    const data = [{ date: '2026-01-01', value: 100 }, { date: '2026-01-02', value: 200 }];
    expect(timeSeriesLabels(data)).toEqual(['2026-01-01', '2026-01-02']);
  });

  it('retorna array vazio para dados vazios', () => {
    expect(timeSeriesLabels([])).toEqual([]);
  });
});

describe('timeSeriesValues', () => {
  it('extrai os valores dos dados de série temporal', () => {
    const data = [{ date: '2026-01-01', value: 100 }, { date: '2026-01-02', value: 200 }];
    expect(timeSeriesValues(data)).toEqual([100, 200]);
  });

  it('retorna array vazio para dados vazios', () => {
    expect(timeSeriesValues([])).toEqual([]);
  });
});
