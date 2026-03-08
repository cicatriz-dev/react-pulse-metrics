import { setFilter, resetFilters, applyFilters } from '@/redux/actions/filterActions';

describe('filterActions', () => {
  describe('setFilter', () => {
    it('retorna action com type SET_FILTER, key e value no payload', () => {
      const action = setFilter('status', 'active');
      expect(action.type).toBe('SET_FILTER');
      expect(action.payload).toEqual({ key: 'status', value: 'active' });
    });

    it('funciona com diferentes tipos de value', () => {
      const action = setFilter('dateRange', { startDate: '2026-01-01', endDate: '2026-03-31' });
      expect(action.payload.key).toBe('dateRange');
      expect(action.payload.value).toEqual({ startDate: '2026-01-01', endDate: '2026-03-31' });
    });
  });

  describe('resetFilters', () => {
    it('retorna action com type RESET_FILTERS sem payload', () => {
      const action = resetFilters();
      expect(action.type).toBe('RESET_FILTERS');
      expect(action).not.toHaveProperty('payload');
    });
  });

  describe('applyFilters', () => {
    it('retorna action com type APPLY_FILTERS e filters no payload', () => {
      const filters = { status: 'active', channel: 'google' };
      const action = applyFilters(filters);
      expect(action.type).toBe('APPLY_FILTERS');
      expect(action.payload).toEqual(filters);
    });
  });
});
