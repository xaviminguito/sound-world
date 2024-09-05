import { createClient } from '@supabase/supabase-js';

const supabaseUrl = createClient(
    import.meta.env.SUPABASE_URL,
    import.meta.env.SUPABASE_ANON_KEY
);

type Album = {
    id: string;
    user_id: string;
    title: string;
    artist_name: string;
    year_released: string;
    genre?: string;
    track: string;
    cover_url?: string;
};

export async function getAlbums() {
    const { data, error } = await supabaseUrl
        .from('albums')
        .select('*');

    if (error) {
        console.error('Error fetching albums:', error);
        return null;
    }

    return data as Album[];
}


