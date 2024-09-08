import { Farming } from "../../src/app/(sidebar)/culturas/_models";

describe("Farming page", () => {
  beforeEach(() => {
    cy.setCookie("auth", "true");
  });

  it("Should be able to view a existing farming", async () => {
    cy.window().then((win) => {
      win.localStorage.setItem(
        "farmings",
        JSON.stringify([
          new Farming("Cultura 1", 100, 200, 300, 400, "Manual 1"),
        ])
      );

      cy.visit("/culturas");

      cy.get("[data-cy=farmings-table]").should("exist");

      cy.get("[data-cy=farmings-table-row]").within(() => {
        cy.get("td").eq(0).should("contain", "Cultura 1");
        cy.get("td").eq(1).should("contain", "100");
        cy.get("td").eq(2).should("contain", "200");
        cy.get("td").eq(3).should("contain", "300");
        cy.get("td").eq(4).should("contain", "400");
        cy.get("td").eq(5).should("contain", "");
      });
    });
  });

  it("Should open the dialog to create a new farming", () => {
    cy.visit("/culturas");

    cy.get("[data-cy=create-farming-button]").click();

    cy.get("[data-cy=farming-dialog]").should("be.visible");
  });

  it("Should warn when farming is empty", () => {
    cy.visit("/culturas");

    cy.get("[data-cy=create-farming-button]").click();

    cy.get("[data-cy=farming-dialog]").should("be.visible");

    cy.get("[data-cy=farming-dialog-submit]").click();

    cy.get("[data-cy=farming-dialog-farming-error]").should(
      "contain",
      "Cultura deve ter no mínimo 3 caracteres"
    );
  });

  it("Should warn when pre_school is negative", () => {
    cy.visit("/culturas");

    cy.get("[data-cy=create-farming-button]").click();

    cy.get("[data-cy=farming-dialog]").should("be.visible");

    cy.get("[data-cy=farming-dialog-pre_school]").clear().type("-100");

    cy.get("[data-cy=farming-dialog-submit]").click();

    cy.get("[data-cy=farming-dialog-pre_school-error]").should(
      "contain",
      "Deve ser um número positivo"
    );
  });

  it("Should warn when pre_school is zero", () => {
    cy.visit("/culturas");

    cy.get("[data-cy=create-farming-button]").click();

    cy.get("[data-cy=farming-dialog]").should("be.visible");

    cy.get("[data-cy=farming-dialog-submit]").click();

    cy.get("[data-cy=farming-dialog-pre_school-error]").should(
      "contain",
      "Deve ser um número positivo"
    );
  });

  it("Should warn when elementary_school is negative", () => {
    cy.visit("/culturas");

    cy.get("[data-cy=create-farming-button]").click();

    cy.get("[data-cy=farming-dialog]").should("be.visible");

    cy.get("[data-cy=farming-dialog-elementary_school]").clear().type("-100");

    cy.get("[data-cy=farming-dialog-submit]").click();

    cy.get("[data-cy=farming-dialog-elementary_school-error]").should(
      "contain",
      "Deve ser um número positivo"
    );
  });

  it("Should warn when elementary_school is zero", () => {
    cy.visit("/culturas");

    cy.get("[data-cy=create-farming-button]").click();

    cy.get("[data-cy=farming-dialog]").should("be.visible");

    cy.get("[data-cy=farming-dialog-submit]").click();
  });

  it("Should warn when high_school is negative", () => {
    cy.visit("/culturas");

    cy.get("[data-cy=create-farming-button]").click();

    cy.get("[data-cy=farming-dialog]").should("be.visible");

    cy.get("[data-cy=farming-dialog-high_school]").clear().type("-100");

    cy.get("[data-cy=farming-dialog-submit]").click();

    cy.get("[data-cy=farming-dialog-high_school-error]").should(
      "contain",
      "Deve ser um número positivo"
    );
  });

  it("Should warn when high_school is zero", () => {
    cy.visit("/culturas");

    cy.get("[data-cy=create-farming-button]").click();

    cy.get("[data-cy=farming-dialog]").should("be.visible");

    cy.get("[data-cy=farming-dialog-submit]").click();
  });

  it("Should warn when adults_and_elderly is negative", () => {
    cy.visit("/culturas");

    cy.get("[data-cy=create-farming-button]").click();

    cy.get("[data-cy=farming-dialog]").should("be.visible");

    cy.get("[data-cy=farming-dialog-adults_and_elderly]").clear().type("-100");

    cy.get("[data-cy=farming-dialog-submit]").click();
  });

  it("Should warn when adults_and_elderly is zero", () => {
    cy.visit("/culturas");

    cy.get("[data-cy=create-farming-button]").click();

    cy.get("[data-cy=farming-dialog]").should("be.visible");

    cy.get("[data-cy=farming-dialog-submit]").click();

    cy.get("[data-cy=farming-dialog-adults_and_elderly-error]").should(
      "contain",
      "Deve ser um número positivo"
    );
  });

  it("Should not warn when manual is empty", () => {
    cy.visit("/culturas");

    cy.get("[data-cy=create-farming-button]").click();

    cy.get("[data-cy=farming-dialog]").should("be.visible");

    cy.get("[data-cy=farming-dialog-submit]").click();

    cy.get("[data-cy=farming-dialog-manual-error]").should("not.exist");
  });

  const fillFarmingForm = (formData: {
    farming: string;
    preSchool: string;
    elementarySchool: string;
    highSchool: string;
    adultsAndElderly: string;
    manual: string;
  }) => {
    cy.get("[data-cy=farming-dialog-farming]").type(formData.farming);
    cy.get("[data-cy=farming-dialog-pre_school]")
      .clear()
      .type(formData.preSchool);
    cy.get("[data-cy=farming-dialog-elementary_school]")
      .clear()
      .type(formData.elementarySchool);
    cy.get("[data-cy=farming-dialog-high_school]")
      .clear()
      .type(formData.highSchool);
    cy.get("[data-cy=farming-dialog-adults_and_elderly]")
      .clear()
      .type(formData.adultsAndElderly);
    cy.get("[data-cy=farming-dialog-manual]").type(formData.manual);
  };

  const checkAddedFarming = (formData: {
    farming: string;
    preSchool: string;
    elementarySchool: string;
    highSchool: string;
    adultsAndElderly: string;
    manual: string;
  }) => {
    cy.get("[data-cy=farmings-table-row]").within(() => {
      cy.get("td").eq(0).should("contain", formData.farming);
      cy.get("td").eq(1).should("contain", formData.preSchool);
      cy.get("td").eq(2).should("contain", formData.elementarySchool);
      cy.get("td").eq(3).should("contain", formData.highSchool);
      cy.get("td").eq(4).should("contain", formData.adultsAndElderly);
      cy.get("td").eq(5).should("contain", formData.manual);
    });
  };

  it("Should create a new farming", () => {
    cy.visit("/culturas");

    cy.get("[data-cy=create-farming-button]").click();

    cy.get("[data-cy=farming-dialog]").should("be.visible");

    const farmingData = {
      farming: "Cultura 2",
      preSchool: "100",
      elementarySchool: "200",
      highSchool: "300",
      adultsAndElderly: "400",
      manual: "Manual 2",
    };

    fillFarmingForm(farmingData);

    cy.get("[data-cy=farming-dialog-submit]").click();

    cy.get("[data-cy=farmings-table]").should("exist");

    checkAddedFarming(farmingData);
  });

  it("Should be able to clean the form when the user click on the cancel button", () => {
    cy.visit("/culturas");

    cy.get("[data-cy=create-farming-button]").click();

    cy.get("[data-cy=farming-dialog]").should("be.visible");

    const farmingData = {
      farming: "Cultura Teste",
      preSchool: "50",
      elementarySchool: "100",
      highSchool: "150",
      adultsAndElderly: "200",
      manual: "Manual Teste",
    };

    fillFarmingForm(farmingData);

    cy.get("[data-cy=farming-dialog-cancel]").click();

    cy.get("[data-cy=farming-dialog]").should("not.exist");

    cy.get("[data-cy=create-farming-button]").click();

    cy.get("[data-cy=farming-dialog]").should("be.visible");

    checkEmptyForm();
  });

  it("Should be able to clean the form when the form is submitted", () => {
    cy.visit("/culturas");

    cy.get("[data-cy=create-farming-button]").click();

    cy.get("[data-cy=farming-dialog]").should("be.visible");

    const farmingData = {
      farming: "Cultura Teste",
      preSchool: "50",
      elementarySchool: "100",
      highSchool: "150",
      adultsAndElderly: "200",
      manual: "Manual Teste",
    };

    fillFarmingForm(farmingData);

    cy.get("[data-cy=farming-dialog-submit]").click();

    cy.get("[data-cy=farming-dialog]").should("exist");

    checkEmptyForm();
  });

  function checkEmptyForm() {
    cy.get("[data-cy=farming-dialog-farming]").should("have.value", "");
    cy.get("[data-cy=farming-dialog-pre_school]").should("have.value", "0");
    cy.get("[data-cy=farming-dialog-elementary_school]").should(
      "have.value",
      "0"
    );
    cy.get("[data-cy=farming-dialog-high_school]").should("have.value", "0");
    cy.get("[data-cy=farming-dialog-adults_and_elderly]").should(
      "have.value",
      "0"
    );
    cy.get("[data-cy=farming-dialog-manual]").should("have.value", "");
  }

  it("Should be able to show a success message when a farm is created ", () => {
    cy.visit("/culturas");

    cy.get("[data-cy=create-farming-button]").click();

    cy.get("[data-cy=farming-dialog]").should("be.visible");

    const farmingData = {
      farming: "Cultura Teste",
      preSchool: "50",
      elementarySchool: "100",
      highSchool: "150",
      adultsAndElderly: "200",
      manual: "Manual Teste",
    };

    fillFarmingForm(farmingData);

    cy.get("[data-cy=farming-dialog-submit]").click();

    cy.get("[data-cy=farming-alert-title]").should("contain", "Cultura criada");

    cy.get("[data-cy=farming-alert-message]").should(
      "contain",
      "Cultura criada com sucesso"
    );

    cy.get("[data-cy=farming-alert-close]").click();

    cy.get("[data-cy=farming-alert-title]").should("not.exist");
  });

  it("Should be able to warn when a farming is duplicated by name", () => {
    cy.visit("/culturas");

    cy.get("[data-cy=create-farming-button]").click();

    cy.get("[data-cy=farming-dialog]").should("be.visible");

    const farmingData = {
      farming: "Cultura 1",
      preSchool: "50",
      elementarySchool: "100",
      highSchool: "150",
      adultsAndElderly: "200",
      manual: "Manual Teste",
    };

    fillFarmingForm(farmingData);

    cy.get("[data-cy=farming-dialog-submit]").click();

    cy.get("[data-cy=farming-alert-close]").click();

    fillFarmingForm(farmingData);

    cy.get("[data-cy=farming-dialog-submit]").click();

    cy.get("[data-cy=farming-alert-title]").should(
      "contain",
      "Cultura já cadastrada"
    );

    cy.get("[data-cy=farming-alert-message]").should(
      "contain",
      "Já existe uma cultura cadastrada com esse nome"
    );
  });

  it("Should persist the farmings in the local storage", () => {
    cy.visit("/culturas");

    cy.get("[data-cy=create-farming-button]").click();

    cy.get("[data-cy=farming-dialog]").should("be.visible");

    const farmingData = {
      farming: "Cultura Teste",
      preSchool: "50",
      elementarySchool: "100",
      highSchool: "150",
      adultsAndElderly: "200",
      manual: "Manual Teste",
    };

    fillFarmingForm(farmingData);

    cy.get("[data-cy=farming-dialog-submit]").click();

    cy.get("[data-cy=farmings-table]").should("exist");

    cy.reload();

    cy.get("[data-cy=farmings-table]").should("exist");

    checkAddedFarming(farmingData);
  });
});
