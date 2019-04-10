import _ from 'lodash';
import * as Knex from 'knex';

/* eslint-disable @typescript-eslint/camelcase */
export async function up(knex: Knex) {
  await knex.schema.createTable('company_point_partner', (table) => {
    table.increments('id').primary();
    table
      .integer('user_id')
      .references('id')
      .inTable('users');
    table
      .integer('company_id')
      .references('id')
      .inTable('companies');
    table
      .timestamp('createdAt')
      .notNullable()
      .defaultTo(knex.fn.now());
    table
      .timestamp('updatedAt')
      .notNullable()
      .defaultTo(knex.fn.now());
  });

  const companies = await knex('companies').select('id', 'point_partners');
  await knex('company_point_partner').insert(
    companies.reduce(
      (acc, company) => [
        ...acc,
        ...company.point_partners.map((partner_id) => ({
          user_id: partner_id,
          company_id: company.id,
        })),
      ],
      []
    )
  );

  await knex.schema.alterTable('companies', (table) => {
    table.dropColumn('point_partners');
  });
}

export async function down(knex: Knex) {
  await knex.schema.alterTable('companies', (table) => {
    table.jsonb('point_partners');
  });

  const joins = await knex('company_point_partner').select();
  const byCompany = _.groupBy(joins, (join) => join.company_id);

  await Promise.all(
    Object.entries(byCompany).map(async ([companyId, group]) => {
      await knex('companies')
        .where({ id: companyId })
        .update({
          point_partners: JSON.stringify(group.map((row) => row.user_id)),
        });
    })
  );

  await knex.schema.dropTable('company_point_partner');
}
/* eslint-enable @typescript-eslint/camelcase */
