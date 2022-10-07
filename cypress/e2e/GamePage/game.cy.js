/* eslint-disable no-undef */
/// <reference types="cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
	return false;
});

describe('Game Page', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000');
	});

	it('should go to Game ', function () {
		cy.get('[data-cy="input-home"]').type('Foo');
		cy.get('[data-cy="button-home"]').click();
		cy.get('[data-testid="text-header-game-name"]').contains('Hi Foo');
	});

	it('should go to Game and add 10 points', function () {
		cy.get('[data-cy="input-home"]').type('Foo');
		cy.get('[data-cy="button-home"]').click();
		for (let n = 0; n < 10; n++) {
			cy.get('[data-cy="game-button-add-point"]').click();
		}
		cy.get('[data-cy="game-button-buy-autoclicker"]').click();
	});

	it('should go to Game and add 10 points and buy one AutoClicker', function () {
		cy.get('[data-cy="input-home"]').type('Foo');
		cy.get('[data-cy="button-home"]').click();
		for (let n = 0; n < 10; n++) {
			cy.get('[data-cy="game-button-add-point"]').click();
		}
		cy.get('[data-cy="game-button-buy-autoclicker"]').click();
		cy.get('[data-testid="text-body-show-autoclickers-bought"]').contains('AutoClickers Boutght: 1');
	});

	it('should go to Game and add points to can buy two AutoClicker', function () {
		cy.get('[data-cy="input-home"]').type('Foo');
		cy.get('[data-cy="button-home"]').click();
		for (let n = 0; n < 10; n++) {
			cy.get('[data-cy="game-button-add-point"]').click();
		}
		cy.get('[data-cy="game-button-buy-autoclicker"]').click();
		cy.get('[data-testid="text-body-show-autoclickers-bought"]').contains('AutoClickers Boutght: 1');
		for (let n = 0; n < 20; n++) {
			cy.get('[data-cy="game-button-add-point"]').click();
		}
		cy.get('[data-cy="game-button-buy-autoclicker"]').click();
		cy.get('[data-testid="text-body-show-autoclickers-bought"]').contains('AutoClickers Boutght: 2');
	});

	it('should logout ', function () {
		cy.get('[data-cy="input-home"]').type('Foo');
		cy.get('[data-cy="button-home"]').click();
		cy.get('[data-cy="game-header-link-logout"]').click();
		cy.get('[data-testid="text-home"]').contains('Create new Player');
	});
});
