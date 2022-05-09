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
    cy.visit("/exchange");
  });
  afterEach(() => {
    // cy.logout();
  });
  it("authenticated user should stay in /exchange", () => {
    cy.url().should("include", "/exchange");
    cy.contains("welcome", { matchCase: false }).should("exist");
  });

  describe("Create Exchange Modal", () => {
    it("clicking add exchange card opens create exchange modal", () => {
      cy.get("#addCard").click();
      cy.get("h3")
        .contains("create an exchange", { matchCase: false })
        .should("be.visible");
      cy.get("button").contains("cancel", { matchCase: false }).click();
    });

    it("clicking cancel button on create exchange modal should close it", () => {
      cy.get("#addCard").click();
      cy.get("button").contains("cancel", { matchCase: false }).click();
      cy.get("h3")
        .contains("create an exchange", { matchCase: false })
        .should("not.exist");
    });
  });

  describe("User Dropdown", () => {
    it("clicking on user should make dropdown appear", () => {
      cy.get("#headlessui-popover-button-1").click();
      cy.get("button").contains("logout", { matchCase: false }).should("exist");
      cy.get("#headlessui-popover-button-1").click();
    });

    it("clicking on user twice should make dropdown disappear", () => {
      cy.get("#headlessui-popover-button-1").click();
      cy.get("#headlessui-popover-button-1").click();
      cy.get("button")
        .contains("logout", { matchCase: false })
        .should("not.exist");
    });

    it("clicking on logout button logs user out", () => {
      cy.get("#headlessui-popover-button-1").click();
      cy.get("button").contains("logout", { matchCase: false }).click();
      cy.url().should("include", "/landing");
      cy.visit("/exchange");
      cy.url().should("include", "/landing");
    });
  });
});
