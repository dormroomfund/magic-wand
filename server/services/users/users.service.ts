import createObjectionService from 'feathers-objection';
import User from '../../models/users.model';
import hooks from './users.hooks';
import App from '../../../client/schemas/app';

export default (app: App) => {
  const paginate = app.get('paginate');

  const options = {
    model: User,
    paginate,
  };

  app.use('/api/users', createObjectionService(options));
  app.service('api/users').hooks(hooks);
};
