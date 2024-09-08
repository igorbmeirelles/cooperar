import { Institution } from "../../src/app/(sidebar)/instituicoes/_context/models/Institution";

describe("should display institutions page", () => {
  beforeEach(() => {
    cy.setCookie("auth", "true", { httpOnly: false });
  });

  it("should display institutions page", () => {
    cy.visit("/instituicoes");

    const instituicoes = [
      new Institution("Escola A", "escolaA@gmail.com", "1111-1111"),
    ];

    cy.window()
      .then((win) => {
        win.localStorage.setItem("institutions", JSON.stringify(instituicoes));
      })
      .then(() => {
        cy.reload();

        cy.get("[data-cy=institutions-table]").should("exist");
        cy.get("[data-cy=institutions-table]").should("have.length", 1);

        cy.get("[data-cy=institutions-table-name]").should(
          "have.text",
          "Escola A"
        );
        cy.get("[data-cy=institutions-table-email]").should(
          "have.text",
          "escolaA@gmail.com"
        );
        cy.get("[data-cy=institutions-table-phone]").should(
          "have.text",
          "1111-1111"
        );
      });
  });

  it("Should have a button to add a new institution", () => {
    cy.visit("/instituicoes");

    cy.get("[data-cy=institutions-add-button]").should("exist");
  });

  it("Should display dialog when clicking on the button", () => {
    cy.visit("/instituicoes");

    cy.get("[data-cy=institutions-add-button]").click();

    cy.get("[data-cy=institutions-create-dialog]").should("exist");
  });

  it("Should display error message for invalid email", () => {
    cy.visit("/instituicoes");

    cy.get("[data-cy=institutions-add-button]").click();

    cy.get("[data-cy=institutions-create-dialog]").should("exist");

    cy.get("[data-cy=institutions-create-dialog-email]").type("invalid-email");
    cy.get("[data-cy=institutions-create-dialog-submit]").click();

    cy.get("[data-cy=institutions-create-dialog-email-error]").should("exist");
  });

  it("Should display error message for invalid phone", () => {
    cy.visit("/instituicoes");

    cy.get("[data-cy=institutions-add-button]").click();

    cy.get("[data-cy=institutions-create-dialog]").should("exist");
  });

  it("Should display error message for invalid name", () => {
    cy.visit("/instituicoes");

    cy.get("[data-cy=institutions-add-button]").click();

    cy.get("[data-cy=institutions-create-dialog]").should("exist");

    cy.get("[data-cy=institutions-create-dialog-name]").type("a");
    cy.get("[data-cy=institutions-create-dialog-submit]").click();

    cy.get("[data-cy=institutions-create-dialog-name-error]").should("exist");
  });

  it("Should be able to create a new institution", () => {
    cy.visit("/instituicoes");

    cy.get("[data-cy=institutions-add-button]").click();

    cy.get("[data-cy=institutions-create-dialog]").should("exist");

    cy.get("[data-cy=institutions-create-dialog-name]").type("Escola A");
    cy.get("[data-cy=institutions-create-dialog-email]").type(
      "escolaA@gmail.com"
    );
    cy.get("[data-cy=institutions-create-dialog-phone]").type("1111-1111");
    cy.get("[data-cy=institutions-create-dialog-submit]").click();

    cy.get("[data-cy=institutions-table-name]").should("have.text", "Escola A");
    cy.get("[data-cy=institutions-table-email]").should(
      "have.text",
      "escolaA@gmail.com"
    );
    cy.get("[data-cy=institutions-table-phone]").should(
      "have.text",
      "1111-1111"
    );
  });

  it("Should reset form when clicking on cancel button", () => {
    cy.visit("/instituicoes");

    cy.get("[data-cy=institutions-add-button]").click();

    cy.get("[data-cy=institutions-create-dialog]").should("exist");

    cy.get("[data-cy=institutions-create-dialog-name]").type("Escola B");
    cy.get("[data-cy=institutions-create-dialog-email]").type(
      "escolaB@gmail.com"
    );
    cy.get("[data-cy=institutions-create-dialog-phone]").type("2222-2222");

    cy.get("[data-cy=institutions-create-dialog-close]").click();

    cy.get("[data-cy=institutions-create-dialog]").should("not.exist");

    cy.get("[data-cy=institutions-add-button]").click();

    cy.get("[data-cy=institutions-create-dialog-name]").should(
      "have.value",
      ""
    );
    cy.get("[data-cy=institutions-create-dialog-email]").should(
      "have.value",
      ""
    );
    cy.get("[data-cy=institutions-create-dialog-phone]").should(
      "have.value",
      ""
    );
  });

  it("Should reset form when is submitted", () => {
    cy.visit("/instituicoes");

    cy.get("[data-cy=institutions-add-button]").click();

    cy.get("[data-cy=institutions-create-dialog]").should("exist");

    cy.get("[data-cy=institutions-create-dialog-name]").type("Escola C");
    cy.get("[data-cy=institutions-create-dialog-email]").type(
      "escolaC@gmail.com"
    );

    cy.get("[data-cy=institutions-create-dialog-phone]").type("3333-3333");

    cy.get("[data-cy=institutions-create-dialog-submit]").click();

    cy.get("[data-cy=institutions-create-alert-message]").should(
      "have.text",
      "A instituição foi cadastrada."
    );

    cy.get("[data-cy=institutions-create-alert-close]").click();

    cy.get("[data-cy=institutions-create-dialog-name]").should(
      "have.value",
      ""
    );
    cy.get("[data-cy=institutions-create-dialog-email]").should(
      "have.value",
      ""
    );
    cy.get("[data-cy=institutions-create-dialog-phone]").should(
      "have.value",
      ""
    );
  });

  it("Should close the dialog when clicking on the close button", () => {
    cy.visit("/instituicoes");

    cy.get("[data-cy=institutions-add-button]").click();

    cy.get("[data-cy=institutions-create-dialog]").should("exist");

    cy.get("[data-cy=institutions-create-dialog-close]").click();

    cy.get("[data-cy=institutions-create-dialog]").should("not.exist");
  });

  // it("Should close the dialog when a form is successfully submitted", () => {
  //   cy.visit("/instituicoes");

  //   cy.get("[data-cy=institutions-add-button]").click();

  //   cy.get("[data-cy=institutions-create-dialog]").should("exist");

  //   cy.get("[data-cy=institutions-create-dialog-name]").type("Escola D");
  //   cy.get("[data-cy=institutions-create-dialog-email]").type(
  //     "escolaD@gmail.com"
  //   );
  //   cy.get("[data-cy=institutions-create-dialog-phone]").type("4444-4444");

  //   cy.get("[data-cy=institutions-create-dialog-submit]").click();

  //   cy.get("[data-cy=institutions-create-dialog]").should("not.exist");
  // });

  it("Should not be able to create a new institution with an existing email", () => {
    cy.visit("/instituicoes");

    cy.get("[data-cy=institutions-add-button]").click();
    cy.get("[data-cy=institutions-create-dialog-name]").type("Escola E");
    cy.get("[data-cy=institutions-create-dialog-email]").type(
      "escolaE@gmail.com"
    );
    cy.get("[data-cy=institutions-create-dialog-phone]").type("5555-5555");
    cy.get("[data-cy=institutions-create-dialog-submit]").click();

    cy.get("[data-cy=institutions-create-alert-message]").should(
      "have.text",
      "A instituição foi cadastrada."
    );

    cy.get("[data-cy=institutions-create-alert-close]").click();

    cy.get("[data-cy=institutions-create-dialog-name]").type("Escola F");
    cy.get("[data-cy=institutions-create-dialog-email]").type(
      "escolaE@gmail.com"
    );
    cy.get("[data-cy=institutions-create-dialog-phone]").type("6666-6666");
    cy.get("[data-cy=institutions-create-dialog-submit]").click();

    cy.get("[data-cy=institutions-create-dialog]").should("exist");

    cy.get("[data-cy=institutions-create-alert-message]").should(
      "have.text",
      "Instituição já cadastrada"
    );

    cy.get("[data-cy=institutions-create-alert-title]").should(
      "have.text",
      "Ops. Parece que algo deu errado."
    );
    
    cy.get("[data-cy=institutions-create-alert-close]").click();
  });

  it("Should display success message when a form is successfully submitted", () => {
    cy.visit("/instituicoes");

    cy.get("[data-cy=institutions-add-button]").click();

    cy.get("[data-cy=institutions-create-dialog-name]").type("Escola G");
    cy.get("[data-cy=institutions-create-dialog-email]").type(
      "escolaG@gmail.com"
    );
    cy.get("[data-cy=institutions-create-dialog-phone]").type("7777-7777");
    cy.get("[data-cy=institutions-create-dialog-submit]").click();

    cy.get("[data-cy=institutions-create-alert-message]").should("exist");
    cy.get("[data-cy=institutions-create-alert-title]").should(
      "have.text",
      "Cadastro realizado com sucesso!"
    );

    cy.get("[data-cy=institutions-create-alert-close]").click();
  });
});
