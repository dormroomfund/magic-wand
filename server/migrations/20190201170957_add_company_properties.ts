exports.up = function(knex) {
  return knex.schema.table('companies', (table) => {
    table.specificType('point_partners', 'integer ARRAY');
    table.specificType('tags', 'text ARRAY');
    table.boolean('archived').defaultTo(false);
  });
};

exports.down = function(knex) {
  return knex.schema.table('companies', (table) => {
    table.dropColumn('point_partners');
    table.dropColumn('tags');
    table.dropColumn('archived');
  });
};
