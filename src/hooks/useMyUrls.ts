import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { urlService } from "@/services/url.service";
import { UrlItem } from "@/types/url";

export function useMyUrls() {
  const [urls, setUrls] = useState<UrlItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUrls = async () => {
    try {
      setLoading(true);

      const response = await urlService.getMyUrls(
        page,
        3,
        search
      );

      console.log("ss",response);
      

      setUrls(response.data);
      setTotal(response.pagination.total);
      setTotalPages(response.pagination.totalPages);
    } catch {
      toast.error("Failed to load URLs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUrls();
  }, [page, search]);

  return {
    urls,
    loading,

    page,
    setPage,

    search,
    setSearch,

    total,
    totalPages,

    refetch: fetchUrls,
  };

  
}