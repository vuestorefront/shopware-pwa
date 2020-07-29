describe("Test Personal detail step", () => {
  beforeEach(() => {
    cy.viewport(1280, 800)
    cy.addtocart()
    cy.wait(1000)
    cy.personal_detail_step()
  })
  it("check if go back to shop button exist", () => {
    cy.wait(2000)
    cy.get("button").contains("Go Back to shop", { matchCase: false })
  })
  it("check if go back to shop button work", () => {
    cy.wait(2000)
    cy.get("[data-cy=go-back-to-shop-button").click({ force: true })
    cy.url().should("eq", Cypress.config().baseUrl)
  })
  it("requires first name, last name and email", () => {
    cy.get("[data-cy=cart-icon] > .sf-icon-path").click({ force: true })
    cy.get("[data-cy=goToCheckout-button").click({ force: true })
    cy.wait(2000)
    cy.get("button").contains("Continue to shipping").click({ force: true })
    cy.get('[label="First name"] > .sf-input__error-message > div').should(
      "contain",
      "First name is required"
    )
    cy.get("[data-cy=first-name]").should("contain", "First name is required")
    cy.get("[data-cy=last-name").should("contain", "last name is required")
    cy.get("[data-cy=proper-email").should(
      "contain",
      "Proper email is required"
    )
  })
  it("requires vailid email", () => {
    cy.get(".sf-input__wrapper > [data-cy=first-name]").type("Joe")
    cy.get(".sf-input__wrapper > [data-cy=last-name]").type("Example")
    cy.get(".sf-input__wrapper > [data-cy=proper-email]").type("invalid")
    cy.get("[data-cy=continue-to-shipping-button]").click({ force: true })
    cy.get("[data-cy=proper-email").should(
      "contain",
      "Proper email is required"
    )
  })
  it("continue to shipping after giving vaild first name, last name and email", () => {
    cy.get(".sf-input__wrapper > [data-cy=first-name]").type("Joe")
    cy.get(".sf-input__wrapper > [data-cy=last-name]").type("Example")
    cy.get(".sf-input__wrapper > [data-cy=proper-email]")
      .clear()
      .type("joe@example.com")
    cy.get("[data-cy=proper-email]").should(
      "not.contain",
      "Proper email is required"
    )
    cy.get("[data-cy=continue-to-shipping-button]").click({ force: true })
    cy.url().should("contain", "step=SHIPPING")
  })
})
