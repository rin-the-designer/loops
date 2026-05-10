import { projectData } from '$lib/data/ProjectData';
import { exhibitionProjects } from '$lib/exhibition/ExhibitionData';

export function load() {
	const eligibleSlugs = new Set(exhibitionProjects.map((p) => p.slug));
	const projects = projectData.filter((p) => eligibleSlugs.has(p.slug));
	return { projects, exhibitionProjects };
}
