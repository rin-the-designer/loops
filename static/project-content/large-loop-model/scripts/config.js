let configLoaded = false;
let configPromise = null;

async function loadConfig() {
	if (configLoaded && window.CONFIG) {
		return window.CONFIG;
	}

	if (configPromise) {
		return configPromise;
	}

	configPromise = fetch('/api/config')
		.then((res) => {
			if (!res.ok) {
				throw new Error('Failed to load configuration');
			}
			return res.json();
		})
		.then((data) => {
			window.CONFIG = {
				supabase: data.supabase,
				apiEndpoint: '/api/generate'
			};
			configLoaded = true;
			return window.CONFIG;
		})
		.catch((error) => {
			console.error('Error loading config:', error);
			throw error;
		});

	return configPromise;
}

// Export for use in script.js
if (typeof window !== 'undefined') {
	window.loadConfig = loadConfig;
}
