// ***********************************************

// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// see more example of adding custom commands to Cypress TS interface
// in https://github.com/cypress-io/add-cypress-custom-command-in-typescript
// add new command to the existing Cypress interface
// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  interface Chainable {
    login: () => Chainable<void>;
    hideSocketIo: () => Chainable<void>;
  }
}

//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (overrides = {}) => {
  // TODO: Create fixture user.
  Cypress.log({ name: 'login via jwt' });

  // The JWT fixture was generated using jwt.io using the secret in
  // `config/default.json` from an existing feathers token with a
  // long (2052) expiration date.
  cy.fixture('jwt').then((jwt: string) => {
    cy.request({
      url: '/api/authentication',
      method: 'POST' as 'POST',
      headers: { Authorization: jwt.trim() },
    });
  });
});

Cypress.Commands.add('hideSocketIo', (overrides = {}) => {
  cy.server({
    whitelist: (xhr) => {
      const regularResourcesRe = /\.(jsx?|coffee|html|less|s?css|svg)(\?.*)?$/;
      if (regularResourcesRe.test(xhr.url) && xhr.method === 'GET') return true;

      const socketRe = /\/socket.io\//;
      if (socketRe.test(xhr.url)) return true;

      return false;
    },
  });
});
