import { Model } from 'objection';

export default class Votes extends Model {
  static get tableName() {
    return 'votes';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'companyID',
        'partnerID',
        'voteType',
        'market',
        'product',
        'fit',
      ],

      properties: {
        companyID: { type: 'integer' },
        partnerID: { type: 'integer' },
        voteType: { type: 'string' },
        market: { type: 'real' },
        product: { type: 'real' },
        team: { type: 'real' },
        fit: { type: 'real' },
        overall: { type: 'real' },
        voteComment: { type: 'string' },
      },
    };
  }
}
