import faker from 'faker';
import Knex from 'knex';

exports.seed = function(knex: Knex) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(() =>
      // Inserts seed entries
      knex('users').insert([
        {
          id: 1,
          auth0: 'dasdasdasda',
          permissions: 'partner',
          first_name: faker.name.firstName(),
          last_name: faker.name.lastName(),
          school: 'School of Hard knocks',
          email: faker.internet.email(),
          gender: 'male',
          ethnicity: 'Asian',
          partner_team: 'PHL',
          partner_position: 'IP',
        },
        {
          id: 2,
          auth0: 'adasd',
          permissions: 'partner',
          first_name: faker.name.firstName(),
          last_name: faker.name.lastName(),
          school: 'Harvard University',
          email: faker.internet.email(),
          gender: 'female',
          ethnicity: 'African-American',
          partner_team: 'BOS',
          partner_position: 'MP',
        },
        {
          id: 3,
          auth0: '23454342',
          permissions: 'founder',
          first_name: faker.name.firstName(),
          last_name: faker.name.lastName(),
          school: 'University of Pennsylvania',
          email: faker.internet.email(),
          gender: 'male',
          ethnicity: 'White',
        },
      ])
    );
};
