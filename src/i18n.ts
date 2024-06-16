import y18n, { type Y18N } from 'y18n';

export function i18n(locale?: string): Y18N {
	return y18n({ directory: import.meta.dirname + '/locales', locale });
}
