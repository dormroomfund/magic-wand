// Initializes the `votes` service on path `/votes`
import createObjectionService from 'feathers-objection';
import Company from '../../models/companies.model';

export default (app) => {
  const paginate = app.get('paginate');

  const options = {
    model: Company,
    paginate,
  };

  // Initialize our service with any options it requires
  app.use('/companies', createObjectionService(options));
};