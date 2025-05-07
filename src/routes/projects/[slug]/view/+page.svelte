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

	function hasCookie(name: string): boolean {
		return document.cookie.split(';').some((item) => item.trim().startsWith(`${name}=`));
	}

	// Immediately set isGatewayOpen to false for the view page
	if (typeof window !== 'undefined') {
		window.isGatewayOpen = false;
	}

	$: slug = $page.params.slug;
	$: currentProject = projectData.find((project: Project) => project.slug === slug);

	onMount(() => {
		// Set title
		document.title = `${currentProject?.title || 'Project'} View`;

		// Set iframe mode immediately
		window.isGatewayOpen = false;

		// Check if we came from the gateway
		const fromGateway = sessionStorage.getItem('coming_from_gateway');
		const fromGatewayParam = $page.url.searchParams.has('from_gateway');
		const hasVisitedCookie = hasCookie(`visited_gateway_${slug}`);

		// Only redirect if we have no indication this is a valid view access
		shouldRedirect = !fromGateway && !fromGatewayParam && !hasVisitedCookie;

		if (shouldRedirect) {
			// If not from gateway, redirect back to gateway
			goto(`/projects/${slug}`);
		} else {
			// For first time access, set a cookie to remember for future refreshes
			if (fromGateway || fromGatewayParam) {
				const expiryTime = new Date();
				expiryTime.setMinutes(expiryTime.getMinutes() + 30);
				document.cookie = `visited_gateway_${slug}=true; expires=${expiryTime.toUTCString()}; path=/`;
			}

			// Clear the sessionStorage flag as we've now set the cookie
			sessionStorage.removeItem('coming_from_gateway');
		}
	});
</script>

<svelte:head>
	<script>
		// Force non-gateway mode at the earliest possible moment
		window.isGatewayOpen = false;
	</script>
</svelte:head>

<ProjectHeader title={currentProject?.title || ''} />

{#if !shouldRedirect}
	<div class="iframe-container">
		<iframe
			src={`/project-content/${slug}/index.html`}
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
