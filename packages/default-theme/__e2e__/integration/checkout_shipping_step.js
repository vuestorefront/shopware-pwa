describe("shipping step", () => {
  beforeEach(() => {
    cy.viewport(1280, 800)
    cy.addtocart()
    cy.wait(1000)
    cy.personal_detail_step()
    cy.shipping_step()
  })
  it("requires filling in all the fields", () => {
    cy.get("[data-cy=continue-to-payment]").click({ force: true })

    cy.get("[data-cy=form] > [error-message]")
      .should("have.length", 8)
      .each(($el, index, $list) => {
        expect($el).to.contain("This field is required", { matchCase: false })
      })

    cy.get("[data-cy=country]").should("contain", "This field is required")
  })
  it("check if go back to personal details button exist", () => {
    cy.get("button").contains("Go Back", { matchCase: false }).should("exist")
  })
  it("check if go back to personal details button work", () => {
    cy.get("button")
      .contains("Go Back", { matchCase: false })
      .click({ force: true })
    cy.url().should(
      "eq",
      Cypress.config().baseUrl + "checkout?step=PERSONAL_DETAILS"
    )
    cy.get("[data-cy=continue-to-shipping-button]").click({ force: true })
  })
  it("shows message: Shipping methods", () => {
    cy.contains("Shipping methods", { matchCase: false })
  })
  it("check if there are radio buttons for shipping methods", () => {
    cy.get('[type="radio"]').should("exist")
    cy.get(".sf-radio__label").should("not.be.empty")
  })
  it("continue to payment after filing in shipping details", () => {
    cy.get("[data-cy=first-name]").last().clear().type("Joe")
    cy.get("[data-cy=last-name]").last().clear().type("Example")
    cy.get("[data-cy=street-name]").last().clear().type("TestStreet")
    cy.get("[data-cy=apartment]").last().clear().type("1")
    cy.get("[data-cy=city]").last().clear().type("TestCity")
    cy.get("[data-cy=state]").last().clear().type("TestState")
    cy.get("[data-cy=zipcode]").last().clear().type("11-11a")
    cy.get("[data-cy=phone]").last().clear().type("123456789")
    cy.get('[type="radio"]').last().check({ force: true })
    cy.get("[data-cy=country]").click()
    cy.get("li").contains("Poland").click({ force: true })
    cy.get("[data-cy=continue-to-payment]").click({ force: true })
    cy.url().should("eq", Cypress.config().baseUrl + "checkout?step=PAYMENT")
  })
})
