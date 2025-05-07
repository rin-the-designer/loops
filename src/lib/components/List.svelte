<script lang="ts">
	interface Project {
		title: string;
		slug: string;
		route: string;
		thumbnail: string;
		guide: string;
		excerpt: string;
		description: string;
	}
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
	}

	.gallery-item:hover {
		background: #333;
		box-shadow: 0 1px 0 0 #fff;
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
		background: transparent;
		padding: 1rem 0;
		gap: 0.5rem;
		height: 100%;
		transition: background 0.2s ease;
	}

	.gallery-item:hover .caption-container {
		background: transparent;
	}

	.caption {
		color: #fff;
		font-size: 0.875rem;
		font-weight: 500;
		padding: 0 1rem;
		transition: color 0.2s ease;
	}

	.gallery-item:hover .caption {
		color: #fff;
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
