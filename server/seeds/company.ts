import faker from 'faker';
import Knex from 'knex';

export const seed = async (knex: Knex) => {
  // Deletes ALL existing entries
  await knex('company').del();
  // Inserts seed entries
  await knex('company').insert([
    {
      id: 1,
      name: faker.company.companyName(),
      description: faker.company.catchPhrase(),
      industries: JSON.stringify(['vr']),
      status: 'applied',
      contactEmail: faker.internet.email(),
      companyLinks: {},
    },
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
  ]);
};
