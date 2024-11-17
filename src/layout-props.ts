import { getObjectKeys } from './object-keys';

export interface GeneralLayoutProps extends GeneralLayoutOptions {
	title?: string;
	frontmatter?: GeneralLayoutOptions;
}

export interface GeneralLayoutOptions {
	title?: string;
}

const generalLayoutOptionsKeys = getObjectKeys<GeneralLayoutOptions>({
	title: true,
});

export function resolveGeneralLayoutOptions(
	props: GeneralLayoutProps
): GeneralLayoutOptions {
	const resolved: GeneralLayoutOptions = {};
	generalLayoutOptionsKeys.forEach((k) => {
		resolved[k] = props.frontmatter?.[k] || props[k];
	});
	return resolved;
}
