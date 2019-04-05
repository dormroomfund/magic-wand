describe('authentication', function() {
  beforeEach(() => {
    cy.hideSocketIo();
  });

  it('is logged out by default', function() {
    cy.visit('/')
      .contains('Log In')
      .should('be.visible');
  });

  it('logs in', function() {
    cy.login()
      .visit('/')
      .contains('Proceed to Pipeline')
      .should('be.visible');
  });

  it('logs out', function() {
    cy.login()
      .visit('/')
      .get('.dropdown.nav-item')
      .click();

    cy.contains('Log Out')
      .should('be.visible')
      .click();

    cy.visit('/');
  });
});
