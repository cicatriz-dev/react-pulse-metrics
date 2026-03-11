import React from 'react';
import { Select } from '../common/Select';

// Mix proposital: usa CSS Module + inline styles
interface DashboardFiltersProps {
  statusFilter: string;
  channelFilter: string;
  onStatusChange: (v: string) => void;
  onChannelChange: (v: string) => void;
}

export function DashboardFilters({ statusFilter, channelFilter, onStatusChange, onChannelChange }: DashboardFiltersProps) {
  return (
    <div className="flex gap-3 items-center p-4 bg-white rounded-lg" style={{ marginBottom: 16, boxShadow: '0 2px 4px rgba(0,0,0,0.08)' }}>
      <span className="text-sm font-semibold text-gray-700">Filtrar por:</span>
      <Select
        label="Status"
        value={statusFilter}
        onChange={onStatusChange}
        options={[
          { value: 'all', label: 'Todos' },
          { value: 'active', label: 'Ativo' },
          { value: 'paused', label: 'Pausado' },
          { value: 'ended', label: 'Encerrado' },
        ]}
      />
      <Select
        label="Canal"
        value={channelFilter}
        onChange={onChannelChange}
        options={[
          { value: 'all', label: 'Todos os canais' },
          { value: 'google', label: 'Google' },
          { value: 'meta', label: 'Meta' },
          { value: 'email', label: 'Email' },
        ]}
      />
    </div>
  );
}
