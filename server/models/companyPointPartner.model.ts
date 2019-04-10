import { Model } from 'objection';
import { companyPointPartnerSchema } from '../../client/schemas/companyPointPartner';
import BaseModel from './base.model';

export default class CompanyPointPartnerModel extends BaseModel {
  static tableName = 'company_point_partner';

  static jsonSchema = companyPointPartnerSchema;

  static relationMappings = {
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: `${__dirname}/user.model`,
      join: {
        from: 'company_point_partner.userId',
        to: 'user.id',
      },
    },
    company: {
      relation: Model.BelongsToOneRelation,
      modelClass: `${__dirname}/company.model`,
      join: {
        from: 'company_point_partner.companyId',
        to: 'company.id',
      },
    },
  };
}
