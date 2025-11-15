import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
  // Selectors based on actual form structure
  get emailInput() {
    return "#email";
  }
  get passwordInput() {
    return "#password";
  }
  get loginButton() {
    return 'button[type="submit"]';
  }
  get errorMessage() {
    return ".errorMessage";
  }
  get emailError() {
    return ".error";
  }
  get passwordError() {
    return ".error";
  }
  get loginForm() {
    return "form";
  }

  // Actions
  visitLoginPage() {
    return this.visit("/login");
  }

  fillEmail(email) {
    return this.typeInElement(this.emailInput, email);
  }

  fillPassword(password) {
    return this.typeInElement(this.passwordInput, password);
  }

  clickLoginButton() {
    return this.clickElement(this.loginButton);
  }

  // Complex actions
  performLogin(email, password) {
    this.fillEmail(email);
    this.fillPassword(password);
    return this.clickLoginButton();
  }

  // Verifications
  verifyErrorMessage(message) {
    return this.verifyElementText(this.errorMessage, message);
  }

  verifyEmailError(message) {
    return this.verifyElementText(this.emailError, message);
  }

  verifyPasswordError(message) {
    return this.verifyElementText(this.passwordError, message);
  }

  verifyLoginFormVisible() {
    return this.verifyElementVisible(this.loginForm);
  }

  verifyOnLoginPage() {
    return this.verifyUrl("/login");
  }

  verifyNotOnLoginPage() {
    return this.verifyUrlNotInclude("/login");
  }
}
