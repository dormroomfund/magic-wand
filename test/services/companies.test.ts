import assert from 'assert';
import app from '../../server/app';

describe('Companies Test', () => {
  it('should do something', () => {
    expect(true).toEqual(true);
  });

  it('registered the companies service', async () => {
    const service = app.service('/api/companies');

    assert.ok(service, 'Registered the service');
  });

  it('contains the seed companies data', async () => {
    const service = app.service('/api/companies');

    const company = await service.find({
      query: {
        name: 'Tesla 2.0',
      },
    });

    assert.equal(company.total, 1, 'One company called Tesla 2.0');
  });
});
