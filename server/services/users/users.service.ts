import createObjectionService from 'feathers-objection';
import UserModel from '../../models/user.model';
import hooks from './users.hooks';
import App from '../../../client/schemas/app';

export default (app: App) => {
  const paginate = app.get('paginate');

  const options = {
    model: UserModel,
    paginate,
  };

  app.use('/api/users', createObjectionService(options));
  app.service('api/users').hooks(hooks);
};
