import SkipToMain from '@/components/SkipToMain.astro';
import { renderToFragment } from './render';
import { describe, it, expect } from 'vitest';

describe('SkipToMain', () => {
	it('renders link', async () => {
		const fragment = await renderToFragment(SkipToMain);

		const rootElement = fragment(':root');
		expect(rootElement.prop('tagName')).to.equal('A');
		expect(rootElement.attr('href')).to.equal('#main');
	});

	it('includes link text', async () => {
		const props = {
			text: 'Skip to main',
		};

		const fragment = await renderToFragment(SkipToMain, { props });

		const rootElement = fragment(':root');
		expect(rootElement.text()).to.equal(props.text);
	});
});
