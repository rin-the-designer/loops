import type { PageServerLoad } from './$types.js';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ cookies, url, params }) => {
	// Check for a special cookie that might be set by the gateway page
	const hasVisitedGateway = cookies.get(`visited_gateway_${params.slug}`);
	const fromGatewayParam = url.searchParams.has('from_gateway');

	// If there's a direct access to the view URL without the proper cookie or query param,
	// redirect to the gateway page
	if (!hasVisitedGateway && !fromGatewayParam) {
		// This is a server-side redirect, will work on Vercel
		return redirect(302, `/projects/${params.slug}`);
	}

	// Otherwise, allow the page to load
	return {
		slug: params.slug
	};
};
