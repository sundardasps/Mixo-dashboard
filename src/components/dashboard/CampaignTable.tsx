"use client";

import Link from "next/link";
import { useState } from "react";

import { useCampaigns } from "@/src/lib/hooks/useCampaigns";
import { ErrorState } from "../shared/ErrorState";
import { CampaignTableSkeleton } from "../shared/skeletons/CampaignTableSkeleton";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import { StatusBadge } from "../shared/StatusBadge";
import { Button } from "../ui/button";
import { platformIcons } from "../shared/platformIcons";
import { CampaignStatus } from "@/src/types/campaign";

const STATUS_FILTERS: Array<CampaignStatus | "all"> = [
  "all",
  "active",
  "paused",
  "completed",
];

export function CampaignTable() {
  const { data, isLoading, isError } = useCampaigns();

  const [statusFilter, setStatusFilter] =
    useState<CampaignStatus | "all">("all");

  const [sortByName, setSortByName] =
    useState<"asc" | "desc">("asc");

  if (isLoading) return <CampaignTableSkeleton />;
  if (isError) return <ErrorState message="Failed to load campaigns" />;

  const campaigns = data.campaigns
    .filter((c) =>
      statusFilter === "all" ? true : c.status === statusFilter
    )
    .sort((a, b) =>
      sortByName === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold">Campaigns</h2>

      <div className="flex items-center justify-between">
        {/* Filter */}
        <div className="space-x-2">
          {STATUS_FILTERS.map((status) => (
            <Button
              key={status}
              size="sm"
              variant={statusFilter === status ? "default" : "outline"}
              onClick={() => setStatusFilter(status)}
            >
              {status}
            </Button>
          ))}
        </div>

        {/* Sort */}
        <Button
          size="sm"
          variant="outline"
          onClick={() =>
            setSortByName(sortByName === "asc" ? "desc" : "asc")
          }
        >
          Sort: {sortByName === "asc" ? "A → Z" : "Z → A"}
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Platform</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {campaigns.map((campaign) => (
            <TableRow key={campaign.id}>
              <TableCell className="font-medium">
                <Link
                  href={`/campaigns/${campaign.id}`}
                  className="hover:underline"
                >
                  {campaign.name}
                </Link>
              </TableCell>

              <TableCell>
                <StatusBadge status={campaign.status} />
              </TableCell>

              <TableCell>
                <div className="flex items-center gap-2">
                  {campaign.platforms?.length ? (
                    campaign.platforms.map((platform) => (
                      <span key={platform} className="text-lg">
                        {platformIcons[platform.toLowerCase()] ?? "—"}
                      </span>
                    ))
                  ) : (
                    "-"
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
