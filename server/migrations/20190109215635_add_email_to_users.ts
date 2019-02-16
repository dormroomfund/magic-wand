import Knex from 'knex';

export const up = async (knex: Knex) => {
  await knex.schema.table('users', (table) => {
    table
      .text('email')
      .notNullable()
      .defaultTo('');
  });
};

export const down = async (knex: Knex) => {
  await knex.schema.table('users', (table) => {
    table.dropColumn('email');
  });
};
