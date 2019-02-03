import { Model } from 'objection';
import schema from '../../client/shared/schema';

export default class Vote extends Model {
  static get tableName() {
    return 'votes';
  }

  static get jsonSchema() {
    return schema.votes;
  }

  static get relationMappings() {
    return {
      voted_company: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/companies.model`,
        join: {
          from: 'votes.company_id',
          to: 'companies.id',
        },
      },
      voted_users: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/users.model`,
        join: {
          from: 'users.id',
          to: 'votes.partner_id',
        },
      },
    };
  }
}
