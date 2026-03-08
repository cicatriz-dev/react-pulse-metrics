import React from 'react';
import { render, screen } from '@testing-library/react';
import { ProgressBar } from '@/components/common/ProgressBar';

describe('ProgressBar', () => {
  it('renderiza sem erros', () => {
    const { container } = render(<ProgressBar value={50} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('exibe o label de percentual quando showLabel é true', () => {
    render(<ProgressBar value={75} max={100} showLabel />);
    expect(screen.getByText('75%')).toBeInTheDocument();
  });

  it('não exibe o label quando showLabel é false (padrão)', () => {
    render(<ProgressBar value={75} max={100} />);
    expect(screen.queryByText('75%')).not.toBeInTheDocument();
  });

  it('limita o percentual a 100% quando value excede max', () => {
    render(<ProgressBar value={150} max={100} showLabel />);
    expect(screen.getByText('100%')).toBeInTheDocument();
  });

  it('calcula corretamente o percentual com max personalizado', () => {
    render(<ProgressBar value={3000} max={10000} showLabel />);
    expect(screen.getByText('30%')).toBeInTheDocument();
  });

  it('usa max=100 por padrão', () => {
    render(<ProgressBar value={50} showLabel />);
    expect(screen.getByText('50%')).toBeInTheDocument();
  });
});
