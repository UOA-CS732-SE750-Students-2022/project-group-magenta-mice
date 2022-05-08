describe("frontend", () => {
  // beforeEach(() => cy.visit("/"));

  it("redirect unauthenticated user to landing page", () => {
    cy.visit("/");
    cy.url().should("include", "/landing");
  });

  it("authenticated user is not redirected", () => {
    cy.login();
    cy.visit("/");
    cy.url().should("include", "/");
    cy.logout();
  });
});
