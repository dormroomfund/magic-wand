describe('authentication', () => {
  beforeEach(() => {
    cy.hideSocketIo();
  });

  it('is logged out by default', () => {
    cy.visit('/')
      .contains('Log In')
      .should('be.visible');
  });

  it('logs in', () => {
    cy.login()
      .visit('/')
      .contains('Proceed to Pipeline')
      .should('be.visible');
  });

  it('logs out', () => {
    cy.login()
      .visit('/')
      .get('.dropdown.nav-item')
      .click();

    cy.contains('Log Out')
      .should('be.visible')
      .click();

    cy.visit('/')
      .contains('Log In')
      .should('be.visible');
  });
});
