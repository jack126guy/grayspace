import { type SiteInfo } from './site-info';
import type { AstroConfig, AstroIntegration } from 'astro';
import { type Plugin } from 'vite';

export interface GrayspaceOptions {
	siteName: string;
	siteLogo?: string;
	favicon?: string;
	homeLink?: string;
	skipToMainText?: string;
}

export function integration(options: GrayspaceOptions): AstroIntegration {
	return {
		name: '@halfgray/grayspace',
		hooks: {
			'astro:config:setup': ({ config, updateConfig }) => {
				const siteInfo = buildSiteInfo(options, config);
				updateConfig({
					vite: {
						plugins: [siteInfoVirtualModulePlugin(siteInfo)],
					},
				});
			},
		},
	};
}

function buildSiteInfo(
	options: GrayspaceOptions,
	astroConfig: AstroConfig
): SiteInfo {
	return {
		lang: astroConfig.i18n?.defaultLocale || '',
		...options,
	};
}

function siteInfoVirtualModulePlugin(siteInfo: SiteInfo): Plugin {
	const moduleId = 'virtual:grayspace/site-info';
	const resolvedModuleId = '\0' + moduleId;
	return {
		name: 'vite-plugin-grayspace-site-info',
		resolveId: (id): string | null => {
			if (id === moduleId) {
				return resolvedModuleId;
			}
			return null;
		},
		load: (id): string | null => {
			if (id === resolvedModuleId) {
				return `export default ${JSON.stringify(siteInfo)};`;
			}
			return null;
		},
	};
}
