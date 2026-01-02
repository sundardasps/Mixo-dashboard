import { CampaignTable } from "../components/dashboard/CampaignTable";
import { OverviewCards } from "../components/dashboard/OverviewCards";


export default function DashboardPage() {
  
  return (
    <main className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">Campaign Dashboard</h1>

      <OverviewCards />

      <CampaignTable />
    </main>
  );
}
