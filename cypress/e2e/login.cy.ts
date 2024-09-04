describe("Login Page", () => {
  it("Should be able to login", () => {
    cy.visit("/login");
    cy.intercept(
      "POST",
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAUfMTyq8LY3SzRb4XGPxnO6_fjsXdrQyc"
    ).as("sign-in");

    cy.get("[data-cy=email]").type(Cypress.env("DATA_CY_LOGIN_EMAIL"));
    cy.get("[data-cy=password]").type(Cypress.env("DATA_CY_LOGIN_PASSWORD"));

    cy.get("[data-cy=login-activator]").click();

    cy.wait("@sign-in").then(({ response }) => {
      cy.url().should("eq", `${Cypress.config("baseUrl")}/`);
    });
  });

  it("Should not be able to login with wrong credentials", () => {
    cy.visit("/login");

    cy.intercept(
      "POST",
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAUfMTyq8LY3SzRb4XGPxnO6_fjsXdrQyc"
    ).as("sign-in");

    cy.on("window:alert", (txt) => {
      console.log(txt);
      expect(txt).to.be.equal("Credenciais inválidas");
    });

    cy.get("[data-cy=email]").type("lupin@test.com");
    cy.get("[data-cy=password]").type("wrongpassword");

    cy.get("[data-cy=login-activator]").click();

    cy.wait("@sign-in");
  });

  it("Should not be able to see login page if already logged in", () => {
    cy.visit("/login");

    cy.intercept(
      "POST",
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAUfMTyq8LY3SzRb4XGPxnO6_fjsXdrQyc"
    ).as("sign-in");

    cy.get("[data-cy=email]").type(Cypress.env("DATA_CY_LOGIN_EMAIL"));
    cy.get("[data-cy=password]").type(Cypress.env("DATA_CY_LOGIN_PASSWORD"));

    cy.get("[data-cy=login-activator]").click();

    cy.wait("@sign-in").then(({ response }) => {
      cy.url().should("eq", `${Cypress.config("baseUrl")}/`);

      cy.visit("/login");

      cy.url().should("eq", `${Cypress.config("baseUrl")}/`);
    });
  });

  it("Should not be able to see page structure in login", () => {
    cy.visit("/login");

    cy.get("[data-cy=header]").should("not.exist");
    cy.get("[data-cy=sidebar]").should("not.exist");
  });
});
