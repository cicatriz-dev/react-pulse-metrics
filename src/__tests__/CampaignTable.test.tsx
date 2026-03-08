import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CampaignTable from '../components/CampaignTable';
import { mockCampaigns } from '../mocks/campaigns';

describe('CampaignTable', () => {
  const defaultProps = {
    campaigns: mockCampaigns.slice(0, 3),
    loading: false,
    sortField: 'name',
    sortOrder: 'asc' as const,
    selectedRows: [],
    currentPage: 1,
    totalPages: 1,
    pageSize: 10,
    totalItems: 3,
    theme: 'light',
    filters: { status: 'all', search: '', channel: 'all', dateRange: '30d' },
    onSort: jest.fn(),
    onSelectRow: jest.fn(),
    onSelectAll: jest.fn(),
    onPageChange: jest.fn(),
    onCampaignClick: jest.fn(),
    onStatusChange: jest.fn(),
  };

  it('renderiza a tabela com os dados das campanhas', () => {
    render(
      <MemoryRouter>
        <CampaignTable {...defaultProps} />
      </MemoryRouter>
    );
    expect(screen.getByText(mockCampaigns[0].name)).toBeInTheDocument();
    expect(screen.getAllByRole('row').length).toBeGreaterThan(1);
  });

  it('mostra estado de loading', () => {
    const { container } = render(
      <MemoryRouter>
        <CampaignTable {...defaultProps} loading={true} campaigns={[]} />
      </MemoryRouter>
    );
    expect(container).toBeTruthy();
  });
});
