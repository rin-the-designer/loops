<script lang="ts">
	import { page } from '$app/stores';
	import { onMount, afterUpdate } from 'svelte';
	import { goto } from '$app/navigation';
	import { projectData, type Project } from '$lib/data/ProjectData.js';
	import ProjectHeader from '$lib/components/ProjectHeader.svelte';

	let iframeLoaded = false;
	let shouldRedirect = false;

	function handleIframeLoad() {
		iframeLoaded = true;
	}

	$: slug = $page.params.slug;
	$: currentProject = projectData.find((project: Project) => project.slug === slug);

	onMount(() => {
		// Check if we came from the gateway
		const fromGateway = sessionStorage.getItem('coming_from_gateway');
		const fromGatewayParam = $page.url.searchParams.has('from_gateway');

		shouldRedirect = !fromGateway && !fromGatewayParam;

		if (shouldRedirect) {
			// If not from gateway, redirect back to gateway
			goto(`/projects/${slug}`);
		} else {
			// Clear the flag so future refreshes will use the server check
			sessionStorage.removeItem('coming_from_gateway');
			// Mark that we're not in gateway mode
			window.isGatewayOpen = false;
		}
	});
</script>

<svelte:head>
	<script>
		window.isGatewayOpen = false;
	</script>
</svelte:head>

<ProjectHeader title={currentProject?.title || ''} />

{#if !shouldRedirect}
	<div class="iframe-container">
		<iframe
			src={`/projects/${slug}/index.html`}
			title="{slug} Project"
			on:load={handleIframeLoad}
			class:loaded={iframeLoaded}
			allow="camera; microphone; fullscreen"
		></iframe>
	</div>
{/if}

<style>
	.iframe-container {
		position: absolute !important;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		overflow: hidden;
		position: relative;
	}

	iframe {
		width: 100%;
		height: 100%;
		border: none;
		position: absolute;
		top: 0;
		left: 0;
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	iframe.loaded {
		opacity: 1;
	}

	:global(body) {
		margin: 0;
		padding: 0;
	}
</style>
