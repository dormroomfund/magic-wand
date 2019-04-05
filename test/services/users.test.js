import { service as _service } from '../../server/app';

describe("'users' service", () => {
  it('registered the service', () => {
    const service = _service('users');
    expect(service).toBeTruthy();
  });
});
