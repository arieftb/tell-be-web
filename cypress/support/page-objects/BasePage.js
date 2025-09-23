export class BasePage {
  visit(url) {
    cy.visit(url);
    this.waitForLoad();
    return this;
  }

  waitForLoad() {
    cy.get('body').should('be.visible');
    return this;
  }

  clickElement(selector) {
    cy.get(selector).should('be.visible').click();
    return this;
  }

  typeInElement(selector, text) {
    cy.get(selector).should('be.visible').clear().type(text);
    return this;
  }

  verifyElementVisible(selector) {
    cy.get(selector).should('be.visible');
    return this;
  }

  verifyElementText(selector, text) {
    cy.get(selector).should('contain.text', text);
    return this;
  }

  verifyElementNotExist(selector) {
    cy.get(selector).should('not.exist');
    return this;
  }

  verifyUrl(urlPart) {
    cy.url().should('include', urlPart);
    return this;
  }

  verifyUrlNotInclude(urlPart) {
    cy.url().should('not.include', urlPart);
    return this;
  }
}