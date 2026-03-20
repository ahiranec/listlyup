import { listingsRepo } from "../data/repos/listingsRepo";
import { usersRepo } from "../data/repos/usersRepo";

export async function runSupabaseUserByIdTest() {
    console.group("🧪 [ListlyUp] Supabase getUserById Test");

    try {
        console.log("Step 1: Fetching listings...");
        const listings = await listingsRepo.fetchAllListings();

        if (!Array.isArray(listings) || listings.length === 0) {
            throw new Error("No listings available");
        }

        const firstListing = listings[0];
        console.log("Step 1.1: first listing owner_user:", firstListing.owner_user);
        const ownerId = firstListing.owner_user_id;

        console.log("Step 2: Owner ID from first listing:", ownerId);

        if (!ownerId) {
            throw new Error("Listing has no owner_user_id");
        }

        const user = await usersRepo.getUserById(ownerId);

        console.log("Step 3: User result:", user);

        if (!user) {
            throw new Error("getUserById returned undefined");
        }

        console.log("Shape check:", {
            id: user.id,
            name: user.name,
            email: user.email,
            username: user.username,
            avatarUrl: user.avatarUrl,
        });

        console.groupEnd();

        return {
            ok: true,
            ownerId,
            user,
        };
    } catch (error) {
        console.error("❌ getUserById test failed:", error);
        console.groupEnd();

        return {
            ok: false,
            error,
        };
    }
}