import Knex from 'knex';

exports.up = async (knex: Knex) => {
  await knex.schema.table('companies', (table) => {
    table.text('snapshot');
    table.text('prevote');
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.table('companies', (table) => {
    table.dropColumn('snapshot');
    table.dropColumn('prevote');
  });
};
