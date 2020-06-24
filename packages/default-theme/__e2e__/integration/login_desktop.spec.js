describe("Test login functionality- desktop view", () => {
  beforeEach(() => {
    // run these tests as if in a desktop
    // browser with a 800p monitor
    cy.viewport(1280, 800)
    cy.visit("")
    cy.wait(2000)
    //opens login popup window
    cy.get('[aria-label="Go to My Account"]').click({
      force: true,
    })
  })

  it("checks if register button exists", () => {
    cy.get("button").contains("Register today?").click({ force: true })
  })
  it("cheks if reset password button exists", () => {
    cy.get("button").contains("Forgotten password?").click({ force: true })
  })
  it("shows message: Dont have an account yet?", () => {
    cy.contains("h4", "Don't have an account yet?")
  })
  it("requires email", () => {
    cy.get("button").contains("Log in").click({ force: true })
    cy.get(".sf-input__error-message").should("contain", "Email is required")
  })
  it("requires password", () => {
    cy.get("#email").type("joe@example.com")
    cy.get("button").contains("Log in").click()
    cy.get(".sf-input__error-message").should("contain", "Password is required")
  })
  it("requires valid username and password", () => {
    cy.get("#email").type("joe@example.com")
    cy.get("#password").type("invalid")
    cy.get("button").contains("Log in").click()
    cy.get(".sf-alert__message").should(
      "contain",
      "Invalid username and/or password."
    )
  })
  it("opens my account after successful login", () => {
    cy.get("#email").type("joe@divante.pl")
    cy.get("#password").type("exampletest")
    cy.get("button").contains("Log in").click()
    cy.get(".sf-header__icon--is-active > .sf-icon-path").click({ force: true })
    cy.get(".sf-list > :nth-child(1) > .sf-button").click({ force: true })
    cy.wait(2500)
    cy.location("pathname").should("eq", "/account/profile")
  })
})
