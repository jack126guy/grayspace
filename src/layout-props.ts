export interface GeneralLayoutProps {
	title?: string;
	frontmatter?: {
		title?: string;
	};
}

export function getTitle(props: GeneralLayoutProps): string {
	return props.frontmatter?.title || props.title || '';
}
