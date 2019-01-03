const { Model } = require('objection');
const knex = require('knex');

module.exports = function(app) {
  const { client, connection } = app.get('postgres');
  const kn = knex({ client, connection, useNullAsDefault: false });

  Model.knex(kn);

  app.set('knex', kn);
};
