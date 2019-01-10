// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
import { Model } from 'objection';

export default class Company extends Model {
  static get tableName() {
    return 'companies';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['id', 'name', 'contact_email'],

      properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
        description: { type: 'string' },
        industries: { type: 'string[]' },
        status: { type: 'string' },
        contact_email: { type: 'array' },
        company_links: { type: 'object' },
      },
    };
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
