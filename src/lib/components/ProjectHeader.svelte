<script lang="ts">
	import { goto } from '$app/navigation';

	export let title: string;
</script>

<div class="header-container">
	<div class="left-button">
		<button on:click={() => goto('/')} aria-label="Go back">←</button>
	</div>

	<h1>{title}</h1>
</div>

<style>
	.header-container {
		position: sticky;
		top: 0;
		left: 0;
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		align-items: center;
		padding: 1rem;
		border-bottom: 2px solid #fff;
		background-color: #000;
		z-index: 100;
	}

	h1 {
		color: #fff;
		font-size: 1rem;
		line-height: 1;
		font-weight: 600;
		margin: 0;
		text-align: center;
		grid-column: 2;
	}

	.left-button {
		justify-self: start;
	}

	button {
		background: none;
		border: none;
		color: #fff;
		font-size: 2rem;
		line-height: 1;
		padding: 0;
		cursor: pointer;
		transition: opacity 0.2s;
	}

	button:hover {
		opacity: 0.7;
	}
</style>
