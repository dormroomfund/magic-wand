import createObjectionService from 'feathers-objection';
import App from '../../../client/schemas/app';
import CommentModel from '../../models/comment.model';
import hooks from './comments.hooks';

export default (app: App) => {
  const paginate = app.get('paginate');

  const options = {
    model: CommentModel,
    paginate,
    whitelist: ['$eager', '$pick'],
    allowedEager: '[user,company]',
  };

  // Initialize our service with any options it requires
  app.use('/api/comments', createObjectionService(options));
  app.service('api/comments').hooks(hooks);
};
