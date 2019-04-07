// Initializes the `votes` service on path `/votes`
import createObjectionService from 'feathers-objection';
import CompanyModel from '../../models/company.model';
import hooks from './companies.hooks';
import App from '../../../client/schemas/app';

export default (app: App) => {
  const paginate = app.get('paginate');

  const options = {
    model: CompanyModel,
    paginate,
    whitelist: ['$eager', '$pick'],
  };

  // Initialize our service with any options it requires
  app.use('/api/companies', createObjectionService(options));
  app.service('api/companies').hooks(hooks);
};
