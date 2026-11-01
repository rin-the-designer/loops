<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { getExhibitionChannel, destroyChannel, getSupabase } from '$lib/exhibition/supabase';
	import { exhibitionProjects } from '$lib/exhibition/ExhibitionData';
	import List from '$lib/components/List.svelte';
	import type { ExhibitionProject, TvStatusPayload } from '$lib/exhibition/types';
	import type { RealtimeChannel } from '@supabase/supabase-js';
	import type { Project } from '$lib/data/ProjectData';

	export let data: { projects: Project[] };

	let view: 'grid' | 'detail' = 'grid';
	let selectedProject: Project | null = null;
	let selectedExhibit: ExhibitionProject | undefined;
	let channel: RealtimeChannel | null = null;
	let tvConnected = false;
	let tvState: TvStatusPayload['state'] = 'idle';
	let tvHeartbeatTimeout: ReturnType<typeof setTimeout>;
	let currentSessionId: string | null = null;

	async function selectProject(project: Project) {
		selectedProject = project;
		selectedExhibit = exhibitionProjects.find((p: ExhibitionProject) => p.slug === project.slug);
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
		selectedExhibit = undefined;

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

		channel!
			.on('broadcast', { event: 'tv_status' }, ({ payload }) => {
				const status = payload as TvStatusPayload;
				tvState = status.state;
				resetTvHeartbeat();
			})
			.on('broadcast', { event: 'heartbeat' }, ({ payload }) => {
				if (payload.source === 'tv') resetTvHeartbeat();
			})
			.subscribe();
	});

	onDestroy(() => {
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
	{#if view === 'grid'}
		<!-- Grid view -->
		<div class="grid-view">
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div
				class="gallery-grid"
				style="--cols: {Math.ceil((data.projects.length + 1) / 2)}"
				on:click|preventDefault={(e) => {
					const anchor = (e.target as HTMLElement)?.closest('.gallery-item');
					if (!anchor) return;
					const slug = anchor.getAttribute('href')?.replace('/projects/', '');
					const project = data.projects.find((p) => p.slug === slug);
					if (project) selectProject(project);
				}}
			>
				<div class="intro">
					<div>
						<h1>The Loops<span class="dot">.</span></h1>
						<p>Tap a piece to play it on the TV.</p>
					</div>
					<div class="status">
						<div class="status-dot" class:connected={tvConnected}></div>
						{tvConnected ? 'TV Connected' : 'TV Disconnected'}
					</div>
				</div>
				{#each data.projects as project}
					<List {project} />
				{/each}
			</div>
		</div>
	{:else if view === 'detail' && selectedProject}
		<!-- Detail view: horizontal 2-col layout -->
		<div class="detail-view">
			<div class="detail-grid">
				<div class="detail-left">
					<h2>{selectedProject.title}</h2>
					<div class="detail-description">
						{@html selectedProject.description}
					</div>
				</div>
				<div class="detail-right">
					<div class="interaction-info">
						<div class="interaction-icons">
							{#each selectedProject.interaction.filter((i) => i.type !== 'click') as interaction}
								<div class="interaction-badge" class:optional={interaction.optional}>
									<img src="/icons/{interaction.type}.svg" alt={interaction.type} />
									<span
										>{interaction.type === 'flash' ? 'flash alert' : interaction.type}{interaction.optional
											? ' (optional)'
											: ''}</span
									>
								</div>
							{/each}
						</div>

						{#if selectedExhibit}
							<div class="guide-animation">
								<video
									src={selectedExhibit.video}
									autoplay
									loop
									muted
									playsinline
									class="guide-video"
								></video>
								<p>{selectedExhibit.guide}</p>
							</div>
						{/if}

						{#if tvState === 'loading'}
							<div class="tv-loading">Loading on TV...</div>
						{/if}
					</div>
					<button class="exit-button" on:click={exitProject}>⌫ Exit</button>
				</div>
			</div>
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
		overflow: hidden;
	}

	/* TV connection status */
	.status {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.75rem;
		opacity: 0.6;
	}

	.status-dot {
		width: 0.5rem;
		height: 0.5rem;
		border-radius: 50%;
		background: #ff4444;
		transition: background 0.3s;
	}

	.status-dot.connected {
		background: #44ff44;
	}

	/* Grid view */
	.grid-view {
		flex: 1;
		overflow: hidden;
	}

	.gallery-grid {
		display: grid;
		background: #ffffff40;
		gap: 1px;
		/* Intro tile + pieces fill two rows; columns grow with the piece count */
		grid-template-columns: repeat(var(--cols), 1fr);
		grid-template-rows: 1fr 1fr;
		height: 100%;
		padding: 0;
	}

	.intro {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 1rem;
		background: #000;
	}

	.intro h1 {
		font-size: 2.5rem;
		font-weight: 600;
		margin: 0 0 0.75rem;
	}

	.dot {
		color: #ff8800;
	}

	.intro p {
		font-size: 1.125rem;
		line-height: 1.4;
		opacity: 0.6;
		margin: 0;
	}

	.gallery-grid :global(.gallery-item) {
		cursor: pointer;
	}

	/* Shorter thumbnail area leaves room for the excerpt */
	.gallery-grid :global(.image-container) {
		aspect-ratio: 5 / 4;
	}

	.gallery-grid :global(.caption) {
		font-size: 1.125rem;
	}

	/* Detail view */
	.detail-view {
		flex: 1;
		overflow: hidden;
	}

	.detail-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		height: 100%;
		gap: 1px;
		background: rgba(255, 255, 255, 0.15);
	}

	.detail-left {
		background: #000;
		padding: 1.5rem;
		overflow-y: auto;
	}

	.detail-left h2 {
		font-size: 3rem;
		font-weight: 600;
		margin: 0 0 3rem;
	}

	.detail-description {
		font-size: 1.5rem;
		line-height: 1.6;
		opacity: 0.85;
	}

	.detail-description :global(p) {
		margin: 0 0 0.75rem;
	}

	.detail-description :global(a) {
		color: #9ec5ff;
	}

	.detail-right {
		background: #000;
		display: grid;
		grid-template-rows: 1fr 1fr;
	}

	/* Interaction info */
	.interaction-info {
		padding: 1.2rem;
		text-align: center;
		overflow-y: auto;
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
		width: 1.25rem;
		height: 1.25rem;
	}

	/* Guide animations */
	.guide-animation {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.75rem;
		padding: 1.5rem;
	}

	.guide-video {
		height: 10rem;
		aspect-ratio: 16 / 9;
		object-fit: cover;
		border-radius: 0.5rem;
	}

	.guide-animation p {
		font-size: 1.5rem;
		line-height: 1.4;
		opacity: 0.6;
		margin: 0;
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
		background: rgba(255, 255, 255, 0.1);
		color: #fff;
		border: none;
		font-size: 2.5rem;
		font-weight: 600;
		padding: 1.25rem;
		cursor: pointer;
		transition: background 0.2s;
		align-self: stretch;
	}

	.exit-button:active {
		background: rgba(255, 255, 255, 0.2);
	}

	/* Designed at iPad Pro 11" (1194×834). On other landscape screens tall enough
	   to fit everything, rem scales with the viewport so proportions stay the same. */
	@media (orientation: landscape) and (min-height: 600px) {
		:global(html:has(.tablet)) {
			font-size: min(100vw * 16 / 1194, 100dvh * 16 / 834);
		}
	}

	/* Portrait and short screens: scrolling gallery with the title tile as a header */
	@media not all and (orientation: landscape) and (min-height: 600px) {
		.grid-view,
		.detail-view {
			overflow-y: auto;
		}

		.gallery-grid {
			grid-template-columns: repeat(2, 1fr);
			grid-template-rows: none;
			height: auto;
		}

		@media (min-width: 600px) {
			.gallery-grid {
				grid-template-columns: repeat(3, 1fr);
			}
		}

		.intro {
			grid-column: 1 / -1;
			gap: 2rem;
		}

		.detail-grid {
			grid-template-columns: 1fr;
			height: auto;
		}
	}
</style>
