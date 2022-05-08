describe("Landing Page", () => {
  it("direct unauthenticated user to auth page when button is clicked", () => {
    cy.visit("/landing");
    cy.get("button").contains("get started", { matchCase: false }).click();
    cy.url().should("include", "/auth");
  });
});
