import React from 'react';
import { Campaign } from '../../types/api';

interface Props {
	campaign: Campaign;
	onClose: () => void;
	onViewDetails: () => void;
}

const CampaignDetailModal: React.FC<Props> = ({ campaign, onClose, onViewDetails }) => {
	const { metrics } = campaign;
	const ctr =
		metrics && metrics.impressions > 0
			? ((metrics.clicks / metrics.impressions) * 100).toFixed(2)
			: '0.00';

	const details = [
		{ label: 'Status', value: campaign.status },
		{ label: 'Canal', value: campaign.channel },
		{
			label: 'Budget',
			value: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
				campaign.budget ?? 0,
			),
		},
		{
			label: 'Gasto',
			value: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
				campaign.spent ?? 0,
			),
		},
		{ label: 'Impressões', value: (metrics?.impressions ?? 0).toLocaleString('pt-BR') },
		{ label: 'Cliques', value: (metrics?.clicks ?? 0).toLocaleString('pt-BR') },
		{ label: 'Conversões', value: (metrics?.conversions ?? 0).toLocaleString('pt-BR') },
		{ label: 'CTR', value: `${ctr}%` },
	];

	return (
		<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000]" onClick={onClose}>
			<div className="bg-white rounded-lg p-8 w-[600px] max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
				<div className="flex justify-between mb-5">
					<h2 className="text-xl text-text-primary">{campaign.name}</h2>
					<button
						onClick={onClose}
						className="bg-transparent border-none text-xl cursor-pointer text-text-secondary"
					>
						×
					</button>
				</div>

				<div className="grid grid-cols-2 gap-3 mb-5">
					{details.map((item) => (
						<div key={item.label} className="p-3 bg-gray-50 rounded">
							<p style={{ color: '#718096', fontSize: 12, margin: '0 0 2px' }}>{item.label}</p>
							<p style={{ fontWeight: 600, margin: 0, color: '#2d3748' }}>{item.value}</p>
						</div>
					))}
				</div>

				<div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
					<button
						onClick={onViewDetails}
						className="px-4 py-2 bg-primary text-white border-none rounded cursor-pointer"
					>
						Ver Detalhes Completos
					</button>
					<button
						onClick={onClose}
						className="px-4 py-2 bg-white text-text-secondary border border-border rounded cursor-pointer"
					>
						Fechar
					</button>
				</div>
			</div>
		</div>
	);
};

export default CampaignDetailModal;
