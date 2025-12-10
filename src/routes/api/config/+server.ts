import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';

// SvelteKit API route to serve client configuration
export const GET: RequestHandler = async ({ setHeaders }) => {
	// Enable CORS
	setHeaders({
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET, OPTIONS',
		'Access-Control-Allow-Headers': 'Content-Type'
	});

	// Get Supabase credentials from environment variables
	const SUPABASE_URL = process.env.SUPABASE_URL;
	const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

	if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
		return json({ error: 'Supabase credentials not configured' }, { status: 500 });
	}

	// Return configuration
	return json({
		supabase: {
			url: SUPABASE_URL,
			anonKey: SUPABASE_ANON_KEY
		}
	});
};

// Handle preflight OPTIONS request
export const OPTIONS: RequestHandler = async ({ setHeaders }) => {
	setHeaders({
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET, OPTIONS',
		'Access-Control-Allow-Headers': 'Content-Type'
	});
	return new Response(null, { status: 200 });
};

