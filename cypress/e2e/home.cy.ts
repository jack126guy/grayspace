describe('home page', () => {
	beforeEach(() => {
		cy.visit('/');
	});

	it('has contents', () => {
		cy.get('html')
			.should('be.unique')
			.and('have.attr', 'lang', 'en')
			.and('have.attr', 'dir', 'ltr');

		cy.get('head')
			.should('be.unique')
			.find('meta[name="demo"]')
			.should('be.unique');

		cy.get('header .skip-to-main')
			.should('be.unique')
			.and('have.attr', 'href', '#main');

		cy.get('header .home-site-id').as('home-site-id');
		cy.get('@home-site-id').should('be.unique');
		cy.get('@home-site-id')
			.find('.home-site-logo')
			.should('be.unique')
			.find('img')
			.should('have.attr', 'src', '/logo.png');
		cy.get('@home-site-id')
			.find('h1')
			.should('be.unique')
			.and('have.text', 'Grayspace Demo');

		cy.get('main')
			.should('be.unique')
			.and('have.attr', 'id', 'main')
			.find('p')
			.should('exist');
	});
});
