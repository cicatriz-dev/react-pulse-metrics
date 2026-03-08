import { reportReducer } from '@/redux/reducers/reportReducer';

const mockReport = { id: 'rep-1', name: 'Relatório Mensal', type: 'summary' };
const mockReport2 = { id: 'rep-2', name: 'Relatório Semanal', type: 'detail' };

describe('reportReducer', () => {
  describe('estado inicial', () => {
    it('retorna o estado inicial quando chamado com estado undefined', () => {
      const state = reportReducer(undefined, { type: '@@INIT' });
      expect(state).toEqual({ list: [], selected: null, loading: false, error: null });
    });
  });

  describe('FETCH_REPORTS_REQUEST', () => {
    it('define loading como true', () => {
      const state = reportReducer(undefined, { type: 'FETCH_REPORTS_REQUEST' });
      expect(state.loading).toBe(true);
    });
  });

  describe('FETCH_REPORTS_SUCCESS', () => {
    it('define list como o payload e loading como false', () => {
      const state = reportReducer(undefined, { type: 'FETCH_REPORTS_SUCCESS', payload: [mockReport, mockReport2] });
      expect(state.list).toEqual([mockReport, mockReport2]);
      expect(state.loading).toBe(false);
    });
  });

  describe('FETCH_REPORTS_FAILED', () => {
    it('define error como o payload e loading como false', () => {
      const state = reportReducer(undefined, { type: 'FETCH_REPORTS_FAILED', payload: 'Erro ao buscar relatórios' });
      expect(state.error).toBe('Erro ao buscar relatórios');
      expect(state.loading).toBe(false);
    });
  });

  describe('SELECT_REPORT', () => {
    it('define selected como o payload', () => {
      const state = reportReducer(undefined, { type: 'SELECT_REPORT', payload: mockReport });
      expect(state.selected).toEqual(mockReport);
    });
  });

  describe('DELETE_REPORT', () => {
    it('remove o relatório com o id correspondente da lista', () => {
      const initial = { list: [mockReport, mockReport2], selected: null, loading: false, error: null };
      const state = reportReducer(initial, { type: 'DELETE_REPORT', payload: 'rep-1' });
      expect(state.list).toHaveLength(1);
      expect(state.list[0].id).toBe('rep-2');
    });

    it('mantém relatórios com id diferente do payload', () => {
      const initial = { list: [mockReport, mockReport2], selected: null, loading: false, error: null };
      const state = reportReducer(initial, { type: 'DELETE_REPORT', payload: 'rep-99' });
      expect(state.list).toHaveLength(2);
    });
  });

  describe('ação desconhecida', () => {
    it('retorna o state atual sem modificação', () => {
      const initial = reportReducer(undefined, { type: '@@INIT' });
      const state = reportReducer(initial, { type: 'ACAO_DESCONHECIDA' });
      expect(state).toBe(initial);
    });
  });
});
