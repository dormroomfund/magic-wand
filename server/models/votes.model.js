import { Model } from 'objection';

export default class Votes extends Model {
  static get tableName() {
    return 'votes';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'id',
        'vote_type',
        'partner_id',
        'company_id',
        'market_score',
        'product_score',
        'fit_score',
        'comment',
      ],

      properties: {
        id: { type: 'integer' },
        vote_type: { type: 'string' },
        partner_id: { type: 'integer' },
        company_id: { type: 'integer' },
        market_score: { type: 'real' },
        product_score: { type: 'real' },
        team_score: { type: 'real' },
        fit_score: { type: 'real' },
        comment: { type: 'string' },
      },
    };
  }

  static get relationMappings() {
    const Company = require('./companies.model');
    const User = require('./users.model');

    return {
      votes: {
        relation: Model.BelongsToOneRelation,
        modelClass: Company,
        join: {
          from: 'votes.company_id',
          to: 'companies.id',
        },
      },
      users: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'users.id',
          to: 'votes.partner_id',
        },
      },
    };
  }
}
