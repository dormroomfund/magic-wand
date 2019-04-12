import Knex from 'knex';

export const up = async (knex: Knex) =>
  knex.schema.alterTable('companies', (table) => {
    table.date('pitchDate');
  });

export const down = async (knex: Knex) =>
  knex.schema.alterTable('companies', (table) => {
    table.dropColumn('pitchDate');
  });
