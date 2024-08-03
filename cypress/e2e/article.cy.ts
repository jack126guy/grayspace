describe('article page', () => {
	const pages = [
		{ path: '/another-page', title: 'Another Page' },
		{ path: '/markdown-page', title: 'Markdown Page' },
	];
	pages.forEach(({ path, title }) => {
		it(`${path} has contents`, () => {
			cy.visit(path);

			cy.get('html').should('be.unique').and('have.attr', 'lang', 'en');

			cy.get('header .skip-to-main')
				.should('be.unique')
				.and('have.attr', 'href', '#main');

			cy.get('header .site-id')
				.should('be.unique')
				.find('a')
				.as('site-id-link')
				.should('be.unique')
				.and('have.attr', 'href', '/');
			cy.get('@site-id-link')
				.find('.site-logo')
				.should('be.unique')
				.find('img')
				.should('have.attr', 'src', '/logo.png');
			cy.get('@site-id-link')
				.find('span')
				.contains('Grayspace Demo')
				.should('be.unique');

			cy.get('main')
				.should('be.unique')
				.and('have.attr', 'id', 'main')
				.find('article')
				.as('article')
				.should('be.unique');
			cy.get('@article').find('h1').contains(title).should('exist');
			cy.get('@article').find('p').should('exist');
		});
	});
});
