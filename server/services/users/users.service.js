import createObjectionService from 'feathers-objection';
import User from '../../models/users.model';
import hooks from './users.hooks';

export default (app) => {
  const user = new User(app);
  const paginate = app.get('paginate');

  const options = {
    model: user,
    paginate,
  };

  app.use('/users', createObjectionService(options));
  app.service('users').hooks(hooks);
};
