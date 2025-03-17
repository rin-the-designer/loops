<script lang="ts">
	interface Project {
		title: string;
		slug: string;
		route: string;
		guide: string;
		description: string;
	}

	export let project: Project;
</script>

<a href={project.route}
	><div class="list-item">
		<h2>{project.title}</h2>
	</div></a
>

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
