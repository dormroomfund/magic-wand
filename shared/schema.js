export default {
  users: {
    type: 'object',
    required: ['id', 'permissions', 'first_name', 'last_name', 'email'],

    properties: {
      id: { type: 'integer' },
      auth0: { type: 'string' },
      email: { type: 'string' },
      permissions: { type: 'string' },
      first_name: { type: 'string' },
      last_name: { type: 'string' },
      school: { type: 'string' },
      photo: { type: 'string' },
      linkedin: { type: 'string' },
      gender: { type: 'string' },
      ethnicity: { type: 'string' },
      partner_team: { type: 'string' },
      partner_position: { type: 'string' },
    },
  },
  companies: {
    type: 'object',
    required: ['id', 'name', 'contact_email'],

    properties: {
      id: { type: 'integer' },
      name: { type: 'string' },
      description: { type: 'string' },
      industries: { type: 'string[]' },
      status: { type: 'string' },
      contact_email: { type: 'array' },
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
      vote_type: { type: 'string' },
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
