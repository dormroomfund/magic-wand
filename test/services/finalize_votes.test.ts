/*
 * Tests the finalize_votes service
 */
import assert from 'assert';
import app from '../../server/app';

describe("' api/votes/finalize ' service", () => {
  it('registered the service', () => {
    const service = app.service('/api/votes/finalize');

    assert.ok(service, 'Registered the service');
  });
});
