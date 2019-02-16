export enum Status {
  Applied = 'applied',
  Pipeline = 'pipeline',
  Rejected = 'rejected',
  Pitching = 'pitching',
  Waiting = 'waiting',

  // Exit States
  Funded = 'funded',
  Deferred = 'deferred',
  NotFunded = 'not-funded',
}

export interface Company {
  id?: number;
  name: string;
  description: string;
  point_partners?: number[];
  industries?: string[];
  tags?: string[];
  archived?: boolean;
  status: Status;
  contact_email: string;
  company_links?: {
    name?: string;
    url?: string;
  }[];
}

// IMPORTANT: This needs to be kept in sync with the Typescript interface above.
export const companySchema = {
  type: 'object',
  required: ['name', 'description', 'contact_email', 'status'],
  description: 'Defines a company that DRF encounters',
  properties: {
    id: { type: 'integer' },
    name: { type: 'string' },
    description: { type: 'string' },
    point_partners: { type: 'array', items: { type: 'integer' } },
    industries: { type: 'array', items: { type: 'string' } },
    tags: { type: 'array', items: { type: 'string' } },
    archived: { type: 'boolean' },
    status: {
      type: 'string',
      enum: Object.values(Status),
    },
    contact_email: { type: 'string', format: 'email' },
    company_links: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          url: { type: 'string' },
        },
      },
    },
  },
};
