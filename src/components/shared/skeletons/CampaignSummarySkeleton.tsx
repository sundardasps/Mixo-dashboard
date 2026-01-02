import { Skeleton } from "@/src/components/ui/skeleton";

export function CampaignSummarySkeleton() {
  return (
    <div className="rounded-xl border p-4 space-y-4">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-4 w-32" />
        </div>
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>

      <div className="flex flex-wrap gap-6">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-4 w-28" />
      </div>
    </div>
  );
}
