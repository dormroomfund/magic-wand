import Knex from 'knex';

export const up = async (knex: Knex) =>
  knex.schema.alterTable('companies', (table) => {
    table.dropColumn('archived');
    table.text('team');
  });

export const down = async (knex: Knex) =>
  knex.schema.alterTable('companies', (table) => {
    table.boolean('archived').defaultTo(false);
    table.dropColumn('team');
  });
