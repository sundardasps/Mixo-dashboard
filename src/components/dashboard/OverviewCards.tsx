"use client";

import { useGlobalInsights } from "@/src/lib/hooks/useCampaignInsights";

import { ErrorState } from "../shared/ErrorState";
import {
  formatCurrency,
  formatNumber,
  formatPercentage,
} from "@/src/lib/utils/format";
import { MetricCard } from "../shared/MetricCard";
import { CampaignOverViewSkeleton } from "../shared/skeletons/CampaignOverViewSkeleton";

export function OverviewCards() {
  const { data: insights, isLoading, isError } = useGlobalInsights();

  if (isLoading) return <CampaignOverViewSkeleton />;
  if (isError) return <ErrorState message="Failed to load insights" />;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <MetricCard
        label="Total Spend"
        value={formatCurrency(insights.total_spend)}
      />
      <MetricCard
        label="Impressions"
        value={formatNumber(insights.total_impressions)}
      />
      <MetricCard label="Clicks" value={formatNumber(insights.total_clicks)} />
      <MetricCard
        label="Conversions"
        value={formatNumber(insights.total_conversions)}
      />
      <MetricCard label="Avg CTR" value={formatPercentage(insights.avg_ctr)} />
      <MetricCard label="Avg CPC" value={formatCurrency(insights.avg_cpc)} />
      <MetricCard
        label="Conversion Rate"
        value={formatPercentage(insights.avg_conversion_rate)}
      />
    </div>
  );
}
