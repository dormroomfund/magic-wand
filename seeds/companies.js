exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('companies')
    .del()
    .then(() =>
      // Inserts seed entries
      knex('companies').insert([
        {
          id: 1,
          name: 'CompanyA',
          description: 'Sells Apples',
          industries: ['agtech'],
          status: ['applied'],
          contact_email: ['hello@apple.com'],
          company_links: {},
        },
        {
          id: 2,
          name: 'Google',
          description: 'Sells your data',
          industries: ['advertising'],
          status: ['funded'],
          contact_email: ['hello@google.com'],
          company_links: {},
        },
      ])
    );
};
