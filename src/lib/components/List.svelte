<script lang="ts">
	import type { Project } from '$lib/data/ProjectData';
	export let project: Project;
</script>

<a href={project.route} class="gallery-item">
	<div class="image-container">
		<img src={project.thumbnail} alt={project.title} />
	</div>
	<div class="caption-container">
		<div class="caption">{project.title}</div>
		<div class="excerpt">{project.excerpt}</div>
	</div>
</a>

<style>
	.gallery-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-decoration: none;
		background: #181818;
		overflow: hidden;
		transition: all 0.2s ease;
		/* Grid lines: spread fills the 1px grid gap, so empty cells stay black */
		box-shadow: 0 0 0 1px #404040;
	}

	.gallery-item:hover {
		background: #333;
		box-shadow:
			0 1px 0 0 #fff,
			0 0 0 1px #404040;
	}

	.image-container {
		width: 100%;
		aspect-ratio: 1/1;
		background: #111;
		display: flex;
		justify-content: center;
		align-items: center;
		transition: background 0.2s ease;
	}

	.gallery-item:hover .image-container {
		background: #222;
	}

	.gallery-item img {
		width: 60%;
		aspect-ratio: 1/1;
		object-fit: cover;
		display: block;
		transition: width 0.2s ease;
	}

	.gallery-item:hover img {
		width: 64%;
	}

	.caption-container {
		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: start;
		width: 100%;
		padding: 1rem 0;
		gap: 0.5rem;
		height: 100%;
	}

	.caption {
		color: #fff;
		font-size: 0.875rem;
		font-weight: 500;
		padding: 0 1rem;
	}

	.excerpt {
		color: #fff;
		font-size: 0.75rem;
		line-height: 1.4;
		opacity: 0.5;
		padding: 0 1rem;
		transition: opacity 0.2s ease;
	}

	.gallery-item:hover .excerpt {
		opacity: 0.7;
	}
</style>
