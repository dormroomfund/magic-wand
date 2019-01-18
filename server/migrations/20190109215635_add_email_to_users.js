exports.up = function(knex) {
  return knex.schema.table('users', (table) => {
    table
      .text('email')
      .notNullable()
      .defaultTo('');
  });
};

exports.down = function(knex) {
  return knex.schema.table('users', (table) => {
    table.dropColumn('email');
  });
};
