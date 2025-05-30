import { defineConfig } from 'astro/config';
import grayspace from '.';
import { fileURLToPath } from 'node:url';

export default defineConfig({
	i18n: {
		defaultLocale: 'en',
		locales: ['en', 'eo'],
	},
	integrations: [
		grayspace({
			siteName: 'Grayspace Demo',
			siteLogo: '/logo.png',
			titleSeparator: ' - ',
			components: {
				HeadExtra: './src/demo-overrides/HeadExtra.astro',
			},
		}),
	],
	vite: {
		resolve: {
			alias: {
				'@': fileURLToPath(new URL('./src', import.meta.url)),
			},
		},
	},
});
