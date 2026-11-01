<script lang="ts">
	import { onMount } from 'svelte';

	let { data } = $props();

	type NavItem = (typeof data.sidebarNav)[number];

	/** h1 rows with their h2 children, one collapsible group each */
	let sections = $derived(
		data.sidebarNav.reduce<(NavItem & { children: NavItem[] })[]>((acc, item) => {
			if (item.level === 1) acc.push({ ...item, children: [] });
			else acc.at(-1)?.children.push(item);
			return acc;
		}, [])
	);

	/** Sidebar slug to highlight (h1 / h2 only; h3 in the document maps to parent h2 or h1) */
	let activeSlug = $state('');

	const SCROLL_LINE = 120;

	/** Map a heading id to the closest sidebar id (h3 → preceding h2, else h1) */
	function navSlugForHeadingId(headingId: string): string {
		const root = document.querySelector('.doc-content');
		if (!root || !headingId) return headingId;
		const el = document.getElementById(headingId);
		if (!el || !root.contains(el)) return headingId;
		const nodes = [...root.querySelectorAll<HTMLElement>('h1[id], h2[id], h3[id]')];
		const idx = nodes.findIndex((n) => n.id === headingId);
		if (idx === -1) return headingId;
		const current = nodes[idx];
		if (current.tagName === 'H3') {
			for (let j = idx - 1; j >= 0; j--) {
				const tag = nodes[j].tagName;
				if (tag === 'H2' || tag === 'H1') return nodes[j].id;
			}
		}
		return headingId;
	}

	function updateActiveFromDocument() {
		const root = document.querySelector('.doc-content');
		if (!root) return;
		const line = SCROLL_LINE;
		const intro = document.getElementById('introduction');
		if (intro && intro.getBoundingClientRect().top > line) {
			activeSlug = '';
			return;
		}
		const nodes = root.querySelectorAll<HTMLElement>('h1[id], h2[id], h3[id]');
		if (nodes.length === 0) return;
		let id = nodes[0].id;
		for (const el of nodes) {
			if (el.getBoundingClientRect().top <= line) id = el.id;
		}
		if (id) activeSlug = navSlugForHeadingId(id);
	}

	onMount(() => {
		const fromHash = window.location.hash.slice(1);
		if (fromHash) {
			activeSlug = fromHash === 'loops' ? '' : navSlugForHeadingId(fromHash);
		} else {
			requestAnimationFrame(() => updateActiveFromDocument());
		}

		const onScrollOrResize = () => updateActiveFromDocument();
		const onHashChange = () => {
			const h = window.location.hash.slice(1);
			if (h) activeSlug = h === 'loops' ? '' : navSlugForHeadingId(h);
		};
		window.addEventListener('scroll', onScrollOrResize, { passive: true });
		window.addEventListener('resize', onScrollOrResize, { passive: true });
		window.addEventListener('hashchange', onHashChange);

		return () => {
			window.removeEventListener('scroll', onScrollOrResize);
			window.removeEventListener('resize', onScrollOrResize);
			window.removeEventListener('hashchange', onHashChange);
		};
	});
</script>

<svelte:head>
	<title>Documentation — Loops</title>
</svelte:head>

<div class="doc-layout">
	<aside class="toc-sidebar">
		<nav aria-label="Table of contents">
			<p class="toc-title">Table of Contents</p>
			<ul class="toc-list">
				{#each sections as section (section.slug)}
					<li class="toc-item toc-h1">
						{#if section.children.length}
							<!-- Section holding the active heading opens itself while scrolling -->
							<details
								open={section.slug === activeSlug ||
									section.children.some((c) => c.slug === activeSlug)}
							>
								<summary>{@render link(section)}</summary>
								<ul class="toc-list">
									{#each section.children as child (child.slug)}
										<li class="toc-item toc-h2">{@render link(child)}</li>
									{/each}
								</ul>
							</details>
						{:else}
							{@render link(section)}
						{/if}
					</li>
				{/each}
			</ul>
		</nav>
		<a class="toc-back" href="/">← Back to Project</a>
	</aside>
	{#snippet link(item: NavItem)}
		<a
			class="toc-link"
			class:toc-link-active={item.slug === activeSlug}
			aria-current={item.slug === activeSlug ? 'location' : undefined}
			href="#{item.slug}">{item.text}</a
		>
	{/snippet}
	<div class="doc-main">
		<article class="doc-content">
			<header class="doc-title" id="loops" tabindex="-1">
				<h1 class="doc-title-heading">Loops</h1>
				<p class="doc-title-byline">by Rin Kim</p>
			</header>
			<div class="doc-body">
				{@html data.html}
			</div>
		</article>
	</div>
</div>

<style>
	.doc-layout {
		display: flex;
		align-items: flex-start;
		width: 100%;
		box-sizing: border-box;
		color: #fff;
	}

	.toc-sidebar {
		position: sticky;
		top: 0;
		display: flex;
		flex-direction: column;
		align-self: flex-start;
		flex: 0 0 16rem;
		box-sizing: border-box;
		min-height: 100vh;
		max-height: 100vh;
		overflow-y: auto;
		padding: 0 0.5rem;
		border-right: 1px solid rgba(255, 255, 255, 0.18);
		font-size: 0.8125rem;
		line-height: 1.4;
		scrollbar-width: none;
		-ms-overflow-style: none;
	}

	.toc-sidebar::-webkit-scrollbar {
		display: none;
	}

	.doc-main {
		flex: 1;
		min-width: 0;
		display: flex;
		justify-content: center;
		box-sizing: border-box;
		padding: 2rem 1.5rem 4rem;
	}

	.toc-title {
		margin: 1rem 0 0.75rem;
		font-size: 0.6875rem;
		font-weight: 600;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: rgba(255, 255, 255, 0.55);
	}

	.toc-list {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.toc-item {
		margin: 0.25rem;
	}

	.toc-h1 {
		font-weight: 600;
	}

	/* 1rem clears the chevron, 1rem more indents under the section name */
	.toc-item.toc-h2 {
		margin-left: 2rem;
		font-weight: 400;
	}

	summary {
		display: flex;
		align-items: center;
		list-style: none;
		cursor: pointer;
	}

	summary::-webkit-details-marker {
		display: none;
	}

	summary::before {
		content: '›';
		flex: 0 0 1rem;
		text-align: center;
		color: rgba(255, 255, 255, 0.55);
		transition: transform 0.15s ease;
	}

	details[open] > summary::before {
		transform: rotate(90deg);
	}

	summary > .toc-link {
		flex: 1;
	}

	/* h1 without children: line up with the chevron rows */
	.toc-h1 > .toc-link {
		margin-left: 1rem;
	}

	.toc-link {
		display: block;
		box-sizing: border-box;
		padding: 0.3rem 0.45rem;
		border: none;
		border-radius: 6px;
		color: rgba(255, 255, 255, 0.82);
		text-decoration: none;
		transition:
			background 0.15s ease,
			color 0.15s ease;
	}

	.toc-link:hover {
		background: rgba(255, 255, 255, 0.1);
		color: #fff;
	}

	/* Pinned to the sidebar bottom; follows the list when it overflows */
	.toc-sidebar nav {
		margin-bottom: 1rem;
	}

	/* Same look as the home page hero links */
	.toc-back {
		align-self: flex-start;
		margin: auto 0 1rem;
		padding: 0.25em 0.5em;
		background: #fff;
		color: #000;
		text-decoration: none;
		transition: background 0.2s ease;
	}

	.toc-back:hover {
		background: #ff8800;
	}

	.toc-link.toc-link-active {
		background: rgba(255, 255, 255, 0.14);
		color: #fff;
	}

	.toc-link.toc-link-active:hover {
		background: rgba(255, 255, 255, 0.18);
		color: #fff;
	}

	.doc-content {
		width: 100%;
		max-width: 50rem;
		font-size: 1rem;
		line-height: 1.65;
	}

	.doc-title {
		margin: 0 0 0.25rem;
		padding: 0 0 1.5rem;
		text-align: center;
		scroll-margin-top: 1.5rem;
	}

	.doc-title-heading {
		margin: 0;
		font-size: 2.25rem;
		font-weight: 600;
		line-height: 1.15;
		letter-spacing: -0.02em;
		color: #fff;
	}

	.doc-title-byline {
		margin: 0.45rem 0 0;
		font-size: 0.9375rem;
		font-weight: 400;
		color: rgba(255, 255, 255, 0.55);
	}

	.doc-body {
		min-width: 0;
	}

	.doc-content :global(h1) {
		font-size: 2rem;
		font-weight: 600;
		margin: 2.25rem 0 1rem;
		scroll-margin-top: 1.5rem;
	}

	.doc-content :global(h1:not([id='loops'])) {
		margin-top: 2.5rem;
		padding-top: 2.25rem;
		border-top: 1px solid rgba(255, 255, 255, 0.2);
	}

	.doc-content :global(h2) {
		font-size: 1.5rem;
		font-weight: 600;
		margin: 2rem 0 0.75rem;
		scroll-margin-top: 1.5rem;
	}

	.doc-content :global(h3) {
		font-size: 1.2rem;
		font-weight: 600;
		margin: 1.5rem 0 0.5rem;
		scroll-margin-top: 1.5rem;
	}

	.doc-content :global(h4) {
		font-size: 1.05rem;
		font-weight: 600;
		margin: 1.25rem 0 0.5rem;
		scroll-margin-top: 1.5rem;
	}

	.doc-content :global(p) {
		margin: 0.75rem 0;
	}

	.doc-content :global(ul),
	.doc-content :global(ol) {
		margin: 0.75rem 0;
		padding-left: 1.35rem;
	}

	.doc-content :global(li) {
		margin: 0.35rem 0;
	}

	.doc-content :global(a) {
		color: #9ec5ff;
		text-decoration: underline;
		text-underline-offset: 0.15em;
	}

	.doc-content :global(a:hover) {
		color: #c5d9ff;
	}

	.doc-content :global(blockquote) {
		margin: 1rem 0;
		padding: 1rem;
		background: rgba(255, 255, 255, 0.1);
		border-radius: 8px;
		text-align: center;
	}

	.doc-content :global(blockquote h4) {
		margin: 0 0 1rem 0;
	}

	.doc-content :global(blockquote p) {
		margin: 0;
		font-size: 0.875rem;
		opacity: 0.8;
	}

	.doc-content :global(code) {
		font-size: 1rem;
		padding: 0.12em 0.35em;
		border-radius: 4px;
		background: rgba(255, 255, 255, 0.2);
	}

	.doc-content :global(pre) {
		overflow-x: auto;
		padding: 1rem;
		border-radius: 8px;
		background: rgba(255, 255, 255, 0.1);
		font-size: 0.875rem;
	}

	.doc-content :global(pre code) {
		padding: 0;
		background: none;
	}

	.doc-content :global(img) {
		max-width: 100%;
		height: auto;
		border-radius: 4px;
		margin: 1rem 0;
	}

	.doc-content :global(hr) {
		border: none;
		border-top: 1px solid rgba(255, 255, 255, 0.2);
		margin: 2rem 0;
	}

	.doc-content :global(.footnote-ref),
	.doc-content :global(.footnote-backref) {
		text-decoration: none;
	}

	.doc-content :global(.footnotes) {
		margin-top: 3rem;
		padding-top: 1.5rem;
		border-top: 1px solid rgba(255, 255, 255, 0.15);
		font-size: 0.9rem;
	}

	@media (max-width: 860px) {
		.doc-layout {
			flex-direction: column;
		}

		.toc-sidebar {
			position: static;
			flex: none;
			width: 100%;
			min-height: unset;
			max-height: none;
			border-right: none;
			border-bottom: 1px solid rgba(255, 255, 255, 0.18);
			padding: 1rem 1.25rem 1.25rem 1.5rem;
		}

		.doc-main {
			padding: 1.25rem 1.5rem 3rem;
		}

		.toc-list {
			columns: 2;
			column-gap: 1.5rem;
		}

		.toc-item {
			break-inside: avoid;
		}
	}
</style>
