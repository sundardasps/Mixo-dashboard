import { Campaign } from "@/src/types/campaign";
import { apiClient } from "./client";


export const getCampaigns = () =>
  apiClient<{ campaigns: Campaign[] }>("/campaigns");

export const getCampaignById = (id: string) =>
  apiClient<{ campaign: Campaign }>(`/campaigns/${id}`);
