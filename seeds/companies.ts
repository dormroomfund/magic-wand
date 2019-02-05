import faker from 'faker';

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('companies')
    .del()
    .then(() =>
      // Inserts seed entries
      knex('companies').insert([
        {
          id: 1,
          name: faker.company.companyName(),
          description: faker.company.catchPhrase(),
          industries: ['agtech'],
          status: 'applied',
          contact_email: [faker.internet.email()],
          company_links: {},
          archived: false
        },
        {
          id: 2,
          name: faker.company.companyName(),
          description: faker.company.catchPhrase(),
          industries: ['advertising'],
          status: 'funded',
          contact_email: [faker.internet.email()],
          company_links: {},
          archived: true
        },
      ])
    );
};
