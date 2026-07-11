import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { urlService } from "@/services/url.service";
import { UrlItem } from "@/types/url";

export function useMyUrls() {
  const [urls, setUrls] = useState<UrlItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); // Reset to first page when searching
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const fetchUrls = async () => {
    try {
      setLoading(true);

      const response = await urlService.getMyUrls(
        page,
        3,
        debouncedSearch
      );

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
  }, [page, debouncedSearch]);

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