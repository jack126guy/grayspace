import { type SiteInfo } from './site-info';
import { type PageInfo } from './page-info';
import { defineMiddleware } from 'astro:middleware';

export interface GrayspaceData {
	site: SiteInfo;
	page: PageInfo;
}

export const onRequest = defineMiddleware((context, next) => {
	// Define a property with data to be set within Grayspace layouts
	// Inspired by Astro Starlight
	const state: { data: GrayspaceData | null } = { data: null };
	Object.defineProperty(context.locals, 'grayspace', {
		get() {
			if (!state.data) {
				throw new Error(
					'locals.grayspace can only be accessed from within a Grayspace page'
				);
			}
			return state.data;
		},
		set(data: GrayspaceData) {
			state.data = data;
		},
	});

	return next();
});
