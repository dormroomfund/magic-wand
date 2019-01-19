import createObjectionService from 'feathers-objection';
import User from '../../models/users.model';
import hooks from './users.hooks';

export default (app) => {
  const paginate = app.get('paginate');

  const options = {
    model: User,
    paginate,
  };

  app.use('/api/users', createObjectionService(options));
  app.service('users').hooks(hooks);
};
