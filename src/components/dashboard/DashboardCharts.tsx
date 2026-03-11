import React from 'react';
import { LineChart } from '../Chart/LineChart';
import { PieChart } from '../Chart/PieChart';

interface ChannelData {
	channel: string;
	clicks: number;
}

interface TimeSeriesPoint {
	date: string;
	value: number;
}

interface Props {
	timeSeriesData: TimeSeriesPoint[];
	byChannelData: ChannelData[];
}

const CHANNEL_COLORS = ['#6c63ff', '#10b981', '#f59e0b', '#3b82f6', '#ef4444', '#0891b2'];

const DashboardCharts: React.FC<Props> = ({ timeSeriesData, byChannelData }) => (
	<div className="grid grid-cols-[2fr_1fr] gap-4" style={{ marginBottom: 24 }}>
		<div className="bg-white rounded-lg p-5" style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.08)' }}>
			<div className="flex justify-between items-center mb-4">
				<h3 className="text-base font-semibold text-text-primary">
					Performance ao Longo do Tempo
				</h3>
				<div style={{ display: 'flex', gap: 8 }}>
					{['impressoes', 'cliques', 'conversoes'].map((metric) => (
						<button
							key={metric}
							className="px-3 py-1 border border-border rounded-full bg-white cursor-pointer text-xs text-text-secondary"
						>
							{metric.charAt(0).toUpperCase() + metric.slice(1)}
						</button>
					))}
				</div>
			</div>
			<LineChart
				data={timeSeriesData}
				label='Cliques'
				color='#6c63ff'
				height={200}
			/>
		</div>

		<div className="bg-white rounded-lg p-5" style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.08)' }}>
			<h3 className="text-base font-semibold text-text-primary" style={{ marginBottom: 16 }}>
				Distribuição por Canal
			</h3>
			<PieChart
				labels={byChannelData.map((c) => c.channel)}
				data={byChannelData.map((c) => c.clicks)}
				colors={CHANNEL_COLORS}
				height={200}
			/>
		</div>
	</div>
);

export default DashboardCharts;
