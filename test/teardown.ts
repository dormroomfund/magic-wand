import knex from 'knex';
import knexConfig from './testdb_knexfile';

const teardown = async () => {
  const client = knex(knexConfig);
  await client.destroy();
};

module.exports = teardown;
