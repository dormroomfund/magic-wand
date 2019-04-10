import Knex from 'knex';

export const seed = async (knex: Knex) => {
  // Deletes ALL existing entries
  await knex('vote').del();
  // Inserts seed entries
  await knex('votes').insert([
    // {
    //   id: 1,
    //   voteType: 'Final',
    //   partnerId: 1,
    //   companyId: 2,
    //   marketScore: 6,
    //   productScore: 6,
    //   teamScore: 6,
    //   fitScore: 6,
    //   comment: 'Love the business model!',
    // },
    // {
    //   id: 2,
    //   voteType: 'Final',
    //   partnerId: 2,
    //   companyId: 2,
    //   marketScore: 5,
    //   productScore: 5,
    //   teamScore: 5,
    //   fitScore: 5,
    //   comment: 'Has some ethics problems but big fan!',
    // },
  ]);
};
