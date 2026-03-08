import { userReducer } from '@/redux/reducers/userReducer';

const mockUser = { id: 'user-1', name: 'Maria', email: 'maria@exemplo.com', role: 'admin' };

describe('userReducer', () => {
  describe('estado inicial', () => {
    it('retorna o estado inicial correto', () => {
      const state = userReducer(undefined, { type: '@@INIT' });
      expect(state).toEqual({
        currentUser: null,
        isAuthenticated: false,
        preferences: {
          theme: 'light',
          language: 'pt-BR',
          notifications: true,
        },
      });
    });
  });

  describe('LOGIN_USER', () => {
    it('define currentUser como o payload e isAuthenticated como true', () => {
      const state = userReducer(undefined, { type: 'LOGIN_USER', payload: mockUser });
      expect(state.currentUser).toEqual(mockUser);
      expect(state.isAuthenticated).toBe(true);
    });

    it('preserva preferences ao fazer login', () => {
      const state = userReducer(undefined, { type: 'LOGIN_USER', payload: mockUser });
      expect(state.preferences.theme).toBe('light');
      expect(state.preferences.language).toBe('pt-BR');
    });
  });

  describe('LOGOUT_USER', () => {
    it('volta ao estado inicial', () => {
      const loggedIn = userReducer(undefined, { type: 'LOGIN_USER', payload: mockUser });
      const state = userReducer(loggedIn, { type: 'LOGOUT_USER' });
      expect(state.currentUser).toBeNull();
      expect(state.isAuthenticated).toBe(false);
    });

    it('define isAuthenticated como false mesmo se estava true', () => {
      const loggedIn = { currentUser: mockUser, isAuthenticated: true, preferences: { theme: 'dark', language: 'pt-BR', notifications: false } };
      const state = userReducer(loggedIn as any, { type: 'LOGOUT_USER' });
      expect(state.isAuthenticated).toBe(false);
    });
  });

  describe('SET_USER_DATA', () => {
    it('faz merge do payload em currentUser', () => {
      const withUser = userReducer(undefined, { type: 'LOGIN_USER', payload: { id: 'u1', name: 'Alice' } });
      const state = userReducer(withUser, { type: 'SET_USER_DATA', payload: { email: 'alice@exemplo.com' } });
      expect(state.currentUser.name).toBe('Alice');
      expect(state.currentUser.email).toBe('alice@exemplo.com');
    });

    it('não sobrescreve campos não relacionados de currentUser', () => {
      const withUser = userReducer(undefined, { type: 'LOGIN_USER', payload: { id: 'u1', name: 'Alice', role: 'admin' } });
      const state = userReducer(withUser, { type: 'SET_USER_DATA', payload: { email: 'alice@exemplo.com' } });
      expect(state.currentUser.role).toBe('admin');
    });
  });

  describe('UPDATE_USER_PREFERENCES', () => {
    it('faz merge do payload em preferences', () => {
      const state = userReducer(undefined, { type: 'UPDATE_USER_PREFERENCES', payload: { theme: 'dark' } });
      expect(state.preferences.theme).toBe('dark');
    });

    it('preserva campos de preferences não alterados', () => {
      const state = userReducer(undefined, { type: 'UPDATE_USER_PREFERENCES', payload: { theme: 'dark' } });
      expect(state.preferences.language).toBe('pt-BR');
      expect(state.preferences.notifications).toBe(true);
    });

    it('permite alterar múltiplas preferências de uma vez', () => {
      const state = userReducer(undefined, {
        type: 'UPDATE_USER_PREFERENCES',
        payload: { theme: 'dark', notifications: false },
      });
      expect(state.preferences.theme).toBe('dark');
      expect(state.preferences.notifications).toBe(false);
    });
  });

  describe('ação desconhecida', () => {
    it('retorna o state atual sem modificação', () => {
      const initial = userReducer(undefined, { type: '@@INIT' });
      const state = userReducer(initial, { type: 'ACAO_DESCONHECIDA' });
      expect(state).toBe(initial);
    });
  });
});
