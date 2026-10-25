import { createClient, type SupabaseClient, type RealtimeChannel } from '@supabase/supabase-js';

let supabaseClient: SupabaseClient | null = null;
let channel: RealtimeChannel | null = null;

export async function getSupabase(): Promise<SupabaseClient> {
	if (supabaseClient) return supabaseClient;

	const res = await fetch('/api/config');
	const config = await res.json();
	const { url, anonKey } = config.supabase;

	supabaseClient = createClient(url, anonKey);
	return supabaseClient;
}

export async function getExhibitionChannel(room = 'default'): Promise<RealtimeChannel> {
	if (channel) return channel;

	const supabase = await getSupabase();
	channel = supabase.channel(`exhibition:${room}`);

	return channel;
}

export function destroyChannel() {
	if (channel) {
		channel.unsubscribe();
		channel = null;
	}
}
