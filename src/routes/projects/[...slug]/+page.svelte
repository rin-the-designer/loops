<script lang="ts">
	import { page } from '$app/stores';

	let iframeLoaded = false;

	function handleIframeLoad() {
		iframeLoaded = true;
	}

	// Get the project slug from the URL
	$: slug = $page.params.slug;
</script>

<div class="iframe-container">
	<iframe
		src={`/projects/${slug}/index.html`}
		title="{slug} Project"
		on:load={handleIframeLoad}
		class:loaded={iframeLoaded}
		allow="camera; microphone; fullscreen"
	></iframe>
</div>

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

	:global(body) {
		margin: 0;
		padding: 0;
		overflow: hidden;
	}
</style>
