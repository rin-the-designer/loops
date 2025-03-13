<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	export let data;
</script>

<Header projects={data.projects} />

<slot />
