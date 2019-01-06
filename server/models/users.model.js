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
        id: { type: 'integer' },
        auth0Id: { type: 'string' },
        email: { type: 'string' },
        isPartner: { type: 'boolean' },
      },
    };
  }

  static get relationMappings() {
    const Partner = require('./partners.model');
    const Founder = require('./founders.model');

    return {
      partners: {
        relation: Model.BelongsToOneRelation,
        modelClass: Partner,
        join: {
          from: 'users.id',
          to: 'partners.partnerID',
        },
      },
      founders: {
        relation: Model.BelongsToOneRelation,
        modelClass: Founder,
        join: {
          from: 'users.id',
          to: 'founders.founderID',
        },
      },
    };
  }
}
