/* eslint-disable no-undef */
/// <reference types="cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
	return false;
});

describe('Home', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000');
	});

	it('should go click join with no name on the input field ', function () {
		cy.get('[data-cy="button-home"]').click();
		cy.get('[data-cy="input-home-required-field-text"]').contains('Required field');
	});

	it('should go to click on join having typed and deleted in the input field ', function () {
		cy.get('[data-cy="input-home"]').type('F');
		cy.get('[data-cy="input-home"]').type('{backspace}');
		cy.get('[data-cy="input-home-required-field-text"]').should('not.exist');
	});

	it('should check if join button is disabled ', function () {
		cy.get('[data-cy="input-home"]').type('F');
		cy.get('[data-cy="input-home"]').type('{backspace}');
		cy.get('[data-cy="button-home"]').should('be.disabled');
	});

	it('should go to Home ', function () {
		cy.get('[data-testid="text-home"]').contains('Create new Player');
		cy.get('[data-cy="input-home"]').type('Foo');
		cy.get('[data-cy="button-home"]').click();
	});
});
