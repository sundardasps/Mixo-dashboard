import { useQuery } from "@tanstack/react-query";
import { getGlobalInsights, getCampaignInsights } from "../api/insights";
import { GlobalInsights, Insights } from "@/src/types/campaign";
import { useEffect, useState } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

const EMPTY_INSIGHTS: Insights = {
  campaign_id: "",
  timestamp: "",
  impressions: 0,
  clicks: 0,
  conversions: 0,
  spend: 0,
  ctr: 0,
  cpc: 0,
  conversion_rate: 0,
};

const EMPTY_GLOBAL_INSIGHTS: GlobalInsights = {
  total_impressions: 0,
  total_clicks: 0,
  total_conversions: 0,
  total_spend: 0,
  avg_ctr: 0,
  avg_cpc: 0,
  avg_conversion_rate: 0,
};

export const useGlobalInsights = () =>
  useQuery({
    queryKey: ["global-insights"],
    queryFn: async () => {
      const res = await getGlobalInsights();
      return res.insights;
    },
    initialData: EMPTY_GLOBAL_INSIGHTS,
  });

export const useCampaignInsights = (id: string) =>
  useQuery({
    queryKey: ["campaign-insights", id],
    queryFn: async () => {
      const res = await getCampaignInsights(id);
      return res.insights;
    },
    enabled: !!id,
    initialData: EMPTY_INSIGHTS,
  });

export function useCampaignInsightsStream(campaignId: string) {
  const [liveInsights, setLiveInsights] = useState<Partial<Insights>>({});
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (!campaignId) return;

    const eventSource = new EventSource(
      `${BASE_URL}/campaigns/${campaignId}/insights/stream`
    );

    eventSource.onopen = () => {
      setConnected(true);
    };

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setLiveInsights((prev) => ({ ...prev, ...data }));
      } catch (err) {
        console.error("Invalid SSE data", err);
      }
    };

    eventSource.onerror = () => {
      setConnected(false);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [campaignId]);

  return { liveInsights, connected };
}
