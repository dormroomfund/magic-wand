import Knex from 'knex';

export const up = (knex: Knex) =>
  Promise.all([
    knex.schema.createTable('companies', (table) => {
      table.increments('id').primary();
      table.text('name').notNullable();
      table.text('description').notNullable();
      table.text('status').notNullable();
      table.text('contact_email').notNullable();
      table.boolean('archived').defaultTo(false);
      table
        .jsonb('point_partners')
        .notNullable()
        .defaultTo('[]');
      table
        .jsonb('industries')
        .notNullable()
        .defaultTo('[]');
      table
        .jsonb('tags')
        .notNullable()
        .defaultTo('[]');
      table
        .jsonb('company_links')
        .notNullable()
        .defaultTo('[]');
      table.timestamps();
    }),
    knex.schema.createTable('users', (table) => {
      table.increments('id').primary();
      table
        .text('auth0')
        .notNullable()
        .unique();
      table.text('permissions').notNullable();
      table.text('first_name');
      table.text('last_name');
      table.text('school');
      table.text('photo');
      table.text('linkedin');
      table.text('gender');
      table.text('ethnicity');
      table.text('partner_team');
      table.text('partner_position');
      table.timestamps();
    }),
    knex.schema.createTable('votes', (table) => {
      table.increments('id').primary();
      table.text('vote_type').notNullable();
      table.integer('partner_id').unsigned();
      table
        .foreign('partner_id')
        .references('users.id')
        .onDelete('CASCADE');
      table.integer('company_id').unsigned();
      table
        .foreign('company_id')
        .references('companies.id')
        .onDelete('CASCADE');
      table.integer('market_score');
      table.integer('product_score');
      table.integer('team_score');
      table.integer('fit_score');
      table.text('comment');
      table.timestamps();
    }),
  ]);

export const down = async (knex: Knex) => {
  await knex.schema.dropTable('votes');
  await knex.schema.dropTable('users');
  await knex.schema.dropTable('companies');
};
