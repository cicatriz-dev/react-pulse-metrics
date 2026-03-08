import { sortCampaigns } from '@/utils/sortCampaigns';

const campaigns = [
  { id: '1', name: 'Campanha B', budget: 5000, metrics: { ctr: 3.5 } },
  { id: '2', name: 'Campanha A', budget: 10000, metrics: { ctr: 1.2 } },
  { id: '3', name: 'Campanha C', budget: 2000, metrics: { ctr: 5.0 } },
];

describe('sortCampaigns', () => {
  it('ordena por campo de nível superior em ordem crescente', () => {
    const sorted = sortCampaigns(campaigns, 'name', 'asc');
    expect(sorted[0].name).toBe('Campanha A');
    expect(sorted[1].name).toBe('Campanha B');
    expect(sorted[2].name).toBe('Campanha C');
  });

  it('ordena por campo de nível superior em ordem decrescente', () => {
    const sorted = sortCampaigns(campaigns, 'budget', 'desc');
    expect(sorted[0].budget).toBe(10000);
    expect(sorted[1].budget).toBe(5000);
    expect(sorted[2].budget).toBe(2000);
  });

  it('ordena por campo aninhado com notação de ponto', () => {
    const sorted = sortCampaigns(campaigns, 'metrics.ctr', 'asc');
    expect(sorted[0].metrics.ctr).toBe(1.2);
    expect(sorted[2].metrics.ctr).toBe(5.0);
  });

  it('usa "desc" como direção padrão', () => {
    const sorted = sortCampaigns(campaigns, 'budget');
    expect(sorted[0].budget).toBe(10000);
  });

  it('não muta o array original', () => {
    const original = [...campaigns];
    sortCampaigns(campaigns, 'name', 'asc');
    expect(campaigns[0].name).toBe(original[0].name);
  });

  it('retorna array vazio quando passado array vazio', () => {
    expect(sortCampaigns([], 'name', 'asc')).toEqual([]);
  });

  it('retorna mesmo elemento quando há apenas um', () => {
    const sorted = sortCampaigns([campaigns[0]], 'name', 'asc');
    expect(sorted).toHaveLength(1);
  });
});
