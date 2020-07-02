describe("Test Checkout functionality for guest user Desktop view", () => {
  beforeEach(() => {
    cy.viewport(1280, 800)
    // run these tests as if in a desktop
    // browser with a 800p monitor
  })
  it("add product to the cart", () => {
    cy.addtocart()
  })
  it("Go to checkout", () => {
    cy.get("[data-cy=cart-icon] > .sf-icon-path").click({ force: true })
    cy.get("[data-cy=goToCheckout-button").click({ force: true })
  })
  it("requires vailid first name, last name and email", () => {})
  it("")
})
