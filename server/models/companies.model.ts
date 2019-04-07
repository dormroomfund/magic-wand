import { Model } from 'objection';
import { companySchema } from '../../client/schemas/company';
import BaseModel from './base.model';

export default class Company extends BaseModel {
  static get tableName() {
    return 'companies';
  }

  static get jsonSchema() {
    return companySchema;
  }

  static get relationMappings() {
    return {
      pointPartners: {
        relation: Model.ManyToManyRelation,
        modelClass: `${__dirname}/users.model`,
        join: {
          from: 'companies.id',
          through: {
            from: 'company_point_partner.company_id',
            to: 'company_point_partner.user_id',
          },
          to: 'users.id',
          extra: ['permissions'],
        },
      },
      associated_votes: {
        relation: Model.HasManyRelation,
        modelClass: `${__dirname}/votes.model`,
        join: {
          from: 'companies.id',
          to: 'votes.company_id',
        },
      },
    };
  }
}
