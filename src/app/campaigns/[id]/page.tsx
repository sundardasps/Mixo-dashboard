"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import { ErrorState } from "@/src/components/shared/ErrorState";
import { MetricCard } from "@/src/components/shared/MetricCard";
import { StatusBadge } from "@/src/components/shared/StatusBadge";

import { CampaignDetailSkeleton } from "@/src/components/shared/skeletons/CampaignDetailSkeleton";
import { CampaignSummarySkeleton } from "@/src/components/shared/skeletons/CampaignSummarySkeleton";

import {
  useCampaignInsights,
  useCampaignInsightsStream,
} from "@/src/lib/hooks/useCampaignInsights";
import { useCampaignById } from "@/src/lib/hooks/useCampaigns";

import { platformIcons } from "@/src/components/shared/platformIcons";

import {
  formatCurrency,
  formatNumber,
  formatPercentage,
} from "@/src/lib/utils/format";

export default function CampaignDetailPage() {
  const params = useParams();
  const campaignId = params.id as string;

  /* ---------------- Campaign Insights (Primary) ---------------- */
  const {
    data: insights,
    isLoading: insightsLoading,
    isError: insightsError,
  } = useCampaignInsights(campaignId);

  const { liveInsights, connected } = useCampaignInsightsStream(campaignId);

  /* ---------------- Campaign Details (Secondary) ---------------- */
  const {
    data: campaignData,
    isLoading: campaignDetailsLoading,
    isError: campaignDetailsError,
  } = useCampaignById(campaignId);

  /* ---------------- Page-level guards ---------------- */
  if (insightsLoading) return <CampaignDetailSkeleton />;

  if (insightsError || !insights) {
    return <ErrorState message="Failed to load campaign insights" />;
  }

  /* ---------------- Merge static + live insights ---------------- */
  const mergedInsights = {
    ...insights,
    ...liveInsights,
  };

  const metrics = [
    {
      label: "Spend",
      value: mergedInsights.spend,
      format: formatCurrency,
    },
    {
      label: "Impressions",
      value: mergedInsights.impressions,
      format: formatNumber,
    },
    {
      label: "Clicks",
      value: mergedInsights.clicks,
      format: formatNumber,
    },
    {
      label: "Conversions",
      value: mergedInsights.conversions,
      format: formatNumber,
    },
    {
      label: "CTR",
      value: mergedInsights.ctr,
      format: formatPercentage,
    },
    {
      label: "CPC",
      value: mergedInsights.cpc,
      format: formatCurrency,
    },
    {
      label: "Conversion Rate",
      value: mergedInsights.conversion_rate,
      format: formatPercentage,
    },
  ];

  /* ---------------- Campaign Summary Section (Sonar-safe) ---------------- */
  let campaignSummaryContent: React.ReactNode = null;

  if (campaignDetailsLoading) {
    campaignSummaryContent = <CampaignSummarySkeleton />;
  } else if (campaignDetailsError) {
    campaignSummaryContent = (
      <ErrorState message="Failed to load campaign details" />
    );
  } else if (campaignData) {
    campaignSummaryContent = (
      <div className="rounded-xl border p-4 space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold">{campaignData.name}</h2>
            <p className="text-sm text-muted-foreground">
              Campaign ID: {campaignData.id}
            </p>
          </div>

          <StatusBadge status={campaignData.status} />
        </div>

        <div className="flex flex-wrap items-center gap-6 text-sm">
          <div>
            <span className="text-muted-foreground">Budget:</span>{" "}
            {formatCurrency(campaignData.budget)}
          </div>

          <div>
            <span className="text-muted-foreground">Daily Budget:</span>{" "}
            {formatCurrency(campaignData.daily_budget)}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Platforms:</span>
            {campaignData.platforms?.length ? (
              campaignData.platforms.map((platform) => (
                <span key={platform} className="text-lg">
                  {platformIcons[platform] ?? platform}
                </span>
              ))
            ) : (
              <span className="text-muted-foreground">—</span>
            )}
          </div>

          <div>
            <span className="text-muted-foreground">Created:</span>{" "}
            {new Date(campaignData.created_at).toLocaleDateString()}
          </div>
        </div>
      </div>
    );
  }

  /* ---------------- Render ---------------- */
  return (
    <main className="p-6 space-y-8">
      {/* Back link */}
      <Link href="/" className="text-sm underline text-muted-foreground">
        ← Back to Dashboard
      </Link>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Campaign Details</h1>
        <p className="text-sm text-muted-foreground">
          Performance overview for this campaign
        </p>
        <p className="text-sm text-muted-foreground">
          Live updates:{" "}
          <span className={connected ? "text-green-600" : "text-gray-400"}>
            {connected ? "Connected" : "Disconnected"}
          </span>
        </p>
      </div>

      {/* Campaign Summary */}
      {campaignSummaryContent}

      {/* KPI Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <MetricCard
            key={metric.label}
            label={metric.label}
            value={metric.format(metric.value)}
          />
        ))}
      </div>
    </main>
  );
}
