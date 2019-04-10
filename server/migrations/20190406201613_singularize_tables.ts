import * as Knex from 'knex';
import _ from 'lodash';

export async function up(knex: Knex) {
  await Promise.all([
    knex.schema.renameTable('companies', 'company'),
    knex.schema.renameTable('users', 'user'),
    knex.schema.renameTable('votes', 'vote'),
  ]);
}

export async function down(knex: Knex) {
  await Promise.all([
    knex.schema.renameTable('company', 'companies'),
    knex.schema.renameTable('user', 'users'),
    knex.schema.renameTable('vote', 'votes'),
  ]);
}
