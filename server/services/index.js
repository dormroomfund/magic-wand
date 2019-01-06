import users from './users/users.service';
import votes from './votes/votes.service';

export default (app) => {
  app.configure(users);
  app.configure(votes);
};
