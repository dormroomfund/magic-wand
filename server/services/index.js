import users from './users/users.service';

import votes from './votes/votes.service';
import pplWhoVoted from './votes/whovoted.service';
import finalizeVotes from './votes/finalize_votes.service';

import companies from './companies/companies.service';

export default (app) => {
  app.configure(users);
  app.configure(votes);
  app.configure(pplWhoVoted);
  app.configure(finalizeVotes);
  app.configure(companies);
};
