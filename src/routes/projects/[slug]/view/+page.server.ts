import type { PageServerLoad } from './$types.js';
import { redirect } from '@sveltejs/kit';

// Force a hard redirect for Vercel deployments
export const load: PageServerLoad = async ({ cookies, url, params, setHeaders }) => {
	// Strict enforcement of redirection rules:
	// 1. If we have a verified gateway visit (cookie), allow this access
	// 2. If we have a direct from_gateway param, allow this access
	// 3. Otherwise, force redirect to the gateway page

	// Check for both sources of valid access
	const hasVisitedGateway = cookies.get(`visited_gateway_${params.slug}`);
	const fromGatewayParam = url.searchParams.has('from_gateway');

	// Stronger redirect rule - both conditions must fail to trigger redirect
	if (!hasVisitedGateway && !fromGatewayParam) {
		// Extra headers to prevent caching and ensure redirect works on Vercel
		setHeaders({
			'Cache-Control': 'no-cache, no-store, must-revalidate',
			Pragma: 'no-cache',
			Expires: '0'
		});

		// Force redirect to gateway to prevent direct access to view
		// Using 307 (Temporary Redirect) to ensure method and body are preserved
		return redirect(307, `/projects/${params.slug}`);
	}

	// We have verification of prior gateway visit, allow the view page to load
	return {
		slug: params.slug
	};
};
