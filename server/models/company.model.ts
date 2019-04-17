import { Model, JsonSchema } from 'objection';
import { companySchema } from '../../client/schemas/company';
import BaseModel from './base.model';

export default class CompanyModel extends BaseModel {
  static tableName = 'company';

  static jsonSchema = companySchema as JsonSchema;

  static relationMappings = {
    pointPartners: {
      relation: Model.ManyToManyRelation,
      modelClass: `${__dirname}/user.model`,
      join: {
        from: 'company.id',
        through: {
          from: 'company_point_partner.companyId',
          to: 'company_point_partner.userId',
        },
        to: 'user.id',
      },
    },
    associatedVotes: {
      relation: Model.HasManyRelation,
      modelClass: `${__dirname}/vote.model`,
      join: {
        from: 'company.id',
        to: 'vote.companyId',
      },
    },
  };
}
