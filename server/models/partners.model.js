import { Model } from 'objection';

export default class Partner extends Model {
  static get tableName() {
    return 'partners';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['partnerID'],

      properties: {
        partnerID: { type: 'integer' },
        first_name: { type: 'string' },
        last_name: { type: 'string' },
        school: { type: 'string' },
        team: { type: 'string' },
        position: { type: 'string' },
        photo: { type: 'string' },
      },
    };
  }

  static get relationMappings() {
    const Vote = require('./votes.model');

    return {
      votes: {
        relation: Model.HasManyRelation,
        modelClass: Vote,
        join: {
          from: 'partners.partnerID',
          to: 'votes.partnerID',
        },
      },
    };
  }
}
