import routes from 'next-routes';

export default routes() //
  .add('index')
  .add('Research')
  .add('Pipeline')
  .add('PortfolioSuccess')
  .add('Company', '/company/:id', 'Company');
