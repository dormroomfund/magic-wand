import faker from 'faker';
import Knex from 'knex';

exports.seed = function(knex: Knex) {
  // Deletes ALL existing entries
  return knex('companies')
    .del()
    .then(() =>
      // Inserts seed entries
      knex('companies').insert([
        // {
        //   id: 1,
        //   name: faker.company.companyName(),
        //   description: faker.company.catchPhrase(),
        //   industries: ['agtech'],
        //   status: 'applied',
        //   contactEmail: [faker.internet.email()],
        //   companyLinks: {},
        //   archived: false,
        // },
        // {
        //   id: 2,
        //   name: faker.company.companyName(),
        //   description: faker.company.catchPhrase(),
        //   industries: ['advertising'],
        //   status: 'funded',
        //   contactEmail: [faker.internet.email()],
        //   companyLinks: {},
        //   archived: true,
        // },
      ])
    );
};
