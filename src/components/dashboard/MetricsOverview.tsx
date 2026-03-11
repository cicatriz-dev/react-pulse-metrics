import React from 'react';

interface Metrics {
	totalImpressions: number;
	totalClicks: number;
	totalConversions: number;
	totalSpend: number;
	avgCTR: number;
	avgCVR: number;
}

interface Props {
	metrics: Metrics;
	activeCampaignsCount: number;
}

function formatNumber(n: number) {
	if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
	if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
	return n.toLocaleString('pt-BR');
}

function formatCurrency(n: number) {
	return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(n);
}

const CARD_SHADOW = { boxShadow: '0 2px 4px rgba(0,0,0,0.08)' };

const MetricsOverview: React.FC<Props> = ({ metrics, activeCampaignsCount }) => {
	const { totalImpressions, totalClicks, totalConversions, totalSpend, avgCTR, avgCVR } = metrics;
	const cpc = totalClicks > 0 ? totalSpend / totalClicks : 0;

	return (
		<>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" style={{ marginBottom: 24 }}>
				<div className="bg-white rounded-lg p-5 border-l-4" style={{ borderLeftColor: '#6c63ff', ...CARD_SHADOW }}>
					<div className="flex justify-between items-start">
						<div>
							<p className="text-text-secondary text-[13px] mb-2">Impressões Totais</p>
							<h2 className="text-[28px] font-bold text-text-primary">
								{formatNumber(totalImpressions)}
							</h2>
						</div>
						<div className="bg-[#f0eeff] rounded-lg p-[10px]">
							<span className='material-icons' style={{ fontSize: 22 }}>
								visibility
							</span>
						</div>
					</div>
					<p className="mt-2 text-[13px] text-success">
						↑ 12.5% vs período anterior
					</p>
				</div>

				<div className="bg-white rounded-lg p-5 border-l-4" style={{ borderLeftColor: '#48bb78', ...CARD_SHADOW }}>
					<div className="flex justify-between items-start">
						<div>
							<p className="text-text-secondary text-[13px] mb-2">Total de Cliques</p>
							<h2 className="text-[28px] font-bold text-text-primary">
								{totalClicks.toLocaleString('pt-BR')}
							</h2>
						</div>
						<div className="bg-[#f0fff4] rounded-lg p-[10px]">
							<span className='material-icons' style={{ fontSize: 22 }}>
								ads_click
							</span>
						</div>
					</div>
					<p className="mt-2 text-[13px] text-success">
						↑ 8.3% vs período anterior
					</p>
				</div>

				<div className="bg-white rounded-lg p-5 border-l-4" style={{ borderLeftColor: '#ed8936', ...CARD_SHADOW }}>
					<div className="flex justify-between items-start">
						<div>
							<p className="text-text-secondary text-[13px] mb-2">Conversões</p>
							<h2 className="text-[28px] font-bold text-text-primary">
								{totalConversions.toLocaleString('pt-BR')}
							</h2>
						</div>
						<div className="bg-[#fffaf0] rounded-lg p-[10px]">
							<span className='material-icons' style={{ fontSize: 22 }}>
								track_changes
							</span>
						</div>
					</div>
					<p className="mt-2 text-[13px] text-error">
						↓ 2.1% vs período anterior
					</p>
				</div>

				<div className="bg-white rounded-lg p-5 border-l-4" style={{ borderLeftColor: '#e53e3e', ...CARD_SHADOW }}>
					<div className="flex justify-between items-start">
						<div>
							<p className="text-text-secondary text-[13px] mb-2">Gasto Total</p>
							<h2 className="text-[28px] font-bold text-text-primary">
								{formatCurrency(totalSpend)}
							</h2>
						</div>
						<div className="bg-[#fff5f5] rounded-lg p-[10px]">
							<span className='material-icons' style={{ fontSize: 22 }}>
								payments
							</span>
						</div>
					</div>
					<p className="mt-2 text-[13px] text-success">
						ROI:{' '}
						{totalSpend > 0
							? (((totalConversions * 150 - totalSpend) / totalSpend) * 100).toFixed(1)
							: '0'}
						%
					</p>
				</div>
			</div>

			<div className="flex gap-4" style={{ marginBottom: 24 }}>
				<div className="flex-1 bg-white rounded-lg p-4 text-center" style={CARD_SHADOW}>
					<p className="text-text-secondary text-[13px] mb-1">CTR Médio</p>
					<h3 className="text-[22px] font-bold text-text-primary">
						{avgCTR.toFixed(2)}%
					</h3>
				</div>
				<div className="flex-1 bg-white rounded-lg p-4 text-center" style={CARD_SHADOW}>
					<p className="text-text-secondary text-[13px] mb-1">Taxa de Conversão</p>
					<h3 className="text-[22px] font-bold text-text-primary">
						{avgCVR.toFixed(2)}%
					</h3>
				</div>
				<div className="flex-1 bg-white rounded-lg p-4 text-center" style={CARD_SHADOW}>
					<p className="text-text-secondary text-[13px] mb-1">Campanhas Ativas</p>
					<h3 className="text-[22px] font-bold text-text-primary">
						{activeCampaignsCount}
					</h3>
				</div>
				<div className="flex-1 bg-white rounded-lg p-4 text-center" style={CARD_SHADOW}>
					<p className="text-text-secondary text-[13px] mb-1">CPC Médio</p>
					<h3 className="text-[22px] font-bold text-text-primary">
						{cpc > 0 ? formatCurrency(cpc) : 'R$ 0,00'}
					</h3>
				</div>
			</div>
		</>
	);
};

export default MetricsOverview;
