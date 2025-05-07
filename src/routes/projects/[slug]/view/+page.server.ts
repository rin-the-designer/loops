import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ cookies, url, params }) => {
	// Check for a special cookie that might be set by the gateway page
	const hasVisitedGateway = cookies.get(`visited_gateway_${params.slug}`);

	// If there's a direct access to the view URL without the proper cookie,
	// redirect to the gateway page
	if (!hasVisitedGateway && !url.searchParams.has('from_gateway')) {
		// This is a server-side redirect, will work on Vercel
		return redirect(302, `/projects/${params.slug}`);
	}

	// Otherwise, allow the page to load
	return {
		slug: params.slug
	};
};
