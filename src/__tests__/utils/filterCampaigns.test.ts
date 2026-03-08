import { filterCampaigns } from '@/utils/filterCampaigns';

const campaigns = [
  { id: '1', name: 'Black Friday 2025', status: 'ended', channel: 'google' },
  { id: '2', name: 'Campanha Ativa Google', status: 'active', channel: 'google' },
  { id: '3', name: 'Campanha Meta Pausada', status: 'paused', channel: 'meta' },
  { id: '4', name: 'Retargeting Email', status: 'active', channel: 'email' },
];

describe('filterCampaigns', () => {
  it('retorna todas as campanhas quando filters está vazio', () => {
    const result = filterCampaigns(campaigns, {});
    expect(result).toHaveLength(4);
  });

  it('filtra por status quando status não é "all"', () => {
    const result = filterCampaigns(campaigns, { status: 'active' });
    expect(result).toHaveLength(2);
    expect(result.every(c => c.status === 'active')).toBe(true);
  });

  it('não filtra por status quando status é "all"', () => {
    const result = filterCampaigns(campaigns, { status: 'all' });
    expect(result).toHaveLength(4);
  });

  it('filtra por channel quando channel não é "all"', () => {
    const result = filterCampaigns(campaigns, { channel: 'google' });
    expect(result).toHaveLength(2);
    expect(result.every(c => c.channel === 'google')).toBe(true);
  });

  it('não filtra por channel quando channel é "all"', () => {
    const result = filterCampaigns(campaigns, { channel: 'all' });
    expect(result).toHaveLength(4);
  });

  it('filtra por search (case-insensitive) no nome', () => {
    const result = filterCampaigns(campaigns, { search: 'black' });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('1');
  });

  it('filtra por search sem diferenciar maiúsculas e minúsculas', () => {
    const result = filterCampaigns(campaigns, { search: 'RETARGETING' });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('4');
  });

  it('combina múltiplos filtros', () => {
    const result = filterCampaigns(campaigns, { status: 'active', channel: 'google' });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('2');
  });

  it('retorna array vazio quando nenhuma campanha corresponde', () => {
    const result = filterCampaigns(campaigns, { status: 'draft' });
    expect(result).toHaveLength(0);
  });

  it('retorna array vazio quando passado lista vazia', () => {
    const result = filterCampaigns([], { status: 'active' });
    expect(result).toHaveLength(0);
  });
});
