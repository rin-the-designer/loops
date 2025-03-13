<script lang="ts">
	interface Project {
		title: string;
		route?: string;
	}

	export let project: Project;
</script>

<div class="list-item">
	<h2><a href={project.route}>{project.title}</a></h2>
</div>

<style>
	.list-item {
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		justify-content: left;
		padding: 1rem;
		border-bottom: 1px solid #ffffff30;
	}

	h2 {
		font-size: 1.5rem;
		font-weight: 600;
		color: #fff;
	}

	a {
		text-decoration: none;
		color: #fff;
	}

	.list-item:hover {
		background-color: #ffffff0d;
	}
</style>
