import StatCard from "@/components/dashboard/StatCard";
import RecentUrlsTable from "@/components/dashboard/RecentUrlsTable";
import {
  Link2,
  MousePointerClick,
  TrendingUp,
} from "lucide-react";
import { useDashboard } from "@/hooks/useDashboard";

export default function Dashboard() {
  const {
    loading,
    totalUrls,
    totalClicks,
    averageClicks,
    mostClicked,
    recentUrls,
  } = useDashboard();

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="text-gray-500">
          Welcome back 👋
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
  <StatCard
    title="Total URLs"
    value={totalUrls}
    icon={
      <Link2 className="h-7 w-7 text-primary" />
    }
  />

  <StatCard
    title="Total Clicks"
    value={totalClicks}
    icon={
      <MousePointerClick className="h-7 w-7 text-primary" />
    }
  />

  <StatCard
    title="Average Clicks"
    value={averageClicks}
    icon={
      <TrendingUp className="h-7 w-7 text-primary" />
    }
  />
</div>

      {mostClicked && (
        <div className="rounded-lg border p-6">

          <h2 className="mb-2 text-xl font-semibold">
            Most Clicked URL
          </h2>

          <p className="break-all">
            {mostClicked.originalUrl}
          </p>

          <p className="mt-2 text-sm text-gray-500">
            {mostClicked.clicks} clicks
          </p>

        </div>
      )}

      <div className="rounded-lg border p-6">

        <h2 className="mb-4 text-xl font-semibold">
          Recent URLs
        </h2>

        <RecentUrlsTable urls={recentUrls} />

      </div>

    </div>
  );
}