const { isTaggedTemplateExpression } = require("typescript")

describe("Test Checkout functionality for guest user Desktop view", () => {
  beforeEach(() => {
    cy.viewport(1280, 800)
    cy.addtocart()
    cy.wait(1000)
    cy.personal_detail_step()
    cy.shipping_step()
    cy.payment_step()
    cy.rewiev_guest_pay_inadvance()
  })
  it("check if go back to payment button exist", () => {
    cy.get("button")
      .contains("Go back to Payment", { matchCase: false })
      .should("exist")
  })
  it("check if go back to payment button works", () => {
    cy.get("[data-cy=go-back-to-payment]").click({ force: true })
    cy.url().should("eq", Cypress.config().baseUrl + "checkout?step=PAYMENT")
  })
  it("check if product image is visible", () => {
    cy.get("[data-cy=product-image]").should("be.visible")
  })
  it.skip("check quantity and amount", () => {
    cy.get("[data-cy=quantity]").should("contain", 1)
  })
  it("check if personal details are correct", () => {
    cy.get("[data-cy=name]")
      .should("contain", "Joe Example", { matchCase: false })
      .and("contain", "joe@example.com", { matchCase: false })
  })
  it("check if shipping details are correct", () => {
    cy.get("[data-cy=shipping]")
      .should("contain", "TestStreet 1, 11-11a", { matchCase: false })
      .and("contain", "TestCity", { matchCase: false })
      .and("contain", "123456789", { matchCase: false })
  })
  it("check if billing address is correct", () => {
    cy.get("[data-cy=billing]")
      .should("contain", "Billable 12, 1112SC", { matchCase: false })
      .and("contain", "BillCity", { matchCase: false })
      .and("contain", "987654321", { matchCase: false })
  })
  it.only("check if place my order button exist", () => {
    cy.get("button")
      .contains("Place my order", { matchCase: false })
      .should("exist")
  })
})
