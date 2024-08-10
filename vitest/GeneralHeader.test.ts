import GeneralHeader from '@/components/GeneralHeader.astro';
import { renderToFragment } from './render';
import { describe, it, expect } from 'vitest';

describe('GeneralHeader', () => {
	it('renders container', async () => {
		const fragment = await renderToFragment(GeneralHeader);

		const container = fragment(':root');
		expect(container.prop('tagName')).to.equal('DIV');
	});

	it('renders home link', async () => {
		const homeLink = '/';

		const fragment = await renderToFragment(GeneralHeader, { homeLink });

		const homeLinkElement = fragment('.site-id a');
		expect(homeLinkElement.attr('href')).to.equal(homeLink);
	});

	it('renders site logo', async () => {
		const siteLogo = '/logo.png';

		const fragment = await renderToFragment(GeneralHeader, { siteLogo });

		const siteLogoImage = fragment('.site-logo img');
		expect(siteLogoImage.attr('src')).to.equal(siteLogo);
	});

	it('does not render site logo without prop', async () => {
		const fragment = await renderToFragment(GeneralHeader);

		const siteLogoContainer = fragment('.site-logo');
		expect(siteLogoContainer).to.have.lengthOf(0);
	});

	it('renders site name', async () => {
		const siteName = 'Test Site';

		const fragment = await renderToFragment(GeneralHeader, { siteName });

		expect(fragment('.site-id').text()).to.contain(siteName);
	});
});
