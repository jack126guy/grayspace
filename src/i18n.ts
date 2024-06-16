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

export function getTextDirection(locale?: string): TextDirection | null {
	if (!locale) {
		return null;
	}
	const intlLocale = new Intl.Locale(locale) as LocaleWithTextInfo;
	if (intlLocale.getTextInfo) {
		return intlLocale.getTextInfo().direction;
	}
	return intlLocale.textInfo?.direction || null;
}

// Type definitions based on locale info proposal
// https://tc39.es/proposal-intl-locale-info/
// Note that the properties were changed to getters in January 2023
interface LocaleWithTextInfo extends Intl.Locale {
	getTextInfo?(): TextInfo;
	textInfo?: TextInfo;
}

interface TextInfo {
	direction: TextDirection;
}
