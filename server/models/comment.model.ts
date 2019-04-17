import { Model } from 'objection';
import BaseModel from './base.model';
import { commentSchema } from '../../client/schemas/comment.schema';

export default class CommentModel extends BaseModel {
  static tableName = 'comment';

  static jsonSchema = commentSchema;

  static relationMappings = {
    author: {
      relation: Model.BelongsToOneRelation,
      modelClass: `${__dirname}/user.model`,
      join: {
        from: 'comment.userId',
        to: 'user.id',
      },
    },
    company: {
      relation: Model.BelongsToOneRelation,
      modelClass: `${__dirname}/company.model`,
      join: {
        from: 'comment.companyId',
        to: 'company.id',
      },
    },
  };
}
