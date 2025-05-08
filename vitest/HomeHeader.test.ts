import HomeHeader from '@/components/HomeHeader.astro';
import { renderToFragment } from './render';
import { describe, it, expect } from 'vitest';

describe('HomeHeader', () => {
	it('renders site logo', async () => {
		const localData = {
			site: {
				siteLogo: '/logo.png',
			},
		};

		const fragment = await renderToFragment(HomeHeader, { localData });

		const siteLogoImage = fragment('.home-site-logo img');
		expect(siteLogoImage.attr('src')).to.equal(localData.site.siteLogo);
	});

	it('does not render site logo without local data', async () => {
		const localData = { site: {} };

		const fragment = await renderToFragment(HomeHeader, { localData });

		const siteLogoContainer = fragment('.home-site-logo');
		expect(siteLogoContainer).to.have.lengthOf(0);
	});

	it('renders site name', async () => {
		const localData = {
			site: {
				siteName: 'Test Site',
			},
		};

		const fragment = await renderToFragment(HomeHeader, { localData });

		expect(fragment('.home-site-id').text()).to.contain(
			localData.site.siteName
		);
	});
});
