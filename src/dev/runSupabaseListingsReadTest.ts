import { listingsRepo } from '../data/repos/listingsRepo';

type TestResult =
    | { ok: true; count: number; sample?: unknown; data: unknown[] }
    | { ok: false; error: unknown };

export async function runSupabaseListingsReadTest(): Promise<TestResult> {
    const env = import.meta.env;

    console.group('🧪 [ListlyUp] Supabase Read Test');

    console.log('Environment config:', {
        MODE: env.MODE,
        DEV: env.DEV,
        PROD: env.PROD,
        VITE_USE_SUPABASE_LISTINGS: env.VITE_USE_SUPABASE_LISTINGS,
        VITE_SUPABASE_URL_PRESENT: Boolean(env.VITE_SUPABASE_URL),
        VITE_SUPABASE_ANON_KEY_PRESENT: Boolean(env.VITE_SUPABASE_ANON_KEY),
    });

    try {
        console.log('Calling listingsRepo.fetchAllListings()...');

        const data = await listingsRepo.fetchAllListings();

        console.log('Raw result:', data);
        console.log('Is array:', Array.isArray(data));
        console.log('Count:', Array.isArray(data) ? data.length : 'N/A');
        console.log(
            'First item sample:',
            Array.isArray(data) && data.length > 0 ? data[0] : null
        );

        if (!Array.isArray(data)) {
            throw new Error('fetchAllListings() did not return an array');
        }

        if (data.length > 0) {
            const first = data[0] as Record<string, unknown>;

            console.log('Available keys:', Object.keys(first));
            console.log('Shape check:', {
                id: first?.id,
                title: first?.title,
                owner_user_id: first?.owner_user_id,
                listing_type: first?.listing_type,
                listing_location_id: first?.listing_location_id,
                offer_mode: first?.offer_mode,
            });
        }

        console.groupEnd();

        return {
            ok: true,
            count: data.length,
            sample: data[0],
            data,
        };
    } catch (error) {
        console.error('❌ Supabase read test failed:', error);
        console.groupEnd();

        return {
            ok: false,
            error,
        };
    }
}
