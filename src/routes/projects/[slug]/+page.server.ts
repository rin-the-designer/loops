import type { PageServerLoad } from './$types';
import { projectData } from '$lib/data/ProjectData';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const { slug } = params;

	// Find the project data server-side
	const project = projectData.find((p) => p.slug === slug);

	// If project not found, throw a 404 error
	if (!project) {
		throw error(404, {
			message: `Project "${slug}" not found`
		});
	}

	// Return the project data to the page
	return {
		project
	};
};
