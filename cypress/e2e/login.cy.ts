describe("Login Screen", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");
  });

  it('should display "Login successful!" alert for valid credentials', () => {
    // Replace with valid credentials for testing
    cy.get("#user").type("admin");
    cy.get("#password").type("admin");

    cy.contains("button", "Submit").click();

    cy.contains("Logado com sucesso!");
  });

  it('should display "Invalid username or password." alert for invalid credentials', () => {
    // Enter invalid credentials
    cy.get("#user").type("invalidUsername");
    cy.get("#password").type("invalidPassword");

    cy.contains("button", "Submit").click();
    cy.contains("Nome de usuário ou senha inválidos.");
  });
});
