describe("Login Screen", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");
  });

  it("deveria mostrar sucesso ao logar", () => {
    cy.get("#user").type("admin");
    cy.get("#password").type("admin");

    cy.contains("button", "Submit").click();

    cy.contains("Logado com sucesso!");
  });

  it("deveria mostrar insucesso ao logar", () => {
    cy.get("#user").type("hakuna");
    cy.get("#password").type("matata");

    cy.contains("button", "Submit").click();

    cy.contains("Nome de usuário ou senha inválidos.").should("be.visible");
  });
});
