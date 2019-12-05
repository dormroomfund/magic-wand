import { service as _service } from '../../server/app';

describe("'votes' service", () => {
  it('registered the service', () => {
    const service = _service('votes');
    expect(service).toBeTruthy();
  });
});
