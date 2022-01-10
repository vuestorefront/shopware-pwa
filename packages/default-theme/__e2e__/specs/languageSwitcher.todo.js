describe("Language switcher", () => {
  let domains = [];

  beforeEach(() => {
    cy.visit("/");
    cy.window()
      .its("$nuxt")
      .its("$routing")
      .its("availableDomains")
      .then((availableDomains) => {
        domains = availableDomains;
      });
  });

  it("[DESKTOP]: language switcher is visible and has items", () => {
    if (!domains.length) {
      cy.get("[data-cy=language-switcher]").should("not.exist");
      return;
    }
    cy.get("[data-cy=language-switcher]").should("be.visible");
    cy.get("[data-cy=language-switcher-select]")
      .click()
      .should("be.visible")
      .should("have.class", "is-selected")
      .find("[data-cy=language-switcher-option]")
      .should("be.visible")
      .should("have.length", domains.length);
  });
  it("[MOBILE]: language switcher is visible and has items", () => {
    cy.viewport("iphone-5");

    if (!domains.length) {
      cy.get("[data-cy=bottom-navigation-more]").click();
      cy.get("[data-cy=mobile-language-switcher-button]").should("not.exist");
      return;
    }

    cy.get("[data-cy=bottom-navigation-more]").click();
    cy.get("[data-cy=mobile-language-switcher-button]").click();
    cy.get("[data-cy=mobile-language-switcher-list]")
      .children()
      .should("have.length", domains.length)
      .should("be.visible");
  });

  it("[DESKTOP]: language switcher's changes current route and invokes an update of currentDomain and i18n setup", () => {
    if (domains.length <= 1) {
      return;
    }
    cy.location("pathname").should("not.eq", `${domains[1].pathPrefix}/`);
    cy.window()
      .its("$nuxt")
      .its("$routing")
      .its("getCurrentDomain")
      .its("value")
      .its("languageLocaleCode")
      .should("not.eq", domains[1].languageLocaleCode);
    cy.get("[data-cy=language-switcher-select]")
      .find("select")
      .select(domains[1].languageLabel);
    cy.location("pathname").should("eq", `${domains[1].pathPrefix}/`);
    cy.window()
      .its("$nuxt")
      .its("$routing")
      .its("getCurrentDomain")
      .its("value")
      .its("languageLocaleCode")
      .should("eq", domains[1].languageLocaleCode);
    cy.window()
      .its("$nuxt")
      .its("$i18n")
      .its("locale")
      .should("eq", domains[1].languageLocaleCode);
  });
});
