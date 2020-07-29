describe("Payment step with different address for billing and pay in advance method", () => {
  beforeEach(() => {
    cy.viewport(1280, 800)
    cy.addtocart()
    cy.wait(1000)
    cy.personal_detail_step()
    cy.shipping_step()
    cy.payment_step()
  })
  it("check if there are radio buttons for payment methods", () => {
    cy.get('[type="radio"]').should("exist")
    cy.get(".sf-radio__label").should("not.be.empty")
  })
  it("check if go back to shipping button exist", () => {
    cy.get("button").contains("Go back", { matchCase: false })
  })
  it("check if go back to shipping button work", () => {
    cy.get("button")
      .contains("Go back", { matchCase: false })
      .click({ force: true })
    cy.url().should("eq", Cypress.config().baseUrl + "checkout?step=SHIPPING")
    cy.get("[data-cy=continue-to-payment]").click({ force: true })
  })
  it("check if there is checkobox for use different address for billing", () => {
    cy.get('[type="checkbox"]').should("exist")
    cy.get(".sf-checkbox__label").should("not.be.empty")
  })

  it("requires filling in all the fields", () => {
    cy.get('[type="checkbox"]').check({ force: true })
    cy.get("[data-cy=review-order]").click({ force: true })

    cy.get("[data-cy=form] > [error-message]")
      .should("have.length", 8)
      .each(($el, index, $list) => {
        expect($el).to.contain("This field is required")
      })
  })
  it.only("contiunue to rewiev order after filling in address for billing", () => {
    cy.get('[type="checkbox"]').check({ force: true })
    cy.get("[data-cy=first-name]").last().clear().type("Bill")
    cy.get("[data-cy=last-name]").last().clear().type("Bing")
    cy.get("[data-cy=street-name]").last().clear().type("Billable")
    cy.get("[data-cy=apartment]").last().clear().type("12")
    cy.get("[data-cy=city]").last().clear().type("BillCity")
    cy.get("[data-cy=state]").last().clear().type("BillState")
    cy.get("[data-cy=zipcode]").last().clear().type("1112SC")
    cy.get("[data-cy=phone]").last().clear().type("987654321")
    cy.get("[data-cy=country]").click()
    cy.get("li").contains("Poland").click({ force: true })
    cy.get('[type="radio"]').eq(2).check({ force: true })
    cy.get("[data-cy=review-order]").click({ force: true })
    cy.url().should("eq", Cypress.config().baseUrl + "checkout?step=REVIEW")
  })
})
