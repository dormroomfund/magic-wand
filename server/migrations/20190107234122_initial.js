exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('companies', (table) => {
      table.increments('id').primary();
      table.text('name').notNullable();
      table.text('description').notNullable();
      table.specificType('industries', 'text ARRAY');
      table.text('status').notNullable();
      table.text('contact_email').notNullable();
      table.json('company_links').defaultTo('{}');
      table.timestamps();
    }),
    knex.schema.createTable('users', (table) => {
      table.increments('id');
      table.text('auth0').notNullable();
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
      table.text('vote_type').notNullable();
      table.integer('partner_id').unsigned();
      table
        .foreign('partner_id')
        .references('users.id')
        .onDelete('CASCADE');
      table
        .foreign('company_id')
        .references('companies.id')
        .onDelte('CASCADE');
      table.decimal('market_score');
      table.decimal('product_score');
      table.decimal('team_score');
      table.decimal('fit_score');
      table.text('comment');
      table.timestamps();
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('companies'),
    knex.schema.dropTable('users'),
    knex.schema.dropTable('votes'),
  ]);
};
