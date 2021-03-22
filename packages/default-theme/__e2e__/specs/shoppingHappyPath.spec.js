describe("Shopping happy path", () => {
  beforeEach(() => {
    cy.intercept(
      "POST",
      "/store-api/v3/navigation/main-navigation/main-navigation"
    ).as("getMainNavigation");
    cy.visit("/");
    cy.wait("@getMainNavigation");
  });
  it("[DESKTOP]: checkout as guest user", () => {
    cy.get("[data-cy=search-bar]").click();
    cy.get("[data-cy=search-bar]").type("a");
    cy.get(".search-suggestions__product:nth-child(1)").click();

    cy.get("[data-cy=button-addToCart]").click();

    cy.get('[data-cy="cart-icon"] > .sf-badge').click();
    cy.get("[data-cy=goToCheckout-button]").click();

    cy.get("input[data-cy=first-name]").type("John");
    cy.get("input[data-cy=last-name]").type("Doe");
    cy.get("input[data-cy=proper-email]").type("jd@example.com");
    cy.get("[data-cy=continue-to-shipping-button]").click();

    cy.get("input[data-cy=first-name]").type("John");
    cy.get("input[data-cy=last-name]").type("Doe");
    cy.get("input[data-cy=street-name]").type("Street");
    cy.get("input[data-cy=city]").type("City");
    cy.get("input[data-cy=zipcode]").type("55-555");
    cy.get("[data-cy=country]").click();
    cy.contains("Germany").click();
    cy.get("input[data-cy=phone]").type("123456");
    cy.get("[data-cy=continue-to-payment]").click();

    cy.get("[data-cy=review-order]").click();
    cy.get("[data-cy=place-my-order]").click();

    cy.contains("Thank you");
  });

  it("[DESKTOP]: checkout path as logged in user", async () => {
    cy.login();

    cy.get("[data-cy=search-bar]").click();
    cy.get("[data-cy=search-bar]").type("a");
    cy.get(".search-suggestions__product:nth-child(1)").click();
    cy.get("[data-cy=button-addToCart]").click();

    cy.get('[data-cy="cart-icon"] > .sf-badge').click();
    cy.get("[data-cy=goToCheckout-button]").click();

    // click through the steps
    cy.get(".sf-button:nth-child(2) > .sf-steps__title").click();
    cy.get(".sf-button:nth-child(3) > .sf-steps__title").click();
    cy.get(".sf-button:nth-child(4) > .sf-steps__title").click();
    cy.get("[data-cy=place-my-order]").click();

    cy.contains("Thank you");
  });

  it("[MOBILE]: checkout as guest user", () => {
    cy.viewport("iphone-5");
    cy.get("[data-cy=search-bar]").click();
    cy.get("[data-cy=search-bar]").type("a{enter}");
    cy.get(".sf-product-card:nth-child(1) img").click();
    cy.get("[data-cy=button-addToCart]").click();

    cy.get('[data-cy="bottom-navigation-cart"]').click();
    cy.get("[data-cy=goToCheckout-button]").click();

    cy.get("input[data-cy=first-name]").type("John");
    cy.get("input[data-cy=last-name]").type("Doe");
    cy.get("input[data-cy=proper-email]").type("jd@example.com");
    cy.get("[data-cy=continue-to-shipping-button]").click();

    cy.get("input[data-cy=first-name]").type("John");
    cy.get("input[data-cy=last-name]").type("Doe");
    cy.get("input[data-cy=street-name]").type("Street");
    cy.get("input[data-cy=city]").type("City");
    cy.get("input[data-cy=zipcode]").type("55-555");
    cy.get("[data-cy=country]").click();
    cy.contains("Germany").click();
    cy.get("input[data-cy=phone]").type("123456");
    cy.get("[data-cy=continue-to-payment]").click();

    cy.get("[data-cy=review-order]").click();

    cy.get("[data-cy=place-my-order]").click();
    cy.contains("Thank you");
  });

  it("[MOBILE]: checkout as logged in user", () => {
    cy.viewport("iphone-5");
    cy.login();

    cy.get("[data-cy=search-bar]").click();
    cy.get("[data-cy=search-bar]").type("a{enter}");
    cy.get(".sf-product-card:nth-child(1) img").click();
    cy.get("[data-cy=button-addToCart]").click();

    cy.get('[data-cy="bottom-navigation-cart"]').click();
    cy.get("[data-cy=goToCheckout-button]").click();

    // click through the steps
    cy.get(".sf-button:nth-child(2) > .sf-steps__title").click();
    cy.get(".sf-button:nth-child(3) > .sf-steps__title").click();
    cy.get(".sf-button:nth-child(4) > .sf-steps__title").click();
    cy.get("[data-cy=place-my-order]").click();

    cy.contains("Thank you");
  });
});
