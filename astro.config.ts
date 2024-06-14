import { defineConfig } from 'astro/config';
import grayspace from '.';

export default defineConfig({
	i18n: {
		defaultLocale: 'en',
		locales: ['en'],
	},
	integrations: [
		grayspace({
			siteName: 'Grayspace Demo',
		}),
	],
});
