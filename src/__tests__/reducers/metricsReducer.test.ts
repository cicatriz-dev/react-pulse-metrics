import { metricsReducer } from '@/redux/reducers/metricsReducer';

const mockOverview = { totalImpressions: 500000, totalClicks: 25000, roas: 3.2 };
const mockDateRange = { startDate: '2026-01-01', endDate: '2026-03-31' };

describe('metricsReducer', () => {
  describe('estado inicial', () => {
    it('retorna o estado inicial quando chamado com estado undefined', () => {
      const state = metricsReducer(undefined, { type: '@@INIT' });
      expect(state).toEqual({
        overview: null,
        timeSeries: null,
        byChannel: [],
        funnel: null,
        loading: false,
        error: null,
        dateRange: { startDate: null, endDate: null },
      });
    });
  });

  describe('METRICS_LOADING', () => {
    it('define loading como true e limpa error', () => {
      const withError = { ...metricsReducer(undefined, { type: '@@INIT' }), error: 'erro anterior' };
      const state = metricsReducer(withError, { type: 'METRICS_LOADING' });
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });
  });

  describe('METRICS_SUCCESS', () => {
    it('espalha o payload no estado e define loading como false', () => {
      const payload = { overview: mockOverview, byChannel: [] };
      const state = metricsReducer(undefined, { type: 'METRICS_SUCCESS', payload });
      expect(state.overview).toEqual(mockOverview);
      expect(state.loading).toBe(false);
    });

    it('não sobrescreve campos não presentes no payload', () => {
      const withDateRange = { ...metricsReducer(undefined, { type: '@@INIT' }), dateRange: mockDateRange };
      const state = metricsReducer(withDateRange, { type: 'METRICS_SUCCESS', payload: { overview: mockOverview } });
      expect(state.dateRange).toEqual(mockDateRange);
    });
  });

  describe('METRICS_FAILURE', () => {
    it('define error como o payload e loading como false', () => {
      const state = metricsReducer(undefined, { type: 'METRICS_FAILURE', payload: 'Timeout de rede' });
      expect(state.error).toBe('Timeout de rede');
      expect(state.loading).toBe(false);
    });
  });

  describe('SET_DATE_RANGE', () => {
    it('define dateRange com o payload', () => {
      const state = metricsReducer(undefined, { type: 'SET_DATE_RANGE', payload: mockDateRange });
      expect(state.dateRange).toEqual(mockDateRange);
    });

    it('não altera outros campos do estado', () => {
      const withOverview = { ...metricsReducer(undefined, { type: '@@INIT' }), overview: mockOverview };
      const state = metricsReducer(withOverview, { type: 'SET_DATE_RANGE', payload: mockDateRange });
      expect(state.overview).toEqual(mockOverview);
    });
  });

  describe('METRICS_RESET', () => {
    it('volta ao estado inicial', () => {
      const modified = {
        overview: mockOverview,
        timeSeries: { data: [] },
        byChannel: [{ channel: 'google' }],
        funnel: {},
        loading: true,
        error: 'erro',
        dateRange: mockDateRange,
      };
      const state = metricsReducer(modified, { type: 'METRICS_RESET' });
      expect(state.overview).toBeNull();
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
      expect(state.dateRange).toEqual({ startDate: null, endDate: null });
    });
  });

  describe('ação desconhecida', () => {
    it('retorna o state atual sem modificação', () => {
      const initial = metricsReducer(undefined, { type: '@@INIT' });
      const state = metricsReducer(initial, { type: 'ACAO_DESCONHECIDA' });
      expect(state).toBe(initial);
    });
  });
});
