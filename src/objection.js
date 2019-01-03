import { Model } from 'objection';
import knex from 'knex';

export default function(app) {
  const { client, connection } = app.get('postgres');
  const kn = knex({ client, connection, useNullAsDefault: false });

  Model.knex(kn);

  app.set('knex', kn);
}
