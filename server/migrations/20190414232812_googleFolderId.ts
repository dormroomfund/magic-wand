import * as Knex from 'knex';

exports.up = async (knex: Knex) => {
  await knex.schema.alterTable('company', (table) => {
    table.text('googleFolderId').unique();
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.alterTable('company', (table) => {
    table.dropColumn('googleFolderId');
  });
};
