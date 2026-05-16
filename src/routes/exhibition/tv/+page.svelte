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

	function handleIframeLoad(e: Event) {
		iframeLoaded = true;
		state = 'active';
		broadcastStatus();
		try {
			const doc = (e.target as HTMLIFrameElement).contentDocument;
			if (doc) {
				const style = doc.createElement('style');
				style.textContent = '* { cursor: none !important; }';
				doc.head.appendChild(style);
			}
		} catch {}
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

		channel!
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
	<!-- Idle state: 2-column grid with ambient visual + text -->
	<div class="layer idle" class:hidden={state !== 'idle'}>
		<div class="idle-grid">
			<div class="idle-visual">
				<iframe src="/project-content/_ambient/index.html" title="Ambient loop" allow="fullscreen"
				></iframe>
			</div>
			<div class="idle-text">
				<div class="idle-header">
					<div class="idle-title">The Loops<span class="dot">.</span></div>
					<div class="idle-subtitle">by Rin Kim</div>
					<div class="idle-link">https://loops.rin.kim</div>
				</div>
				<div class="idle-diagram">
					<video src="/exhibition/diagram.mp4" autoplay loop muted playsinline></video>
				</div>
				<div class="idle-instruction">
					Use the <span style="color: #fff;">tablet</span> on the desk to select a piece and begin.
				</div>
			</div>
		</div>
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
	:global(*) {
		cursor: none !important;
	}

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

	.idle {
		opacity: 1;
	}

	.idle.hidden {
		opacity: 0;
		pointer-events: none;
	}

	.idle-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		width: 100%;
		height: 100%;
		background: #ffffff40;
		gap: 1px;
	}

	.idle-visual {
		position: relative;
		background: #000;
	}

	.idle-visual iframe {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		border: none;
	}

	.idle-text {
		background: #000;
		display: flex;
		flex-direction: column;
		padding: 2rem;
	}

	.idle-header {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.idle-title {
		font-size: 6vw;
		font-weight: 400;
		line-height: 1;
	}

	.dot {
		color: #ff8800;
	}

	.idle-subtitle {
		font-size: 2vw;
		opacity: 0.8;
	}

	.idle-link {
		font-size: 2vw;
		font-weight: 400;
		color: #ff8800;
		text-decoration: underline;
	}

	.idle-diagram {
		margin-top: auto;
	}

	.idle-diagram video {
		max-height: 20vh;
		object-fit: contain;
	}

	.idle-instruction {
		font-size: 5vw;
		color: rgba(255, 255, 255, 0.3);
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
