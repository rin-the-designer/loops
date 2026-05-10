import type { ExhibitionProject } from './types';

export const exhibitionProjects: ExhibitionProject[] = [
	{ slug: 'myth-of-sisyphus', mode: 'camera' },
	{ slug: 'doors', mode: 'ambient' },
	{ slug: 'accumulation', mode: 'ambient' },
	{ slug: 'zen-garden', mode: 'ambient' },
	{ slug: 'incense', mode: 'camera' },
	{ slug: 'playground-spinner', mode: 'camera' },
	{ slug: 'meaningful-meaningless', mode: 'ambient' }
];

export function isExhibitionEligible(slug: string): boolean {
	return exhibitionProjects.some((p) => p.slug === slug);
}

export function getExhibitionMode(slug: string): ExhibitionProject['mode'] | undefined {
	return exhibitionProjects.find((p) => p.slug === slug)?.mode;
}
