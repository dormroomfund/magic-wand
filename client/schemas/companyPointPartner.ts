/** Represents a relationship between a company and a user as a point partner. */
export interface CompanyPointPartner {
  id?: number;

  userId: number;
  companyId: number;

  createdAt?: string;
  updatedAt?: string;
}

export const companyPointPartnerSchema = {
  type: 'object',
  required: ['userId', 'companyId'],

  properties: {
    id: {
      type: 'integer',
      minimum: 0,
    },
    userId: {
      type: 'integer',
      minimum: 0,
    },
    companyId: {
      type: 'integer',
      minimum: 0,
    },

    createdAt: {
      type: 'string',
      format: 'date-time',
    },
    updatedAt: {
      type: 'string',
      format: 'date-time',
    },
  },
};
