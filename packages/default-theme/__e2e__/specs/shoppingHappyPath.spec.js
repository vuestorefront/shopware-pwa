describe("Shopping happy path", () => {
  beforeEach(() => {
    cy.intercept("GET", "*/store-api/currency").as("getCurrencies");
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

    cy.get("input[data-cy=first-name-input]").type("John");
    cy.get("input[data-cy=last-name-input]").type("Doe");
    cy.get("input[data-cy=registration-email-input]").type("jd@example.com");
    cy.get("[data-cy=guest-registration-checkbox] input").check();
    cy.get("input[data-cy=street-input]").type("Street");
    cy.get("input[data-cy=zip-code-input]").type("55-555");
    cy.get("input[data-cy=city-input]").type("City");
    cy.get("[data-cy=register-button]").click();

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

    cy.get("input[data-cy=first-name-input]").type("John");
    cy.get("input[data-cy=last-name-input]").type("Doe");
    cy.get("input[data-cy=registration-email-input]").type("jd@example.com");
    cy.get("[data-cy=guest-registration-checkbox] input").check();
    cy.get("input[data-cy=street-input]").type("Street");
    cy.get("input[data-cy=zip-code-input]").type("55-555");
    cy.get("input[data-cy=city-input]").type("City");
    cy.get("[data-cy=register-button]").click();

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
