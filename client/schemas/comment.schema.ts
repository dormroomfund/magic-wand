import { User } from './user';

export interface Comment {
  readonly id?: number;
  userId: number;
  companyId: number;

  content: string;

  // Read-only fields
  readonly createdAt?: string;
  readonly updatedAt?: string;

  // Query-only Fields
  readonly author?: User;
  readonly company?: Comment;
}

/**
 * Describes JSON validation schema for each model.
 */
export const commentSchema = {
  type: 'object',
  required: ['userId', 'companyId', 'content'],

  properties: {
    id: { type: 'integer' },
    userId: { type: 'integer' },
    companyId: { type: 'integer' },

    content: { type: 'string' },

    createdAt: {
      type: 'string',
      format: 'date-time',
    },
    updatedAt: {
      type: 'string',
      format: 'date-time',
    },
  },
  additionalProperties: false,
};
