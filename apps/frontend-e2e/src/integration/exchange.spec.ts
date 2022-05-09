describe("Exchange Page unauthenticated", () => {
  beforeEach(() => {
    cy.logout();
  });
  it("direct unauthenticated user to landing page", () => {
    cy.visit("/exchange");
    cy.url().should("include", "/landing");
  });
});

describe("Exchange Page authenticated", () => {
  beforeEach(() => {
    cy.login();
  });
  afterEach(() => {
    // cy.logout();
  });
  it("authenticated user should stay in /exchange", () => {
    cy.visit("/exchange");
    cy.url().should("include", "/exchange");
  });
});
