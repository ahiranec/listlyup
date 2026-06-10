import { listingsRepo } from '../data/repos/listingsRepo';

export async function runSupabaseListingByIdTest() {
    console.group('🧪 [ListlyUp] Supabase fetchListingById Test');

    try {
        console.log('Step 1: Fetching all listings...');

        const all = await listingsRepo.fetchAllListings();

        if (!Array.isArray(all) || all.length === 0) {
            throw new Error('No listings available to test fetchListingById');
        }

        const firstId = all[0].id;

        console.log('Step 2: Using ID:', firstId);

        const single = await listingsRepo.fetchListingById(firstId);

        console.log('Result:', single);

        if (!single) {
            throw new Error('fetchListingById returned undefined');
        }

        console.log('Shape check:', {
            id: single.id,
            title: single.title,

            // 🎯 CAMPOS QUE QUEREMOS VER
            category: single.category,
            subcategory: single.subcategory,
            location_name: single.location_name,

            // 👤 SELLER
            owner_user_id: single.owner_user_id,
            owner_name: single.owner_user?.name,
        });

        console.groupEnd();

        return {
            ok: true,
            id: firstId,
            data: single,
        };

    } catch (error) {
        console.error('❌ fetchListingById test failed:', error);
        console.groupEnd();

        return {
            ok: false,
            error,
        };
    }
}
