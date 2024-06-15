import { type SiteInfo } from './site-info';
import { type AstroIntegration } from 'astro';
import { type Plugin } from 'vite';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export interface GrayspaceOptions {
	siteName: string;
	siteLogo?: string;
	favicon?: string;
	siteStyles?: string[];
	homeLink?: string;
	skipToMainText?: string;
}

export function integration(options: GrayspaceOptions): AstroIntegration {
	return {
		name: '@halfgray/grayspace',
		hooks: {
			'astro:config:setup': ({ config, updateConfig }) => {
				const siteInfo = buildSiteInfo(options);
				const siteStyleImports = (options.siteStyles || []).map((s) =>
					convertImport(s, config.root)
				);
				updateConfig({
					vite: {
						plugins: [
							siteConfigVirtualModulePlugin(
								siteInfo,
								siteStyleImports
							),
						],
					},
				});
			},
		},
	};
}

function buildSiteInfo(options: GrayspaceOptions): SiteInfo {
	return {
		homeLink: import.meta.env.BASE_URL,
		skipToMainText: 'Skip to main content',
		...options,
	};
}

function convertImport(id: string, projectRoot: URL): string {
	return id.startsWith('.') ? resolve(fileURLToPath(projectRoot), id) : id;
}

function siteConfigVirtualModulePlugin(
	siteInfo: SiteInfo,
	siteStyleImports: string[]
): Plugin {
	const virtualModules: Record<string, string> = {
		'virtual:grayspace/site-info': `export default ${JSON.stringify(siteInfo)}`,
		'virtual:grayspace/site-styles': siteStyleImports
			.map((c) => `import ${JSON.stringify(c)};`)
			.join(''),
	};
	return {
		name: 'vite-plugin-grayspace-site-config',
		resolveId: (id): string | null => {
			if (id in virtualModules) {
				return '\0' + id;
			}
			return null;
		},
		load: (id): string | null => {
			if (id.startsWith('\0')) {
				const moduleId = id.substring(1);
				if (moduleId in virtualModules) {
					return virtualModules[moduleId];
				}
			}
			return null;
		},
	};
}
