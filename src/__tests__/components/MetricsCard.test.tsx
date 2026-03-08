import React from 'react';
import { render, screen } from '@testing-library/react';
import { MetricsCard } from '@/components/dashboard/MetricsCard';

describe('MetricsCard', () => {
  it('renderiza o título', () => {
    render(<MetricsCard title="Cliques" value={1000} />);
    expect(screen.getByText('Cliques')).toBeInTheDocument();
  });

  it('renderiza valor numérico formatado (1500 → "1.5K")', () => {
    render(<MetricsCard title="Impressões" value={1500} />);
    expect(screen.getByText('1.5K')).toBeInTheDocument();
  });

  it('renderiza valores acima de 1M formatados com "M"', () => {
    render(<MetricsCard title="Total" value={2500000} />);
    expect(screen.getByText('2.5M')).toBeInTheDocument();
  });

  it('renderiza valores abaixo de 1000 sem formatação especial', () => {
    render(<MetricsCard title="Conversões" value={999} />);
    expect(screen.getByText('999')).toBeInTheDocument();
  });

  it('renderiza string de value diretamente sem formatação', () => {
    render(<MetricsCard title="ROAS" value="R$ 3,80" />);
    expect(screen.getByText('R$ 3,80')).toBeInTheDocument();
  });

  it('renderiza suffix junto ao valor', () => {
    render(<MetricsCard title="CTR" value={3} suffix="%" />);
    expect(screen.getByText(/3%/)).toBeInTheDocument();
  });

  it('renderiza prefix junto ao valor', () => {
    render(<MetricsCard title="Custo" value={500} prefix="R$" />);
    expect(screen.getByText(/R\$500/)).toBeInTheDocument();
  });

  it('não renderiza indicador de tendência quando change é 0 (padrão)', () => {
    render(<MetricsCard title="Cliques" value={1000} />);
    expect(screen.queryByText(/vs mês anterior/)).not.toBeInTheDocument();
  });

  it('renderiza indicador positivo (↑) quando change > 0', () => {
    render(<MetricsCard title="Cliques" value={1000} change={5.2} />);
    expect(screen.getByText(/↑/)).toBeInTheDocument();
    expect(screen.getByText(/vs mês anterior/)).toBeInTheDocument();
  });

  it('renderiza indicador negativo (↓) quando change < 0', () => {
    render(<MetricsCard title="Cliques" value={1000} change={-3.7} />);
    expect(screen.getByText(/↓/)).toBeInTheDocument();
    expect(screen.getByText(/vs mês anterior/)).toBeInTheDocument();
  });

  it('renderiza SVG do sparkline quando trend array é fornecido', () => {
    const { container } = render(<MetricsCard title="Tendência" value={100} trend={[10, 20, 15, 30]} />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('não renderiza SVG quando trend array está vazio (padrão)', () => {
    const { container } = render(<MetricsCard title="Sem trend" value={100} />);
    expect(container.querySelector('svg')).not.toBeInTheDocument();
  });
});
