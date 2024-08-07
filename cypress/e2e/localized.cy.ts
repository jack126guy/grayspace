describe('localized page', () => {
	beforeEach(() => {
		cy.visit('/multilingual/eo');
	});

	it('should have localized text', () => {
		cy.get('html').should('have.attr', 'lang', 'eo');

		cy.get('.skip-to-main').should('have.text', 'Saltu al ĉefa enhavo');
	});
});
