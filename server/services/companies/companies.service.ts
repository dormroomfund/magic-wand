// Initializes the `votes` service on path `/votes`
import createObjectionService from 'feathers-objection';
import Company from '../../models/companies.model';
import hooks from './companies.hooks';

export default (app) => {
  const paginate = app.get('paginate');

  const options = {
    model: Company,
    paginate,
    whitelist: ['$eager', '$pick'],
  };

  // Initialize our service with any options it requires
  app.use('/api/companies', createObjectionService(options));
  app.service('api/companies').hooks(hooks);
};
