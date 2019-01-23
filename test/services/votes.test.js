const app = require('../../server/app');

describe("'votes' service", () => {
  it('registered the service', () => {
    const service = app.service('votes');
    expect(service).toBeTruthy();
  });
});
