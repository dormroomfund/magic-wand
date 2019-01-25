import { Model } from 'objection';
import schema from '../../client/shared/schema';

export default class Company extends Model {
  static get tableName() {
    return 'companies';
  }

  static get jsonSchema() {
    return schema.companies;
  }

  static get relationMappings() {
    return {
      associated_users: {
        relation: Model.ManyToManyRelation,
        modelClass: `${__dirname}/users.model`,
        join: {
          from: 'companies.id',
          through: {
            from: 'users_companies.company_id',
            to: 'users_companies.users_id',
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
