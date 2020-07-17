describe("Test Checkout for guest, different billing address, paid in advance, desktop", () => {
  beforeEach(() => {
    cy.viewport(1280, 800)
  })
  it("checks if place my order button works", () => {
    cy.addtocart()
    cy.wait(1000)
    cy.personal_detail_step()
    cy.shipping_step()
    cy.payment_step()
    cy.rewiev_guest_pay_inadvance()
    cy.get("[data-cy=place-my-order]").click({ force: true })
    cy.wait(2000)
    cy.url().should("contain", Cypress.config().baseUrl + "order?orderId=")
  })
})
