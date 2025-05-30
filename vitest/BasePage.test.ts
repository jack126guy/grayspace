import BasePage from '@/components/BasePage.astro';
import BasePageWithSlots from './BasePageWithSlots.astro';
import { renderToDocument } from './render';
import { describe, it, expect } from 'vitest';

describe('BasePage', () => {
	it('renders root element', async () => {
		const document = await renderToDocument(BasePage);

		expect(document('html')).to.be.unique;
	});

	it('renders language attributes', async () => {
		const props = {
			lang: 'xx',
			dir: 'ltr',
		};

		const document = await renderToDocument(BasePage, { props });

		const htmlElement = document('html');
		expect(htmlElement.attr('lang')).to.equal(props.lang);
		expect(htmlElement.attr('dir')).to.equal(props.dir);
	});

	it('renders meta elements', async () => {
		const document = await renderToDocument(BasePage);

		const metaElements = document('meta');
		expect(metaElements.is('[charset="UTF-8"]')).to.be.true;
		expect(metaElements.is('[name="viewport"]')).to.be.true;
	});

	it('renders title', async () => {
		const props = {
			title: 'Test Page',
		};

		const document = await renderToDocument(BasePage, { props });

		const titleElement = document('title');
		expect(titleElement).to.be.unique;
		expect(titleElement.text()).to.equal(props.title);
	});

	it('renders favicon', async () => {
		const props = {
			favicon: '/favicon.ico',
		};

		const document = await renderToDocument(BasePage, { props });

		const linkElement = document('link[rel="icon"]');
		expect(linkElement).to.be.unique;
		expect(linkElement.attr('href')).to.equal(props.favicon);
	});

	it('does not render favicon without prop', async () => {
		const document = await renderToDocument(BasePage);

		const linkElement = document('link[rel="icon"]');
		expect(linkElement).to.have.lengthOf(0);
	});

	it('renders skip to main link', async () => {
		const props = {
			skipToMainText: 'Skip to main',
		};

		const document = await renderToDocument(BasePage, { props });

		const skipToMainLink = document('header .skip-to-main');
		expect(skipToMainLink).to.be.unique;
		expect(skipToMainLink.text()).to.equal(props.skipToMainText);
	});

	it('renders slots', async () => {
		// Need to create a new component to test slots
		// because slot content passed directly to container API is escaped
		const document = await renderToDocument(BasePageWithSlots);

		expect(document('head meta[name="head-slot"]')).to.be.unique;
		expect(document('header .header-slot')).to.be.unique;
		expect(document('main .default-slot')).to.be.unique;
		expect(document('footer .footer-slot')).to.be.unique;
	});
});
