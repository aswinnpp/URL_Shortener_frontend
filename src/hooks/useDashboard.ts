import { useMemo } from "react";
import { useMyUrls } from "@/hooks/useMyUrls";

export function useDashboard() {
  const { urls, loading } = useMyUrls();

  const stats = useMemo(() => {
    const totalUrls = urls.length;

    const totalClicks = urls.reduce(
      (sum, url) => sum + url.clicks,
      0
    );

    const averageClicks =
      totalUrls === 0
        ? 0
        : Number((totalClicks / totalUrls).toFixed(1));

    const mostClicked =
      urls.length > 0
        ? urls.reduce((best, current) =>
            current.clicks > best.clicks
              ? current
              : best
          )
        : null;

    const recentUrls = [...urls]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
      )
      .slice(0, 5);

    return {
      totalUrls,
      totalClicks,
      averageClicks,
      mostClicked,
      recentUrls,
    };
  }, [urls]);

  return {
    loading,
    ...stats,
  };
}