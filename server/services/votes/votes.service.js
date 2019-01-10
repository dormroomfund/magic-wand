// Initializes the `votes` service on path `/votes`
import createObjectionService from 'feathers-objection';
import Vote from '../../models/votes.model';
import hooks from './votes.hooks';

export default (app) => {
  const paginate = app.get('paginate');

  const options = {
    model: Vote,
    paginate,
    whitelist: ['$eager', '$joinRelation'],
    allowedEager: 'voted_user',
  };

  // Initialize our service with any options it requires
  app.use('/votes', createObjectionService(options));
  app.service('votes').hooks(hooks);
};
