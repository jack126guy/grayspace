import { getObjectKeys } from './object-keys';

export interface PageInfo {
	title?: string;
}

export interface PageInfoProps extends PageInfo {
	frontmatter?: PageInfo;
}

const pageInfoKeys = getObjectKeys<PageInfo>({
	title: true,
});

export function resolvePageInfoProps(props: PageInfoProps): PageInfo {
	const resolved: PageInfo = {};
	pageInfoKeys.forEach((k) => {
		resolved[k] = props.frontmatter?.[k] || props[k];
	});
	return resolved;
}
