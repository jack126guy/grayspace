describe('home page', () => {
	beforeEach(() => {
		cy.visit('/');
	});
	it('has skip to main link', () => {
		cy.get('header .skip-to-main')
			.should('have.length', 1)
			.and('have.attr', 'href', '#main');
	});
	it('has home site ID', () => {
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
	});
	it('has main content', () => {
		cy.get('main')
			.should('have.length', 1)
			.and('have.attr', 'id', 'main')
			.find('p')
			.should('exist');
	});
});
