import React from 'react';
import { DateRangePicker } from '../common/DateRangePicker';

interface DashboardHeaderProps {
  dateRange: any;
  onDateRangeChange: (range: any) => void;
  title?: string;
}

export function DashboardHeader({ dateRange, onDateRangeChange, title = 'Dashboard' }: DashboardHeaderProps) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        <p className="text-sm text-gray-500 mt-1">Visão geral de performance de campanhas</p>
      </div>
      <DateRangePicker
        startDate={dateRange?.startDate}
        endDate={dateRange?.endDate}
        onChange={onDateRangeChange}
      />
    </div>
  );
}
