// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --

const { createPartiallyEmittedExpression } = require("typescript")

// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
Cypress.Commands.add("addtocart", () => {
  cy.visit("")
  cy.wait(5000)
  cy.get(".sf-header__link").eq(0).dblclick()
  cy.wait(1000)
  cy.get(".sf-product-card__title").first().click({ force: true })
  cy.get(".sf-add-to-cart__button").click({ force: true })
})
