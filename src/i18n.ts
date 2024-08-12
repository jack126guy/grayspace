import y18n, { type Y18N } from 'y18n';
import { resolveRelativePath } from './fs';

export type TextDirection = 'ltr' | 'rtl';

export function translate(locale?: string): Y18N {
	return y18n({
		directory: resolveRelativePath('./locales', import.meta.url),
		updateFiles: false,
		locale,
	});
}
