describe('Test login functionality- desktop view', () => {
  beforeEach(() => {
    // run these tests as if in a desktop
    // browser with a 800p monitor
    cy.viewport(1280, 800)
    cy.visit('https://shopware-pwa.storefrontcloud.io')
    cy.wait(1500)
    //opens login popup window
    cy.get('[aria-label="Go to My Account"] > .sf-icon-path').click({
      foce: true,
    })
  })

  it('checks if register button exists', () => {
    cy.get('button').contains('Register today?').click({ force: true })
  })
  it('cheks if reset password button exists', () => {
    cy.get('button').contains('Forgotten password?').click({ force: true })
  })
  it('shows message: Dont have an account yet?', () => {
    cy.contains('h4', "Don't have an account yet?")
  })
  it('requires email', () => {
    cy.get('button').contains('Log in').click({ force: true })
    cy.get('.sf-input__error-message').should('contain', 'Email is required')
  })
  it('requires password', () => {
    cy.get('#email').type('joe@example.com')
    cy.get('button').contains('Log in').click()
    cy.get('.sf-input__error-message').should('contain', 'Password is required')
  })
  it('requires valid username and password', () => {
    cy.get('#email').type('joe@example.com')
    cy.get('#password').type('invalid')
    cy.get('button').contains('Log in').click()
    cy.get('.sf-alert__message').should(
      'contain',
      'Invalid username and/or password.'
    )
  })
  it('opens my account after successful login', () => {
    cy.get('#email').type('joe@example.com')
    cy.get('#password').type('exampletest')
    cy.get('button').contains('Log in').click()
    cy.get('[aria-label="Go to My Account"] > .sf-icon-path').click({
      foce: true,
    })
    cy.wait(1000)
    cy.location('pathname').should('eq', '/account/profile')
  })
})
