import users from './users/users.service';

export default (app) => {
  app.configure(users);
};
