import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.alterTable('users', (table) => {
    table.text('auth0Id').unique();
    table
      .text('permissions')
      .defaultTo('')
      .alter();
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.alterTable('users', (table) => {
    table.dropColumn('auth0Id');
  });
}
