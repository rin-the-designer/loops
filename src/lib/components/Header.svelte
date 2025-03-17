<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
</script>

<div class="header-container">
	<h1>
		<a href="/">∞</a>
	</h1>
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
		font-size: 2rem;
		line-height: 1;
		font-weight: 600;
		margin: 0;
		text-align: center;
		grid-column: 2;
	}

	h1 a {
		text-decoration: none;
		color: #fff;
	}
</style>
