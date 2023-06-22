import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		name: 'arne kalender',
		locale: 'de-DE', 
		version: '0.0.9'
	}
});

export default app