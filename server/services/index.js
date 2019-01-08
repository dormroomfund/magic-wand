import users from './users/users.service';
import votes from './votes/votes.service';
import pplwhovoted from './votes/whovoted.service';

export default (app) => {
  app.configure(users);
  app.configure(votes);
  app.configure(pplwhovoted);
};
