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
      required: ['password'],

      properties: {
        auth0Id: { type: 'string' },
      },
    };
  }
}
