import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../components/common/Button';

describe('Button', () => {
  it('renderiza o texto dos filhos', () => {
    render(<Button>Clique aqui</Button>);
    expect(screen.getByRole('button', { name: /clique aqui/i })).toBeInTheDocument();
  });

  it('não está desabilitado por padrão', () => {
    render(<Button>Ação</Button>);
    expect(screen.getByRole('button')).not.toBeDisabled();
  });

  it('está desabilitado quando disabled prop é true', () => {
    render(<Button disabled>Desabilitado</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('está desabilitado quando loading prop é true', () => {
    render(<Button loading>Carregando</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('exibe o ícone "refresh" quando loading é true', () => {
    render(<Button loading>Carregando</Button>);
    expect(screen.getByText('refresh')).toBeInTheDocument();
  });

  it('não exibe ícone de loading por padrão', () => {
    render(<Button>Normal</Button>);
    expect(screen.queryByText('refresh')).not.toBeInTheDocument();
  });

  it('chama onClick quando clicado', () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Clique</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('não chama onClick quando está desabilitado', () => {
    const onClick = jest.fn();
    render(<Button disabled onClick={onClick}>Desabilitado</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });
});
