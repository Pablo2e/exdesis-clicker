/* eslint-disable no-undef */
/// <reference types="cypress" />
describe('full test', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3001');
	});
	it('should go to Home ', function () {
		cy.get('[data-testid="text-home"]').contains('Home');
	});

	it('should go to Game ', function () {
		cy.visit('http://localhost:3001/game');
		cy.get('[data-testid="text-game"]').contains('Game');
	});
});
