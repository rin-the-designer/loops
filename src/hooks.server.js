// This file provides server-side hooks for SvelteKit
// Particularly useful for managing redirects on Vercel

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	const { url, isDataRequest } = event;
	const { pathname } = url;

	// Only apply to non-data requests to view pages
	if (!isDataRequest && pathname.includes('/projects/') && pathname.endsWith('/view')) {
		// Check cookies
		const slug = pathname.split('/').slice(-2)[0];
		const hasVisitedGateway = event.cookies.get(`visited_gateway_${slug}`);
		const fromGatewayParam = url.searchParams.has('from_gateway');

		// If direct access without proper verification, redirect
		if (!hasVisitedGateway && !fromGatewayParam) {
			// Redirect to gateway page
			const gatewayUrl = pathname.replace('/view', '');

			// Create redirect Response
			return new Response(null, {
				status: 307,
				headers: {
					location: gatewayUrl,
					'Cache-Control': 'no-cache, no-store, must-revalidate',
					Pragma: 'no-cache',
					Expires: '0'
				}
			});
		}
	}

	// Otherwise, proceed normally
	return await resolve(event);
}
