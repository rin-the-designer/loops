import type { PageServerLoad } from './$types.js';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ cookies, url, params }) => {
	// Strict enforcement of redirection rules:
	// 1. If we have a verified gateway visit (cookie), allow this access
	// 2. If we have a direct from_gateway param, allow this access
	// 3. Otherwise, force redirect to the gateway page

	// Check for both sources of valid access
	const hasVisitedGateway = cookies.get(`visited_gateway_${params.slug}`);
	const fromGatewayParam = url.searchParams.has('from_gateway');

	// Stronger redirect rule - both conditions must fail to trigger redirect
	if (!hasVisitedGateway && !fromGatewayParam) {
		// Force redirect to gateway to prevent direct access to view
		return redirect(302, `/projects/${params.slug}`);
	}

	// We have verification of prior gateway visit, allow the view page to load
	return {
		slug: params.slug
	};
};
