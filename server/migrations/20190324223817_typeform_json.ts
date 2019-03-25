import Knex from 'knex';

exports.up = async (knex: Knex) => {
  await knex.schema.table('companies', (table) => {
    table.jsonb('typeform_data');
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.table('companies', (table) => {
    table.dropColumn('typeform_data');
  });
};
