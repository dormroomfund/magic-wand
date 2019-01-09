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
    const User = require('./users.model');
    const Vote = require('./votes.model');

    return {
      founders: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          from: 'users.id',
          through: {
            from: 'users_company_founders.founder_id',
            to: 'users_company_founders.company_id',
          },
          to: 'companies.id',
          extra: ['permissions'],
        },
      },
      partners: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          from: 'users.id',
          through: {
            from: 'users_company_partners.partner_id',
            to: 'users_company_partners.company_id',
          },
          to: 'companies.id',
          extra: ['permissions'],
        },
      },
      votes: {
        relation: Model.HasManyRelation,
        modelClass: Vote,
        join: {
          from: 'companies.id',
          to: 'votes.company_id',
        },
      },
    };
  }
}
