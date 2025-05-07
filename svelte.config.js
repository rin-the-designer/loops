import vercelAdapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// Use the Vercel adapter specifically for better integration
		adapter: vercelAdapter({
			// Vercel-specific configuration
			external: ['static/**'],
			runtime: 'nodejs18.x',
			assets: true,
			precompress: true
		}),

		// Correctly map the files for Vercel deployment
		files: {
			assets: 'static'
		}
	}
};

export default config;
