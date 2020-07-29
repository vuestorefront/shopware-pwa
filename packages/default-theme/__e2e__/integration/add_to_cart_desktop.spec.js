describe("Test Checkout functionality Desktop view", () => {
  beforeEach(() => {
    cy.viewport(1280, 800)
    // run these tests as if in a desktop
    // browser with a 800p monitor
  })
  describe("Add product to the cart-product is in the cart", () => {
    it("Navigate to Shopware-pwa site", () => {
      cy.visit("")
      cy.wait(5000)
    })
    it("Go to the first category from megamenu", () => {
      cy.get(".sf-header__link").eq(0).dblclick()
      cy.wait(1000)
    })
    it("Get first product from product listing", () => {
      cy.get(".sf-product-card__title").first().click({ force: true })
    })
    it("Check if card is empty", () => {
      cy.get('[aria-label="Go to cart"] > .sf-badge').should("not.exist")
    })
    it("Add product to the cart", () => {
      cy.get(".sf-add-to-cart__button").click({ force: true })
    })
    it("check if cart has one product added", () => {
      cy.get('[aria-label="Go to cart"] > .sf-badge').contains(/1/)
    })
    it("Add the same product to the cart two more times", () => {
      cy.get(".sf-add-to-cart__button")
        .click({ force: true })
        .click({ force: true })
      cy.wait(200)
    })
    it("Check if cart has three products added", () => {
      cy.get('[aria-label="Go to cart"] > .sf-badge').contains(/3/)
    })
  })
})
