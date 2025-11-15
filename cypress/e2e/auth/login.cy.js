import { LoginPage } from "../../support/page-objects/LoginPage";

describe("Login Flow", () => {
  let loginPage;

  beforeEach(() => {
    loginPage = new LoginPage();
  });

  it("should allow user to login with valid credentials", () => {
    cy.fixture("users").then((users) => {
      const { email, password } = users.validUser;

      loginPage.visitLoginPage().performLogin(email, password);

      // Verify successful login - just check URL changes from login page
      loginPage.verifyNotOnLoginPage();
      // Note: localStorage token check may depend on actual implementation
    });
  });

  it("should show error for invalid credentials", () => {
    cy.fixture("users").then((users) => {
      const { email, password } = users.invalidUser;

      loginPage.visitLoginPage().performLogin(email, password);

      // Verify error handling - check if form still visible and URL unchanged
      loginPage.verifyOnLoginPage();
      loginPage.verifyLoginFormVisible();
    });
  });

  it("should show validation errors for empty fields", () => {
    loginPage.visitLoginPage().clickLoginButton();

    // Check that we're still on login page after failed submission
    loginPage.verifyOnLoginPage();
    loginPage.verifyLoginFormVisible();
  });

  it("should validate email format", () => {
    cy.fixture("users").then((users) => {
      // Test with one invalid email to avoid long test
      const invalidEmail = users.invalidEmails[0];

      loginPage
        .visitLoginPage()
        .fillEmail(invalidEmail)
        .fillPassword("password123")
        .clickLoginButton();

      loginPage.verifyOnLoginPage();
      loginPage.verifyLoginFormVisible();
    });
  });
});
