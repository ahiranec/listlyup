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

    listingsRepo
      .fetchAllListings()
      .then((data) => {
        if (!isMounted) return;
        if (!Array.isArray(data) || data.length === 0) return;
        setListings(data);
      })
      .catch((error) => {
        console.error("[useListings] fetchAllListings failed:", error);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return listings;
}
