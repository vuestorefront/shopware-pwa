describe("Password reset", () => {
  it("[DESKTOP]: ensure password route redirection", () => {
    cy.visit("account/recover/password?hash=qwe123");
    cy.url().should("include", "/reset-password?hash=qwe123");
  });
});
