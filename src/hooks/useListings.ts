import { listingsRepo } from "../data/repos/listingsRepo";

export function useListings() {
  return listingsRepo.getAllListings();
}
