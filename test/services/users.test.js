const app = require('../../server/app');

describe("'users' service", () => {
  it('registered the service', () => {
    const service = app.service('users');
    expect(service).toBeTruthy();
  });
});
