<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import ProjectGateway from '$lib/components/ProjectGateway.svelte';
	import ProjectHeader from '$lib/components/ProjectHeader.svelte';
	import { onMount } from 'svelte';

	// Get data from server component
	export let data;

	$: currentProject = data.project;
	$: slug = $page.params.slug;

	function enterProject() {
		// Store that we're navigating from the gateway
		sessionStorage.setItem('coming_from_gateway', 'true');

		// Set a cookie that expires in 30 minutes
		const expiryTime = new Date();
		expiryTime.setMinutes(expiryTime.getMinutes() + 30);
		document.cookie = `visited_gateway_${slug}=true; expires=${expiryTime.toUTCString()}; path=/`;

		// Navigate to the view page with a query parameter for additional verification
		goto(`/projects/${slug}/view?from_gateway=true`);
	}

	// Set the gateway flag
	if (typeof window !== 'undefined') {
		window.isGatewayOpen = true;
	}

	onMount(() => {
		// Set title
		document.title = `${currentProject?.title || 'Project'} Gateway`;

		// Ensure we're in gateway mode
		window.isGatewayOpen = true;

		// Clear any navigation state that might cause issues
		if (sessionStorage.getItem('coming_from_gateway')) {
			sessionStorage.removeItem('coming_from_gateway');
		}
	});
</script>

<svelte:head>
	<script>
		// Set gateway mode
		window.isGatewayOpen = true;
	</script>
</svelte:head>

<ProjectHeader title={currentProject?.title || ''} />

{#if currentProject}
	<ProjectGateway project={currentProject} on:enter={enterProject} />
{:else}
	<div class="error">Project not found</div>
{/if}

<style>
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
