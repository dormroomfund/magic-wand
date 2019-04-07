import { Model } from 'objection';
import BaseModel from './base.model';

export default class VoteModel extends BaseModel {
  static get tableName() {
    return 'vote';
  }

  // static get jsonSchema() {
  //   return voteSchema;
  // }

  static get relationMappings() {
    return {
      voted_company: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/company.model`,
        join: {
          from: 'vote.companyId',
          to: 'company.id',
        },
      },
      voter: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/user.model`,
        join: {
          from: 'user.id',
          to: 'vote.partnerId',
        },
      },
    };
  }
}
