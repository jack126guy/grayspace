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
		const props = {
			homeLink: '/',
		}

		const fragment = await renderToFragment(GeneralHeader, { props });

		const homeLinkElement = fragment('.site-id a');
		expect(homeLinkElement.attr('href')).to.equal(props.homeLink);
	});

	it('renders site logo', async () => {
		const props = {
			siteLogo: '/logo.png',
		};

		const fragment = await renderToFragment(GeneralHeader, { props });

		const siteLogoImage = fragment('.site-logo img');
		expect(siteLogoImage.attr('src')).to.equal(props.siteLogo);
	});

	it('does not render site logo without prop', async () => {
		const fragment = await renderToFragment(GeneralHeader);

		const siteLogoContainer = fragment('.site-logo');
		expect(siteLogoContainer).to.have.lengthOf(0);
	});

	it('renders site name', async () => {
		const props = {
			siteName: 'Test Site',
		}

		const fragment = await renderToFragment(GeneralHeader, { props });

		expect(fragment('.site-id').text()).to.contain(props.siteName);
	});
});
