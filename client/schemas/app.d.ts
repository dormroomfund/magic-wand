import { Application } from '@feathersjs/feathers';
import { Company } from './company';
import { User } from './user';
import { Vote } from './vote';
import { GoogleDriveDocument } from './gdrive';

export interface ServiceTypes {
  'api/companies': Company;
  'api/gdrive': GoogleDriveDocument;
  'api/users': User;
  'api/votes': Vote;
}

export default interface App extends Application<ServiceTypes> {}
