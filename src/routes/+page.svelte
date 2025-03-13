<script lang="ts">
	import List from '$lib/components/List.svelte';
	export let data;
</script>

<div class="list-container">
	{#each data.projects as project}
		<List {project} />
	{/each}
</div>

<style>
	.list-container {
		display: flex;
		flex-direction: column;
	}
</style>
