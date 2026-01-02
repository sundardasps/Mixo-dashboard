import { Skeleton } from "@/src/components/ui/skeleton";

export function CampaignDetailSkeleton() {
  return (
    <main className="p-6 space-y-8">
      {/* Back link */}
      <Skeleton className="h-4 w-40" />

      {/* Header */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-80" />
        <Skeleton className="h-4 w-52" />
      </div>

      <CampaignDetailSkeleton />

      {/* KPI Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-24 rounded-xl" />
        ))}
      </div>
    </main>
  );
}
