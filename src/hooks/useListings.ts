import { useEffect, useState } from "react";
import { listingsRepo } from "../data/repos/listingsRepo";
import type { CanonicalListing } from "../types/canonical";

const useSupabaseListings =
  import.meta.env.VITE_USE_SUPABASE_LISTINGS === "true";

export function useListings() {
  const [listings, setListings] = useState<CanonicalListing[]>(
    listingsRepo.getAllListings()
  );

  useEffect(() => {
    if (!useSupabaseListings) return;

    let isMounted = true;

    const fetchData = async () => {
      try {
        const data = await listingsRepo.fetchAllListings();
        if (!isMounted) return;
        if (!Array.isArray(data) || data.length === 0) return;
        setListings(data);
      } catch (error) {
        if (!isMounted) return;
        console.error("[useListings] fetchAllListings failed:", error);
      }
    };

    // Initial fetch on mount
    fetchData();

    // Listen for custom event from publish flow
    const handleListingsUpdated = () => {
      fetchData();
    };

    if (typeof window !== "undefined") {
      window.addEventListener("listings_updated", handleListingsUpdated);
    }

    return () => {
      isMounted = false;
      if (typeof window !== "undefined") {
        window.removeEventListener("listings_updated", handleListingsUpdated);
      }
    };
  }, []);

  return listings;
}
