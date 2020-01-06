/*
 * Tests the finalize_votes service
 */
import assert from 'assert';
import app from '../../server/app';

describe("' api/votes/finalize ' service", () => {
  it('registered the final_votes service', () => {
    const service = app.service('/api/votes/finalize');

    assert.ok(service, 'Registered the service');
  });

  it('registered the votes service', async () => {
    const service = app.service('/api/votes');

    const ans = await app.service('api/votes').find({
      query: {
        voteType: 'prevote',
      },
    });

    console.log(ans.data);

    assert.ok(service, 'Registered the service');
  });
});
