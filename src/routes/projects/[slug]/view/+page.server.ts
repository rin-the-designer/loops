import type { PageServerLoad } from './$types.js';
import { redirect } from '@sveltejs/kit';

// Only allow the view after the gateway page set its cookie
export const load: PageServerLoad = async ({ cookies, params, setHeaders }) => {
	if (!cookies.get(`visited_gateway_${params.slug}`)) {
		// Extra headers to prevent caching and ensure redirect works on Vercel
		setHeaders({
			'Cache-Control': 'no-cache, no-store, must-revalidate',
			Pragma: 'no-cache',
			Expires: '0'
		});

		redirect(307, `/projects/${params.slug}`);
	}
};
