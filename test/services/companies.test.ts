import assert from 'assert';
import knex from 'knex';
import app from '../../server/app';

import knexConfig from '../testdb_knexfile';

let client;
// before each test case migrate the database and reseed.
beforeAll(async () => {
  knexConfig.migrations.directory = './server/migrations';
  knexConfig.seeds.directory = './server/seeds';

  client = knex(knexConfig);

  await client.migrate.rollback();
  await client.migrate.latest();
  await client.seed.run();
});

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

// Rollback the database to clear all data.
afterAll(async () => {
  await client.migrate.rollback(); // rollback to the latest
  const red = await client.destroy();
});
