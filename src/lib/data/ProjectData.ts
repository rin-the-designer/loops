export interface Project {
	title: string;
	route?: string;
	slug?: string;
}

export const projectData: Project[] = [
	{
		title: 'Myth of Sisyphus',
		slug: 'myth-of-sisyphus',
		route: '/projects/myth-of-sisyphus'
	},
	{
		title: 'Doors',
		slug: 'doors',
		route: '/projects/doors'
	}
];
