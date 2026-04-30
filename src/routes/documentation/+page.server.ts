import MarkdownIt from 'markdown-it';
import anchor from 'markdown-it-anchor';
import footnote from 'markdown-it-footnote';
import markdownItHighlightjs from 'markdown-it-highlightjs';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const md = new MarkdownIt({ html: true, linkify: true, typographer: true })
	.use(anchor)
	.use(footnote)
	.use(markdownItHighlightjs as (md: MarkdownIt) => void);

/** Documentation markdown links assets as static/foo; SvelteKit serves them as /foo */
function fixStaticPaths(markdown: string): string {
	return markdown.replace(/\]\(static\//g, '](/');
}

const DOC_MARKDOWN_PATH = join(process.cwd(), 'static/documentation/documentation.md');

/** Remove leading # Loops + byline; body title is rendered in +page.svelte */
function stripDocTitlePreamble(src: string): string {
	return src.replace(/^\s*#\s+Loops\s*\n+\s*by Rin Kim\s*(\r?\n)+/m, '');
}

function extractToc(markdown: string): { level: number; text: string; slug: string }[] {
	const tokens = md.parse(markdown, {});
	const toc: { level: number; text: string; slug: string }[] = [];
	let blockquoteDepth = 0;
	for (let i = 0; i < tokens.length; i++) {
		const token = tokens[i];
		if (token.type === 'blockquote_open') {
			blockquoteDepth++;
			continue;
		}
		if (token.type === 'blockquote_close') {
			blockquoteDepth = Math.max(0, blockquoteDepth - 1);
			continue;
		}
		if (token.type === 'heading_open' && blockquoteDepth === 0) {
			const level = Number(token.tag.slice(1));
			const idAttr = token.attrs?.find((a) => a[0] === 'id');
			const slug = idAttr?.[1];
			const inline = tokens[i + 1];
			if (slug && inline?.type === 'inline') {
				toc.push({ level, text: inline.content, slug });
			}
		}
	}
	return toc;
}

type SidebarItem = { kind: 'h1'; text: string; slug: string } | { kind: 'h2'; text: string; slug: string };

function buildSidebarNav(flat: { level: number; text: string; slug: string }[]): SidebarItem[] {
	const out: SidebarItem[] = [];
	for (const h of flat) {
		if (h.level > 2) continue;
		if (h.level === 1) {
			out.push({ kind: 'h1', text: h.text, slug: h.slug });
		} else {
			out.push({ kind: 'h2', text: h.text, slug: h.slug });
		}
	}
	return out;
}

export const load = () => {
	const raw = readFileSync(DOC_MARKDOWN_PATH, 'utf-8');
	const markdown = fixStaticPaths(stripDocTitlePreamble(raw));
	const toc = extractToc(markdown);
	const html = md.render(markdown);
	const sidebarNav = buildSidebarNav(toc);
	return { html, sidebarNav };
};
