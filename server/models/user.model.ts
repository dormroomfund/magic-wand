import { Model } from 'objection';
import { userSchema } from '../../client/schemas/user';
import BaseModel from './base.model';

export default class UserModel extends BaseModel {
  static get tableName() {
    return 'user';
  }

  // static get jsonSchema() {
  //   return userSchema;
  // }

  static get relationMappings() {
    return {
      companiesHandling: {
        relation: Model.ManyToManyRelation,
        modelClass: `${__dirname}/company.model`,
        join: {
          from: 'user.id',
          through: {
            from: 'user_point_partner.user_id',
            to: 'user_point_partner.company_id',
          },
          to: 'company.id',
          extra: ['permissions'],
        },
      },
    };
  }
}