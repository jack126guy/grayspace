import HomeSiteId from '@/components/HomeSiteId.astro';
import { renderToFragment } from './render';
import { describe, it, expect } from 'vitest';

describe('HomeSiteId', () => {
	it('renders container', async () => {
		const fragment = await renderToFragment(HomeSiteId);

		const container = fragment(':root');
		expect(container.prop('tagName')).to.equal('DIV');
	});

	it('renders logo', async () => {
		const logo = '/logo.png';

		const fragment = await renderToFragment(HomeSiteId, { logo });

		const logoContainer = fragment('.home-site-logo');
		expect(logoContainer).to.be.unique;
		const logoImage = fragment('.home-site-logo img');
		expect(logoImage).to.be.unique;
		expect(logoImage.attr('src')).to.equal(logo);
	});

	it('does not render logo without prop', async () => {
		const fragment = await renderToFragment(HomeSiteId);

		const logoContainer = fragment('.home-site-logo');
		expect(logoContainer).to.have.lengthOf(0);
	});

	it('renders site name', async () => {
		const name = 'Test Site'

		const fragment = await renderToFragment(HomeSiteId, { name });

		expect(fragment('.home-site-id').text()).to.contain(name);
	});
});
