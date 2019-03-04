/**
 * Describes JSON validation schema for the gDriveService.
 */
export const gDriveSchema = {
  type: 'object',
  required: ['document_type', 'company_id'],

  properties: {
    document_type: {
      type: 'string',
      enum: ['prevote', 'snapshot', 'both'],
    },
    company_id: { type: 'integer' },
  },
};
