import { Model } from 'objection';

export default class Vote extends Model {
  static get tableName() {
    return 'votes';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'company_id',
        'partner_id',
        'vote_type',
        'market_score',
        'product_score',
        'fit_score',
        'team_score',
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
    return {
      voted_company: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/companies.model`,
        join: {
          from: 'votes.company_id',
          to: 'companies.id',
        },
      },
      voted_user: {
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
