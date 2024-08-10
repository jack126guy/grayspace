import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { type AstroComponentFactory } from 'astro/runtime/server/index.js';
import { load, type CheerioAPI } from 'cheerio';

async function renderComponent(
	component: AstroComponentFactory,
	props?: Record<string, unknown>,
	slots?: Record<string, unknown>
): Promise<string> {
	const container = await AstroContainer.create();
	return await container.renderToString(component, { props, slots });
}

export async function renderToDocument(
	component: AstroComponentFactory,
	props?: Record<string, unknown>,
	slots?: Record<string, unknown>
): Promise<CheerioAPI> {
	return load(await renderComponent(component, props, slots));
}

export async function renderToFragment(
	component: AstroComponentFactory,
	props?: Record<string, unknown>,
	slots?: Record<string, unknown>
): Promise<CheerioAPI> {
	return load(await renderComponent(component, props, slots), null, false);
}
