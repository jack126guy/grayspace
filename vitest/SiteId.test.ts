import SiteId from '@/components/SiteId.astro';
import { renderToFragment } from './render';
import { describe, it, expect } from 'vitest';

describe('SiteId', () => {
	it('renders container', async () => {
		const fragment = await renderToFragment(SiteId);

		const container = fragment(':root');
		expect(container.prop('tagName')).to.equal('DIV');
	});

	it('renders link', async () => {
		const link = '/';

		const fragment = await renderToFragment(SiteId, { link });

		const linkElement = fragment('a');
		expect(linkElement.attr('href')).to.equal(link);
	});

	it('renders logo', async () => {
		const logo = '/logo.png';

		const fragment = await renderToFragment(SiteId, { logo });

		const logoContainer = fragment('.site-logo');
		expect(logoContainer).to.be.unique;
		const logoImage = fragment('.site-logo img');
		expect(logoImage).to.be.unique;
		expect(logoImage.attr('src')).to.equal(logo);
	});

	it('does not render logo without prop', async () => {
		const fragment = await renderToFragment(SiteId);

		const logoContainer = fragment('.site-logo');
		expect(logoContainer).to.have.lengthOf(0);
	});

	it('renders site name', async () => {
		const name = 'Test Site'

		const fragment = await renderToFragment(SiteId, { name });

		expect(fragment('a').text()).to.contain(name);
	});
});
