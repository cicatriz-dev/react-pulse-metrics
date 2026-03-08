import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
import { useDashboardData } from '../hooks/useDashboardData';
import { DashboardHeader } from './dashboard/DashboardHeader';
import MetricsOverview from './dashboard/MetricsOverview';
import { DashboardFilters } from './dashboard/DashboardFilters';
import DashboardCharts from './dashboard/DashboardCharts';
import CampaignDetailModal from './dashboard/CampaignDetailModal';
import CampaignTable from './CampaignTable';
import styled from 'styled-components';

const DashboardWrapper = styled.div<{ theme: any }>`
	display: flex;
	flex-direction: column;
	padding: 24px;
	background: ${(props) => (props.theme === 'dark' ? '#1a1a2e' : '#f5f7fa')};
	min-height: 100vh;
`;

interface DashboardProps {
	initialTab?: string;
	showWelcome?: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ initialTab = 'overview', showWelcome = true }) => {
	const history = useHistory();
	const { user } = useAuth();
	const { theme } = useTheme();
	const {
		loading,
		filters,
		filteredCampaigns,
		timeSeriesData,
		byChannelData,
		metrics,
		handleFilterChange,
	} = useDashboardData();

	const [activeTab, setActiveTab] = useState(initialTab);
	const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);

	return (
		<DashboardWrapper theme={theme}>
			<DashboardHeader
				user={showWelcome ? user : null}
				dateRange={filters.dateRange}
				onDateRangeChange={(v) => handleFilterChange('dateRange', v)}
				onNewCampaign={() => history.push('/campaigns/new')}
			/>

			<MetricsOverview metrics={metrics} />

			<DashboardCharts timeSeriesData={timeSeriesData} byChannelData={byChannelData} />

			<DashboardFilters filters={filters} onFilterChange={handleFilterChange} />

			<CampaignTable
				campaigns={filteredCampaigns}
				loading={loading}
				onCampaignClick={setSelectedCampaign}
			/>

			{selectedCampaign && (
				<CampaignDetailModal
					campaign={selectedCampaign}
					onClose={() => setSelectedCampaign(null)}
					onViewDetails={() => history.push(`/campaigns/${selectedCampaign.id}`)}
				/>
			)}
		</DashboardWrapper>
	);
};

export default Dashboard;
