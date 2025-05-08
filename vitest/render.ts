import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { type AstroComponentFactory } from 'astro/runtime/server/index.js';
import { load, type CheerioAPI } from 'cheerio';
import { type GrayspaceData } from '@/locals';

interface RenderComponentOptions {
	props?: Record<string, unknown>;
	slots?: Record<string, unknown>;
	localData?: PartialGrayspaceData;
}

interface PartialGrayspaceData {
	site?: Partial<GrayspaceData['site']>;
	page?: Partial<GrayspaceData['page']>;
}

async function renderComponent(
	component: AstroComponentFactory,
	options?: RenderComponentOptions
): Promise<string> {
	const container = await AstroContainer.create();
	const { props, slots, localData } = options || {};
	return await container.renderToString(component, {
		props,
		slots,
		locals: { grayspace: localData as GrayspaceData },
	});
}

export async function renderToDocument(
	component: AstroComponentFactory,
	options?: RenderComponentOptions
): Promise<CheerioAPI> {
	return load(await renderComponent(component, options));
}

export async function renderToFragment(
	component: AstroComponentFactory,
	options?: RenderComponentOptions
): Promise<CheerioAPI> {
	return load(await renderComponent(component, options), null, false);
}
