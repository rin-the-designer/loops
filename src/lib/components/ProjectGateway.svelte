<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import type { Project } from '$lib/data/ProjectData';
	import { exhibitionProjects } from '$lib/exhibition/ExhibitionData';

	export let project: Project;

	$: exhibit = exhibitionProjects.find((p) => p.slug === project.slug);

	const dispatch = createEventDispatcher();

	function handleEnter() {
		dispatch('enter');
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			handleEnter();
		}
	}

	onMount(() => {
		document.addEventListener('keydown', handleKeydown);
		return () => {
			document.removeEventListener('keydown', handleKeydown);
		};
	});
</script>

<div class="project-gateway">
	<div class="description">
		{@html project.description}
	</div>
	<div class="guide">
		<div class="interaction-icons">
			{#each project.interaction as interaction}
				<div class="interaction-badge" class:optional={interaction.optional}>
					<img src="/icons/{interaction.type}.svg" alt="" />
					<span
						>{interaction.type === 'flash' ? 'flash alert' : interaction.type}{interaction.optional
							? ' (optional)'
							: ''}</span
					>
				</div>
			{/each}
		</div>
		{#if exhibit}
			<video src={exhibit.video} autoplay loop muted playsinline class="guide-video"></video>
		{/if}
		<div class="guide-text">{exhibit?.guide ?? project.guide}</div>
	</div>
	<button on:click={handleEnter}>↳ Enter</button>
</div>

<style>
	.project-gateway {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr 1fr;
		height: calc(100dvh - 66px);
		color: white;
	}

	.description {
		grid-row: 1/3;
		font-size: 1.2rem;
		line-height: 1.5;
		padding: 1rem;
		border-right: 2px solid white;
		overflow-y: auto;
	}

	.guide {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.75rem;
		background-color: #000;
		padding: 1.2rem;
		overflow-y: auto;
	}

	.interaction-icons {
		align-self: stretch;
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin-bottom: 1.75rem;
	}

	.interaction-badge {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 1rem;
		background: rgba(255, 255, 255, 0.08);
		border-radius: 2rem;
		font-size: 1rem;
	}

	.interaction-badge.optional {
		opacity: 0.4;
	}

	.interaction-badge img {
		width: 1.5rem;
		height: 1.5rem;
	}

	.guide-video {
		height: 10rem;
		max-width: 100%;
		aspect-ratio: 16 / 9;
		object-fit: cover;
		border-radius: 0.5rem;
	}

	.guide-text {
		max-width: 32rem;
		font-size: 1.2rem;
		line-height: 1.5;
		white-space: pre-wrap;
		text-align: center;
	}

	button {
		background: white;
		border: none;
		color: black;
		padding: 0.75rem 2rem;
		font-size: 4rem;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	@media (max-width: 768px) {
		.project-gateway {
			grid-template-columns: 1fr;
			grid-template-rows: 1fr auto auto;
		}

		.description {
			grid-row: 1/2;
			font-size: 1rem;
			border-right: none;
			padding: 1rem;
			overflow-y: auto;
		}

		.guide {
			grid-row: 2/3;
			font-size: 1rem;
			white-space: pre-line;
			border-top: 2px solid white;
		}

		.guide-text {
			font-size: 1rem;
		}

		.interaction-badge {
			font-size: 0.875rem;
		}

		.interaction-badge img {
			width: 1.25rem;
			height: 1.25rem;
		}

		.guide-video {
			height: 7rem;
		}

		button {
			grid-row: 3/4;
			font-size: 1.5rem;
			padding: 1rem;
			width: 100%;
		}
	}
</style>
