/* eslint-disable no-undef */
/// <reference types="cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
	return false;
});

describe('full test', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000');
	});
	it('should go to Home ', function () {
		cy.get('[data-testid="text-home"]').contains('Create new Player');
		cy.get('[data-cy="input-home"]').type('Exdesis');
		cy.get('[data-cy="button-home"]').click();
	});

	it('should go to Game ', function () {
		cy.visit('http://localhost:3000/game');
		cy.get('[data-testid="text-game"]').contains('Game');
	});
});
