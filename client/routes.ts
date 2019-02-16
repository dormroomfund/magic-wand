import Routes from 'next-routes';

const routes = new Routes() //
  .add('index')
  .add('archive')
  .add('pipeline-success', '/pipeline/success', 'pipeline-success')
  .add('pipeline')
  .add('settings')
  .add('company', '/company/:id', 'company');

export default routes;
export const Router = routes.Router;
export const Link = routes.Link;
