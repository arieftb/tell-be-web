import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  // Selectors - these need to be updated based on actual app structure
  get userMenu() { return '.user-menu, .profile-menu, nav'; }
  get logoutButton() { return 'button:contains("Logout"), a:contains("Logout")'; }
  get welcomeMessage() { return '.welcome, .greeting'; }
  get navigationMenu() { return 'nav, .navigation'; }

  // Actions
  visitHomePage() {
    return this.visit('/');
  }

  visitDashboard() {
    return this.visit('/dashboard');
  }

  clickUserMenu() {
    return this.clickElement(this.userMenu);
  }

  clickLogoutButton() {
    return this.clickElement(this.logoutButton);
  }

  // Complex actions
  performLogout() {
    this.clickUserMenu();
    return this.clickLogoutButton();
  }

  // Verifications
  verifyUserLoggedIn() {
    return this.verifyElementVisible(this.userMenu);
  }

  verifyWelcomeMessage() {
    return this.verifyElementVisible(this.welcomeMessage);
  }

  verifyNavigationVisible() {
    return this.verifyElementVisible(this.navigationMenu);
  }

  verifyUserMenuNotExist() {
    return this.verifyElementNotExist(this.userMenu);
  }

  verifyOnHomePage() {
    return this.verifyUrl('/');
  }

  verifyOnDashboard() {
    return this.verifyUrl('/dashboard');
  }
}