import y18n, { type Y18N } from 'y18n';
import { resolveRelativePath } from './fs';

export function i18n(locale?: string): Y18N {
	return y18n({
		directory: resolveRelativePath('./locales', import.meta.url),
		locale,
	});
}
