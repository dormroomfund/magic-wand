/*
 * Knexfile that is used to manage the migrations for the test database. Note that test
 * database schema/structure should manage the local database schema/structure.
 */

import t from 'tcomb';
import * as config from '../config/test.json';

const {
  postgres: { client, connection },
} = config;

t.String(client);
t.String(connection);

const knexConfig = {
  client: 'pg',
  connection,
  migrations: {
    directory: '../server/migrations',
    tableName: 'knex_migrations',
  },
  seeds: {
    directory: '../server/seeds',
  },
  pool: {
    min: 2,
    max: 10,
  },
  useNullAsDefault: false,
};

module.exports = knexConfig;
