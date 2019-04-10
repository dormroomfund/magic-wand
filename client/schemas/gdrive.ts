export enum DocumentTypes {
  Prevote = 'prevote',
  Snapshot = 'snapshot',
}

/* Describes JSON validation schema for the gDriveService. */
export interface GoogleDriveDocument {
  documentType: DocumentTypes;
  companyId: number;

  documentId?: string;
}

export const gDriveSchema = {
  type: 'object',
  required: ['documentType', 'companyId'],

  properties: {
    documentType: {
      type: 'string',
      enum: Object.values(DocumentTypes),
    },
    companyId: { type: 'integer' },
  },
};
