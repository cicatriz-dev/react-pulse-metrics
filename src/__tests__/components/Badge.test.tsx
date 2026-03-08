import React from 'react';
import { render, screen } from '@testing-library/react';
import { Badge } from '@/components/common/Badge';

describe('Badge', () => {
  it('renderiza o texto dos filhos', () => {
    render(<Badge>Ativo</Badge>);
    expect(screen.getByText('Ativo')).toBeInTheDocument();
  });

  it('usa variant "default" quando nenhuma é fornecida', () => {
    const { container } = render(<Badge>Default</Badge>);
    const span = container.querySelector('span');
    expect(span).toBeInTheDocument();
    expect(span?.textContent).toBe('Default');
  });

  it('renderiza com variant success', () => {
    render(<Badge variant="success">Sucesso</Badge>);
    expect(screen.getByText('Sucesso')).toBeInTheDocument();
  });

  it('renderiza com variant warning', () => {
    render(<Badge variant="warning">Atenção</Badge>);
    expect(screen.getByText('Atenção')).toBeInTheDocument();
  });

  it('renderiza com variant error', () => {
    render(<Badge variant="error">Erro</Badge>);
    expect(screen.getByText('Erro')).toBeInTheDocument();
  });

  it('renderiza com variant info', () => {
    render(<Badge variant="info">Info</Badge>);
    expect(screen.getByText('Info')).toBeInTheDocument();
  });
});
