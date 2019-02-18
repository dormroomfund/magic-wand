import Knex from 'knex';

exports.up = async (knex: Knex) => {
  await knex.schema.table('votes', (table) => {
    table
      .text('overall_vote')
      .notNullable()
      .defaultTo('dont fund');
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.table('votes', (table) => {
    table.dropColumn('overall_vote');
  });
};
