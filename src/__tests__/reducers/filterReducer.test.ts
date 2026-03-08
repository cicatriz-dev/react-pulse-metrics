import { filterReducer } from '@/redux/reducers/filterReducer';

describe('filterReducer', () => {
  describe('estado inicial', () => {
    it('retorna o estado inicial quando chamado com estado undefined', () => {
      const state = filterReducer(undefined, { type: '@@INIT' });
      expect(state).toEqual({
        status: 'all',
        dateRange: { startDate: null, endDate: null },
        channel: 'all',
        search: '',
        applied: {},
      });
    });
  });

  describe('SET_FILTER', () => {
    it('define o valor de status quando a key é "status"', () => {
      const state = filterReducer(undefined, {
        type: 'SET_FILTER',
        payload: { key: 'status', value: 'active' },
      });
      expect(state.status).toBe('active');
    });

    it('define o valor de search quando a key é "search"', () => {
      const state = filterReducer(undefined, {
        type: 'SET_FILTER',
        payload: { key: 'search', value: 'campanha teste' },
      });
      expect(state.search).toBe('campanha teste');
    });

    it('define o valor de channel', () => {
      const state = filterReducer(undefined, {
        type: 'SET_FILTER',
        payload: { key: 'channel', value: 'google' },
      });
      expect(state.channel).toBe('google');
    });

    it('não muta outros campos do estado', () => {
      const state = filterReducer(undefined, {
        type: 'SET_FILTER',
        payload: { key: 'status', value: 'active' },
      });
      expect(state.channel).toBe('all');
      expect(state.search).toBe('');
    });
  });

  describe('RESET_FILTERS', () => {
    it('retorna o estado inicial independentemente do estado atual', () => {
      const modified = { status: 'active', dateRange: { startDate: '2026-01-01', endDate: null }, channel: 'google', search: 'test', applied: { status: 'active' } };
      const state = filterReducer(modified, { type: 'RESET_FILTERS' });
      expect(state.status).toBe('all');
      expect(state.channel).toBe('all');
      expect(state.search).toBe('');
      expect(state.applied).toEqual({});
    });
  });

  describe('APPLY_FILTERS', () => {
    it('define applied como o objeto do payload', () => {
      const payload = { status: 'active', channel: 'google' };
      const state = filterReducer(undefined, { type: 'APPLY_FILTERS', payload });
      expect(state.applied).toEqual(payload);
    });

    it('não altera outros campos ao aplicar filtros', () => {
      const payload = { status: 'active' };
      const state = filterReducer(undefined, { type: 'APPLY_FILTERS', payload });
      expect(state.search).toBe('');
      expect(state.channel).toBe('all');
    });
  });

  describe('ação desconhecida', () => {
    it('retorna o state atual sem modificação', () => {
      const initial = filterReducer(undefined, { type: '@@INIT' });
      const state = filterReducer(initial, { type: 'ACAO_DESCONHECIDA' });
      expect(state).toBe(initial);
    });
  });
});
