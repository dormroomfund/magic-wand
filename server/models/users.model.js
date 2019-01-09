// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
import { Model } from 'objection';

export default class User extends Model {
  static get tableName() {
    return 'users';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['id', 'permissions', 'first_name', 'last_name'],

      properties: {
        id: { type: 'integer' },
        auth0: { type: 'string' },
        permissions: { type: 'string' },
        first_name: { type: 'string' },
        last_name: { type: 'string' },
        school: { type: 'string' },
        photo: { type: 'string' },
        linkedin: { type: 'string' },
        gender: { type: 'string' },
        ethnicity: { type: 'string' },
        partner_team: { type: 'string' },
        partner_position: { type: 'string' },
      },
    };
  }

  static get relationMappings() {
    const Company = require('./companies.model');

    return {
      companies: {
        relation: Model.ManyToManyRelation,
        modelClass: Company,
        join: {
          from: 'users.id',
          through: {
            from: 'users_companies.user_id',
            to: 'users_companies.company_id',
          },
          to: 'companies.id',
          extra: ['permissions'],
        },
      },
    };
  }
}
