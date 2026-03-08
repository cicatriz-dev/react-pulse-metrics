import { campaignReducer } from '@/redux/reducers/campaignReducer';

const mockCampaign = {
  id: '1',
  name: 'Campanha Teste',
  status: 'active',
  budget: 10000,
  spent: 5000,
  startDate: '2026-01-01',
  endDate: '2026-03-31',
  channel: 'google',
  objective: 'conversao',
  metrics: { impressions: 100000, clicks: 5000, conversions: 250, ctr: 5, cpc: 1, roas: 3 },
  audience: 'seg-1',
  createdBy: 'user-1',
};

const mockCampaign2 = { ...mockCampaign, id: '2', name: 'Campanha 2' };

describe('campaignReducer', () => {
  describe('estado inicial', () => {
    it('retorna o estado inicial quando chamado com estado undefined', () => {
      const state = campaignReducer(undefined, { type: '@@INIT' } as any);
      expect(state).toEqual({
        list: [],
        selected: null,
        loading: false,
        error: null,
        total: 0,
      });
    });
  });

  describe('FETCH_CAMPAIGNS_START', () => {
    it('define loading como true, limpa error e selected', () => {
      const initial = { list: [], selected: mockCampaign, loading: false, error: 'erro anterior', total: 0 };
      const state = campaignReducer(initial as any, { type: 'FETCH_CAMPAIGNS_START' });
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
      expect(state.selected).toBeNull();
    });
  });

  describe('FETCH_CAMPAIGNS_SUCCESS', () => {
    it('define list como o payload e calcula total a partir do comprimento', () => {
      const payload = [mockCampaign, mockCampaign2];
      const state = campaignReducer(undefined, { type: 'FETCH_CAMPAIGNS_SUCCESS', payload } as any);
      expect(state.list).toEqual(payload);
      expect(state.total).toBe(2);
    });

    it('define loading como false', () => {
      const state = campaignReducer(undefined, { type: 'FETCH_CAMPAIGNS_SUCCESS', payload: [] } as any);
      expect(state.loading).toBe(false);
    });

    it('limpa error após sucesso', () => {
      const initial = { list: [], selected: null, loading: true, error: 'erro', total: 0 };
      const state = campaignReducer(initial as any, { type: 'FETCH_CAMPAIGNS_SUCCESS', payload: [] } as any);
      expect(state.error).toBeNull();
    });
  });

  describe('FETCH_CAMPAIGNS_ERROR', () => {
    it('define error com o payload e loading como false', () => {
      const state = campaignReducer(undefined, { type: 'FETCH_CAMPAIGNS_ERROR', payload: 'Erro de rede' } as any);
      expect(state.error).toBe('Erro de rede');
      expect(state.loading).toBe(false);
    });
  });

  describe('SET_CAMPAIGN', () => {
    it('define selected como o payload', () => {
      const state = campaignReducer(undefined, { type: 'SET_CAMPAIGN', payload: mockCampaign } as any);
      expect(state.selected).toEqual(mockCampaign);
      expect(state.loading).toBe(false);
    });
  });

  describe('UPDATE_CAMPAIGN', () => {
    const initialWithList = {
      list: [mockCampaign, mockCampaign2],
      selected: mockCampaign,
      loading: false,
      error: null,
      total: 2,
    };

    it('atualiza a campanha correspondente na lista pelo id', () => {
      const updated = { ...mockCampaign, name: 'Nome Atualizado' };
      const state = campaignReducer(initialWithList as any, { type: 'UPDATE_CAMPAIGN', payload: updated } as any);
      expect(state.list[0].name).toBe('Nome Atualizado');
      expect(state.list[1]).toEqual(mockCampaign2);
    });

    it('atualiza selected quando o id bate', () => {
      const updated = { ...mockCampaign, name: 'Nome Atualizado' };
      const state = campaignReducer(initialWithList as any, { type: 'UPDATE_CAMPAIGN', payload: updated } as any);
      expect(state.selected?.name).toBe('Nome Atualizado');
    });

    it('não altera selected quando o id não bate', () => {
      const initialWithOtherSelected = { ...initialWithList, selected: mockCampaign2 };
      const updated = { ...mockCampaign, name: 'Nome Atualizado' };
      const state = campaignReducer(initialWithOtherSelected as any, { type: 'UPDATE_CAMPAIGN', payload: updated } as any);
      expect(state.selected).toEqual(mockCampaign2);
    });
  });

  describe('DELETE_CAMPAIGN', () => {
    it('remove a campanha com o id correspondente da lista', () => {
      const initial = { list: [mockCampaign, mockCampaign2], selected: null, loading: false, error: null, total: 2 };
      const state = campaignReducer(initial as any, { type: 'DELETE_CAMPAIGN', payload: '1' } as any);
      expect(state.list).toHaveLength(1);
      expect(state.list[0].id).toBe('2');
    });

    it('decrementa total em 1', () => {
      const initial = { list: [mockCampaign, mockCampaign2], selected: null, loading: false, error: null, total: 2 };
      const state = campaignReducer(initial as any, { type: 'DELETE_CAMPAIGN', payload: '1' } as any);
      expect(state.total).toBe(1);
    });
  });

  describe('CREATE_CAMPAIGN', () => {
    it('adiciona nova campanha ao final da lista', () => {
      const initial = { list: [mockCampaign], selected: null, loading: false, error: null, total: 1 };
      const state = campaignReducer(initial as any, { type: 'CREATE_CAMPAIGN', payload: mockCampaign2 } as any);
      expect(state.list).toHaveLength(2);
      expect(state.list[state.list.length - 1]).toEqual(mockCampaign2);
    });

    it('incrementa total em 1', () => {
      const initial = { list: [mockCampaign], selected: null, loading: false, error: null, total: 1 };
      const state = campaignReducer(initial as any, { type: 'CREATE_CAMPAIGN', payload: mockCampaign2 } as any);
      expect(state.total).toBe(2);
    });
  });

  describe('CLEAR_CAMPAIGNS', () => {
    it('volta ao estado inicial', () => {
      const nonInitial = { list: [mockCampaign], selected: mockCampaign, loading: true, error: 'erro', total: 1 };
      const state = campaignReducer(nonInitial as any, { type: 'CLEAR_CAMPAIGNS' } as any);
      expect(state.list).toEqual([]);
      expect(state.selected).toBeNull();
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
      expect(state.total).toBe(0);
    });
  });

  describe('ação desconhecida', () => {
    it('retorna o state atual sem modificação', () => {
      const initial = { list: [mockCampaign], selected: null, loading: false, error: null, total: 1 };
      const state = campaignReducer(initial as any, { type: 'ACAO_DESCONHECIDA' } as any);
      expect(state).toBe(initial);
    });
  });
});
