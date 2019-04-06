import Knex from 'knex';

exports.seed = function(knex: Knex) {
  // Deletes ALL existing entries
  return knex('votes')
    .del()
    .then(() =>
      // Inserts seed entries
      knex('votes').insert([
        // {
        //   id: 1,
        //   vote_type: 'Final',
        //   partner_id: 1,
        //   company_id: 2,
        //   market_score: 6,
        //   product_score: 6,
        //   team_score: 6,
        //   fit_score: 6,
        //   comment: 'Love the business model!',
        // },
        // {
        //   id: 2,
        //   vote_type: 'Final',
        //   partner_id: 2,
        //   company_id: 2,
        //   market_score: 5,
        //   product_score: 5,
        //   team_score: 5,
        //   fit_score: 5,
        //   comment: 'Has some ethics problems but big fan!',
        // },
      ])
    );
};
