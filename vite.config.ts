import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		fs: {
			// Allow serving files from the static directory
			allow: ['static']
		}
	},
	// Ensure the publicDir path is correct
	publicDir: 'static'
});
