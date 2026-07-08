import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { urlService } from "@/services/url.service";
import { UrlItem } from "@/types/url";

export function useMyUrls() {
  const [urls, setUrls] = useState<UrlItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUrls = async () => {
    try {
      setLoading(true);

      const data =
        await urlService.getMyUrls();

      setUrls(data);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          "Failed to fetch URLs"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  return {
    urls,
    loading,
    refetch: fetchUrls,
  };
}