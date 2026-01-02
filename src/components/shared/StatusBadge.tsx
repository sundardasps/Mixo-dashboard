import { CampaignStatus } from "@/src/types/campaign";
import { Badge } from "../ui/badge";
import { cn } from "@/src/lib/utils";

const STATUS_STYLES: Record<CampaignStatus, string> = {
  active: "bg-green-100 text-green-700 hover:bg-green-100",
  paused: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100",
  completed: "bg-gray-100 text-gray-700 hover:bg-gray-100",
};

export function StatusBadge({ status }: { status: CampaignStatus }) {
  return (
    <Badge
      variant="secondary"
      className={cn(
        "capitalize border border-transparent",
        STATUS_STYLES[status]
      )}
    >
      {status}
    </Badge>
  );
}
