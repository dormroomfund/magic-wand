// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');

class User extends Model {
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

module.exports = User;
