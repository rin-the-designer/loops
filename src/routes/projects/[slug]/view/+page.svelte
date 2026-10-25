<script lang="ts">
	import ProjectHeader from '$lib/components/ProjectHeader.svelte';

	export let data;

	let iframeLoaded = false;
</script>

<svelte:head>
	<title>{data.project.title} View</title>
</svelte:head>

<ProjectHeader title={data.project.title} autoHide />

<div class="iframe-container">
	<iframe
		src="/project-content/{data.project.slug}/index.html"
		title="{data.project.slug} Project"
		on:load={() => (iframeLoaded = true)}
		class:loaded={iframeLoaded}
		allow="camera; microphone; fullscreen"
	></iframe>
</div>

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
</style>
