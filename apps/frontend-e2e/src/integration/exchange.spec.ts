import {
  aliasQuery,
  aliasMutation,
  hasOperationName,
} from "../utils/graphql-test-utils";

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
    cy.intercept("POST", "http://localhost:3333/graphql", (req) => {
      aliasQuery(req, "CurrentUser");
    });
    cy.wait("@gqlCurrentUserQuery").then((interception) => {
      console.log("response:");
      console.log(interception.response);
    });
  });
  afterEach(() => {
    cy.logout();
  });
  it("authenticated user should stay in /exchange", () => {
    cy.url().should("include", "/exchange");
    cy.contains("welcome", { matchCase: false }).should("exist");
  });

  describe("Create Exchange Modal", () => {
    beforeEach(() => {
      cy.get("#addCard").click();
    });
    it("clicking add exchange card opens create exchange modal", () => {
      cy.get("h3")
        .contains("create an exchange", { matchCase: false })
        .should("be.visible");
      cy.get("button").contains("cancel", { matchCase: false }).click();
    });

    it("clicking cancel button on create exchange modal should close it", () => {
      cy.get("button").contains("cancel", { matchCase: false }).click();
      cy.get("h3")
        .contains("create an exchange", { matchCase: false })
        .should("not.exist");
    });

    it("type in a name and attempt to create exchange by clicking confirm, closes modal", () => {
      cy.get("input").type("Text Eschange");
      cy.get("button").contains("confirm", { matchCase: false }).click();
      cy.get("h3")
        .contains("create an exchange", { matchCase: false })
        .should("not.exist");
      cy.get(".Toastify__toast-body")
        .contains("creating exchange", { matchCase: false })
        .should("be.exist");
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
