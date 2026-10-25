<script lang="ts">
	import { goto } from '$app/navigation';
	import ProjectGateway from '$lib/components/ProjectGateway.svelte';
	import ProjectHeader from '$lib/components/ProjectHeader.svelte';

	// Get data from server component
	export let data;

	function enterProject() {
		// Cookie lets the view page through for 30 minutes
		document.cookie = `visited_gateway_${data.project.slug}=true; max-age=1800; path=/`;
		goto(`/projects/${data.project.slug}/view`);
	}
</script>

<svelte:head>
	<title>{data.project.title} from Loops by Rin Kim</title>
</svelte:head>

<ProjectHeader title={data.project.title} />

<ProjectGateway project={data.project} on:enter={enterProject} />
