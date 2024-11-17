import { getObjectKeys } from './object-keys';
import { type SiteInfo } from './site-info';
import { resolveRelativePath } from './fs';
import { type AstroIntegration } from 'astro';
import { type Plugin } from 'vite';

export interface GrayspaceOptions {
	siteName: string;
	siteLogo?: string;
	favicon?: string;
	siteStyles?: string[];
	homeLink?: string;
	titleSeparator?: string;
	components?: {
		HeadExtra?: string;
		HomeFooter?: string;
		GeneralFooter?: string;
	};
}

const overrideableComponents = getObjectKeys<GrayspaceOptions['components']>({
	HeadExtra: true,
	HomeFooter: true,
	GeneralFooter: true,
});

export function integration(options: GrayspaceOptions): AstroIntegration {
	return {
		name: '@halfgray/grayspace',
		hooks: {
			'astro:config:setup': ({ config, updateConfig }) => {
				const siteInfo = buildSiteInfo(options);
				const siteStyleImports = (options.siteStyles || []).map((s) =>
					convertImport(s, config.root)
				);
				const componentImports: Record<string, string | null> = {};
				overrideableComponents.forEach((c) => {
					componentImports[c] = options.components?.[c]
						? convertImport(options.components[c], config.root)
						: null;
				});
				updateConfig({
					vite: {
						plugins: [
							siteConfigVirtualModulePlugin(
								siteInfo,
								siteStyleImports,
								componentImports
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
		siteName: options.siteName,
		siteLogo: options.siteLogo,
		favicon: options.favicon || options.siteLogo,
		homeLink: options.homeLink || import.meta.env.BASE_URL,
		titleSeparator: options.titleSeparator || ' | ',
	};
}

function convertImport(id: string, projectRoot: URL): string {
	return id.startsWith('.') ? resolveRelativePath(id, projectRoot) : id;
}

function siteConfigVirtualModulePlugin(
	siteInfo: SiteInfo,
	siteStyleImports: string[],
	componentImports: Record<string, string | null>
): Plugin {
	const virtualModules: Record<string, string> = {
		'virtual:grayspace/site-info': `export default ${JSON.stringify(siteInfo)}`,
		'virtual:grayspace/site-styles': siteStyleImports
			.map((c) => `import ${JSON.stringify(c)};`)
			.join(''),
	};
	Object.entries(componentImports).forEach(([name, importSpec]) => {
		virtualModules[`virtual:grayspace/components/${name}`] = importSpec
			? `export { default } from ${JSON.stringify(importSpec)}`
			: `export { ${name} as default } from '@halfgray/grayspace/components'`;
	});
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
					return virtualModules[moduleId]!;
				}
			}
			return null;
		},
	};
}
