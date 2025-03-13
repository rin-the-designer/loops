<script lang="ts">
	import { page } from '$app/stores';

	interface Project {
		title: string;
		slug: string;
		route: string;
		guide: string;
		description: string;
	}

	export let projects: Project[];

	$: isProjectPage = $page.url.pathname.startsWith('/projects/');
	$: slug = isProjectPage ? $page.url.pathname.split('/').pop() : '';
	$: currentProject = projects.find((project) => project.slug === slug);
	$: title = isProjectPage && currentProject ? currentProject.title : '∞';

	function goBack() {
		history.back();
	}
</script>

<div class="header-container">
	{#if isProjectPage}
		<div class="left-button">
			<button on:click={goBack} aria-label="Go back">←</button>
		</div>
	{/if}

	<h1 class:project-title={isProjectPage}>
		{#if isProjectPage}
			{title}
		{:else}
			<a href="/">{title}</a>
		{/if}
	</h1>

	{#if isProjectPage}
		<div class="right-button">
			<button aria-label="Information">ⓘ</button>
		</div>
	{/if}
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

	.header-container h1 {
		color: #fff;
		font-size: 2rem;
		line-height: 1;
		font-weight: 600;
		margin: 0;
		text-align: center;
		grid-column: 2;
	}

	.project-title {
		font-size: 1rem !important;
	}

	.header-container h1 a {
		text-decoration: none;
		color: #fff;
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
