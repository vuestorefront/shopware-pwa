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

// const { createPartiallyEmittedExpression } = require("typescript")

// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.overwrite("click", (originalFunction, subject, options) => {
  // we're invoking click with force by default to avoid scrolling problems
  return originalFunction(subject, {
    ...options,
    force: true,
  });
});

Cypress.Commands.overwrite(
  "type",
  (originalFunction, subject, string, options) => {
    // we're invoking type with force by default to avoid scrolling problems
    return originalFunction(subject, string, {
      ...options,
      force: true,
    });
  }
);

Cypress.Commands.add(
  "login",
  ({
    username = "1d7b9fef36a34367ad02993594db3fc9rlegros@example.com",
    password = "shopware",
  } = {}) => {
    cy.intercept({
      url: "/store-api/v3/account/customer",
    }).as("invokeLogin");

    cy.get('[data-cy="login-icon"]').click();
    cy.get("input[data-cy=email-input]").type(username);
    cy.get("input[data-cy=password-input]").type(password);
    cy.get("[data-cy=submit-login-button]").click();

    cy.wait("@invokeLogin").its("response.statusCode").should("eq", 200);
  }
);
