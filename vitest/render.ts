import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { type AstroComponentFactory } from 'astro/runtime/server/index.js';
import { load as loadDocument, type CheerioAPI } from 'cheerio';

export async function renderToDocument(
	component: AstroComponentFactory,
	props?: Record<string, unknown>,
	slots?: Record<string, unknown>
): Promise<CheerioAPI> {
	const container = await AstroContainer.create();
	const rendered = await container.renderToString(component, {
		props,
		slots,
	});
	return loadDocument(rendered);
}
