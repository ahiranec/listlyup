import { listingsRepo } from "../data/repos/listingsRepo";

export function useListingById() {
  return (id: string) => listingsRepo.getListingById(id);
}
