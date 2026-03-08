import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination } from '@/components/common/Pagination';

describe('Pagination', () => {
  const onPageChange = jest.fn();

  beforeEach(() => {
    onPageChange.mockClear();
  });

  it('renderiza botões de números de página', () => {
    render(<Pagination page={1} totalPages={5} onPageChange={onPageChange} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('botão anterior está desabilitado na primeira página', () => {
    render(<Pagination page={1} totalPages={5} onPageChange={onPageChange} />);
    const buttons = screen.getAllByRole('button');
    // primeiro botão é o anterior (‹)
    expect(buttons[0]).toBeDisabled();
  });

  it('botão próximo está desabilitado na última página', () => {
    render(<Pagination page={5} totalPages={5} onPageChange={onPageChange} />);
    const buttons = screen.getAllByRole('button');
    // último botão é o próximo (›)
    expect(buttons[buttons.length - 1]).toBeDisabled();
  });

  it('botão anterior está habilitado quando não está na primeira página', () => {
    render(<Pagination page={3} totalPages={5} onPageChange={onPageChange} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons[0]).not.toBeDisabled();
  });

  it('botão próximo está habilitado quando não está na última página', () => {
    render(<Pagination page={3} totalPages={5} onPageChange={onPageChange} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons[buttons.length - 1]).not.toBeDisabled();
  });

  it('chama onPageChange com page - 1 ao clicar em anterior', () => {
    render(<Pagination page={3} totalPages={5} onPageChange={onPageChange} />);
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[0]);
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('chama onPageChange com page + 1 ao clicar em próximo', () => {
    render(<Pagination page={3} totalPages={5} onPageChange={onPageChange} />);
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[buttons.length - 1]);
    expect(onPageChange).toHaveBeenCalledWith(4);
  });

  it('chama onPageChange com o número correto ao clicar em um botão de página', () => {
    render(<Pagination page={1} totalPages={5} onPageChange={onPageChange} />);
    fireEvent.click(screen.getByText('3'));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });
});
