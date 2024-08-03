export interface GeneralLayoutProps extends GeneralLayoutOptions {
	title?: string;
	frontmatter?: GeneralLayoutOptions;
}

export interface GeneralLayoutOptions {
	title?: string;
}

type KeysEnum<T> = { [K in keyof Required<T>]: true };

const generalLayoutOptionsKeys: KeysEnum<GeneralLayoutOptions> = {
	title: true,
};

export function resolveGeneralLayoutOptions(
	props: GeneralLayoutProps
): GeneralLayoutOptions {
	const resolved: GeneralLayoutOptions = {};
	Object.keys(generalLayoutOptionsKeys).forEach((k) => {
		const option = k as keyof GeneralLayoutOptions;
		resolved[option] = props.frontmatter?.[option] || props[option];
	});
	return resolved;
}
