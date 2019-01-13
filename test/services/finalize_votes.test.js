const app = require('../../server/app');

describe("'finalize votes' service", () => {
  it('registered the service', () => {
    const service = app.service('finalize-votes');
    expect(service).toBeTruthy();
  });
});
