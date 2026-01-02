export type CampaignStatus = "active" | "paused" | "completed";

export interface Campaign {
  id: string;
  name: string;
  brand_id: string;
  status: CampaignStatus;
  budget: number;
  daily_budget: number;
  platforms: string[];
  created_at: string;
}

export interface Insights {
  campaign_id: string;
  timestamp: string;
  impressions: number;
  clicks: number;
  conversions: number;
  spend: number;
  ctr: number;
  cpc: number;
  conversion_rate: number;
}

export interface GlobalInsights {
  total_impressions: number;
  total_clicks: number;
  total_conversions: number;
  total_spend: number;
  avg_ctr: number;
  avg_cpc: number;
  avg_conversion_rate: number;
}
