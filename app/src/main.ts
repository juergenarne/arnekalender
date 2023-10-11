import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		name: 'smart cal',
		locale: 'de-DE', 
		version: '0.1.0'
	}
});

export default app