<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { getExhibitionChannel, destroyChannel, getSupabase } from '$lib/exhibition/supabase';
	import { exhibitionProjects } from '$lib/exhibition/ExhibitionData';
	import type { TvStatusPayload } from '$lib/exhibition/types';
	import type { RealtimeChannel } from '@supabase/supabase-js';
	import type { Project } from '$lib/data/ProjectData';

	export let data: { projects: Project[] };

	let view: 'grid' | 'detail' = 'grid';
	let selectedProject: Project | null = null;
	let selectedMode: string | null = null;
	let channel: RealtimeChannel | null = null;
	let tvConnected = false;
	let tvState: TvStatusPayload['state'] = 'idle';
	let heartbeatInterval: ReturnType<typeof setInterval>;
	let tvHeartbeatTimeout: ReturnType<typeof setTimeout>;
	let currentSessionId: string | null = null;

	function getProjectMode(slug: string): string {
		return exhibitionProjects.find((p) => p.slug === slug)?.mode ?? 'ambient';
	}

	async function selectProject(project: Project) {
		selectedProject = project;
		selectedMode = getProjectMode(project.slug);
		view = 'detail';

		channel?.send({
			type: 'broadcast',
			event: 'select_project',
			payload: { slug: project.slug }
		});

		try {
			const supabase = await getSupabase();
			const { data: session } = await supabase
				.from('exhibition_sessions')
				.insert({ project_slug: project.slug })
				.select('id')
				.single();
			if (session) currentSessionId = session.id;
		} catch {}
	}

	async function exitProject() {
		if (currentSessionId) {
			try {
				const supabase = await getSupabase();
				await supabase
					.from('exhibition_sessions')
					.update({ ended_at: new Date().toISOString() })
					.eq('id', currentSessionId);
			} catch {}
			currentSessionId = null;
		}

		view = 'grid';
		selectedProject = null;
		selectedMode = null;

		channel?.send({
			type: 'broadcast',
			event: 'exit_project',
			payload: {}
		});
	}

	function resetTvHeartbeat() {
		tvConnected = true;
		clearTimeout(tvHeartbeatTimeout);
		tvHeartbeatTimeout = setTimeout(() => {
			tvConnected = false;
		}, 15000);
	}

	onMount(async () => {
		if ('serviceWorker' in navigator) {
			navigator.serviceWorker.register('/exhibition-sw.js');
		}

		const room = new URLSearchParams(window.location.search).get('room') ?? 'default';
		channel = await getExhibitionChannel(room);

		channel
			.on('broadcast', { event: 'tv_status' }, ({ payload }) => {
				const status = payload as TvStatusPayload;
				tvState = status.state;
				resetTvHeartbeat();
			})
			.on('broadcast', { event: 'heartbeat' }, ({ payload }) => {
				if (payload.source === 'tv') resetTvHeartbeat();
			})
			.subscribe();

		heartbeatInterval = setInterval(() => {
			channel?.send({
				type: 'broadcast',
				event: 'heartbeat',
				payload: { source: 'tablet', timestamp: Date.now() }
			});
		}, 10000);
	});

	onDestroy(() => {
		clearInterval(heartbeatInterval);
		clearTimeout(tvHeartbeatTimeout);
		destroyChannel();
	});
</script>

<svelte:head>
	<link rel="manifest" href="/exhibition-manifest.json" />
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-status-bar-style" content="black" />
	<meta name="apple-mobile-web-app-title" content="Loops" />
	<meta name="theme-color" content="#000000" />
</svelte:head>

<div class="tablet">
	<!-- Connection status -->
	<div class="status-bar">
		<div class="status-dot" class:connected={tvConnected}></div>
		<span class="status-text">{tvConnected ? 'TV Connected' : 'TV Disconnected'}</span>
	</div>

	{#if view === 'grid'}
		<!-- Grid view -->
		<div class="grid-view">
			<div class="grid-header">
				<h1>Loops</h1>
				<p class="subtitle">Select a piece to view</p>
			</div>
			<div class="project-grid">
				{#each data.projects as project}
					<button class="grid-item" on:click={() => selectProject(project)}>
						<div class="thumb-container">
							<img src={project.thumbnail} alt={project.title} />
						</div>
						<div class="grid-caption">
							<span class="grid-title">{project.title}</span>
							<span class="grid-mode">{getProjectMode(project.slug)}</span>
						</div>
					</button>
				{/each}
			</div>
		</div>
	{:else if view === 'detail' && selectedProject}
		<!-- Detail view -->
		<div class="detail-view">
			<div class="detail-content">
				<h2>{selectedProject.title}</h2>

				<div class="detail-description">
					{@html selectedProject.description}
				</div>

				<div class="interaction-info">
					<div class="interaction-icons">
						{#each selectedProject.interaction as interaction}
							<div class="interaction-badge" class:optional={interaction.optional}>
								<img
									src="/icons/{interaction.type}.svg"
									alt="{interaction.type}"
								/>
								<span>{interaction.type}{interaction.optional ? ' (optional)' : ''}</span>
							</div>
						{/each}
					</div>

					{#if selectedMode === 'camera'}
						<div class="guide-animation camera-guide">
							<div class="guide-icon">
								<div class="camera-pulse"></div>
							</div>
							<p>Stand in front of the screen to interact</p>
						</div>
					{:else}
						<div class="guide-animation ambient-guide">
							<div class="guide-icon">
								<div class="ambient-pulse"></div>
							</div>
							<p>Observe the piece on the screen</p>
						</div>
					{/if}
				</div>

				{#if tvState === 'loading'}
					<div class="tv-loading">Loading on TV...</div>
				{/if}
			</div>

			<button class="exit-button" on:click={exitProject}>
				Exit
			</button>
		</div>
	{/if}
</div>

<style>
	.tablet {
		height: 100dvh;
		display: flex;
		flex-direction: column;
		background: #000;
		color: #fff;
		font-family: 'Inter', sans-serif;
		overflow: hidden;
	}

	/* Status bar */
	.status-bar {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1rem;
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
		flex-shrink: 0;
	}

	.status-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: #ff4444;
		transition: background 0.3s;
	}

	.status-dot.connected {
		background: #44ff44;
	}

	.status-text {
		font-size: 0.75rem;
		opacity: 0.6;
	}

	/* Grid view */
	.grid-view {
		flex: 1;
		overflow-y: auto;
		padding: 1.5rem;
	}

	.grid-header {
		margin-bottom: 1.5rem;
	}

	.grid-header h1 {
		font-size: 1.5rem;
		font-weight: 600;
		margin: 0;
	}

	.subtitle {
		font-size: 0.875rem;
		opacity: 0.5;
		margin: 0.25rem 0 0;
	}

	.project-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
	}

	.grid-item {
		background: #181818;
		border: none;
		color: #fff;
		cursor: pointer;
		padding: 0;
		text-align: left;
		transition: background 0.2s;
		overflow: hidden;
	}

	.grid-item:active {
		background: #333;
	}

	.thumb-container {
		width: 100%;
		aspect-ratio: 1;
		background: #111;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.thumb-container img {
		width: 60%;
		aspect-ratio: 1;
		object-fit: cover;
	}

	.grid-caption {
		padding: 0.75rem;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.grid-title {
		font-size: 0.875rem;
		font-weight: 500;
	}

	.grid-mode {
		font-size: 0.7rem;
		opacity: 0.4;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	/* Detail view */
	.detail-view {
		flex: 1;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	.detail-content {
		flex: 1;
		overflow-y: auto;
		padding: 1.5rem;
	}

	.detail-content h2 {
		font-size: 1.5rem;
		font-weight: 600;
		margin: 0 0 1rem;
	}

	.detail-description {
		font-size: 0.95rem;
		line-height: 1.6;
		opacity: 0.85;
		margin-bottom: 1.5rem;
	}

	.detail-description :global(p) {
		margin: 0 0 0.75rem;
	}

	.detail-description :global(a) {
		color: #9ec5ff;
	}

	/* Interaction info */
	.interaction-info {
		border-top: 1px solid rgba(255, 255, 255, 0.15);
		padding-top: 1rem;
	}

	.interaction-icons {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin-bottom: 1rem;
	}

	.interaction-badge {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.4rem 0.75rem;
		background: rgba(255, 255, 255, 0.08);
		border-radius: 2rem;
		font-size: 0.75rem;
	}

	.interaction-badge.optional {
		opacity: 0.4;
	}

	.interaction-badge img {
		width: 20px;
		height: 20px;
	}

	/* Guide animations */
	.guide-animation {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.75rem;
		padding: 1.5rem;
	}

	.guide-animation p {
		font-size: 0.875rem;
		opacity: 0.6;
		margin: 0;
	}

	.guide-icon {
		width: 60px;
		height: 60px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.camera-pulse {
		width: 24px;
		height: 24px;
		border-radius: 50%;
		background: #fff;
		animation: pulse 2s ease-in-out infinite;
	}

	.ambient-pulse {
		width: 24px;
		height: 24px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.3);
		animation: breathe 3s ease-in-out infinite;
	}

	@keyframes pulse {
		0%, 100% { transform: scale(1); opacity: 1; }
		50% { transform: scale(1.5); opacity: 0.5; }
	}

	@keyframes breathe {
		0%, 100% { transform: scale(1); opacity: 0.3; }
		50% { transform: scale(1.8); opacity: 0.8; }
	}

	.tv-loading {
		text-align: center;
		font-size: 0.875rem;
		opacity: 0.5;
		padding: 1rem;
	}

	/* Exit button */
	.exit-button {
		flex-shrink: 0;
		background: #fff;
		color: #000;
		border: none;
		font-size: 1.5rem;
		font-weight: 600;
		padding: 1.25rem;
		cursor: pointer;
		width: 100%;
		transition: background 0.2s;
		font-family: 'Inter', sans-serif;
	}

	.exit-button:active {
		background: #ccc;
	}

	@media (min-width: 768px) {
		.project-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}
</style>
