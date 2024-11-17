declare module 'virtual:grayspace/site-info' {
	import { SiteInfo } from './site-info';
	const siteInfo: SiteInfo;
	export default siteInfo;
}
declare module 'virtual:grayspace/site-styles' {}
declare module 'virtual:grayspace/components/*' {
	import { type AstroComponentFactory } from 'astro/runtime/server/index.js';
	const Component: AstroComponentFactory;
	export default Component;
}
