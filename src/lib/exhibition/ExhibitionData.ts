import type { ExhibitionProject } from './types';

export const exhibitionProjects: ExhibitionProject[] = [
	{
		slug: 'myth-of-sisyphus',
		mode: 'camera',
		guide: 'Open your palm facing the TV. Guide the black dot to the orange circle and push it up the hill.',
		video: '/exhibition/interaction-4.mp4'
	},
	{
		slug: 'doors',
		mode: 'camera',
		guide: 'Move sideways to tilt the perspective towards your viewing angle.',
		video: '/exhibition/interaction-2.mp4'
	},
	{
		slug: 'accumulation',
		mode: 'ambient',
		guide: 'Watch the layers build. Each second adds a new layer, invisible but present.',
		video: '/exhibition/interaction-1.mp4'
	},
	{
		slug: 'zen-garden',
		mode: 'ambient',
		guide: 'Watch the lines appear across the sand. The cycle repeats on its own.',
		video: '/exhibition/interaction-1.mp4'
	},
	{
		slug: 'incense',
		mode: 'camera',
		guide: 'Stand in front of the screen. The smoke shifts direction in response to your position.',
		video: '/exhibition/interaction-2.mp4'
	},
	{
		slug: 'playground-spinner',
		mode: 'camera',
		guide:
			'Move your hand in front of the screen to spin it. The faster you move, the faster it spins.',
		video: '/exhibition/interaction-3.mp4'
	},
	{
		slug: 'meaningful-meaningless',
		mode: 'ambient',
		guide: 'Observe the two canvases and their labels.',
		video: '/exhibition/interaction-1.mp4'
	}
];

export function isExhibitionEligible(slug: string): boolean {
	return exhibitionProjects.some((p) => p.slug === slug);
}

export function getExhibitionMode(slug: string): ExhibitionProject['mode'] | undefined {
	return exhibitionProjects.find((p) => p.slug === slug)?.mode;
}
