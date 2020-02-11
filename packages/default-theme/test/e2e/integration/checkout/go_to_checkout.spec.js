describe('Checkout - entering', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  describe('not empty cart - redirect to checkout', () => {
    it('Enables me to press the "go to checkout" button if cart is not empty', () => {
      // add first product found (force if not hovered)
      cy.get('[aria-label="add-to-cart"]')
        .first()
        .click({ force: true })
      cy.get('[aria-label="cart"]').click({ force: true })
      // check if cart sidebar is open
      cy.get('#cart > .sf-sidebar > .sf-sidebar__aside').should('be.visible')
      // try to click "Go to checkout" button
      cy.get('button[aria-label="go-to-checkout"]').click()
      // check if url has changed
      cy.url().should('contain', '/checkout')
      cy.get('#checkout')
      // check if cart sidebar is hidden again
      cy.get('#cart > .sf-sidebar > .sf-sidebar__aside').should(
        'not.be.visible'
      )
    })
  })
  describe('empty cart - no redirect to checkout', () => {
    it('Prevents me to press the "go to checkout" button if cart is empty', () => {
      cy.get('[aria-label="cart"]').click({ force: true })
      // check if "Go to checkout button" does not exist...
      cy.get('button[aria-label="go-to-checkout"]').should('not.exist')
      // ...and redirection to checkout page wasn't performed
      cy.url().should('not.contain', '/checkout')
    })
    it('Redirects to the different place if the cart is empty - prevent to see the checkout page', () => {
      // goes directly to the checkout page without adding any product
      cy.visit('/checkout')
      // url does not point the checkout page
      cy.url().should('not.contain', '/checkout')
      // extra check if checkout container exists
      cy.get('#checkout').should('not.exist')
    })
  })
})
