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
</script>

<svelte:head>
	<title>Loops by Rin Kim</title>
</svelte:head>

<div class="hero">
	<div class="hero-section">
		<div class="hero-title">Loops</div>
		<div class="hero-subtitle">by Rin Kim</div>
	</div>
	<div class="hero-section">
		<div class="hero-description">
			<span style="font-style: italic;">The Loops</span> is a collection of screen-based interactive
			sketches about being stuck in cycles and noticing where, if anywhere, you actually have a
			choice. Each sketch runs as a loop with no clear beginning or end: nothing levels up, nothing
			unlocks, and there is no hidden goal. Instead, touch and motion inputs nudge simple systems
			that keep resetting, drifting, or resisting your control.
			<span style="font-style: italic;">The Loops</span> doesn't offer an answer or an escape; it just
			gives you a place to sit inside repetition long enough to see what it's doing to you, and what
			you might do back.
		</div>
	</div>
</div>
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
		background: #ffffff40;
		height: 80vh;
		width: 100%;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1px;
		padding-bottom: 1px;
	}

	.hero-section {
		background: #000;
		color: #fff;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		gap: 0.5rem;
		font-size: 1rem;
	}

	.hero-title {
		font-size: calc(100vw / 1920 * 128);
	}

	.hero-subtitle {
		font-size: calc(100vw / 1920 * 32);
	}

	.hero-description {
		margin-top: auto;
		opacity: 0.8;
		font-size: calc(100vw / 1920 * 24);
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
		.hero-title {
			font-size: calc(100vw / 1280 * 96);
		}
		.hero-subtitle {
			font-size: calc(100vw / 1280 * 32);
		}
		.hero-description {
			font-size: calc(100vw / 1280 * 24);
		}
	}
	@media (max-width: 768px) {
		.gallery-grid {
			grid-template-columns: repeat(2, 1fr);
		}
		.hero {
			grid-template-columns: 1fr;
		}
		.hero-title {
			font-size: calc(100vw / 768 * 96);
		}
		.hero-subtitle {
			font-size: 1.5rem;
		}
		.hero-description {
			font-size: 1rem;
		}
	}
	@media (max-width: 360px) {
		.gallery-grid {
			grid-template-columns: 1fr;
		}
		.hero-title {
			font-size: calc(100vw / 360 * 96);
		}
		.hero-subtitle {
			font-size: 1.5rem;
		}
		.hero-description {
			font-size: 1rem;
		}
	}

	.empty-card {
		background-color: black;
	}
</style>
