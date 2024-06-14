/// <reference types="astro/client" />
declare module 'virtual:grayspace/site-info' {
	import { SiteInfo } from './site-info';
	const siteInfo: SiteInfo;
	export default siteInfo;
}
