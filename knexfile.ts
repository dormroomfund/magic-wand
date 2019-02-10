const config = require('config');
const t = require('tcomb');

const client = config.get('postgres.client');
t.String(client);

const connection = config.get('postgres.connection');
t.String(client);

const knexConfig = {
  client: 'pg',
  connection,
  migrations: {
    directory: './server/migrations',
    tableName: 'knex_migrations',
  },
  seeds: {
    directory: './server/seeds',
  },
  pool: {
    min: 2,
    max: 10,
  },
  useNullAsDefault: false,
};

export default knexConfig;
module.exports = knexConfig;
