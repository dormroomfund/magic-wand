exports.seed = function(knex) {
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
          first_name: 'john',
          last_name: 'doe',
          gender: 'male',
          ethnicity: 'Asian',
          partner_team: 'PHL',
          partner_position: 'IP',
        },
        {
          id: 2,
          auth0: 'adasd',
          permissions: 'partner',
          first_name: 'jane',
          last_name: 'doe',
          gender: 'female',
          ethnicity: 'African-American',
          partner_team: 'BOS',
          partner_position: 'MP',
        },
        {
          id: 3,
          auth0: '23454342',
          permissions: 'founder',
          first_name: 'Larry',
          last_name: 'Page',
          gender: 'Male',
          ethnicity: 'White',
        },
      ])
    );
};
