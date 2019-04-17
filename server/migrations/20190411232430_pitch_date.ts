import Knex from 'knex';

export const up = async (knex: Knex) =>
  knex.schema.alterTable('company', (table) => {
    table.date('pitchDate');
  });

export const down = async (knex: Knex) =>
  knex.schema.alterTable('company', (table) => {
    table.dropColumn('pitchDate');
  });
