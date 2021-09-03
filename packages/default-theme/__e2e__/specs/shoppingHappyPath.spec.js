describe("Shopping happy path", () => {
  beforeEach(() => {
    cy.intercept("GET", "**/store-api/currency").as("getCurrencies");
    cy.visit("/");
    cy.wait("@getCurrencies");
  });

  it("[DESKTOP]: checkout as guest user", () => {
    cy.get("[data-cy=search-bar]").click();
    cy.get("[data-cy=search-bar]").type("aaa");
    cy.get(".search-suggestions__product:nth-child(1)").click();

    cy.get("[data-cy=button-addToCart]").click();

    cy.get('[data-cy="cart-icon"] > .sf-badge').click();
    cy.get("[data-cy=goToCheckout-button]").click();

    cy.fillAndExecuteRegistrationForm();

    cy.get("[data-cy=checkout-payment-method-Cash-on-delivery] input").click();

    cy.get("[data-cy=place-my-order]").click();

    cy.contains("Thank you");
  });

  it("[DESKTOP]: checkout path as logged in user", () => {
    cy.login();

    cy.get("[data-cy=search-bar]").click();
    cy.get("[data-cy=search-bar]").type("aaa");
    cy.get(".search-suggestions__product:nth-child(1)").click();
    cy.get("[data-cy=button-addToCart]").click();

    cy.get('[data-cy="cart-icon"] > .sf-badge').click();
    cy.get("[data-cy=goToCheckout-button]").click();

    cy.get("[data-cy=checkout-payment-method-Cash-on-delivery] input").click();

    cy.get("[data-cy=place-my-order]").click();

    cy.contains("Thank you");
  });

  it("[MOBILE]: checkout as guest user", () => {
    cy.viewport("iphone-5");
    cy.get("[data-cy=search-bar]").click();
    cy.get("[data-cy=search-bar]").type("aaa{enter}");
    cy.get(".sf-product-card:nth-child(1) img").click();
    cy.get("[data-cy=button-addToCart]").click();

    cy.get('[data-cy="bottom-navigation-cart"]').click();
    cy.get("[data-cy=goToCheckout-button]").click();

    cy.fillAndExecuteRegistrationForm();

    cy.get("[data-cy=checkout-payment-method-Cash-on-delivery] input").click();

    cy.get("[data-cy=place-my-order]").click();
    cy.contains("Thank you");
  });

  it("[MOBILE]: checkout as logged in user", () => {
    cy.viewport("iphone-5");
    cy.login();

    cy.get("[data-cy=search-bar]").click();
    cy.get("[data-cy=search-bar]").type("aaa{enter}");
    cy.get(".sf-product-card:nth-child(1) img").click();
    cy.get("[data-cy=button-addToCart]").click();

    cy.get('[data-cy="bottom-navigation-cart"]').click();
    cy.get("[data-cy=goToCheckout-button]").click();

    cy.get("[data-cy=checkout-payment-method-Cash-on-delivery] input").click();

    cy.get("[data-cy=place-my-order]").click();

    cy.contains("Thank you");
  });
});
