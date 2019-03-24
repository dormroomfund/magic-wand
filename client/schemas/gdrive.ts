/*
 * Describes JSON validation schema for the gDriveService.
 */

export enum DocumentTypes {
  Prevote = 'prevote',

  Snapshot = 'snapshot',

  Both = 'both',
}

export interface GoogleDriveDocument {
  document_type: DocumentTypes;
  company_id: number;
}

export const gDriveSchema = {
  type: 'object',
  required: ['document_type', 'company_id'],

  properties: {
    document_type: {
      type: 'string',
      enum: Object.values(DocumentTypes),
    },
    company_id: { type: 'integer' },
  },
};
