import Knex from 'knex';
import { Team } from '../../client/schemas/common';
import { Ethnicity, Gender, Position } from '../../client/schemas/user';

export const seed = async (knex: Knex) => {
  // Deletes ALL existing entries
  await knex('user').del();
  // Inserts seed entries
  await knex('user').insert([
    {
      auth0: '{ "id": "auth0|5ca584f3ed19ed110c8cdced"}',
      auth0Id: 'auth0|5ca584f3ed19ed110c8cdced',
      permissions: 'partner',
      firstName: 'John',
      lastName: 'Doe',
      school: 'School of Hard knocks',
      email: 'magic-wand@mailinator.com',
      gender: Gender.Male,
      photo:
        'https://s.gravatar.com/avatar/c1855f49487b41b6e92f225938ec45db?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fma.png',
      ethnicity: Ethnicity.Asian,
      partnerTeam: Team.Philadelphia,
      partnerPosition: Position.InvestmentPartner,
    },
    {
      auth0: '{ "id": "auth0|5ca584f32392319ed110c8cdced" }',
      auth0Id: 'auth0|5ca584f322392319ed110c8cdced',
      permissions: 'partner',
      firstName: 'Veronica',
      lastName: 'McDougal',
      school: 'Yalevard',
      email: 'magic-wand-2@mailinator.com',
      gender: Gender.Female,
      photo:
        'https://s.gravatar.com/avatar/c1855f49487b41b6e92f225938ec45db?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fma.png',
      ethnicity: Ethnicity.White,
      partnerTeam: Team.Philadelphia,
      partnerPosition: Position.ManagingPartner,
    },
  ]);
};
