import React from 'react';
import { render, screen } from '@testing-library/react';
import { CampaignStatus } from '@/components/campaigns/CampaignStatus';

describe('CampaignStatus', () => {
  it('renderiza "Ativo" para status "active"', () => {
    render(<CampaignStatus status="active" />);
    expect(screen.getByText('Ativo')).toBeInTheDocument();
  });

  it('renderiza "Pausado" para status "paused"', () => {
    render(<CampaignStatus status="paused" />);
    expect(screen.getByText('Pausado')).toBeInTheDocument();
  });

  it('renderiza "Encerrado" para status "ended"', () => {
    render(<CampaignStatus status="ended" />);
    expect(screen.getByText('Encerrado')).toBeInTheDocument();
  });

  it('renderiza "Rascunho" para status "draft"', () => {
    render(<CampaignStatus status="draft" />);
    expect(screen.getByText('Rascunho')).toBeInTheDocument();
  });

  it('renderiza "Erro" para status "error"', () => {
    render(<CampaignStatus status="error" />);
    expect(screen.getByText('Erro')).toBeInTheDocument();
  });

  it('renderiza o próprio string como fallback para status desconhecido', () => {
    render(<CampaignStatus status="status-desconhecido" />);
    expect(screen.getByText('status-desconhecido')).toBeInTheDocument();
  });
});
