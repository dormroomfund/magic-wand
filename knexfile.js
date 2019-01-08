const config = require('config');
const t = require('tcomb');
require('babel-register');

const client = config.get('postgres.client');
t.String(client);

const connection = config.get('postgres.connection');
t.String(client);

module.exports = {
  client: 'pg',
  connection,
  migrations: {
    directory: 'server/migrations',
    tableName: 'knex_migrations',
  },
  pool: {
    min: 2,
    max: 10,
  },
  useNullAsDefault: false,
};
