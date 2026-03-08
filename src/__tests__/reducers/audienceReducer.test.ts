import { audienceReducer } from '@/redux/reducers/audienceReducer';

const mockAudience = { id: 'aud-1', name: 'Segmento Premium', size: 50000 };
const mockAudience2 = { id: 'aud-2', name: 'Retargeting', size: 12000 };

describe('audienceReducer', () => {
  describe('estado inicial', () => {
    it('retorna o estado inicial quando chamado com estado undefined', () => {
      const state = audienceReducer(undefined, { type: '@@INIT' });
      expect(state).toEqual({ list: [], selected: null, loading: false, error: null });
    });
  });

  describe('LOAD_AUDIENCES', () => {
    it('define loading como true', () => {
      const state = audienceReducer(undefined, { type: 'LOAD_AUDIENCES' });
      expect(state.loading).toBe(true);
    });

    it('não altera list ao iniciar carregamento', () => {
      const initial = { list: [mockAudience], selected: null, loading: false, error: null };
      const state = audienceReducer(initial, { type: 'LOAD_AUDIENCES' });
      expect(state.list).toEqual([mockAudience]);
    });
  });

  describe('AUDIENCE_LOADED', () => {
    it('define list como o payload e loading como false', () => {
      const state = audienceReducer(undefined, { type: 'AUDIENCE_LOADED', payload: [mockAudience, mockAudience2] });
      expect(state.list).toEqual([mockAudience, mockAudience2]);
      expect(state.loading).toBe(false);
    });

    it('substitui a lista anterior', () => {
      const initial = { list: [mockAudience], selected: null, loading: true, error: null };
      const state = audienceReducer(initial, { type: 'AUDIENCE_LOADED', payload: [mockAudience2] });
      expect(state.list).toHaveLength(1);
      expect(state.list[0].id).toBe('aud-2');
    });
  });

  describe('AUDIENCE_ERROR', () => {
    it('define error como o payload e loading como false', () => {
      const state = audienceReducer(undefined, { type: 'AUDIENCE_ERROR', payload: 'Falha ao carregar' });
      expect(state.error).toBe('Falha ao carregar');
      expect(state.loading).toBe(false);
    });
  });

  describe('SELECT_AUDIENCE', () => {
    it('define selected como o payload', () => {
      const state = audienceReducer(undefined, { type: 'SELECT_AUDIENCE', payload: mockAudience });
      expect(state.selected).toEqual(mockAudience);
    });

    it('permite deselecionar definindo selected como null', () => {
      const withSelected = { list: [], selected: mockAudience, loading: false, error: null };
      const state = audienceReducer(withSelected, { type: 'SELECT_AUDIENCE', payload: null });
      expect(state.selected).toBeNull();
    });
  });

  describe('ação desconhecida', () => {
    it('retorna o state atual sem modificação', () => {
      const initial = audienceReducer(undefined, { type: '@@INIT' });
      const state = audienceReducer(initial, { type: 'ACAO_DESCONHECIDA' });
      expect(state).toBe(initial);
    });
  });
});
