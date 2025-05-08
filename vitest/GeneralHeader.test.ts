import GeneralHeader from '@/components/GeneralHeader.astro';
import { renderToFragment } from './render';
import { describe, it, expect } from 'vitest';

describe('GeneralHeader', () => {
	it('renders container', async () => {
		const localData = { site: {} };

		const fragment = await renderToFragment(GeneralHeader, { localData });

		const container = fragment(':root');
		expect(container.prop('tagName')).to.equal('DIV');
	});

	it('renders home link', async () => {
		const localData = {
			site: {
				homeLink: '/',
			},
		};

		const fragment = await renderToFragment(GeneralHeader, { localData });

		const homeLinkElement = fragment('.site-id a');
		expect(homeLinkElement.attr('href')).to.equal(localData.site.homeLink);
	});

	it('renders site logo', async () => {
		const localData = {
			site: {
				siteLogo: '/logo.png',
			},
		};

		const fragment = await renderToFragment(GeneralHeader, { localData });

		const siteLogoImage = fragment('.site-logo img');
		expect(siteLogoImage.attr('src')).to.equal(localData.site.siteLogo);
	});

	it('does not render site logo without local data', async () => {
		const localData = { site: {} };

		const fragment = await renderToFragment(GeneralHeader, { localData });

		const siteLogoContainer = fragment('.site-logo');
		expect(siteLogoContainer).to.have.lengthOf(0);
	});

	it('renders site name', async () => {
		const localData = {
			site: {
				siteName: 'Test Site',
			},
		};

		const fragment = await renderToFragment(GeneralHeader, { localData });

		expect(fragment('.site-id').text()).to.contain(localData.site.siteName);
	});
});
