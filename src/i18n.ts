import y18n, { type Y18N } from 'y18n';
import { resolveRelativePath } from './fs';

export type TextDirection = 'ltr' | 'rtl';

export interface I18n {
	t(str: string): string;
}

export function getI18n(locale?: string): I18n {
	return new InternalI18n(locale);
}

class InternalI18n implements I18n {
	private y18n: Y18N;

	constructor(locale?: string) {
		this.y18n = y18n({
			directory: resolveRelativePath('./locales', import.meta.url),
			updateFiles: false,
			locale,
		});
	}

	t(str: string): string {
		return this.y18n.__(str);
	}
}
