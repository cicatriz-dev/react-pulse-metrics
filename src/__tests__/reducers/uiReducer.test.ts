import { uiReducer } from '@/redux/reducers/uiReducer';

describe('uiReducer', () => {
  describe('estado inicial', () => {
    it('retorna o estado inicial correto', () => {
      const state = uiReducer(undefined, { type: '@@INIT' });
      expect(state).toEqual({
        globalLoading: false,
        modal: { isOpen: false, type: null, data: null },
        sidebarOpen: true,
        notifications: [],
      });
    });
  });

  describe('SET_LOADING', () => {
    it('define globalLoading como true', () => {
      const state = uiReducer(undefined, { type: 'SET_LOADING', payload: true });
      expect(state.globalLoading).toBe(true);
    });

    it('define globalLoading como false', () => {
      const withLoading = { ...uiReducer(undefined, { type: '@@INIT' }), globalLoading: true };
      const state = uiReducer(withLoading, { type: 'SET_LOADING', payload: false });
      expect(state.globalLoading).toBe(false);
    });
  });

  describe('OPEN_MODAL', () => {
    it('define modal.isOpen como true com type e data do payload', () => {
      const state = uiReducer(undefined, {
        type: 'OPEN_MODAL',
        payload: { type: 'confirm', data: { message: 'Tem certeza?' } },
      });
      expect(state.modal.isOpen).toBe(true);
      expect(state.modal.type).toBe('confirm');
      expect(state.modal.data).toEqual({ message: 'Tem certeza?' });
    });
  });

  describe('CLOSE_MODAL', () => {
    it('reseta modal para isOpen false, type null, data null', () => {
      const withModal = {
        ...uiReducer(undefined, { type: '@@INIT' }),
        modal: { isOpen: true, type: 'confirm', data: {} },
      };
      const state = uiReducer(withModal, { type: 'CLOSE_MODAL' });
      expect(state.modal).toEqual({ isOpen: false, type: null, data: null });
    });
  });

  describe('SET_SIDEBAR_OPEN', () => {
    it('define sidebarOpen como false', () => {
      const state = uiReducer(undefined, { type: 'SET_SIDEBAR_OPEN', payload: false });
      expect(state.sidebarOpen).toBe(false);
    });

    it('define sidebarOpen como true', () => {
      const withClosed = { ...uiReducer(undefined, { type: '@@INIT' }), sidebarOpen: false };
      const state = uiReducer(withClosed, { type: 'SET_SIDEBAR_OPEN', payload: true });
      expect(state.sidebarOpen).toBe(true);
    });
  });

  describe('ADD_NOTIFICATION', () => {
    it('adiciona uma nova notificação ao array', () => {
      const state = uiReducer(undefined, {
        type: 'ADD_NOTIFICATION',
        payload: { message: 'Operação concluída', type: 'success' },
      });
      expect(state.notifications).toHaveLength(1);
    });

    it('a notificação contém os campos do payload', () => {
      const state = uiReducer(undefined, {
        type: 'ADD_NOTIFICATION',
        payload: { message: 'Erro!', type: 'error' },
      });
      expect(state.notifications[0].message).toBe('Erro!');
      expect(state.notifications[0].type).toBe('error');
    });

    it('a notificação possui id do tipo number (gerado por Date.now())', () => {
      const state = uiReducer(undefined, {
        type: 'ADD_NOTIFICATION',
        payload: { message: 'Teste' },
      });
      expect(typeof state.notifications[0].id).toBe('number');
    });

    it('empilha múltiplas notificações', () => {
      let state = uiReducer(undefined, { type: 'ADD_NOTIFICATION', payload: { message: 'N1' } });
      state = uiReducer(state, { type: 'ADD_NOTIFICATION', payload: { message: 'N2' } });
      expect(state.notifications).toHaveLength(2);
    });
  });

  describe('REMOVE_NOTIFICATION', () => {
    it('remove a notificação com o id correspondente', () => {
      const withNotification = {
        ...uiReducer(undefined, { type: '@@INIT' }),
        notifications: [{ id: 42, message: 'Teste', type: 'info' }],
      };
      const state = uiReducer(withNotification, { type: 'REMOVE_NOTIFICATION', payload: 42 });
      expect(state.notifications).toHaveLength(0);
    });

    it('mantém notificações com id diferente', () => {
      const withNotifications = {
        ...uiReducer(undefined, { type: '@@INIT' }),
        notifications: [
          { id: 1, message: 'N1' },
          { id: 2, message: 'N2' },
        ],
      };
      const state = uiReducer(withNotifications, { type: 'REMOVE_NOTIFICATION', payload: 1 });
      expect(state.notifications).toHaveLength(1);
      expect(state.notifications[0].id).toBe(2);
    });
  });

  describe('ação desconhecida', () => {
    it('retorna o state atual sem modificação', () => {
      const initial = uiReducer(undefined, { type: '@@INIT' });
      const state = uiReducer(initial, { type: 'ACAO_DESCONHECIDA' });
      expect(state).toBe(initial);
    });
  });
});
