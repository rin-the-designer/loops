<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { getExhibitionChannel, destroyChannel } from '$lib/exhibition/supabase';
	import type { SelectProjectPayload, TvStatusPayload } from '$lib/exhibition/types';
	import type { RealtimeChannel } from '@supabase/supabase-js';

	let state: 'idle' | 'loading' | 'active' = 'idle';
	let activeSlug: string | null = null;
	let iframeLoaded = false;
	let channel: RealtimeChannel | null = null;
	let heartbeatInterval: ReturnType<typeof setInterval>;
	let tabletConnected = false;
	let tabletHeartbeatTimeout: ReturnType<typeof setTimeout>;

	function broadcastStatus() {
		if (!channel) return;
		const payload: TvStatusPayload = { state, slug: activeSlug ?? undefined };
		channel.send({ type: 'broadcast', event: 'tv_status', payload });
	}

	function handleSelectProject(payload: SelectProjectPayload) {
		activeSlug = payload.slug;
		iframeLoaded = false;
		state = 'loading';
		broadcastStatus();
	}

	function handleExitProject() {
		state = 'idle';
		activeSlug = null;
		iframeLoaded = false;
		broadcastStatus();
	}

	function handleIframeLoad() {
		iframeLoaded = true;
		state = 'active';
		broadcastStatus();
	}

	function resetTabletHeartbeat() {
		tabletConnected = true;
		clearTimeout(tabletHeartbeatTimeout);
		tabletHeartbeatTimeout = setTimeout(() => {
			tabletConnected = false;
		}, 15000);
	}

	onMount(async () => {
		const room = new URLSearchParams(window.location.search).get('room') ?? 'default';
		channel = await getExhibitionChannel(room);

		channel
			.on('broadcast', { event: 'select_project' }, ({ payload }) => {
				handleSelectProject(payload as SelectProjectPayload);
			})
			.on('broadcast', { event: 'exit_project' }, () => {
				handleExitProject();
			})
			.on('broadcast', { event: 'heartbeat' }, ({ payload }) => {
				if (payload.source === 'tablet') resetTabletHeartbeat();
			})
			.subscribe();

		heartbeatInterval = setInterval(() => {
			channel?.send({
				type: 'broadcast',
				event: 'heartbeat',
				payload: { source: 'tv', timestamp: Date.now() }
			});
		}, 10000);

		broadcastStatus();
	});

	onDestroy(() => {
		clearInterval(heartbeatInterval);
		clearTimeout(tabletHeartbeatTimeout);
		destroyChannel();
	});
</script>

<div class="tv-display">
	<!-- Ambient loop (always rendered, hidden when project active) -->
	<div class="layer ambient" class:hidden={state !== 'idle'}>
		<iframe
			src="/project-content/_ambient/index.html"
			title="Ambient loop"
			allow="fullscreen"
		></iframe>
	</div>

	<!-- Active project -->
	{#if activeSlug}
		<div class="layer project" class:visible={iframeLoaded}>
			<iframe
				src="/project-content/{activeSlug}/index.html"
				title="{activeSlug} Project"
				on:load={handleIframeLoad}
				allow="camera; microphone; fullscreen"
			></iframe>
		</div>
	{/if}

	<!-- Loading indicator -->
	{#if state === 'loading'}
		<div class="loading">
			<div class="spinner"></div>
		</div>
	{/if}
</div>

<style>
	.tv-display {
		position: fixed;
		inset: 0;
		background: #000;
		overflow: hidden;
	}

	.layer {
		position: absolute;
		inset: 0;
		transition: opacity 0.8s ease;
	}

	.layer iframe {
		width: 100%;
		height: 100%;
		border: none;
	}

	.ambient {
		opacity: 1;
	}

	.ambient.hidden {
		opacity: 0;
		pointer-events: none;
	}

	.project {
		opacity: 0;
		transition: opacity 0.5s ease;
	}

	.project.visible {
		opacity: 1;
	}

	.loading {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 10;
	}

	.spinner {
		width: 40px;
		height: 40px;
		border: 3px solid rgba(255, 255, 255, 0.15);
		border-top-color: #fff;
		border-radius: 50%;
		animation: spin 0.8s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
</style>
