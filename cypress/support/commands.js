// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Login command with session caching
Cypress.Commands.add("login", (email, password) => {
  cy.session([email, password], () => {
    cy.visit("/login");
    cy.get("#email").type(email);
    cy.get("#password").type(password);
    cy.get('button[type="submit"]').click();
    cy.url().should("not.include", "/login");
  });
});

// Logout command - needs to be updated based on actual app structure
Cypress.Commands.add("logout", () => {
  cy.get(".user-menu, .profile-menu").click();
  cy.contains("Logout").click();
  cy.url().should("include", "/login");
});

// API mocking commands
Cypress.Commands.add("mockLoginSuccess", () => {
  cy.intercept("POST", "/api/auth/login", {
    statusCode: 200,
    body: {
      token: "mock-jwt-token",
      user: { id: 1, email: "test@example.com" },
    },
  }).as("loginRequest");
});

Cypress.Commands.add("mockLoginFailure", () => {
  cy.intercept("POST", "/api/auth/login", {
    statusCode: 401,
    body: { message: "Invalid credentials" },
  }).as("loginRequest");
});
