import Routes from 'next-routes';

const routes = new Routes() //
  .add('index')
  .add('archive')
  .add('pipeline-success', '/pipeline/success', 'pipeline-success')
  .add('pipeline')
  .add('settings')
  .add('company', '/company/:id', 'company')
  .add('vote', '/vote/:id', 'vote');

export default routes;
// eslint-disable-next-line prefer-destructuring
export const Router = routes.Router;
// eslint-disable-next-line prefer-destructuring
export const Link = routes.Link;
