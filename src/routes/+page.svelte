<script lang="ts">
	import List from '$lib/components/List.svelte';
	import { onMount } from 'svelte';
	let { data } = $props();

	// Calculate number of columns based on viewport width
	let columns = $state(6); // Default to largest layout

	// Calculate number of empty cards needed to fill last row
	let emptyCards = $derived(() => {
		const remainder = data.projects.length % columns;
		return remainder === 0 ? 0 : columns - remainder;
	});

	// Update columns on window resize
	onMount(() => {
		const updateColumns = () => {
			columns =
				window.innerWidth >= 1920
					? 6
					: window.innerWidth >= 1280
						? 4
						: window.innerWidth >= 768
							? 3
							: window.innerWidth >= 360
								? 2
								: 1;
		};

		updateColumns();
		window.addEventListener('resize', updateColumns);
		return () => window.removeEventListener('resize', updateColumns);
	});

	onMount(() => {
		document.title = 'Loops by Rin Kim';
	});
</script>

<div class="hero"></div>
<div class="gallery-grid">
	{#each data.projects as project}
		<List {project} />
	{/each}
	{#if emptyCards() > 0}
		<div class="empty-card" style="grid-column: span {emptyCards()}"></div>
	{/if}
</div>

<style>
	.hero {
		background: black;
		border-bottom: 1px solid #ffffff40;
		height: 80vh;
		width: 100%;
	}

	.gallery-grid {
		display: grid;
		background: #ffffff40;
		gap: 1px;
		grid-template-columns: repeat(6, 1fr);
		padding: 0 0 1px 0;
	}

	@media (max-width: 1920px) {
		.gallery-grid {
			grid-template-columns: repeat(4, 1fr);
		}
	}
	@media (max-width: 1280px) {
		.gallery-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}
	@media (max-width: 768px) {
		.gallery-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}
	@media (max-width: 360px) {
		.gallery-grid {
			grid-template-columns: 1fr;
		}
	}

	.empty-card {
		background-color: black;
	}
</style>
