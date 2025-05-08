import Article from '@/components/Article.astro';
import { renderToFragment } from './render';
import { describe, it, expect } from 'vitest';

describe('Article', () => {
	it('renders article element', async () => {
		const localData = { page: {} };

		const fragment = await renderToFragment(Article, { localData });

		const rootElement = fragment(':root');
		expect(rootElement.prop('tagName')).to.equal('ARTICLE');
	});

	it('renders title', async () => {
		const localData = {
			page: {
				title: 'Test Article',
			},
		};

		const fragment = await renderToFragment(Article, { localData });

		const titleHeading = fragment('article h1');
		expect(titleHeading).to.be.unique;
		expect(titleHeading.text()).to.equal(localData.page.title);
	});

	it('does not render title without prop', async () => {
		const localData = { page: {} };

		const fragment = await renderToFragment(Article, { localData });

		const titleHeading = fragment('article h1');
		expect(titleHeading).to.have.lengthOf(0);
	});

	it('renders slot', async () => {
		const slots = {
			default: 'Test content',
		};
		const localData = { page: {} };

		const fragment = await renderToFragment(Article, { slots, localData });

		expect(fragment('article').text()).to.contain(slots.default);
	});
});
