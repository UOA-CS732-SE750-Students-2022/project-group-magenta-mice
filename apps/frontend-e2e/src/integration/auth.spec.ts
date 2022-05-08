describe("Auth Page", () => {
  // it("click the continue with google login button", () => {
  //     cy.visit("/auth");
  //     cy.get("button").contains("continue with google", { matchCase: false }).click();
  //     // cy.login();
  //     // cy.get("p").contains("welcome"), { matchCase: false };
  // });

  it("authenticated user redirected from /auth to /exchange", () => {
    cy.login();
    cy.visit("/auth");
    cy.url().should("include", "/exchange");
    cy.get("p").contains("welcome", { matchCase: false }).should("be.visible");
  });

  afterEach(() => {
    cy.logout();
  });
});
