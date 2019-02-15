/*
 * Describes JSON validation schema for each model.
 */

export default {
  users: {
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
        enum: ['Philadelphia', 'Boston', 'New York', 'San Francisco'],
      },
      partner_position: {
        type: 'string',
        enum: ['', 'Investment Partner', 'Managing Partner', 'HQ Partner'],
      },
    },
  },
  companies: {
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
      status: { type: 'string' },
      contact_email: { type: 'string', format: 'email' },
      company_links: { type: 'object' },
    },
  },
  votes: {
    type: 'object',
    required: [
      'company_id',
      'partner_id',
      'vote_type',
      'market_score',
      'product_score',
      'fit_score',
      'team_score',
    ],

    properties: {
      id: { type: 'integer' },
      vote_type: {
        type: 'string',
        enum: ['prevote', 'final'],
      },
      partner_id: { type: 'integer' },
      company_id: { type: 'integer' },
      market_score: { type: 'real' },
      product_score: { type: 'real' },
      team_score: { type: 'real' },
      fit_score: { type: 'real' },
      comment: { type: 'string' },
    },
  },
};
