import { listingsRepo } from "../data/repos/listingsRepo";
import type { CanonicalListing } from "../types/canonical";

const useSupabaseListings =
  import.meta.env.VITE_USE_SUPABASE_LISTINGS === "true";

export function useListingById() {
  return async (id: string): Promise<CanonicalListing | undefined> => {
    if (useSupabaseListings) {
      return await listingsRepo.fetchListingById(id);
    }

    return listingsRepo.getListingById(id);
  };
}