import Knex from 'knex';

export const up = async (knex: Knex) =>
  knex.schema.createTable('comment', (table) => {
    table.increments('id').primary();
    table
      .integer('userId')
      .references('id')
      .inTable('user')
      .onDelete('SET NULL');
    table
      .integer('companyId')
      .references('id')
      .inTable('company')
      .onDelete('CASCADE');
    table.text('content').notNullable();
    table
      .timestamp('createdAt')
      .notNullable()
      .defaultTo(knex.fn.now());
    table
      .timestamp('updatedAt')
      .notNullable()
      .defaultTo(knex.fn.now());
  });

export const down = async (knex: Knex) => knex.schema.dropTable('comment');
