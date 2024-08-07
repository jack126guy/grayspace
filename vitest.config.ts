import { getViteConfig } from 'astro/config';

export default getViteConfig({
	test: {
		include: ['vitest/**/*.test.ts'],
		setupFiles: ['vitest/setup.ts'],
	},
});
