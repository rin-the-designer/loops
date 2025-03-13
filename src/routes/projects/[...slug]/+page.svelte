<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import ProjectGateway from '$lib/components/ProjectGateway.svelte';
	import { projectData, type Project } from '$lib/data/ProjectData';

	let iframeLoaded = false;
	let showIframe = false;

	function handleIframeLoad() {
		iframeLoaded = true;
	}

	function enterProject() {
		showIframe = true;
	}

	$: slug = $page.params.slug;
	$: currentProject = projectData.find((project: Project) => project.slug === slug);
</script>

{#if currentProject && !showIframe}
	<ProjectGateway project={currentProject} on:enter={enterProject} />
{:else if showIframe}
	<div class="iframe-container">
		<iframe
			src={`/projects/${slug}/index.html`}
			title="{slug} Project"
			on:load={handleIframeLoad}
			class:loaded={iframeLoaded}
			allow="camera; microphone; fullscreen"
		></iframe>
	</div>
{:else}
	<div class="error">Project not found</div>
{/if}

<style>
	.iframe-container {
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

	.error {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
		color: white;
		font-size: 1.5rem;
	}

	:global(body) {
		margin: 0;
		padding: 0;
	}
</style>
