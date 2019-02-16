import * as Knex from 'knex';

export const up = async (knex: Knex) => {
  await knex.schema.alterTable('users', (table) => {
    table.text('auth0Id').unique();
    table
      .text('permissions')
      .defaultTo('')
      .alter();
  });
};

export const down = async (knex: Knex) => {
  await knex.schema.alterTable('users', (table) => {
    table.dropColumn('auth0Id');
  });
};
