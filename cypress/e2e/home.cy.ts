describe('home page', () => {
	beforeEach(() => {
		cy.visit('/');
	});
	it('has contents', () => {
		cy.get('html')
			.should('have.length', 1)
			.and('have.attr', 'lang', 'en');

		cy.get('header .skip-to-main')
			.should('have.length', 1)
			.and('have.attr', 'href', '#main');

		cy.get('header .home-site-id').as('home-site-id');
		cy.get('@home-site-id').should('have.length', 1);
		cy.get('@home-site-id')
			.find('.home-site-logo')
			.should('exist')
			.find('img')
			.should('have.attr', 'src', '/logo.png');
		cy.get('@home-site-id')
			.find('h1')
			.should('exist')
			.and('have.text', 'Grayspace Demo');

		cy.get('main')
			.should('have.length', 1)
			.and('have.attr', 'id', 'main')
			.find('p')
			.should('exist');
	});
});
