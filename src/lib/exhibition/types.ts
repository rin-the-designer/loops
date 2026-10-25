export interface ExhibitionProject {
	slug: string;
	guide: string;
	video: string;
}

export interface SelectProjectPayload {
	slug: string;
}

export interface TvStatusPayload {
	state: 'idle' | 'loading' | 'active';
	slug?: string;
}
