import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CampaignCard } from '@/components/campaigns/CampaignCard';

const mockCampaign = {
  id: '1',
  name: 'Black Friday 2025',
  status: 'active',
  budget: 50000,
  spent: 25000,
  channel: 'google',
  objective: 'conversao',
};

describe('CampaignCard', () => {
  it('renderiza o nome da campanha', () => {
    render(<CampaignCard campaign={mockCampaign} />);
    expect(screen.getByText('Black Friday 2025')).toBeInTheDocument();
  });

  it('renderiza o canal e objetivo', () => {
    render(<CampaignCard campaign={mockCampaign} />);
    expect(screen.getByText(/google/)).toBeInTheDocument();
    expect(screen.getByText(/conversao/)).toBeInTheDocument();
  });

  it('renderiza o status da campanha via CampaignStatus', () => {
    render(<CampaignCard campaign={mockCampaign} />);
    expect(screen.getByText('Ativo')).toBeInTheDocument();
  });

  it('renderiza os valores de gasto e budget formatados', () => {
    render(<CampaignCard campaign={mockCampaign} />);
    expect(screen.getByText(/Gasto:/)).toBeInTheDocument();
    expect(screen.getByText(/Budget:/)).toBeInTheDocument();
  });

  it('chama onClick quando o card é clicado', () => {
    const onClick = jest.fn();
    render(<CampaignCard campaign={mockCampaign} onClick={onClick} />);
    fireEvent.click(screen.getByText('Black Friday 2025'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renderiza sem onClick sem erros', () => {
    const { container } = render(<CampaignCard campaign={mockCampaign} />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
