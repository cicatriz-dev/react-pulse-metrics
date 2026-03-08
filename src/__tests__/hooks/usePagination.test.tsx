import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { usePagination } from '@/hooks/usePagination';

function PaginationHarness({ total, pageSize }: { total: number; pageSize?: number }) {
  const { page, totalPages, goToPage, nextPage, prevPage, pageSize: ps } = usePagination(total, pageSize);
  return (
    <div>
      <span data-testid="page">{page}</span>
      <span data-testid="totalPages">{totalPages}</span>
      <span data-testid="pageSize">{ps}</span>
      <button onClick={() => goToPage(2)} data-testid="goto2">Ir p/ 2</button>
      <button onClick={() => goToPage(0)} data-testid="goto0">Ir p/ 0</button>
      <button onClick={() => goToPage(99)} data-testid="goto99">Ir p/ 99</button>
      <button onClick={nextPage} data-testid="next">Próxima</button>
      <button onClick={prevPage} data-testid="prev">Anterior</button>
    </div>
  );
}

describe('usePagination', () => {
  it('inicializa na página 1', () => {
    render(<PaginationHarness total={25} pageSize={10} />);
    expect(screen.getByTestId('page').textContent).toBe('1');
  });

  it('calcula totalPages a partir de total e pageSize', () => {
    render(<PaginationHarness total={25} pageSize={10} />);
    expect(screen.getByTestId('totalPages').textContent).toBe('3');
  });

  it('usa pageSize padrão de 10', () => {
    render(<PaginationHarness total={100} />);
    expect(screen.getByTestId('pageSize').textContent).toBe('10');
    expect(screen.getByTestId('totalPages').textContent).toBe('10');
  });

  it('totalPages é 1 para total menor que pageSize', () => {
    render(<PaginationHarness total={5} pageSize={10} />);
    expect(screen.getByTestId('totalPages').textContent).toBe('1');
  });

  describe('goToPage', () => {
    it('navega para uma página válida', () => {
      render(<PaginationHarness total={25} pageSize={10} />);
      fireEvent.click(screen.getByTestId('goto2'));
      expect(screen.getByTestId('page').textContent).toBe('2');
    });

    it('não vai abaixo da página 1', () => {
      render(<PaginationHarness total={25} pageSize={10} />);
      fireEvent.click(screen.getByTestId('goto0'));
      expect(screen.getByTestId('page').textContent).toBe('1');
    });

    it('não vai acima de totalPages', () => {
      render(<PaginationHarness total={25} pageSize={10} />);
      fireEvent.click(screen.getByTestId('goto99'));
      expect(screen.getByTestId('page').textContent).toBe('1');
    });
  });

  describe('nextPage', () => {
    it('incrementa a página em 1', () => {
      render(<PaginationHarness total={25} pageSize={10} />);
      fireEvent.click(screen.getByTestId('goto2'));
      fireEvent.click(screen.getByTestId('next'));
      expect(screen.getByTestId('page').textContent).toBe('3');
    });

    it('não ultrapassa totalPages', () => {
      render(<PaginationHarness total={25} pageSize={10} />);
      // Vai para a última página (3)
      fireEvent.click(screen.getByTestId('goto2'));
      fireEvent.click(screen.getByTestId('next'));
      // Tenta ir além
      fireEvent.click(screen.getByTestId('next'));
      expect(screen.getByTestId('page').textContent).toBe('3');
    });
  });

  describe('prevPage', () => {
    it('decrementa a página em 1', () => {
      render(<PaginationHarness total={25} pageSize={10} />);
      fireEvent.click(screen.getByTestId('goto2'));
      fireEvent.click(screen.getByTestId('prev'));
      expect(screen.getByTestId('page').textContent).toBe('1');
    });

    it('não vai abaixo da página 1', () => {
      render(<PaginationHarness total={25} pageSize={10} />);
      fireEvent.click(screen.getByTestId('prev'));
      expect(screen.getByTestId('page').textContent).toBe('1');
    });
  });
});
