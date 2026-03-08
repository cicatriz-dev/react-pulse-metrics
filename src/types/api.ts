export interface CampaignMetrics {
	impressions: number;
	clicks: number;
	conversions: number;
	ctr: number;
	cvr: number;
}

export interface Campaign {
	id: string;
	name: string;
	status: 'active' | 'paused' | 'ended' | 'draft';
	channel: 'google' | 'facebook' | 'instagram' | 'linkedin';
	budget: number;
	spent: number;
	startDate: string;
	endDate: string | null;
	metrics: CampaignMetrics;
}

export type ApiResponse = Record<string, any>;
export type User = any;
export type Metrics = any;
export type AudienceSegment = any;
export type Report = any;

export interface PaginatedResponse<T> {
	data: T[];
	total: number;
	page: number;
	perPage: number;
}

export interface ApiError {
	message: string;
	code: number;
	details?: any;
}
