<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import { page } from '$app/stores';

	$: hideHeader = ['/projects/', '/exhibition/', '/documentation'].some((p) =>
		$page.url.pathname.startsWith(p)
	);
</script>

{#if !hideHeader}
	<Header />
{/if}

<slot />
