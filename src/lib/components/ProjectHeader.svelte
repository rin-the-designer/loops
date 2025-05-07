<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	export let title: string;

	let isHeaderVisible = true;
	let hideTimeout: ReturnType<typeof setTimeout>;

	function goBack() {
		goto('/');
	}

	function handleUserActivity() {
		if (!window.isGatewayOpen) {
			isHeaderVisible = true;

			if (hideTimeout) clearTimeout(hideTimeout);

			hideTimeout = setTimeout(() => {
				if (!window.isGatewayOpen) {
					isHeaderVisible = false;
				}
			}, 200);
		}
	}

	onMount(() => {
		hideTimeout = setTimeout(() => {
			if (!window.isGatewayOpen) {
				isHeaderVisible = false;
			}
		}, 200);

		window.addEventListener('mousemove', handleUserActivity);
		window.addEventListener('click', handleUserActivity);
		window.addEventListener('keydown', handleUserActivity);
		window.addEventListener('touchstart', handleUserActivity);
		window.addEventListener('scroll', handleUserActivity);

		return () => {
			if (hideTimeout) clearTimeout(hideTimeout);
			window.removeEventListener('mousemove', handleUserActivity);
			window.removeEventListener('click', handleUserActivity);
			window.removeEventListener('keydown', handleUserActivity);
			window.removeEventListener('touchstart', handleUserActivity);
			window.removeEventListener('scroll', handleUserActivity);
		};
	});
</script>

<div class="header-container" class:hidden={!isHeaderVisible && !window.isGatewayOpen}>
	<div class="left-button">
		<button on:click={goBack} aria-label="Go back">←</button>
	</div>

	<h1>{title}</h1>

	<div class="right-button">
		<button aria-label="Information">ⓘ</button>
	</div>
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
		transition: transform 0.3s ease;
	}

	.hidden {
		transform: translateY(-100%);
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

	.right-button {
		justify-self: end;
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
