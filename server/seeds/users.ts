import faker from 'faker';
import Knex from 'knex';
import { Gender, Ethnicity, Team, Position } from '../../client/schemas/user';

exports.seed = function(knex: Knex) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(() =>
      // Inserts seed entries
      knex('users').insert([
        {
          id: 1,
          auth0: '{}',
          auth0Id: 'auth0|5ca584f3ed19ed110c8cdced',
          permissions: 'partner',
          first_name: 'John',
          last_name: 'Doe',
          school: 'School of Hard knocks',
          email: 'magic-wand@mailinator.com',
          gender: Gender.Male,
          photo:
            'https://s.gravatar.com/avatar/c1855f49487b41b6e92f225938ec45db?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fma.png',
          ethnicity: Ethnicity.Asian,
          partner_team: Team.Philadelphia,
          partner_position: Position.InvestmentPartner,
        },
      ])
    );
};
