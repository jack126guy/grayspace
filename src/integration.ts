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
		HeadExtra?: ComponentOverride;
		GeneralHeader?: ComponentOverride;
		GeneralFooter?: ComponentOverride;
		HomeHeader?: ComponentOverride;
		HomeFooter?: ComponentOverride;
		Article?: ComponentOverride;
	};
}

type ComponentOverride = string | [string, string];
type ComponentImport = [string, string];

const overrideableComponents = getObjectKeys<GrayspaceOptions['components']>({
	HeadExtra: true,
	GeneralHeader: true,
	GeneralFooter: true,
	HomeHeader: true,
	HomeFooter: true,
	Article: true,
});

export function integration(options: GrayspaceOptions): AstroIntegration {
	return {
		name: '@halfgray/grayspace',
		hooks: {
			'astro:config:setup': ({ config, updateConfig, addMiddleware }) => {
				const siteInfo = buildSiteInfo(options);
				const siteStyleImports = buildSiteStyleImports(
					options.siteStyles,
					config.root
				);
				const componentImports: Record<string, ComponentImport> =
					buildComponentImports(options.components, config.root);
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
				addMiddleware({
					entrypoint: '@halfgray/grayspace/locals',
					order: 'pre',
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

function buildSiteStyleImports(
	siteStyles: string[] | undefined,
	projectRoot: URL
): string[] {
	return (siteStyles || []).map((s) => convertImport(s, projectRoot));
}

function buildComponentImports(
	overrides: Record<string, ComponentOverride> | undefined,
	projectRoot: URL
): Record<string, ComponentImport> {
	overrides = overrides || {};
	const imports: Record<string, ComponentImport> = {};
	overrideableComponents.forEach((c) => {
		if (typeof overrides[c] === 'string') {
			imports[c] = [convertImport(overrides[c], projectRoot), 'default'];
		} else if (overrides[c]) {
			imports[c] = [
				convertImport(overrides[c][0], projectRoot),
				overrides[c][1],
			];
		} else {
			imports[c] = ['@halfgray/grayspace/components', c];
		}
	});
	return imports;
}

function convertImport(id: string, projectRoot: URL): string {
	return id.startsWith('.') ? resolveRelativePath(id, projectRoot) : id;
}

function siteConfigVirtualModulePlugin(
	siteInfo: SiteInfo,
	siteStyleImports: string[],
	componentImports: Record<string, ComponentImport>
): Plugin {
	const virtualModules: Record<string, string> = {
		'virtual:grayspace/site-info': `export default ${JSON.stringify(siteInfo)}`,
		'virtual:grayspace/site-styles': siteStyleImports
			.map((c) => `import ${JSON.stringify(c)};`)
			.join(''),
	};
	Object.entries(componentImports).forEach(([c, i]) => {
		const exportName =
			i[1] === 'default' ? 'default' : `${i[1]} as default`;
		virtualModules[`virtual:grayspace/components/${c}`] =
			`export { ${exportName} } from ${JSON.stringify(i[0])}`;
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
