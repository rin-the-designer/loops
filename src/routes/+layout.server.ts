import type { Project } from '$lib/data/ProjectData';
import { projectData } from '$lib/data/ProjectData';

export function load() {
	return {
		projects: projectData satisfies Project[]
	};
}
