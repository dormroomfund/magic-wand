import * as Knex from 'knex';
import { OverallVote } from '../../client/schemas/vote';

export const up = async (knex: Knex) =>
  await Promise.all([
    knex.schema.alterTable('company', (table) => {
      table.renameColumn('contact_email', 'contactEmail');
      table.renameColumn('company_links', 'companyLinks');
      table.renameColumn('created_at', 'createdAt');
      table.renameColumn('updated_at', 'updatedAt');
      table.renameColumn('typeform_data', 'typeformData');
    }),
    knex.schema.alterTable('user', (table) => {
      table.renameColumn('first_name', 'firstName');
      table.renameColumn('last_name', 'lastName');
      table.renameColumn('partner_team', 'partnerTeam');
      table.renameColumn('partner_position', 'partnerPosition');
      table.renameColumn('created_at', 'createdAt');
      table.renameColumn('updated_at', 'updatedAt');
    }),
    knex.schema.alterTable('vote', (table) => {
      table.renameColumn('vote_type', 'voteType');
      table.renameColumn('partner_id', 'partnerId');
      table.renameColumn('company_id', 'companyId');
      table.renameColumn('market_score', 'marketScore');
      table.renameColumn('product_score', 'productScore');
      table.renameColumn('team_score', 'teamScore');
      table.renameColumn('fit_score', 'fitScore');
      table.renameColumn('created_at', 'createdAt');
      table.renameColumn('updated_at', 'updatedAt');
      table.renameColumn('overall_vote', 'overallVote');
    }),
    knex.schema.alterTable('company_point_partner', (table) => {
      table.renameColumn('user_id', 'userId');
      table.renameColumn('company_id', 'companyId');
    }),
  ]);

export const down = async (knex: Knex) => {
  await Promise.all([
    knex.schema.alterTable('company', (table) => {
      table.renameColumn('contactEmail', 'contact_email');
      table.renameColumn('companyLinks', 'company_links');
      table.renameColumn('createdAt', 'created_at');
      table.renameColumn('updatedAt', 'updated_at');
      table.renameColumn('typeformData', 'typeform_data');
    }),
    knex.schema.alterTable('user', (table) => {
      table.renameColumn('firstName', 'first_name');
      table.renameColumn('lastName', 'last_name');
      table.renameColumn('partnerTeam', 'partner_team');
      table.renameColumn('partnerPosition', 'partner_position');
      table.renameColumn('createdAt', 'created_at');
      table.renameColumn('updatedAt', 'updated_at');
    }),
    knex.schema.alterTable('vote', (table) => {
      table.renameColumn('voteType', 'vote_type');
      table.renameColumn('partnerId', 'partner_id');
      table.renameColumn('companyId', 'company_id');
      table.renameColumn('marketScore', 'market_score');
      table.renameColumn('productScore', 'product_score');
      table.renameColumn('teamScore', 'team_score');
      table.renameColumn('fitScore', 'fit_score');
      table.renameColumn('createdAt', 'created_at');
      table.renameColumn('updatedAt', 'updated_at');
      table.renameColumn('overallVote', 'overall_vote');
    }),
    knex.schema.alterTable('company_point_partner', (table) => {
      table.renameColumn('userId', 'user_id');
      table.renameColumn('companyId', 'company_id');
    }),
  ]);
};
