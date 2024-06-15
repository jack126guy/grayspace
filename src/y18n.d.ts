// Barebones type definition because it is not actually provided by y18n v5
// Discussion: https://github.com/yargs/y18n/issues/131
declare module 'y18n' {
	interface Config {
		directory?: string;
		updateFiles?: boolean;
		locale?: string;
		fallbackToLanguage?: boolean;
	}

	export interface Y18N {
		__(str: string, ...args: string[]): string;
	}

	export default function (config?: Config): Y18N;
}
