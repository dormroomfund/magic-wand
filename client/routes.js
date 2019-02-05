import routes from 'next-routes';

export default routes() //
  .add('index')
  .add('research')
  .add('pipeline')
  .add('portfoliosuccess')
  .add('company', '/company/:id', 'company');
