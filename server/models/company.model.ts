import { Model } from 'objection';
import { companySchema } from '../../client/schemas/company';
import BaseModel from './base.model';

export default class CompanyModel extends BaseModel {
  static get tableName() {
    return 'company';
  }

  static get jsonSchema() {
    return companySchema;
  }

  static get relationMappings() {
    return {
      pointPartners: {
        relation: Model.ManyToManyRelation,
        modelClass: `${__dirname}/user.model`,
        join: {
          from: 'company.id',
          through: {
            from: 'company_point_partner.company_id',
            to: 'company_point_partner.user_id',
          },
          to: 'user.id',
          extra: ['permissions'],
        },
      },
      associated_votes: {
        relation: Model.HasManyRelation,
        modelClass: `${__dirname}/vote.model`,
        join: {
          from: 'company.id',
          to: 'vote.company_id',
        },
      },
    };
  }
}
