import { Skeleton } from "@/src/components/ui/skeleton";

export function CampaignOverViewSkeleton() {
  return (
    <main className=" space-y-8">
      {/* KPI Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-24 rounded-xl" />
        ))}
      </div>
    </main>
  );
}
