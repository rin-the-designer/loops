<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	interface Project {
		title: string;
		slug: string;
		route: string;
		guide: string;
		description: string;
	}

	export let project: Project;

	const dispatch = createEventDispatcher();

	function handleEnter() {
		dispatch('enter');
	}
</script>

<div class="project-gateway">
	<div class="description">
		{@html project.description}
	</div>
	<div class="guide">{project.guide}</div>
	<button on:click={handleEnter}>↳ Enter</button>
</div>

<style>
	.project-gateway {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr 1fr;
		height: 100vh;
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
		align-items: center;
		justify-content: center;
		white-space: pre-wrap;
		text-align: center;
		font-size: 1.2rem;
		line-height: 1.5;
		padding: 1rem;
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
			display: block;
			height: auto;
			min-height: 100vh;
			overflow-y: auto;
		}

		.description {
			font-size: 1rem;
			border-right: none;
			border-bottom: 2px solid white;
			padding: 1rem;
			overflow-y: visible;
			max-height: none;
		}

		.guide {
			font-size: 1rem;
			padding: 1rem;
			white-space: pre-line;
		}

		button {
			font-size: 1.5rem;
			padding: 1rem;
			width: 100%;
		}
	}
</style>
