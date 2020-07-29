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
  cy.wait(2500)
  cy.get(".sf-product-card__title").first().click({ force: true })
  cy.wait(1500)
  cy.get(".sf-add-to-cart__button").click({ force: true })
})
Cypress.Commands.add("personal_detail_step", () => {
  cy.get("[data-cy=cart-icon] > .sf-icon-path").click({ force: true })
  cy.wait(1000)
  cy.get("[data-cy=goToCheckout-button").click({ force: true })
})
Cypress.Commands.add("shipping_step", () => {
  cy.wait(4000)
  cy.get(".sf-input__wrapper > [data-cy=first-name]").type("Joe")
  cy.get(".sf-input__wrapper > [data-cy=last-name]").type("Example")
  cy.get(".sf-input__wrapper > [data-cy=proper-email]")
    .clear()
    .type("joe@example.com")
  cy.get("[data-cy=continue-to-shipping-button]").click({ force: true })
  cy.url().should("contain", "step=SHIPPING")
})
Cypress.Commands.add("payment_step", () => {
  cy.get("[data-cy=first-name]").last().clear().type("Joe")
  cy.get("[data-cy=last-name]").last().clear().type("Example")
  cy.get("[data-cy=street-name]").last().clear().type("TestStreet")
  cy.get("[data-cy=apartment]").last().clear().type("1")
  cy.get("[data-cy=city]").last().clear().type("TestCity")
  cy.get("[data-cy=state]").last().clear().type("TestState")
  cy.get("[data-cy=zipcode]").last().clear().type("11-11a")
  cy.get("[data-cy=phone]").last().clear().type("123456789")
  cy.get('[type="radio"]').last().check({ force: true })
  cy.get("[data-cy=country]").click()
  cy.get("li").contains("Poland").click({ force: true })
  cy.get("[data-cy=continue-to-payment]").click({ force: true })
})
Cypress.Commands.add("rewiev_guest_pay_inadvance", () => {
  cy.get('[type="checkbox"]').check({ force: true })
  cy.get("[data-cy=first-name]").last().clear().type("Bill")
  cy.get("[data-cy=last-name]").last().clear().type("Bing")
  cy.get("[data-cy=street-name]").last().clear().type("Billable")
  cy.get("[data-cy=apartment]").last().clear().type("12")
  cy.get("[data-cy=city]").last().clear().type("BillCity")
  cy.get("[data-cy=state]").last().clear().type("BillState")
  cy.get("[data-cy=zipcode]").last().clear().type("1112SC")
  cy.get("[data-cy=phone]").last().clear().type("987654321")
  cy.get("[data-cy=country]").click()
  cy.get("li").contains("Poland").click({ force: true })
  cy.get('[type="radio"]').eq(2).check({ force: true })
  cy.get("[data-cy=review-order]").click({ force: true })
})
