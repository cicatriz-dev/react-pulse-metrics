import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { filterReducer } from '@/redux/reducers/filterReducer';
import { useFilters } from '@/hooks/useFilters';

const createTestStore = () =>
  createStore(combineReducers({ filters: filterReducer }));

function FiltersHarness({ initial }: { initial?: any }) {
  const { filters, updateFilter, reset } = useFilters(initial);
  return (
    <div>
      <span data-testid="status">{filters.status ?? ''}</span>
      <span data-testid="search">{filters.search ?? ''}</span>
      <span data-testid="filterCount">{Object.keys(filters).length}</span>
      <button
        onClick={() => updateFilter('status', 'active')}
        data-testid="updateStatus"
      >
        Atualizar Status
      </button>
      <button
        onClick={() => updateFilter('search', 'campanha')}
        data-testid="updateSearch"
      >
        Atualizar Search
      </button>
      <button onClick={reset} data-testid="reset">
        Resetar
      </button>
    </div>
  );
}

function renderWithStore(ui: React.ReactElement, store = createTestStore()) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store,
  };
}

describe('useFilters', () => {
  it('inicializa com objeto vazio quando nenhum valor inicial é fornecido', () => {
    renderWithStore(<FiltersHarness />);
    expect(screen.getByTestId('filterCount').textContent).toBe('0');
  });

  it('inicializa com o valor passado como initial', () => {
    renderWithStore(<FiltersHarness initial={{ status: 'active' }} />);
    expect(screen.getByTestId('status').textContent).toBe('active');
  });

  describe('updateFilter', () => {
    it('atualiza o estado local do filtro', () => {
      renderWithStore(<FiltersHarness />);
      fireEvent.click(screen.getByTestId('updateStatus'));
      expect(screen.getByTestId('status').textContent).toBe('active');
    });

    it('atualiza o campo search no estado local', () => {
      renderWithStore(<FiltersHarness />);
      fireEvent.click(screen.getByTestId('updateSearch'));
      expect(screen.getByTestId('search').textContent).toBe('campanha');
    });

    it('faz dispatch para o Redux store', () => {
      const store = createTestStore();
      render(
        <Provider store={store}>
          <FiltersHarness />
        </Provider>
      );
      fireEvent.click(screen.getByTestId('updateStatus'));
      expect(store.getState().filters.status).toBe('active');
    });
  });

  describe('reset', () => {
    it('reseta o estado local dos filtros para objeto vazio', () => {
      renderWithStore(<FiltersHarness initial={{ status: 'active' }} />);
      expect(screen.getByTestId('status').textContent).toBe('active');
      fireEvent.click(screen.getByTestId('reset'));
      expect(screen.getByTestId('status').textContent).toBe('');
      expect(screen.getByTestId('filterCount').textContent).toBe('0');
    });

    it('faz dispatch de resetFilters para o Redux store', () => {
      const store = createTestStore();
      render(
        <Provider store={store}>
          <FiltersHarness />
        </Provider>
      );
      // Primeiro atualiza um filtro
      fireEvent.click(screen.getByTestId('updateStatus'));
      expect(store.getState().filters.status).toBe('active');
      // Então reseta
      fireEvent.click(screen.getByTestId('reset'));
      expect(store.getState().filters.status).toBe('all');
      expect(store.getState().filters.search).toBe('');
    });
  });
});
