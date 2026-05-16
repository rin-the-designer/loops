export type ExhibitionMode = 'camera' | 'ambient';

export interface ExhibitionProject {
	slug: string;
	mode: ExhibitionMode;
	guide: string;
	video?: string;
}

export type TabletToTvEvent = 'select_project' | 'exit_project';
export type TvToTabletEvent = 'tv_status';

export interface SelectProjectPayload {
	slug: string;
}

export interface TvStatusPayload {
	state: 'idle' | 'loading' | 'active';
	slug?: string;
}

export interface HeartbeatPayload {
	source: 'tv' | 'tablet';
	timestamp: number;
}
