import { useQuery } from "@tanstack/react-query";
import { getCampaignById, getCampaigns } from "../api/campaigns";

export const useCampaigns = () =>
  useQuery({
    queryKey: ["campaigns"],
    queryFn: getCampaigns,
    initialData: { campaigns: [] },
  });

export const useCampaignById = (id: string) =>
  useQuery({
    queryKey: ["campaign", id],
    queryFn: async () => {
      const res = await getCampaignById(id);
      return res.campaign;
    },
    enabled: !!id,
  });
