export enum Team {
  Philadelphia = 'Philadelphia',
  Boston = 'Boston',
  NewYork = 'New York',
  SanFrancisco = 'San Francisco',
}

export enum Position {
  InvestmentPartner = 'Investment Partner',
  ManagingPartner = 'Managing Partner',
  HQPartner = 'HQ Partner',
}

export interface User {
  id?: number;
  auth0?: string;
  auth0Id?: string;
  email: string;
  permissions: string;
  first_name: string;
  last_name: string;
  school?: string;
  photo?: string;
  linkedin?: string;
  gender?: string;
  ethnicity?: string;
  partner_team?: Team;
  partner_position?: Position;
}

export const userSchema = {
  type: 'object',
  required: ['permissions', 'first_name', 'last_name', 'email'],
  description:
    'Object that defines a user of Magic Wand. Either a partner or founder',
  properties: {
    id: { type: 'integer' },
    auth0: { type: 'string' },
    auth0Id: { type: 'string' },
    email: { type: 'string', format: 'email' },
    permissions: { type: 'string', default: '' },
    first_name: { type: 'string' },
    last_name: { type: 'string' },
    school: { type: 'string' },
    photo: { type: 'string' },
    linkedin: { type: 'string' },
    gender: { type: 'string' },
    ethnicity: { type: 'string' },
    partner_team: {
      type: 'string',
      enum: Object.values(Team),
    },
    partner_position: {
      type: 'string',
      enum: Object.values(Position),
    },
  },
};
