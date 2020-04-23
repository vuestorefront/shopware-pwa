describe('Test Checkout funcionality Desktop view', () => {
  beforeEach(() => {
    cy.viewport(1280, 800)
    // run these tests as if in a desktop
    // browser with a 800p monitor
  })
  describe('Add product to the cart-product is in the cart', () => {
    it('Navigate to Shopware-pwa site', () => {
      cy.visit('https://shopware-pwa.storefrontcloud.io/')
      cy.wait(1000)
    })
    it('Get first product from home page product listing', () => {
      cy.get(':nth-child(1) > .sf-product-card__link').click({ force: true })
    })
    it('Check if card is empty', () => {
      cy.get('[aria-label="cart-icon"] > .sf-circle-icon__badge').should(
        'not.exist'
      )
    })
    it('Add product to the cart', () => {
      cy.get('.sf-add-to-cart__button').click({ force: true })
    })
    it('check if cart has one product added', () => {
      cy.get('[aria-label="cart-icon"] > .sf-circle-icon__badge').contains(/1/)
    })
    it('Add the same product to the cart two more times', () => {
      cy.get('.sf-add-to-cart__button').click({ force: true })
      cy.wait(200)
      cy.get('.sf-add-to-cart__button').click({ force: true })
    })
    it('Check if cart has three products added', () => {
      cy.get('[aria-label="cart-icon"] > .sf-circle-icon__badge').contains(/3/)
    })
  })
})
