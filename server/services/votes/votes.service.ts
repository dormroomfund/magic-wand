// Initializes the `votes` service on path `/votes`
import createObjectionService from 'feathers-objection';
import VoteModel from '../../models/vote.model';
import hooks from './votes.hooks';
import App from '../../../client/schemas/app';

export default (app: App) => {
  const paginate = app.get('paginate');

  const options = {
    model: VoteModel,
    paginate,
    whitelist: ['$eager', '$joinRelation', '$pick'],
    allowedEager: 'voter',
    eagerFilters: [
      {
        expression: 'voter',
        filter(builder) {
          /*
           * Use the eager filter to only get the first_name
           * and last_name.
           */
          builder.select(['first_name', 'last_name']);
        },
      },
    ],
  };

  // Initialize our service with any options it requires
  app.use('/api/votes', createObjectionService(options));
  app.service('api/votes').hooks(hooks);
};
