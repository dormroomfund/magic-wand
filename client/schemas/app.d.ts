import { Application } from '@feathersjs/feathers';
import { Company } from './company';
import { CompanyPointPartner } from './companyPointPartner';
import { GoogleDriveDocument } from './gdrive';
import { User } from './user';
import { Vote } from './vote';

export interface ServiceTypes {
  'api/companies': Company;
  'api/companies/point-partners': CompanyPointPartner;
  'api/gdrive': GoogleDriveDocument;
  'api/users': User;
  'api/votes': Vote;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export default interface App extends Application<ServiceTypes> {}
