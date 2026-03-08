import { loginUser, logoutUser, setUserData, updateUserPreferences } from '@/redux/actions/userActions';

const mockUser = { id: 'u1', name: 'Maria', email: 'maria@exemplo.com' };

describe('userActions', () => {
  describe('loginUser', () => {
    it('retorna action com type LOGIN_USER e payload do usuário', () => {
      const action = loginUser(mockUser);
      expect(action.type).toBe('LOGIN_USER');
      expect(action.payload).toEqual(mockUser);
    });
  });

  describe('logoutUser', () => {
    it('retorna action com type LOGOUT_USER sem payload', () => {
      const action = logoutUser();
      expect(action.type).toBe('LOGOUT_USER');
      expect(action).not.toHaveProperty('payload');
    });
  });

  describe('setUserData', () => {
    it('retorna action com type SET_USER_DATA e data no payload', () => {
      const data = { email: 'novo@exemplo.com' };
      const action = setUserData(data);
      expect(action.type).toBe('SET_USER_DATA');
      expect(action.payload).toEqual(data);
    });
  });

  describe('updateUserPreferences', () => {
    it('retorna action com type UPDATE_USER_PREFERENCES e prefs no payload', () => {
      const prefs = { theme: 'dark', notifications: false };
      const action = updateUserPreferences(prefs);
      expect(action.type).toBe('UPDATE_USER_PREFERENCES');
      expect(action.payload).toEqual(prefs);
    });
  });
});
