import faker from 'faker';
import Knex from 'knex';
import { Team } from '../../client/schemas/common';
import { Status } from '../../client/schemas/company';

export const seed = async (knex: Knex) => {
  // Deletes ALL existing entries
  await knex('company').del();
  // Inserts seed entries
  await knex('company').insert([
    {
      name: 'Tesla 2.0',
      description: faker.company.catchPhrase(),
      industries: JSON.stringify(['vr']),
      status: Status.Applied,
      team: Team.Philadelphia,
      contactEmail: 'elon@tesla.io',
      companyLinks: JSON.stringify([]),
    },
    {
      name: faker.company.companyName(),
      description: faker.company.catchPhrase(),
      industries: JSON.stringify(['advertising']),
      status: Status.Pipeline,
      contactEmail: faker.internet.email(),
      companyLinks: JSON.stringify([]),
      team: Team.Boston,
    },
  ]);
};
