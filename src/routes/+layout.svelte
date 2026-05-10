<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import { page } from '$app/stores';
	export let data;

	$: isProjectPage = $page.url.pathname.startsWith('/projects/');
	$: isExhibitionPage = $page.url.pathname.startsWith('/exhibition/');
</script>

{#if !isProjectPage && !isExhibitionPage}
	<Header projects={data.projects} />
{/if}

<slot />
