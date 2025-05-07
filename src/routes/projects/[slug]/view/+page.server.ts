import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, url, request }) => {
	const slug = params.slug;

	// Check if this is a refresh/direct navigation by looking for a referer header
	const referer = request.headers.get('referer');

	// If there's no referer, or the referer doesn't include the gateway page,
	// redirect to the gateway page
	if (!referer || !referer.includes(`/projects/${slug}`)) {
		throw redirect(302, `/projects/${slug}`);
	}

	// Otherwise, allow the navigation to proceed
	return {};
};
