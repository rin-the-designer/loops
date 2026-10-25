import MarkdownIt from 'markdown-it';
import anchor from 'markdown-it-anchor';
import footnote from 'markdown-it-footnote';
import documentationSource from './documentation.md?raw';

const md = new MarkdownIt({ html: true, linkify: true, typographer: true }).use(anchor).use(footnote);

/** Documentation markdown links assets as static/foo; SvelteKit serves them as /foo */
const markdown = documentationSource.replace(/\]\(static\//g, '](/');

const html = md.render(markdown);

/** h1 and h2 headings for the sidebar */
const sidebarNav = md.parse(markdown, {}).flatMap((token, i, tokens) => {
	const level = Number(token.tag.slice(1));
	const slug = token.attrGet('id');
	return token.type === 'heading_open' && level <= 2 && slug
		? [{ level, text: tokens[i + 1].content, slug }]
		: [];
});

export const load = () => ({ html, sidebarNav });
