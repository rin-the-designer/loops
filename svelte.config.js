import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto handles detecting the deployment platform automatically
		adapter: adapter(),

		// Define paths for assets
		paths: {
			base: '',
			assets: ''
		},

		// Define where static files are located
		files: {
			assets: 'static'
		}
	}
};

export default config;
