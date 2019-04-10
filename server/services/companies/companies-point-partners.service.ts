import createObjectionService from 'feathers-objection';
import App from '../../../client/schemas/app';
import CompanyPointPartnerModel from '../../models/companyPointPartner.model';
import hooks from './companies-point-partners.hooks';

export default (app: App) => {
  const options = {
    model: CompanyPointPartnerModel,
    multi: ['create', 'remove'],
    whitelist: ['$eager'],
    allowedEager: Object.keys(CompanyPointPartnerModel.relationMappings),
  };

  // Initialize our service with any options it requires
  app.use('/api/companies/point-partners', createObjectionService(options));
  app.service('api/companies/point-partners').hooks(hooks);
};
