import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from '@/components/common/Input';

describe('Input', () => {
  it('renderiza um elemento input', () => {
    render(<Input />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renderiza o label quando a prop label é fornecida', () => {
    render(<Input label="Email" />);
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('não renderiza label quando a prop label não é fornecida', () => {
    const { container } = render(<Input />);
    expect(container.querySelector('label')).toBeNull();
  });

  it('renderiza o asterisco de obrigatório quando required é true e há label', () => {
    render(<Input label="Nome" required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('não renderiza asterisco quando required não é definido', () => {
    render(<Input label="Nome" />);
    expect(screen.queryByText('*')).not.toBeInTheDocument();
  });

  it('renderiza a mensagem de erro quando a prop error é fornecida', () => {
    render(<Input error="Campo obrigatório" />);
    expect(screen.getByText('Campo obrigatório')).toBeInTheDocument();
  });

  it('não renderiza mensagem de erro quando error não é fornecida', () => {
    render(<Input />);
    expect(screen.queryByText('Campo obrigatório')).not.toBeInTheDocument();
  });

  it('passa o value para o input subjacente', () => {
    render(<Input value="valor teste" onChange={jest.fn()} />);
    expect(screen.getByRole('textbox')).toHaveValue('valor teste');
  });

  it('chama onChange quando o input é modificado', () => {
    const onChange = jest.fn();
    render(<Input onChange={onChange} />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'novo valor' } });
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
