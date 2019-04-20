export enum DocumentTypes {
  Prevote = 'prevote',
  ExternalSnapshot = 'External Snapshot',
  InternalSnapshot = 'Internal Snapshot',
  PitchDeck = 'pitchdeck',
}

/* Describes JSON validation schema for the gDriveService. */
export interface GoogleDriveDocument {
  documentType: DocumentTypes;
  companyId: number;

  documentId?: string;
  googleFolderId?: string; // The company folder this document lies under
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
