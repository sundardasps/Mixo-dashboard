import { GlobalInsights, Insights } from "@/src/types/campaign";
import { apiClient } from "./client";


export const getGlobalInsights = () =>
  apiClient<{ insights: GlobalInsights  }>("/campaigns/insights");

export const getCampaignInsights = (id: string) =>
  apiClient<{ insights: Insights }>(`/campaigns/${id}/insights`);
