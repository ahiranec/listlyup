import { useEffect, useState } from "react";
import { listingsRepo } from "../data/repos/listingsRepo";
import type { CanonicalListing } from "../types/canonical";

const useSupabaseListings =
  import.meta.env.VITE_USE_SUPABASE_LISTINGS === "true";

export function useListings() {
  const [listings, setListings] = useState<CanonicalListing[]>(
    listingsRepo.getAllListings()
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!useSupabaseListings) {
      setIsLoading(false);
      return;
    }

    let isMounted = true;

    const fetchData = async (isUpdate = false) => {
      if (!isUpdate) setIsLoading(true);
      try {
        const data = await listingsRepo.fetchAllListings();
        if (!isMounted) return;
        
        // Even if data is empty array, we set it to clear skeletons
        setListings(data || []);
      } catch (error) {
        if (!isMounted) return;
        console.error("[useListings] fetchAllListings failed:", error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    // Initial fetch on mount
    fetchData();

    // Listen for custom event from publish flow
    const handleListingsUpdated = () => {
      fetchData(true); // pass true to avoid showing skeletons on update
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

  return { listings, isLoading };
}
