describe("Login Screen", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");
  });

  it("Login válido", () => {
    cy.get("#user").type("admin");
    cy.get("#password").type("admin");

    cy.contains("button", "Submit").click();

    cy.url().should("include", "/estacionamento");
  });

  it("Erro no login", () => {
    cy.get("#user").type("invalidUsername");
    cy.get("#password").type("invalidPassword");

    cy.contains("button", "Submit").click();
    cy.contains("Nome de usuário ou senha inválidos.");
  });
});
