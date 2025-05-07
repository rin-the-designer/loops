<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';

	interface Project {
		title: string;
		slug: string;
		route: string;
		guide: string;
		description: string;
		interaction: {
			type: 'camera' | 'click' | 'audio';
			optional?: boolean;
		}[];
	}

	export let project: Project;

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
				<img
					src="/icons/{interaction.type}.svg"
					alt="{interaction.type} interaction"
					class:optional={interaction.optional}
				/>
			{/each}
		</div>
		<div class="guide-text">{project.guide}</div>
	</div>
	<button on:click={handleEnter}>↳ Enter</button>
</div>

<style>
	.project-gateway {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr 1fr;
		height: calc(100vh - 66px);
		color: white;
	}

	.description {
		grid-row: 1/3;
		font-size: 1.2rem;
		line-height: 1.5;
		padding: 1rem;
		border-right: 2px solid white;
	}

	.guide {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		justify-content: center;
		background-color: #000;
		padding: 1rem;
	}

	.interaction-icons {
		display: flex;
		flex-direction: row;
		gap: 0.5rem;
		align-items: center;
	}

	.interaction-icons img {
		width: 48px;
		height: 48px;
	}

	.interaction-icons img.optional {
		opacity: 0.2;
	}

	.guide-text {
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

	button:hover {
		background: white;
		color: black;
	}

	@media (max-width: 768px) {
		.project-gateway {
			grid-template-columns: 1fr;
			grid-template-rows: auto;
			height: auto;
		}

		.description {
			grid-row: 1/2;
			font-size: 1rem;
			border-right: none;
			padding: 1rem;
			max-height: none;
		}

		.guide {
			position: fixed;
			bottom: 61.5px;
			right: 0;
			left: 0;
			font-size: 1rem;
			padding: 1rem;
			white-space: pre-line;
			border-top: 2px solid white;
			box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
		}

		.guide-text {
			font-size: 1rem;
		}

		.interaction-icons img {
			width: 36px;
			height: 36px;
		}

		button {
			position: fixed;
			bottom: 0;
			font-size: 1.5rem;
			padding: 1rem;
			width: 100%;
		}
	}
</style>
